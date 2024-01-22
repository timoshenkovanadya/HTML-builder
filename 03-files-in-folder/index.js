const fs = require('fs');
const path = require('path');

fs.readdir(
  '03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error('Error: ', err);
    } else {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(
            '03-files-in-folder/secret-folder',
            file.name,
          );
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error('Error: ', err);
            } else {
              const fileSize = stats.size;
              let fileExt = path.extname(file.name);
              fileExt = fileExt.slice(1);
              const fileNameWithoutExt = path.basename(
                file.name,
                path.extname(file.name),
              );
              console.log(
                `${fileNameWithoutExt}-${fileExt}-${fileSize}byte`,
              );
            }
          });
        }
      });
    }
  },
);
