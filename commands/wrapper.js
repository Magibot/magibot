// Simple
const Ping = require('./simple/ping');

// Voice
const Leave = require('./voice/leave');
const Join = require('./voice/join');

// Radio
const Play = require('./radio/play');
const Clear = require('./radio/clear');
const Pause = require('./radio/pause');
const Stop = require('./radio/stop');
const Queue = require('./radio/queue');
const Remove = require('./radio/remove');
const Resume = require('./radio/resume');

// Utils
const Purge = require('./utils/purge');

// Star Wars API Wrapper
const StarWarsAPIWrapper = require('./swapi');

// TODO: Make it dynamic

const wrapper = {
  commands: {
    ping: Ping.options(),
    purge: Purge.options(),
    play: Play.options(),
    leave: Leave.options(),
    join: Join.options(),
    pause: Pause.options(),
    clear: Clear.options(),
    stop: Stop.options(),
    queue: Queue.options(),
    remove: Remove.options(),
    resume: Resume.options(),
    swapi: StarWarsAPIWrapper.options(),
  },
};

module.exports = wrapper;
