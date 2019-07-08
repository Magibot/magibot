exports.fmtMSS = (s) => {
  const leftover = s % 60;
  return (s - leftover) / 60 + (s > 9 ? ':' : ':0') + s;
};
