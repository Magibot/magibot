exports.checkUserVoiceConnection = (msg) => {
  const botVoiceConnection = msg.guild.voiceConnection;
  if (!botVoiceConnection) {
    return { error: 'Magibot should be connected to a voice channel to execute this command.' };
  }

  const userVoiceChannel = msg.member.voiceChannel;
  const userConnectedToADifferentChannel = userVoiceChannel.id !== botVoiceConnection.channel.id;
  if (!userVoiceChannel || userConnectedToADifferentChannel) {
    return {
      error:
        'You should be connected to the same voice channel as Magibot to execute this command.',
    };
  }

  return { ok: true };
};
