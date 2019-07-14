let pointFlag = true;
let operatorFlag = false;
let plusMinusFlag = true;
let operated = false;

let results = document.querySelector("#results");
let previous = document.querySelector("#previous")

// Basic operations
let add = (x, y) => {
    return +x + +y;
}

let subtract = (x, y) => {
    return +x - +y;
}

let multiply = (x, y) => {
    return +x * +y;
}

let divide = (x, y) => {
    return +x / +y;
}

let modulo = (x, y) => {
    return +x % +y;
}

let plusminus = (x) => {
    results.innerHTML = +x * (-1);
}

// Get results
let operate = (x) => {
    operated = true;
    plusMinusFlag = true;

    previous.value = results.innerHTML;
    let expression = x.split(" ");
    let i = 1;

    while (expression.length > 1) {
        if (i > expression.length-1) i = 1;
        let operator = expression[i];
        if (operator === "*") {
            let res = multiply(expression[i-1], expression[i+1]);
            expression.splice(i-1, 3, res);
        } else if (operator === "/") {
            let res = divide(expression[i-1], expression[i+1]);
            expression.splice(i-1, 3, res);
        } else if (operator === "%") {
            let res = modulo(expression[i-1], expression[i+1]);
            expression.splice(i-1, 3, res);
        } else {
            if (expression[i+2] === "*" || expression[i+2] === "/" || expression[i+2] === "%") {
                i += 2;
            } else {
                if (expression[i] === "+") {
                    let res = add(expression[i-1], expression[i+1]);
                    expression.splice(i-1, 3, res);
                } else if (expression[i] === "-") {
                    let res = subtract(expression[i-1], expression[i+1]);
                    expression.splice(i-1, 3, res);
                }
            }
        }
    }

    results.innerHTML = expression[0];

}

// UI inputs
let numbers = document.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
        if (b.classList.value === "numbers") {
            if (operated) {
                operated = false;
                results.innerHTML = "";
            }
            operatorFlag = true;
            results.innerHTML += b.innerHTML;
        } else if (b.classList.value === "point") {
            if (operated) {
                operated = false;
                results.innerHTML = "0" + b.innerHTML;
            }
            else if (pointFlag === true) {
                if (operatorFlag === false) {
                    results.innerHTML += "0" + b.innerHTML;
                } else {
                    results.innerHTML += b.innerHTML;
                }
                pointFlag = false;
                operatorFlag = false;
            }    
        } else if (b.classList.value === "operators") {
            if (operated) {
                operated = false;
            }

            if (b.id === "delete") {
                results.innerHTML = results.innerHTML.substring(0, results.innerHTML.length-1);
            } else {
                if (operatorFlag === true) {
                    if (b.innerHTML === "=") {
                        operate(results.innerHTML);
                    } else if (b.innerHTML === "+/-") {
                        if (plusMinusFlag === true) {
                            console.log("plusminus");
                            plusminus(results.innerHTML);
                        }
                    } else {
                        plusMinusFlag = false;
                        operatorFlag = false;
                        pointFlag = true;
                        results.innerHTML += " " + b.innerHTML + " ";
                    }
                }
            }
        }
        console.log(results.innerHTML);
    })
})

// Hold delete for full clear
var delay;
var longpress = 1300;

var listItem = document.querySelector('#delete');
listItem.addEventListener('mousedown', function(e) {
    function check() {
        results.innerHTML = "";
        previous.value = "";

        pointFlag = true;
        operatorFlag = false;
        plusMinusFlag = true;
        operated = false;
    }
    delay = setTimeout(check, longpress);
});

listItem.addEventListener('mouseup', function(e) {
    clearTimeout(delay);
});

listItem.addEventListener('mouseout', function(e) {
    clearTimeout(delay);
});


// Keyboard inputs
document.addEventListener("keydown", () => {
    results.scrollTop = results.scrollHeight;
    let b = event.key;
    if (/[0-9]+/.test(b)) {
        console.log("number " + b);
        if (operated) {
            operated = false;
            results.innerHTML = "";
        }
        operatorFlag = true;
        results.innerHTML += b;
    } else if (/\.+/.test(b)) {
        console.log("point " + b);
        if (operated) {
            operated = false;
            results.innerHTML = "0" + b;
        }
        else if (pointFlag === true) {
            if (operatorFlag === false) {
                results.innerHTML += "0" + b;
            } else {
                results.innerHTML += b;
            }
            pointFlag = false;
            operatorFlag = false;
        }
    } else if(/[\+\-\/\*\=\%\_]+/.test(b)) {
        console.log("operator " + b);
        if (operated) {
            operated = false;
        }

        if (operatorFlag === true) {
            if (b === "=") {
                operate(results.innerHTML);
            } else if (b === "_") {
                if (plusMinusFlag === true) {
                    console.log("plusminus");
                    plusminus(results.innerHTML);
                }
            } else {
                plusMinusFlag = false;
                operatorFlag = false;
                pointFlag = true;
                results.innerHTML += " " + b + " ";
            }
        }
    } else if (b === "Backspace") {
        console.log("BACKSPACE")
        results.innerHTML = results.innerHTML.substring(0, results.innerHTML.length-1);
    } else if (b === "Enter") {
        console.log("Enter");
        if (operatorFlag === true) {
            operate(results.innerHTML);
        }
    }
})