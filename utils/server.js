const http = require("http");

module.exports = {
    start: function (port) {
        http.createServer((request, response) => {
            response.write("Bot online!");
            response.end();
        }).listen(port);
    }
}
