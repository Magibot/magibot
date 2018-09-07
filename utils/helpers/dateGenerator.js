class DateHelper {

    static _handleSingleDigitsDates(ss) {
        return (ss < 10) ? "0" + ss : ss;
    }

    static today() {
        var today = new Date();
        var dd = this._handleSingleDigitsDates(today.getDate());
        var mm = this._handleSingleDigitsDates(today.getMonth() + 1);
        var yyyy = today.getFullYear();

        return yyyy + mm + dd;
    }

    static yearMonth() {
        var today = new Date();
        var mm = this._handleSingleDigitsDates(today.getMonth() + 1);
        var yyyy = today.getFullYear();

        return yyyy + mm;
    }

    static year() {
        return (new Date()).getFullYear();
    }

    static day() {
        return this._handleSingleDigitsDates((new Date()).getDate());
    }

    static month() {
        return this._handleSingleDigitsDates((new Date()).getMonth() + 1);
    }

    static fmtMSS(s) {
        return (s - ( s %= 60 )) / 60 + ( 9 < s ? ':' : ':0') + s;
    }
}


module.exports = DateHelper;
