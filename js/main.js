function UserAction() {
	var tabs = document.getElementById('tabs');
	tabs.style.display = 'none'; //or
  dict = {};
  console.clear();
	var symbol = document.getElementById("symbol").value;
	console.log("symbol is: " + symbol);
    fetch('http://datafied.api.edgar-online.com/v2/corefinancials/ann.json?primarysymbols=' + symbol + '&numperiods=5&appkey=9zedbs7hknjqt48hwh3yqstg')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {

	for (var value in myJson.result.rows){
		console.log(JSON.stringify(myJson.result.rows[value].rownum + ":"));
		getData(myJson.result.rows[value].values, value);
		
	}
	
	for (var item in dict) {
		  console.log(item + ' : ' + dict[item]);
		  // Output
		  // key:key value:value
		  // key:anotherKey value:anotherValue
		}
		
		buildCashFlowTable();

		document.getElementById('columnOneYear').innerHTML = dict['periodenddate'][0];
		document.getElementById('columnTwoYear').innerHTML = dict['periodenddate'][1];
		document.getElementById('columnThreeYear').innerHTML = dict['periodenddate'][2];
		document.getElementById('columnFourYear').innerHTML = dict['periodenddate'][3];
		//document.getElementById('columnFiveYear').innerHTML = dict['periodenddate'][4];
		tabs.style.display = 'inline'; //or
		//link.style.visibility = 'hidden';
  });

}

function getData(json, value){
	for (var v in json){
		//console.log(JSON.stringify(json));
		if(dict[json[v].field] === undefined){
			dict[json[v].field] = [];
			for(var i = 0; i < value; i++) {
				dict[json[v].field].push(0);
			}
		}
		
		dict[json[v].field].push(json[v].value);
		
		//console.log(myJson.result.rows[value].values[v].field + " : " + 
		//myJson.result.rows[value].values[v].value);
		
		//var key = myJson.result.rows[value].values[v].field;
		//var value = myJson.result.rows[value].values[v].value;
		//dict.key = value;
	}
	if(dict['netcashflow'] === undefined){
		dict['netcashflow'] = [];
	}
	var operating = parseInt(dict['cashfromoperatingactivities'][value], 10);
	var investing = parseInt(dict['cashfrominvestingactivities'][value], 10);
	var financing = parseInt(dict['cashfromfinancingactivities'][value], 10);
	dict['netcashflow'].push(operating+investing+financing);
}		

function addRow(rowDescription){
	var rowName = rowDescription.replace(/\s+/g, '').toLowerCase();
	try {
		var v = dict[rowName][0];
	}
	catch(err) {
		dict[rowName] = [0,0,0,0,0];
	}
	var row = "<li class='table-row'>";		
		row+="<div class='col col_1' data-label='Description'> " + rowDescription + "</div>";
		row+="<div class='col col_2' data-label=" + dict['periodenddate'][0] + "> " + numberWithCommas(dict[rowName][0]) + "</div>";
		row+="<div class='col col_2' data-label=" + dict['periodenddate'][1] + "> " + numberWithCommas(dict[rowName][1]) + "</div>";
		row+="<div class='col col_2' data-label=" + dict['periodenddate'][2] + "> " + numberWithCommas(dict[rowName][2]) + "</div>";
		row+="<div class='col col_2' data-label=" + dict['periodenddate'][3] + "> " + numberWithCommas(dict[rowName][3]) + "</div></li>";
		
		return row;
}

function buildCashFlowTable(){
	var myTable = "<ul class='responsive-table'>";
		myTable+="<li class='table-header'>";
		myTable+="<div class='col col_1' id='Description'>Description</div>";
		myTable+="<div class='col col_2' id='columnOneYear'></div>";
		myTable+="<div class='col col_2' id='columnTwoYear'></div>";
		myTable+="<div class='col col_2' id='columnThreeYear'></div>";
		myTable+="<div class='col col_2' id='columnFourYear'></div></li>";
		
		myTable+=addRow('Net Income');
		myTable+=addRow('Cash from Operating Activities');
		myTable+=addRow('Cash from Investing Activities');
		myTable+=addRow('Cash from Financing Activities');
		myTable+=addRow('Property Plant Equipment Net');		
		myTable+=addRow('Property Plant Equipment Net');		

		myTable += "</ul>";
	document.getElementById('cash_flow').innerHTML = myTable;
}

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
