const onCreate = async (guild) => {
  const { client } = guild;
  const requestBody = {
    name: guild.name,
    discordId: guild.id,
    region: guild.region,
    discordOwnerId: guild.ownerID,
    iconHash: guild.icon,
  };

  const response = await client.services.magi.guild.create(requestBody);
  if (response.status === 'error') {
    // Create a system of notification through telegram bot, maybe
    client.logger.error('Received error from API on creating guild');
    client.logger.serviceResponseError(response);
    return response.errors;
  }

  client.logger.success(`Guild ${guild.name}(${guild.id}) successfully registered`);
  return response.payload;
};

const onDelete = async (guild) => {
  const { client } = guild;
  const response = await client.services.magi.guild.destroy(guild.id, {
    typeId: 'discordId',
  });
  if (response.status === 'error') {
    // Create a system of notification through telegram bot, maybe
    client.logger.error('Received error from API on deleting guild');
    client.logger.serviceResponseError(response);
    return response.errors;
  }

  client.logger.success(`Guild ${guild.name}(${guild.id}) successfully deleted`);
  return true;
};

module.exports = {
  onCreate,
  onDelete,
};
