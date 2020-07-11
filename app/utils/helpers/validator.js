const isUrl = (string) => {
  const pattern = /(http[s]?:\/\/)?([^/\s]+\/)(.*)/;
  const urlRegex = new RegExp(pattern);
  if (string.trim().match(urlRegex)) {
    return true;
  }

  return false;
};

module.exports = {
  isUrl,
};
