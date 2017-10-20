const fs = require('fs')
let letter = process.argv[2].toUpperCase()
fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if(err){
    console.log(err)
    return
  }
  let lines = data.split("\n")
  let firstLetterWords = lines.filter((word) => {
    return word[0] === letter;
  })

  fs.writeFile(`${letter}-animals.txt`, firstLetterWords, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log("file successfully wrriten")
  })

})
