export default class DateIST extends Date {
    constructor(params) {
        super(params)
        // console.log(this)
        // console.log(this.toString())
        // console.log(this.toLocaleString())
        // console.log(this.toISOString())
    }

    toISOString() {
        var date = new Date(this)
        date.setHours(date.getHours() + 5)
        date.setMinutes(date.getMinutes() + 30)
        return date.toISOString();
    }
}

// var dateIST = new DateIST("2023-09-26T04:00:26.343Z");
// // console.log(dateIST.toISOString())
let ist =  new Date("2023-09-26T04:00:26.343Z").toLocaleString();
console.log(ist);
