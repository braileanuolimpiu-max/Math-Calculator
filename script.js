let display = document.getElementById("display");
let buttons = document.getElementsByTagName("button");

let expresie = "";
let ultimulOperator = false;

for (let i = 0; i < buttons.length; i++) {

	buttons[i].onclick = function(){

		let value = buttons[i].innerText;

		if(value == "C"){
			expresie = "";
			display.value = "";
			ultimulOperator = false;
			return;
		}

		if(value == "="){

			let parts = expresie.split(" ");

			if(parts.length != 3){
				display.value = "Eroare";
				expresie = "";
				return;
			}

			let num1 = Number(parts[0]);
			let op = parts[1];
			let num2 = Number(parts[2]);

			if(op == "/" && num2 == 0){
				display.value = "Eroare";
				expresie = "";
				return;
			}

			let rezultat;

			if(op == "+") rezultat = num1 + num2;
			if(op == "-") rezultat = num1 - num2;
			if(op == "*") rezultat = num1 * num2;
			if(op == "/") rezultat = num1 / num2;

			display.value = rezultat;
			expresie = rezultat;
			ultimulOperator = false;

			return;
		}

		if(value == "+" || value == "-" || value == "*" || value == "/"){

			if(ultimulOperator) return;

			expresie += " " + value + " ";
			display.value = expresie;

			ultimulOperator = true;

			return;
		}

		expresie += value;
		display.value = expresie;
		ultimulOperator = false;

	}

}
document.addEventListener("keydown", function(event){

	let key = event.key;

	if(key >= "0" && key <= "9"){
		expresie += key;
		display.value = expresie;
		ultimulOperator = false;
	}


	if(key == "+" || key == "-" || key == "*" || key == "/"){

		if(ultimulOperator) return;

		expresie += " " + key + " ";
		display.value = expresie;

		ultimulOperator = true;
	}


	if(key == "Enter"){

		let parts = expresie.split(" ");

		if(parts.length != 3){
			display.value = "Eroare";
			expresie = "";
			return;
		}

		let num1 = Number(parts[0]);
		let op = parts[1];
		let num2 = Number(parts[2]);

		let rezultat;

		if(op == "+") rezultat = num1 + num2;
		if(op == "-") rezultat = num1 - num2;
		if(op == "*") rezultat = num1 * num2;

		if(op == "/"){

			if(num2 == 0){
				display.value = "Eroare";
				expresie = "";
				return;
			}

			rezultat = num1 / num2;
		}

		display.value = rezultat;
		expresie = rezultat + "";
		ultimulOperator = false;

	}


	if(key == "Backspace"){

		let nou = "";
		let lungime = expresie.length;

		if(lungime == 0) return;

		if(expresie[lungime-1] == " "){
			for(let i=0;i<lungime-3;i++){
				nou += expresie[i];
			}
			ultimulOperator = false;
		}
		else{
			for(let i=0;i<lungime-1;i++){
				nou += expresie[i];
			}
		}

		expresie = nou;
		display.value = expresie;

	}


	if(key == "c" || key == "C" || key == "Delete"){
		expresie = "";
		display.value = "";
		ultimulOperator = false;
	}

});