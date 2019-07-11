const EventEmitter = require('events');

class DataHandler {
  constructor(timeIntervall) {
    this.timeIntervall = timeIntervall;
    this.datasToKeep = (24 * 60 * 60 * 1000) / timeIntervall;

    this.events = new EventEmitter();

    this.timer;

    this.prodDatas = this.generateFullProdDatas();
  }

  startTimer() {
    this.timer = setInterval(this.newData.bind(this), this.timeIntervall);
  }

  endTimer() {
    clearInterval(this.timer);
  }

  newData() {
    this.prodDatas.pop();

    let d = new Date();

    this.prodDatas.unshift({ date: d, value: this.getProdData(d) });

    console.log('newData');

    this.events.emit('newProdData', this.prodDatas[0]);
  }

  getProdData(date) {
    let h = date.getHours() + date.getMinutes() / 60;

    if (h < 5.5) return 0;
    else if (h > 21) return 0;
    else return 5 + Math.cos(0.4 * h + 1) * 5;
  }

  generateFullProdDatas() {
    let datas = [];

    let d = new Date();

    while (datas.length < this.datasToKeep) {
      d = new Date(Date.parse(d) - this.timeIntervall);

      datas.push({ date: d, value: this.getProdData(d) });
    }

    return datas;
  }
}

module.exports = DataHandler;
