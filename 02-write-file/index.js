const fs = require('fs');

const file = './02-write-file/text.txt';
process.stdin.setEncoding('utf8');
console.log('Enter your text here: ');
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    if (chunk.trim() === 'exit') {
      console.log('Thanks for writing!');
      process.exit();
    } else {
      fs.appendFile(file, chunk, (err) => {
        if (err) throw err;
        console.log('Enter your text here: ');
      });
    }
  }
});

process.stdin.on('end', () => {
  process.exit();
});
process.on('SIGINT', () => {
    console.log('Thanks for writing!');
    process.exit();
  });
