var stocks = [];
var sectors = {
	"Technology": 0,
	"Healthcare": 0,
	"Financial Services": 0,
	"Consumer Cyclical": 0,
	"Communication Services": 0,
	"Industrials": 0,
	"Consumer Defensive": 0,
	"Energy": 0,
	"Utilities": 0,
	"Real Estate": 0,
	"Materials": 0
};

var stocksInSector = {
	"Technology": [],
	"Healthcare": [],
	"Financial Services": [],
	"Consumer Cyclical": [],
	"Communication Services": [],
	"Industrials": [],
	"Consumer Defensive": [],
	"Energy": [],
	"Utilities": [],
	"Real Estate": [],
	"Materials": []
};

var fundTotal=0;

// ID of the Google Spreadsheet
var spreadsheetID = "1ViKgT4ugMIe0wVoJoINF3tMnaD3CQ7V4z7q_ZU3JFHM";

// Make sure it is public or set to Anyone with link can view 
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
	
function httpGet(theUrl)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function getSheetData(){
	var url = "https://spreadsheets.google.com/feeds/list/0AleoH729Doa5dHhlM3JDRDdRb1h1dFlOUTBGeUZFS2c/od6/public/values?alt=json";
	var v = httpGet(url);
	var obj = JSON.parse(v);
	for (var a in obj.feed.entry){
		var b = obj.feed.entry[a];
		if(b.gsx$symb.$t == 'SIF Fund Total:') continue;
		stocks[b.gsx$symb.$t] = b.gsx$value.$t;
	}
}
	
getSheetData();
	
for(var key in stocks){
	//console.log(key + ' : ' + stocks[key]);
	getSector(key);
}

function getSector (symbol) {
	if(symbol == "Cash"){
		var num = parseInt((stocks[symbol].replace(/,/g, '')).replace(/\$/g, ''));
		fundTotal+=num;
	}
	else{
		fetch("https://api.iextrading.com/1.0/stock/" + symbol + "/company")
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			//console.log(symbol + " : " + myJson.sector);
			var sector = myJson.sector;
			if(sector != ''){
				var num = parseInt((stocks[symbol].replace(/,/g, '')).replace(/\$/g, ''));
				fundTotal+=num;
				sectors[sector]+=num;
				stocksInSector[sector].push(symbol);
				//console.log(sectors);
				//console.log(stocksInSector);
			}
			else{
				let sectorNames = /(Consumer Defensive|Consumer Discretionary|Consumer Cyclical|Energy|Utilities?|Financial Services|Financials?|Real Estate|Communications? Services|Healthcare|Health Care|Materials?|Industrials?|Technology)/gi;
				var result = myJson.companyName.match(sectorNames);
				if(result && result.length > 0){
					var num = parseInt((stocks[symbol].replace(/,/g, '')).replace(/\$/g, ''));
					fundTotal+=num;
					var name = result[0];
					if(name == "Health Care")
						name = "Healthcare";
					if(name == "Financial" || name == "Financials")
						name = "Financial Services";
					//console.log(name);
					sectors[name]+=num;
					stocksInSector[name].push(symbol);
				}
			}
		})
	}
}
	
	

var total = 158,
    buttons = document.querySelector('.buttons'),
    pie = document.querySelector('.pie'),
    activeClass = 'active';

// work out percentage as a result of total
var numberFixer = function(num){
	var result = ((num * total) / fundTotal);
	return result;
}

// create a button for each sector
for(sector in sectors){
	var newEl = document.createElement('button');
	newEl.innerText = sector;
	newEl.setAttribute('data-name', sector);
	buttons.appendChild(newEl);
}

// when you click a button setPieChart and setActiveClass
buttons.addEventListener('click', function(e){
	if(!(e.target.class == "active")){
		var el = e.target,
			name = el.getAttribute('data-name');
		setPieChart(name);
		setActiveClass(el);
		setStockList(name);
		var sector = e.target.innerText;
		var percent = sector + " (" + ((sectors[sector]/fundTotal)*100).toFixed(2) + "%)";
		e.target.innerText = percent;
	}
	e.stopPropagation();
});

function oldString(str){
	for(let i = 0; i < str.length; i++){
		if(str.charAt(i) == '(')
			return str.substr(0, i-1);
	}
	return str;
}

var setPieChart = function(name){
	var number = sectors[name],
		fixedNumber = numberFixer(number),
		result = fixedNumber + ' ' + total;
	pie.style.strokeDasharray = result;
}

var setActiveClass = function(el) {
	for(var i = 0; i < buttons.children.length; i++) {
		buttons.children[i].classList.remove(activeClass);
		buttons.children[i].innerText = oldString(buttons.children[i].innerText);
		el.classList.add(activeClass);
	}
}

var setStockList = function(name) {
	var stockList = "<table>";
		stockList+="<tr><th>Symbol</th><th>Weight</th></tr>";
		
		for(var symbol in stocksInSector[name]){
			//console.log(stocksInSector[name][symbol]);
			stockList+=createRow(stocksInSector[name][symbol], name);
		}		

	stockList += "</table>";
	document.getElementById('stocks').innerHTML = stockList;
}

function createRow(stockSymbol, sectorName){
	var value = parseInt((stocks[stockSymbol].replace(/,/g, '')).replace(/\$/g, ''));
	var weight = ((value/fundTotal)*100).toFixed(2);
	
	var row = "<tr>";		
		row+="<td> " + stockSymbol + "</td>";
		row+="<td> " + weight + "%" + "</td></tr>";
		return row;
}

// Set up default settings
//setPieChart('Technology');
//setActiveClass(buttons.children[0]);