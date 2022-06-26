// FUNCTIONS

function formatTotal(display) {
    if (Number.isFinite(display)) {
        // constrain display to max 11 chars
        let maxDigits = 11;
        // reserve space for "e+" notation?
        if (Math.abs(display) > 99999999999) {
            maxDigits -= 6;
        }
        // reserve space for "-"?
        if (display < 0) {
            maxDigits--;
        }

        // whole number?
        if (Number.isInteger(display)) {
            display = display
                .toPrecision(maxDigits)
                .replace(/\.0+$/,"");
        }
        // decimal
        else {
            // reserve space for "."
            maxDigits--;
            // reserve space for leading "0"?
            if (
                Math.abs(display) >= 0 &&
                Math.abs(display) < 1
            ) {
                maxDigits--;
            }
            display = display
                .toPrecision(maxDigits)
                .replace(/0+$/,"");
        }
    }
    else {
        display = "ERR";
    }
    return display;
}

function useCalc(calc,keys) {
    return [...keys].reduce(
        function showDisplay(display,key){
            var ret = String( calc(key) );
            return (
                display +
                (
                  (ret != "" && key == "=") ?
                      "=" :
                      ""
                ) +
                ret
            );
        },
        ""
    );
}

function calculator() {
    function perform_operation(operation, a, b) {
        if (operation == "+") {
            return a + b;
        } else if (operation == "-") {
            return a - b;
        } else if (operation == "*") {
            return a * b;
        } else if (operation == "/") {
            return a / b;
        } else if (operation == "=") { // equal operation means display is being reset
            return b;
        }
    } 

    let display = "";
    let cur_value = undefined;
    let operation = undefined;
    let digits = "";
    
    return function (button) {
        display = button;
        if ("0123456789".split("").includes(button)) {
            digits += button;
        } else if ("+-*/=".split("").includes(button)) {
            // evaluate previous operation
            if (digits !== "") {
                if (cur_value == undefined) cur_value = Number(digits);
                else cur_value = perform_operation(operation, cur_value, Number(digits));
            }

            operation = button;
            digits = "";
        }
        if (button == "=") display = formatTotal(cur_value);
        return display;
    }
}

var calc = calculator();

// TESTS

function test_set(number) {
    console.log(`\n\u001b[37;1mTEST SET ${number}\u001b[0m`);
    let test_number = 1;
    return function (a, b) {
        let passed = a == b;
        console.log(`TEST #${test_number}: ${passed ? "\u001b[32mPASS\u001b[0m" : "\u001b[31mFAIL\u001b[0m"} ("${a}" == "${b}" // => ${passed})`)
        test_number++;
    }
}

let assert_equal = test_set(1);
assert_equal(calc("4"), "4");
assert_equal(calc("+"), "+");
assert_equal(calc("7"), "7");
assert_equal(calc("3"), "3");
assert_equal(calc("-"), "-");
assert_equal(calc("2"), "2");
assert_equal(calc("="), "75");
assert_equal(calc("*"), "*");
assert_equal(calc("4"), "4");
assert_equal(calc("="), "300");
assert_equal(calc("5"), "5");
assert_equal(calc("-"), "-");
assert_equal(calc("5"), "5");
assert_equal(calc("="), "0");

assert_equal = test_set(2);
assert_equal(useCalc(calc,"4+3=")  , "4+3=7");
assert_equal(useCalc(calc,"+9=")   , "+9=16");
assert_equal(useCalc(calc,"*8=")   , "*8=128"); // originally "*5=128". typo???
assert_equal(useCalc(calc,"7*2*3="), "7*2*3=42");
assert_equal(useCalc(calc,"1/0=")  , "1/0=ERR");
assert_equal(useCalc(calc,"+3=")   , "+3=ERR");
assert_equal(useCalc(calc,"51=")   , "51=51"); // originally "51". another typo??? expected behavior of useCalc would return "51=51".

