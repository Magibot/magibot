const formatSeconds = (s) => {
  let seconds = s;
  seconds = (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds;
  return seconds;
};

module.exports = {
  formatSeconds,
};
