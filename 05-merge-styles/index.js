const fs = require('fs');
const path = require('path');

const stylesFolder = '05-merge-styles/styles';
const projectFolder = '05-merge-styles/project-dist';
const bundle = '05-merge-styles/project-dist/bundle.css';

fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  let styles = '';
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(path.join(stylesFolder, file), 'utf8', (err, contents) => {
        if (err) {
          console.log(err);
          return;
        }
        styles += contents;

        fs.writeFile(path.join(projectFolder, bundle), styles, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  });
});
