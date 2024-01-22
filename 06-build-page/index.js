const fs = require('fs');
const path = require('path');

const components = '06-build-page/components';

const styles = '06-build-page/styles';
const assetsOrigin = '06-build-page/assets';
const templatePath = '06-build-page/template.html';

const projectDist = '06-build-page/project-dist';
const indexHtml = '06-build-page/project-dist/index.html';
const styleCss = '06-build-page/project-dist/style.css';
const assetsCopy = '06-build-page/project-dist/assets';

//Replaces tags
fs.readFile(templatePath, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let template = data.toString();
  let count = 0;
  const tagsArr = Array.from(template.match(/{{.+}}/g)).map((item) =>
    item.replace('{{', '').replace('}}', ''),
  );
  tagsArr.forEach((tag) => {
    fs.readFile(`${components}/${tag}.html`, (err, data) => {
      count++;
      template = template.replace(`{{${tag}}}`, data.toString());
      if (count === tagsArr.length) {
        console.log(template);
        fs.writeFile(path.join(projectDist, 'index.html'), template, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
});

//complies styles
fs.readdir(styles, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  let style = '';
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(path.resolve(styles, file), 'utf8', (err, contents) => {
        if (err) {
          console.log(err);
          return;
        }
        style += contents;

        fs.writeFile(path.resolve(styleCss), style, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  });
});

//copying assets
fs.mkdir(assetsCopy, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  fs.readdir(assetsOrigin, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach((file) => {
        const originFilePath = path.join(assetsOrigin, file);
        const copyFilePath = path.join(assetsCopy, file);

        fs.stat(originFilePath, (err, stats) => {
          if (err) {
            console.error(err);
          } else {
            if (stats.isFile()) {
              fs.copyFile(originFilePath, copyFilePath, (err) => {
                if (err) {
                  console.error(err);
                }
              });
            } else if (stats.isDirectory()) {
              fs.mkdir(copyFilePath, { recursive: true }, (err) => {
                if (err) {
                  return console.error(err);
                }

                fs.readdir(originFilePath, (err, nextFiles) => {
                  if (err) {
                    console.error(err);
                  } else {
                    nextFiles.forEach((nextFile) => {
                      const nextOriginFilePath = path.join(
                        originFilePath,
                        nextFile,
                      );
                      const nextCopyFilePath = path.join(
                        copyFilePath,
                        nextFile,
                      );
                      fs.stat(nextOriginFilePath, (err, nextStats) => {
                        if (err) {
                          console.error(err);
                        } else {
                          if (nextStats.isFile()) {
                            fs.copyFile(
                              nextOriginFilePath,
                              nextCopyFilePath,
                              (err) => {
                                if (err) {
                                  console.error(err);
                                }
                              },
                            );
                          } else if (nextStats.isDirectory()) {
                            fs.mkdir(
                              nextCopyFilePath,
                              { recursive: true },
                              (err) => {
                                if (err) {
                                  return console.error(err);
                                }
                              },
                            );
                          }
                        }
                      });
                    });
                  }
                });
              });
            }
          }
        });
      });
    }
  });
});
