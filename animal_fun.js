const fs = require('fs');
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const query = req.url.split('?')[1];
  const parsed = querystring.parse(query);
  const letter = parsed['letter'];

  fs.readFile('./animals.txt', 'utf-8', (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    let lines = data.split("\n");
    if(letter !== undefined){
      let firstLetterWords = lines.filter((word) => {
        return word[0] === letter.toUpperCase();
      });
      res.end(firstLetterWords.join('\n'));
    } else {
      res.end(data);
    }
  });
});

server.listen(8000, () => console.log("I'm listening on port 8000!"));
