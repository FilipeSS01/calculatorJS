class CalcController {
  constructor() {
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
  }

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

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        break;
      case "subtacao":
        break;
      case "divisao":
        break;
      case "multiplicacao":
        break;
      case "porcento":
        break;
      case "igual":
        break;
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
      case "ponto":
        break;
      default:
        this.setError();
        break;
    }
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this._operation.pop();
  }

  setError() {
    this.displayCalc = "Error";
  }

  addOperation(value) {
    this._operation.push(value);
    console.log(this._operation);
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

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
