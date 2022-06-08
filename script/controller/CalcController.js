class CalcController {
  constructor() {
    this._lastOperator = "";
    this._lastNumber = "";
    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;

    this.initialize();
    this.initButtonEvent();
  }

  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
    this.setLastNumberToDisplay();
  }

  // ===============================================
  //                Date and Time
  // ===============================================

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  // ===============================================
  //             Add events on Buttons
  // ===============================================

  initButtonEvent() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", () => {
        let textBtn = btn.className.baseVal.replace("btn-", "");
        this.execBtn(textBtn);
      });
      this.addEventListenerAll(btn, "mouseover mousedown mouseup", () => {
        btn.style.cursor = "pointer";
      });
    });
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  // ===============================================
  //        Check Button && Others Events
  // ===============================================

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        this.addOperation("+");
        break;
      case "subtracao":
        this.addOperation("-");
        break;
      case "divisao":
        this.addOperation("/");
        break;
      case "multiplicacao":
        this.addOperation("*");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "ponto":
        this.addOperation(".");
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;
      case "igual":
        this.calc();
        break;
      default:
        this.setError();
        break;
    }
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        console.log("outra coisa");
      } else {
        this.pushOperation(value);
        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));
        this.setLastNumberToDisplay();
      }
    }
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  getResult() {
    return eval(this._operation.join(" "));
  }

  calc() {
    if (
      this._operation.length > 0 ||
      this._lastNumber != "" ||
      this._lastNumber != ""
    ) {
      let last = "";
      this._lastOperator = this.getLastItem();

      if (this._operation.length < 3) {
        let firstItem = this._operation[0];
        this._operation = [firstItem, this._lastOperator, this._lastNumber];
      }

      if (this._operation.length > 3) {
        last = this._operation.pop();
        this._lastNumber = this.getResult();
      } else if (this._operation.length == 3) {
        this._lastNumber = this.getLastItem(false);
      }

      let result = this.getResult();
      if (last == "%") {
        result /= 100;
        this._operation = [result];
      } else {
        this._operation = [result];
        if (last) this._operation.push(last);
      }
      this.setLastNumberToDisplay();
    }
  }

  clearAll() {
    this._lastNumber = "";
    this._lastOperator = "";
    this._operation = [];
    this.setLastNumberToDisplay();
  }

  clearEntry() {
    if (this._operation.length <= 1) {
      this._operation = [];
      this.setLastNumberToDisplay();
    } else {
      this._operation.pop();
      this.setLastNumberToDisplay();
    }
  }

  setError() {
    this.displayCalc = "Error";
  }

  getLastItem(isOperator = true) {
    let lastItem;
    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (this.isOperator(this._operation[i]) == isOperator) {
        lastItem = this._operation[i];
        break;
      }
    }
    if (!lastItem) {
      lastItem = isOperator ? this._lastOperator : this._lastNumber;
    }
    return lastItem;
  }

  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false);
    if (this._operation.length == 0) lastNumber = 0;
    this.displayCalc = lastNumber;
  }

  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  // ===============================================
  //              Gets and Sets
  // ===============================================

  get displayDate() {
    return this._dateEl.innerHTML;
  }
  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }
  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this._currentDate = value;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }
}
