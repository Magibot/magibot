const ytdl = require('ytdl-core');
const { google } = require('googleapis');

const create = (apiKey) => google.youtube({
  version: 'v3',
  auth: apiKey,
});

const getVideoInformation = async (url) => new Promise((resolve, reject) => {
  ytdl.getBasicInfo(url, (err, info) => {
    if (err) {
      reject(err);
      return;
    }

    const videoInfo = {
      title: info.title,
      author: info.author,
      lengthSeconds: parseInt(info.length_seconds, 10),
      url,
    };

    resolve(videoInfo);
  });
});

const searchVideo = async (apiKey, query) => {
  const youtube = create(apiKey);
  try {
    const response = await youtube.search.list({
      part: 'id,snippet',
      q: query,
    });

    const firstVideo = response.data.items[0];
    const { snippet, id } = firstVideo;

    return { url: `https://www.youtube.com/watch?v=${id}`, snippet };
  } catch (err) {
    if (err.errors || err.errors.length > 0) {
      return {
        errors: err.errors,
        errorMessage: err.errors.map(
          (element) => element.message.trim(),
        ).join(' '),
      };
    }
  }
};

module.exports = {
  create,
  searchVideo,
  getVideoInformation,
};
