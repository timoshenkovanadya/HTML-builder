const fs = require('fs');
const path = require('path');

const folderOrigin = '04-copy-directory/files';
const folderCopy = '04-copy-directory/files-copy';


fs.mkdir(folderCopy, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  fs.readdir(folderOrigin, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach(file => {
        const originFilePath = path.join(folderOrigin, file);
        const copyFilePath = path.join(folderCopy, file);

        fs.stat(originFilePath, (err, stats) => {
          if (err) {
            console.error(err);
          } else if (stats.isFile()) {
            fs.copyFile(originFilePath, copyFilePath, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        });
      });
      fs.readdir(folderCopy, (err, filesCopy) => {
        if (err) {
          console.error(err);
        } else {
          filesCopy.forEach(fileCopy => {
            if (!files.includes(fileCopy)) {
              fs.unlink(path.join(folderCopy, fileCopy), (err) => {
                if (err) {
                  console.error(err);
                }
              });
            }
          });
        }
      });
    }
  });
});