const billInput = document.getElementById("billInput");
const customPercent = document.getElementById("customPer");
const peopleInput = document.getElementById("peopleNumber");

const percentTabs = document.querySelectorAll(".tipWrapper span");
const resetButton = document.querySelector(".resultWrapper button");

const tipDisplay = document.querySelector(".tip");
const totalDisplay = document.querySelector(".total");

const values = {
  bill: "",
  percent: "",
  people: "",
};

const showError = (input, message) => {
  const errorElement =
    input.parentElement.previousElementSibling.querySelector("p:nth-child(2)");
  const parentElement = input.parentElement;

  errorElement.textContent = message;
  parentElement.classList.add("error");
};

const clearError = (input) => {
  const errorElement =
    input.parentElement.previousElementSibling.querySelector("p:nth-child(2)");
  const parentElement = input.parentElement;

  errorElement.textContent = "";
  parentElement.classList.remove("error");
};

const calculateTip = () => {
  if (
    values.bill
      .replace(".", "0")
      .split("")
      .every((char) => char === "0") ||
    values.bill === "0"
  ) {
    showError(billInput, `Can't be a zero`);
  } else if (values.bill.length == 0) {
    showError(billInput, `Can't be empty`);
  } else {
    clearError(billInput);
  }

  if (values.people === "0") {
    showError(peopleInput, `Can't be a zero`);
  } else if (values.people.length === 0) {
    showError(peopleInput, `Can't be a empty`);
  } else {
    clearError(peopleInput);
  }

  if (values.bill && values.percent && values.people) {
    const perPerson = values.bill / values.people;
    const tipPerPerson = (perPerson * values.percent) / 100;
    const totalPerPerson = perPerson + tipPerPerson;

    tipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

    resetButton.classList.remove("disabled");
  } else if (values.bill && !values.percent && values.people) {
    const perPerson = values.bill / values.people;

    totalDisplay.textContent = `$${perPerson.toFixed(2)}`;
    resetButton.classList.remove("disabled");
  }
};

percentTabs.forEach((per) => {
  per.addEventListener("click", () => {
    percentTabs.forEach((per) => per.classList.remove("selected"));

    const percent = per.textContent.split("%");
    values.percent = percent[0];
    calculateTip();

    per.classList.add("selected");
  });
});

billInput.addEventListener("input", (e) => {
  let bill = e.target.value.replace(/[^0-9]/g, "");

  if (bill.length > 2) {
    bill = bill.slice(0, -2) + "." + bill.slice(-2);
  }
  e.target.value = bill;

  if (e.target.value.length === 0) {
    values.bill = "";
  } else {
    values.bill = bill;
    calculateTip();
  }
});

customPercent.addEventListener("input", (e) => {
  let percent = e.target.value.replace(/[^0-9]/g, "");

  if (e.target.value.length === 0) {
    values.percent = "";
  } else {
    values.percent = percent;
  }

  calculateTip();
});

peopleInput.addEventListener("input", (e) => {
  let people = e.target.value.replace(/[^0-9]/g, "");

  if (e.target.value.length === 0) {
    values.people = "";
  } else {
    values.people = people;
  }

  calculateTip();
});

resetButton.addEventListener("click", () => {
  values.bill = "";
  values.percent = "";
  values.people = "";

  billInput.value = "";
  customPercent.value = "";
  peopleInput.value = "";
  percentTabs.forEach((tab) => tab.classList.remove("selected"));

  billInput.parentElement.parentElement.classList.remove("disabled");
  customPercent.parentElement.classList.remove("disabled");
  peopleInput.parentElement.parentElement.classList.remove("disabled");

  resetButton.classList.add("disabled");

  tipDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";
});
