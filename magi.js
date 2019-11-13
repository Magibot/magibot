/**
 * General config file for the Magi bot
 */

// Simple
const Ping = require('./commands/simple/ping');
const Help = require('./commands/simple/help');

// Utils
const Purge = require('./commands/utils/purge');


module.exports = {
  client: {
    disabledEvents: [
      'GUILD_SYNC',
      'GUILD_UPDATE',
      'GUILD_MEMBER_UPDATE',
      'GUILD_MEMBERS_CHUNK',
      'GUILD_INTEGRATIONS_UPDATE',
      'GUILD_ROLE_CREATE',
      'GUILD_ROLE_DELETE',
      'GUILD_ROLE_UPDATE',
      'GUILD_BAN_ADD',
      'GUILD_BAN_REMOVE',
      'CHANNEL_CREATE',
      'CHANNEL_DELETE',
      'CHANNEL_UPDATE',
      'CHANNEL_PINS_UPDATE',
      'USER_UPDATE',
      'USER_NOTE_UPDATE',
      'USER_SETTINGS_UPDATE',
      'PRESENCE_UPDATE',
      'VOICE_STATE_UPDATE',
      'TYPING_START',
      'VOICE_SERVER_UPDATE',
      'RELATIONSHIP_ADD',
      'RELATIONSHIP_REMOVE',
      'WEBHOOKS_UPDATE',
    ],
  },
  commands: {
    purge: Purge.options(),
    ping: Ping.options(),
    help: Help.options(),
  },
};
