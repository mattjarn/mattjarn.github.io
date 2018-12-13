var name = "";

//function testingAPI(){ 
  //  var key = "f19e2ef49amshea8b9870ee4cdc7p170289jsn654b61e10a70"; 
    //var url = "https://stock-quote-api.p.rapidapi.com/stock?id=MA%3AUS";
 //   console.log(httpGet(url,key)); 
//}


//function httpGet(url,key){
  //  var xmlHttp = new XMLHttpRequest();
  //  xmlHttp.open( "GET", url, false );
  //  xmlHttp.setRequestHeader("X-RapidAPI-Key",key);
  //  xmlHttp.send(null);
  //  return xmlHttp.responseText;
//}

function accessAPI(){
	//testingAPI();
	var symbol = document.getElementById("symbol").value;
	var beta;
	var industry;
	var currentPrice;
	var pegRatio;
	var forwardPE;
	var yearReturn;
	document.getElementById("symbol").value = '';
	fetch("https://cors-anywhere.herokuapp.com/https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + symbol + "?formatted=true&lang=en-US&region=US&modules=summaryProfile%2CfinancialData%2CrecommendationTrend%2CdefaultKeyStatistics&corsDomain=finance.yahoo.com")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			//var sector = myJson.sector;
			var data = myJson.quoteSummary.result[0];
			console.log(data);
			//name = myJson.companyName;
			currentPrice = data.financialData.currentPrice.fmt;
			beta = data.defaultKeyStatistics.beta.fmt;
			forwardPE = data.defaultKeyStatistics.forwardPE.fmt;
			pegRatio = data.defaultKeyStatistics.pegRatio.fmt;
			//yearReturn = data.defaultKeyStatistics["52WeekChange"].fmt;
			//addTableRow(name, symbol, beta);
		}).then(function(){
			fetch("https://api.iextrading.com/1.0/stock/" + symbol + "/company")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			industry = myJson.industry;
			console.log(myJson);
			name = myJson.companyName;
			//addTableRow(name, industry, symbol, currentPrice, forwardPE, pegRatio, yearReturn, beta);
		}).then(function(){
			fetch("https://api.iextrading.com/1.0/stock/" + symbol + "/stats")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			//industry = myJson.industry;
			console.log(myJson);
			yearReturn = parseFloat(myJson.year5ChangePercent);
			yearReturn = (yearReturn * 100).toFixed(2) + "%";
			//name = myJson.companyName;
			addTableRow(name, industry, symbol, currentPrice, forwardPE, pegRatio, yearReturn, beta);
		})
		})
	})
			
		
	//console.log(document.getElementById('statistics').innerHTML);
	//addTableRow(name);
}

function addTableRow(name, industry, symbol, currentPrice, forwardPE, pegRatio, yearReturn, beta){
	// Find a <table> element with id="statistics":
	var table = document.getElementById("statistics");
	// innerHTML for the delete button to get rid of a row
	var deleteCell = "<button class = 'x' onclick='deleteTableRow()'> X </button>"
	// creates a new row at the end of the table
	var color = "color:black";
	var row = table.insertRow(-1);
	if(yearReturn.charAt(0) == "-"){
		color = "color:red";
	}

	row.insertCell(0).innerHTML = deleteCell;
	row.insertCell(1).innerHTML = name;
	row.insertCell(2).innerHTML = industry;
	row.insertCell(3).innerHTML = symbol.toUpperCase();
	row.insertCell(4).innerHTML = currentPrice;
	row.insertCell(5).innerHTML = forwardPE;
	row.insertCell(6).innerHTML = pegRatio;
	row.insertCell(7).innerHTML = "<span style=" + color + ">" + yearReturn + "</span>";
	row.insertCell(8).innerHTML = beta;
	
	//cell3.setAttribute('onclick', "deleteTableRow()");
	//cell3.value = "X";

}

function deleteTableRow(){
	var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
}

//accessAPI("AAPL");
