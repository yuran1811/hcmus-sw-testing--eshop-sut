const fs = require('fs');

const [reportFile, dataFile, ...ids] = process.argv.slice(2);
const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

function bodyOf(response) {
  const bytes = response && response.stream && response.stream.data;
  return Array.isArray(bytes) ? Buffer.from(bytes).toString('utf8') : '';
}

for (const id of ids) {
  const index = data.findIndex((row) => row.test_id === id);
  const execution = report.run.executions.find((entry) =>
    entry.cursor && entry.cursor.iteration === index &&
    entry.item && /^Execute iteration/.test(entry.item.name)
  );
  console.log(`\n===== ${id} (iteration ${index}) =====`);
  console.log(JSON.stringify({
    data: data[index],
    request: execution && {
      method: execution.request.method,
      url: execution.request.url && execution.request.url.toString,
      headers: execution.request.header,
      body: execution.request.body && execution.request.body.raw,
    },
    response: execution && {
      status: execution.response.status,
      code: execution.response.code,
      body: bodyOf(execution.response),
    },
    failedAssertions: execution && execution.assertions.filter((a) => a.error).map((a) => `${a.assertion}: ${a.error.message}`),
  }, null, 2));

  if (!execution || (data[index] && data[index].execution_mode === 'special_sequence')) {
    const iterationExecutions = report.run.executions
      .filter((entry) => entry.cursor && entry.cursor.iteration === index)
      .map((entry) => ({
        item: entry.item && entry.item.name,
        request: entry.request && {
          method: entry.request.method,
          url: entry.request.url && entry.request.url.toString,
          body: entry.request.body && entry.request.body.raw,
        },
        response: entry.response && {
          code: entry.response.code,
          body: bodyOf(entry.response),
        },
        failedAssertions: (entry.assertions || []).filter((a) => a.error).map((a) => `${a.assertion}: ${a.error.message}`),
      }));
    console.log(JSON.stringify({ iterationExecutions }, null, 2));
  }
}
