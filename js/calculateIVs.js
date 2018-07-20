var base=base_list[''];
var hp;
var hpIV, atkIV, defIV, spatkIV, spdefIV, spdIV;
var frameList;
var frame;
var stats;	
	
function calculate() {
	var ivs = {};
	ivs['hp'],ivs['atk'],ivs['def'],ivs['spatk'],ivs['spdef'],ivs['spd'] = '';
	
	base=base_list[document.getElementById('pkmn').value];
	stats = ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'];
	
	for (var i = 0; i < stats.length; i++) {
		ivs[stats[i]] = getIVs(stats[i]);
		
		if(ivs[stats[i]] === '200-200'){
			document.getElementById(stats[i]).value = "Invalid Value";
		}
	}
	
	alert(document.getElementById('method').value);
	if(document.getElementById('method').value == 1){
		frameList=frame_list_method1;
	}
	else if(document.getElementById('method').value == 2){
		frameList=frame_list_method2;
	}
	
	var myTable = "<table><tbody>";
	for(var i = 1; i < frameList.length-1; i++) {
		frame = frameList[i];

		if(frameDoesNotMatch(frame, ivs)) continue;
		myTable+=createEntryFrom(frame);

	}
	myTable += "</tbody></table>";
	document.getElementsByClassName('table100-body js-pscroll')[0].innerHTML = myTable; 
	

	
	// generateBreedingTable(ivs);
}

function generateMethod1Table(ivs){
	
}

function frameDoesNotMatch(frame, ivs){
	if(frame['nature'].toUpperCase() !== document.getElementById('nature').value.toUpperCase()) return true;
	if((frame['hp'] < parseInt(ivs[stats[0]].split('-')[0])) || (frame['hp'] > parseInt(ivs[stats[0]].split('-')[1]))) return true;
	if(frame['atk'] < parseInt(ivs[stats[1]].split('-')[0]) || frame['atk'] > parseInt(ivs[stats[1]].split('-')[1])) return true;
	if(frame['def'] < parseInt(ivs[stats[2]].split('-')[0]) || frame['def'] > parseInt(ivs[stats[2]].split('-')[1])) return true;
	if(frame['spdef'] < parseInt(ivs[stats[3]].split('-')[0]) || frame['spdef'] > parseInt(ivs[stats[3]].split('-')[1])) return true;
	if(frame['spatk'] < parseInt(ivs[stats[4]].split('-')[0]) || frame['spatk'] > parseInt(ivs[stats[4]].split('-')[1])) return true;
	if(frame['spd'] < parseInt(ivs[stats[5]].split('-')[0]) || frame['spd'] > parseInt(ivs[stats[5]].split('-')[1])) return true;
}

function createEntryFrom(frame){
	var myTable = "";
	myTable+="<tr class='row100 body'>";
	myTable+="<td class='columnFrame'>"+frame['num']+"</td>";
	myTable+="<td class='column5'>"+frame['ability']+"</td>";
	myTable+="<td class='column2'>"+frame['nature']+"</td>";
	myTable+="<td class='column5'>"+frame['ability']+"</td>";
	myTable+="<td class='column3'>"+frame['hp']+"</td>";
	myTable+="<td class='column4'>"+frame['atk']+"</td>";
	myTable+="<td class='column5'>"+frame['def']+"</td>";
	myTable+="<td class='column5'>"+frame['spatk']+"</td>";
	myTable+="<td class='column5'>"+frame['spdef']+"</td>";
	myTable+="<td class='column5'>"+frame['spd']+"</td></tr>";
	return myTable;
}
	
function calc_stat(stat,iv) {
	var lvl;
	lvl=document.getElementById('lvl').value;
	if(isNaN(lvl))
		lvl=0;
	if(stat==='hp') {
		if(base[stat]=='1*')
			return 1;
		else
			return Math.floor(Math.floor((((iv+(2*base[stat])+100)*lvl)/100)+10));
	}
	else {
		return Math.floor(Math.floor((((iv+(2*base[stat]))*lvl)/100)+5)*nature(stat));
	}
}

function getIVs(stat){
	var i, minIV=-1, maxIV=-1;
	i=0;
	while(i<=31) {
		if(calc_stat(stat,i)==document.getElementById(stat).value) {
			minIV=i;
			i=32;
		}
		++i;
	}
	i=31;
	while(i>=0) {
		if(calc_stat(stat,i)==document.getElementById(stat).value) {
			maxIV=i;
			i=-1;
		}
		--i;
	}
	if(minIV==-1 || maxIV==-1)
		return 200+'-'+200;
	else if(minIV==maxIV)
		return minIV+'';
	else
		return minIV+'-'+maxIV;
}

function nature(stat) {
	var i=document.getElementById('nature').value;
	if(stat==='atk') {
		if(i=='Adamant' || i=='Brave' || i=='Lonely' || i=='Naughty')
			return 1.1;
		else if(i=='Bold' || i=='Timid' || i=='Modest' || i=='Calm') 
			return 0.9;
		else
			return 1.0;
	}
	if(stat==='def') {
		if(i=='Bold' || i=='Relaxed' || i=='Impish' || i=='Lax')
			return 1.1;
		else if(i=='Lonely' || i=='Hasty' || i=='Mild' || i=='Gentle') 
			return 0.9;
		else
			return 1.0;
	}
	if(stat==='spatk') {
		if(i=='Modest' || i=='Mild' || i=='Quiet' || i=='Rash')
			return 1.1;
		else if(i=='Adamant' || i=='Impish' || i=='Jolly' || i=='Careful') 
			return 0.9;
		else
			return 1.0;
	}
	if(stat==='spdef') {
		if(i=='Calm' || i=='Gentle' || i=='Sassy' || i=='Careful')
			return 1.1;
		else if(i=='Naughty' || i=='Lax' || i=='Naive' || i=='Rash') 
			return 0.9;
		else
			return 1.0;
	}
	if(stat==='spd') {
		if(i=='Timid' || i=='Hasty' || i=='Jolly' || i=='Naive')
			return 1.1;
		else if(i=='Brave' || i=='Relaxed' || i=='Quiet' || i=='Sassy') 
			return 0.9;
		else
			return 1.0;
	}
}
