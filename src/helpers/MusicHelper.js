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

    static playVideo(voiceConnection, msg) {
        let currentServer = global.servers[msg.guild.id];
        if (currentServer.dispatcher && voiceConnection.speaking) {
            return;
        }
    
        let streamOptions = {
            volume: 0.5
        };

        let stream = YTDL(currentServer.queue[0].url, { filter: "audioonly" });
        currentServer.dispatcher = voiceConnection.playStream(stream, streamOptions);
        currentServer.dispatcher.on("end", () => {
            currentServer.shiftQueue();
            if (!currentServer.queue[0]) {
                setTimeout(() => {
                    voiceConnection.disconnect();
                    currentServer.dispatcher.destroy();
                }, 900000);
                return;
            }

            MusicHelper.playVideo(voiceConnection, msg);
        });
    }
}

module.exports = MusicHelper;
