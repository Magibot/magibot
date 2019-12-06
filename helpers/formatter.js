const getVideoStringInlineInfo = (index, video) => `\`${index}.\` ${video.info.title} | ${video.info.author.name} ${video.duration} | Added by: ${video.addedBy.username}`;

module.exports = {
  getVideoStringInlineInfo,
};
