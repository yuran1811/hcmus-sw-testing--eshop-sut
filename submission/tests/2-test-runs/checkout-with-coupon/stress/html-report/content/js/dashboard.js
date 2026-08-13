/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.9703285569547, "KoPercent": 0.02967144304530323};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9867166015342307, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9864810330912026, 500, 1500, "Step 1 POST login"], "isController": false}, {"data": [0.9867457006207387, 500, 1500, "Step 7 GET my-orders"], "isController": false}, {"data": [0.9873711860982016, 500, 1500, "Step 2 GET categories"], "isController": false}, {"data": [0.9873532982598139, 500, 1500, "Step 3 GET products search"], "isController": false}, {"data": [0.9759815359642894, 500, 1500, "Step 5 POST apply-coupon"], "isController": false}, {"data": [0.9868915760593435, 500, 1500, "Step 6 POST checkout"], "isController": false}, {"data": [0.9961756660925944, 500, 1500, "Step 4 POST cart"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 138180, 41, 0.02967144304530323, 55.98216818642302, 0, 3486, 16.0, 42.0, 53.0, 81.9900000000016, 115.27488112121465, 126.52781724472345, 34.47509378649787], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Step 1 POST login", 19824, 0, 0.0, 55.57869249394662, 1, 2367, 12.0, 95.0, 259.0, 969.75, 16.542553013942342, 11.071530547323267, 4.232567275051654], "isController": false}, {"data": ["Step 7 GET my-orders", 19654, 18, 0.09158441029815814, 55.814745090057876, 1, 2299, 12.0, 95.0, 262.0, 893.7000000000044, 16.53316643701599, 86.75134315810271, 5.715567303421543], "isController": false}, {"data": ["Step 2 GET categories", 19796, 6, 0.030309153364316024, 52.439684784805095, 0, 2290, 10.0, 92.0, 254.14999999999782, 901.0599999999977, 16.587733322607786, 5.799227079583581, 3.0454041646975227], "isController": false}, {"data": ["Step 3 GET products search", 19768, 17, 0.08599757183326588, 54.331495346013796, 0, 2347, 10.0, 100.0, 264.0, 906.3100000000013, 16.575312946235044, 7.488029738382062, 3.2535518200205935], "isController": false}, {"data": ["Step 5 POST apply-coupon", 19714, 0, 0.0, 82.23414832099026, 1, 3486, 15.0, 160.0, 427.0, 1292.2499999999927, 16.558093593460757, 6.458301989612766, 4.3287118974971355], "isController": false}, {"data": ["Step 6 POST checkout", 19682, 0, 0.0, 66.77014531043604, 7, 2193, 24.0, 122.0, 263.0, 925.0, 16.54732449049424, 5.099816262862178, 7.126943087097089], "isController": false}, {"data": ["Step 4 POST cart", 19742, 0, 0.0, 24.789079120656424, 0, 1186, 5.0, 41.0, 114.0, 454.84999999999854, 16.568863763017074, 4.75707611945998, 6.977042188570069], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,270 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,144 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,299 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,125 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,133 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,111 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,106 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,066 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,040 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,218 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,104 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, 4.878048780487805, 0.0014473874656245477], "isController": false}, {"data": ["The operation lasted too long: It took 2,154 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,159 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,226 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,098 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,259 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,204 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,294 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,257 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,105 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,101 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, 4.878048780487805, 0.0014473874656245477], "isController": false}, {"data": ["The operation lasted too long: It took 2,153 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,127 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,290 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,097 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,042 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,210 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,059 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,347 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,109 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,146 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,130 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,157 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,224 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,242 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,202 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}, {"data": ["The operation lasted too long: It took 2,063 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.4390243902439024, 7.236937328122738E-4], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 138180, 41, "The operation lasted too long: It took 2,104 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, "The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, "The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,270 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,144 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Step 7 GET my-orders", 19654, 18, "The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,294 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,257 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,101 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Step 2 GET categories", 19796, 6, "The operation lasted too long: It took 2,109 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,098 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,290 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,157 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Step 3 GET products search", 19768, 17, "The operation lasted too long: It took 2,104 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, "The operation lasted too long: It took 2,270 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,105 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,144 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,127 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
