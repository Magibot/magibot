function handleSingleDigitsDates(ss) {
    return (ss < 10) ? "0" + ss : ss;
}

module.exports = {
    today: function () {
        var today = new Date();
        var dd = handleSingleDigitsDates(today.getDate());
        var mm = handleSingleDigitsDates(today.getMonth() + 1);
        var yyyy = today.getFullYear();

        return yyyy + mm + dd;
    },
    yearMonth: function () {
        var today = new Date();
        var mm = handleSingleDigitsDates(today.getMonth() + 1);
        var yyyy = today.getFullYear();

        return yyyy + mm;
    },
    year: function () {
        return (new Date()).getFullYear();
    },
    day: function () {
        return handleSingleDigitsDates((new Date()).getDate());
    },
    month: function () {
        return handleSingleDigitsDates((new Date()).getMonth() + 1);
    }
}
