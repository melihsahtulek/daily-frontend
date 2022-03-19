window.addEventListener("load", () => {
  const input = document.querySelector("input[name=calc_inp]");
  const buttons = document.querySelectorAll("button[data-btn-val]");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      let buttonVal = button.getAttribute("data-btn-val");
      if (isNaN(buttonVal)) {
        switch (buttonVal) {
          case "+":
            writeOperatorToInput("+");
            break;

          case "-":
            writeOperatorToInput("-");
            break;

          case "*":
            writeOperatorToInput("*");
            break;

          case "/":
            writeOperatorToInput("/");
            break;

          case "reset":
            reset();
            break;

          case "del":
            delValue();
            break;

          case ".":
            writeOperatorToInput(".");
            break;

          case "equal":
            calc();
            break;

          default:
            break;
        }
      } else {
        writeNumberToInput(buttonVal);
      }
    });
  }

  const writeNumberToInput = (n) => {
    input.value += n;
  };

  const writeOperatorToInput = (operator) => {
    let last = input.value[input.value.length - 1];
    if (last === "+" || last === "-" || last === "/" || last === "*" || last === ".") {
      let arr = input.value.split("");
      arr[input.value.length - 1] = operator;
      input.value = arr.join(",").replaceAll(",", "");
    } else {
      if (!isNaN(last)) {
        input.value += operator;
      }
    }
  };

  const reset = () => {
    input.value = null;
  };

  const delValue = () => {
    if (input.value.length > 0) {
      let arr = input.value.split("");
      arr.pop();
      input.value = arr.join(",").replaceAll(",", "");
    }
  };

  const calc = () => {
    if (input.value.length > 0) {
      input.value = eval(input.value);
    }
  };
});
