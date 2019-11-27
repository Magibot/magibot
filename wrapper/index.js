const fs = require('fs');
const path = require('path');

const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);


const getCommandsOptions = () => {
  const directories = getDirectories(__dirname);
  directories.forEach((subDirName) => {
    const fullPath = path.join(__dirname, subDirName);
    const dirents = fs.readdirSync(fullPath, { withFileTypes: true });

    console.log(dirents.map((dir) => dir.name));
  });
};

getCommandsOptions();

module.exports = {
  commands: {},
};
