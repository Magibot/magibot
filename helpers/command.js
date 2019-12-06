const checkChannelConnection = (message) => {
  const { voiceChannel } = message.member;

  if (!voiceChannel) {
    return { ok: false, reply: 'To execute this command you should connect to a voice channel' };
  }

  const { voiceConnection } = message.guild;

  if (voiceConnection
    && voiceChannel.id !== voiceConnection.channel.id) {
    return { ok: false, reply: 'To execute this command you should be connected to the same voice channel as the bot' };
  }

  return { ok: true };
};

module.exports = {
  checkChannelConnection,
};
