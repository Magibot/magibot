const fs = require('fs');
const path = require('path');

const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);


const getCommandsOptions = () => {
  const options = {};
  const directories = getDirectories(__dirname);
  directories.forEach((subDirName) => {
    const fullPath = path.join(__dirname, subDirName);
    const dirents = fs.readdirSync(fullPath, { withFileTypes: true });

    dirents.forEach((dir) => {
      const innerPath = path.join(fullPath, dir.name);
      if (dir.name === 'sub' && dir.isDirectory()) {
        console.log(`Directory ${dir.name}`);
        const subdirents = fs.readdirSync(innerPath, { withFileTypes: true });
        subdirents.forEach((subdir) => {
          console.log(subdir.name);
        });
      } else {
        console.log(`File ${dir.name}`);
        const [modulename, type] = dir.name.split('.');
        if (type === 'js') {
          const inner = require(innerPath);
          options[modulename] = inner.options('!magi');
        }
      }
    });
  });

  console.log(options);
};

module.exports = {
  commands: getCommandsOptions(),
};
