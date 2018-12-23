const YTDL = require("ytdl-core");

class MusicHelper {

    static getVideoBasicInfo(videoUrl) {
        return new Promise((resolve, reject) => {
            YTDL.getBasicInfo(videoUrl, (err, info) => {
                if (err) {
                    reject(err);
                    return;
                }

                let videoInfo = {
                    title: info.title,
                    author: info.author,
                    length_seconds: info.length_seconds
                }

                resolve(videoInfo);
            });
        });
    }
}

module.exports = MusicHelper;
