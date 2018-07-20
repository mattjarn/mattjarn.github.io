(function ($) {
	var myTable = "<table><tbody>";
    myTable+="<tr class='row100 body'>";
	myTable+="<td class='columnFrame'>Like a butterfly</td>";
	myTable+="<td class='column2'>Boxing</td>";
	myTable+="<td class='column3'>9:00 AM - 11:00 AM</td>";
	myTable+="<td class='column4'>Aaron Chapman</td>";
	myTable+="<td class='column5'>10</td></tr>";
	
	myTable+="<tr class='row100 body'>";
	myTable+="<td class='columnFrame'>Like a butterfly</td>";
	myTable+="<td class='column2'>Boxing</td>";
	myTable+="<td class='column3'>9:00 AM - 11:00 AM</td>";
	myTable+="<td class='column4'>Aaron Chapman</td>";
	myTable+="<td class='column5'>10</td></tr>";
	
//	https://github.com/mattjarn/PokemonEmerladRNG/blob/master/method1.csv
	
	  // for (var i=0; i<8; i++) {
		// myTable+="<tr><td style='width: 100px;'>Number " + i + " is:</td>";
		// myArray[i] = myArray[i].toFixed(3);
		// myTable+="<td style='width: 100px; text-align: right;'>" + myArray[i] + "</td>";
		// myTable+="<td style='width: 100px; text-align: right;'>" + myArray[i] + "</td></tr>";
	  // }  
	   // myTable+="</table>";
	
	myTable += "</tbody></table>";
	document.getElementsByClassName('table100-body js-pscroll')[0].innerHTML = myTable;    

})(jQuery);
