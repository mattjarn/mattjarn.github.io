var base=base_list[''];
var hp;
var hpIV;

function calculate() {
	var chp, catk, cdef, cspatk, cspdef, cspd, lvl;
	base=base_list[document.getElementById('pkmn').value];
	hp = document.getElementById('HP').value;
	generateHPIVs();
}


function generateHPIVs(){
	var i = 0;
	var minIV = -1;
	var maxIV = -1;
	var lvl = document.getElementById('LVL').value;
	while(i < 32){
		var num = Math.floor(Math.floor((((i+(2*base['hp'])+100)*lvl)/100)+10));
		if (num == hp){
			minIV = i;
			while(num == hp && i < 32){
				maxIV = i;
				i++
				num = Math.floor(Math.floor((((i+(2*base['hp'])+100)*lvl)/100)+10));
			}
		}
		i++;
	}
	var result;
	if(minIV == maxIV){
		result = minIV;
	}
	else{
		result = minIV + '-' + maxIV;
	}
}
