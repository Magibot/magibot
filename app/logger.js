const chalk = require('chalk');

module.exports = {
  success: str => {
    console.log(chalk.bold.green(str));
  },
  error: str => {
    console.log(chalk.bold.red(str));
  },
  warning: str => {
    console.log(chalk.bold.yellow(str));
  },
  normal: str => {
    console.log(chalk.magenta(str));
  },
  serviceResponseError: function(response) {
    this.error(`Error type: ${response.type}. Status code: ${response.code}`);
    this.error(`Messages from API`);

    response.errors.forEach(err => {
      this.error(err.message);
    });
  }
};
