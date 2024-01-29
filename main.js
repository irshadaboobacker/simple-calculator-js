let localStorageValue = [];
let inputRef = document.querySelector("#screen");

function blockSpecialChar(e) {
  var k = e.keyCode;
  return (
    (k > 96 && k < 123) ||
    k == 8 ||
    k == 190 ||
    k == 42 ||
    k == 43 ||
    (k >= 45 && k <= 57) ||
    k == 46 ||
    (k >= 106 && k <= 111)
  );
}


function Solve(val) {
  document.getElementById("historyval").innerHTML = ""

  var screenValue = document.getElementById("screen");
  var currentValue = screenValue.value;
  // console.log(currentValue.length);

  var lastChar = currentValue[currentValue.length - 1];
  var secondLastChar = currentValue[currentValue.length - 2];
  var operators = ["+", "-", "*", "/"];
  if (operators.includes(lastChar) && operators.includes(val)) {
    screenValue.value = currentValue.slice(0, -1) + val;
  } else {
    screenValue.value += val;
  }
  if (val === '.') {

    const lastNumber = inputRef.value.split(/[-+*\/]/).slice(-1)[0];
    let a = 0;
    // console.log(a);
    // console.log(lastNumber);
    for (let i = lastNumber.length - 2; i >= 0; i--) {
      // console.log(lastNumber[i]);
      if (lastNumber[i].includes(".")) {

        screenValue.value = currentValue;
        // console.log("dot already found");

      }
    }
  }
  if (currentValue.length == 1 && lastChar == "0" && val == "0") {
    screenValue.value = currentValue;
  }
}

function Result() {
  let num1 = document.getElementById("screen").value;
  let answer = eval(num1);
  let num2 = Math.round(answer * 100) / 100;
  localStorageValue.push(num2);
  const results = localStorageValue;
  localStorage.setItem("links", JSON.stringify(results));
  document.getElementById("screen").value = num2;
}

function Clear() {
  let inp = document.getElementById("screen");
  inp.value = "";
}

function Backspace() {
  let ev = document.getElementById("screen");
  ev.value = ev.value.slice(0, -1);
}

function Savedata() {
  let num1 = document.getElementById("screen").value;
  let answer = eval(num1);
  let num2 = Math.round(answer * 100) / 100;
  localStorageValue.push(num2);
  const results = localStorageValue;
  localStorage.setItem("links", JSON.stringify(results));
}

function HistoryCall() {

  const savedHistory = JSON.parse(localStorage.getItem("links"));
  if (savedHistory != null) {
    let test = savedHistory.reverse().slice(0, 5);;
    document.getElementById("historyval").innerHTML = "History Results: <br>" + test;
  } else return;
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/^[0-9+\-*/.=]$/.test(key)) {
    event.preventDefault();
    if (key === '=' || key === 'Enter') {
      Result();
    } else if (key === 'c' || key === 'C') {
      Clear();
    } else {
      Solve(key);
    }
  }
});


