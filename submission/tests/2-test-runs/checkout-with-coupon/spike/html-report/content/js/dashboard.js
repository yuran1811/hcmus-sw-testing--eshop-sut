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

    var data = {"OkPercent": 99.92516946914341, "KoPercent": 0.07483053085658949};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.997854124482789, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9978557206310308, 500, 1500, "Step 1 POST login"], "isController": false}, {"data": [0.9965896760192218, 500, 1500, "Step 7 GET my-orders"], "isController": false}, {"data": [0.9981580966999233, 500, 1500, "Step 2 GET categories"], "isController": false}, {"data": [0.9980009226510841, 500, 1500, "Step 3 GET products search"], "isController": false}, {"data": [0.9978398395309366, 500, 1500, "Step 5 POST apply-coupon"], "isController": false}, {"data": [0.9975259007267666, 500, 1500, "Step 6 POST checkout"], "isController": false}, {"data": [0.9989984591679507, 500, 1500, "Step 4 POST cart"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 45436, 34, 0.07483053085658949, 91.21077999823929, 1, 481450, 9.0, 33.0, 45.0, 81.0, 63.08452737976231, 39.78972205662349, 18.88567797279379], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Step 1 POST login", 6529, 1, 0.015316281206922959, 89.69398070148569, 1, 481450, 7.0, 28.0, 36.0, 65.69999999999982, 9.065348541754892, 6.0791119014808075, 2.3194544120505682], "isController": false}, {"data": ["Step 7 GET my-orders", 6451, 17, 0.2635250348783134, 169.6704386916757, 3, 480772, 9.0, 30.0, 42.0, 70.47999999999956, 9.01320054545861, 17.709631727241355, 3.1217818496516836], "isController": false}, {"data": ["Step 2 GET categories", 6515, 6, 0.0920951650038373, 14.3880276285495, 1, 2213, 6.0, 26.400000000000546, 37.0, 62.0, 9.071920907888325, 3.1716285986562696, 1.665547979182622], "isController": false}, {"data": ["Step 3 GET products search", 6503, 7, 0.10764262648008611, 88.60710441334768, 1, 481423, 6.0, 27.0, 36.0, 62.960000000000036, 9.059752852505607, 4.092807599977013, 1.7783290333872024], "isController": false}, {"data": ["Step 5 POST apply-coupon", 6481, 2, 0.030859435272334517, 169.1436506711928, 1, 481430, 9.0, 39.0, 52.0, 88.18000000000029, 9.040577280126772, 3.526179104144493, 2.3693620519467022], "isController": false}, {"data": ["Step 6 POST checkout", 6467, 1, 0.015463120457708366, 101.25529611875677, 9, 480295, 18.0, 39.0, 49.0, 74.31999999999971, 9.028970331588132, 2.7894415357766142, 3.8940308682373472], "isController": false}, {"data": ["Step 4 POST cart", 6490, 0, 0.0, 6.64237288135595, 1, 1805, 3.0, 11.0, 15.0, 29.0, 9.052184658987885, 2.5989670798266, 3.817738067051722], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,114 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,125 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,140 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 480,762 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,099 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,100 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,170 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,196 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,039 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 481,450 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,176 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,165 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,110 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,118 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 480,769 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 480,772 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,208 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,200 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,082 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,120 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 481,423 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,112 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, 5.882352941176471, 0.004401795932740558], "isController": false}, {"data": ["The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,209 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,210 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,113 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,117 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 481,430 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,139 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,160 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}, {"data": ["The operation lasted too long: It took 2,213 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 2.9411764705882355, 0.002200897966370279], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 45436, 34, "The operation lasted too long: It took 2,112 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, "The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,114 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,125 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,140 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Step 1 POST login", 6529, 1, "The operation lasted too long: It took 481,450 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Step 7 GET my-orders", 6451, 17, "The operation lasted too long: It took 2,112 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 2, "The operation lasted too long: It took 2,103 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,114 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,120 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,116 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Step 2 GET categories", 6515, 6, "The operation lasted too long: It took 2,117 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,125 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,139 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,196 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,039 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Step 3 GET products search", 6503, 7, "The operation lasted too long: It took 2,082 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,176 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 481,423 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,165 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,140 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, {"data": ["Step 5 POST apply-coupon", 6481, 2, "The operation lasted too long: It took 481,430 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, "The operation lasted too long: It took 480,762 milliseconds, but should not have lasted longer than 5,000 milliseconds.", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Step 6 POST checkout", 6467, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
