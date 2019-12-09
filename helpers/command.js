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

const handleCommandWrapperArguments = (args) => {
  if (!args) {
    return {
      ok: false,
      reply: 'Wrong usage! This command is a Command Wrapper, means that it has subcommands',
    };
  }

  const arrayArgs = args.trim().split(/ +/g);
  if (arrayArgs.length === 0) {
    return {
      ok: false,
      reply: 'Wrong usage! This command is a Command Wrapper, means that it has subcommands',
    };
  }

  const subcommand = arrayArgs.shift();
  return {
    ok: true,
    subcommand,
    subargs: arrayArgs,
  };
};

module.exports = {
  checkChannelConnection,
  handleCommandWrapperArguments,
};
