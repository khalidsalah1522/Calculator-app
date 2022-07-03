const body = document.body;
const switchs = document.querySelectorAll("header button");
const currentTheme = document.querySelector(".current-theme");
const btns = document.querySelectorAll(".keypad button");
const screen = document.querySelector(".screen p");
let value1, value2, result, operate;

switchs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    body.className = e.target.dataset.theme;
    currentTheme.style.left = `${+e.target.className[1] * 25}%`;
    currentTheme.style.transform = `translate(-${
      +e.target.className[1] * 25
    }%,-50%)`;
  });
});

const handleReset = () => {
  screen.innerText = "";
  value1 = "";
  value2 = "";
};

const handleDelete = () => {
  const value = screen.innerText;
  screen.innerText = value.slice(0, value.length - 1);

  if (!value1) {
    value1 = screen.innerText;
  } else {
    value2 = screen.innerText;
  }
};

const handleOperators = (target) => {
  operate = target;
  if (!value1) {
    value1 = screen.innerText ? screen.innerText : alert("No value inserted");
  }

  screen.innerText = "";
};

const showResult = () => {
  value2 = screen.innerText ? screen.innerText : alert("No value inserted");

  if (value2) {
    screen.innerText = "";
    switch (operate) {
      case "+":
        result = +value1 + +value2;
        break;
      case "/":
        result = +value1 / +value2;
        break;
      case "-":
        result = +value1 - +value2;
        break;
      case "*":
        result = +value1 * +value2;
        break;
    }
    value1 = result;
    value2 = "";
    return result;
  } else {
    return value1;
  }
};

const handleClick = (target) => {
  switch (target.dataset.number) {
    case "reset":
      handleReset();
      break;
    case "del":
      handleDelete();
      break;
    case "operate":
      handleOperators(target.dataset.operate);
      break;
    case "equal":
      screen.innerText = showResult(screen.innerText);
      break;

    default:
      screen.innerText += target.dataset.number;
      break;
  }
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    target = e.target;
    handleClick(target);
  });
});
