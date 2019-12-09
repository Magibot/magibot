const handle = async (client, message, args) => {
  if (!args || args.length === 0) {
    return message.reply('You should inform the name of the playlist you want to play.');
  }

  const [playlistName, allowModify] = args;
  if (allowModify && allowModify !== 'true' && allowModify !== 'false') {
    return message.reply('Send argument of this command should be \'true\' or \'false\' ');
  }

  // Call playlist service to create POST
  // Store the id / name of playlist in local storage
  const playlist = {
    name: playlistName,
    creator: message.author.id,
    allowModify: allowModify === 'true',
  };

  const response = client.services.magi.playlist.create(message.guild.id, playlist);
  if (response.status === 'error') {
    return message.reply('Something went wrong while creating your playlist. Please talk to the administrator');
  }

  client.database.playlists.set(playlistName, response.payload.playlist._id);
  return message.reply('Playlist successfully created');
};

module.exports = { handle };
