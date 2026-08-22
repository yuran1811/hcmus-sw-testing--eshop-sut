const fs = require('fs');

for (const file of process.argv.slice(2)) {
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`FILE ${file}`);
  console.log(`TYPE ${Array.isArray(value) ? 'array' : typeof value}`);
  console.log(`KEYS ${Array.isArray(value) ? value.length : Object.keys(value).join(', ')}`);
  const sample = Array.isArray(value) ? value[0] : value;
  console.log(JSON.stringify(sample, null, 2).slice(0, 12000));
  if (value && value.run && Array.isArray(value.run.executions)) {
    console.log(`EXECUTIONS ${value.run.executions.length}`);
    console.log(JSON.stringify(value.run.executions[0], null, 2).slice(0, 12000));
  }
}
