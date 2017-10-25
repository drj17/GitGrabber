const fs = require('fs');
const http = require('http');
const https = require('https');
const qs = require('querystring');

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', d => {
      body += d;
    });
    req.on('end', () => {
      const username = qs.parse(body).username;
      const ws = fs.createWriteStream(`./${username}_starred_repos.txt`);
      let options = {
        hostname:  `api.github.com`,
        path: `/users/${username}/starred`,
        headers: {
          'User-Agent': 'git-grabber'
        }
      };
      https.get(options, (dataStream) => {
        let repoData = '';
        dataStream.on('data', chunk => { repoData += chunk})
        dataStream.on('end', () => {
          const repos = JSON.parse(repoData).map(repo => {
            return `Repo: ${repo.name} Stars: ${repo.stargazers_count}`
          }).join('\n')
          ws.write(repos)
          res.end(repos)
        })

      });
    });
  }
});

githubServer.listen(8080, () => console.log("listening on 8080"));
