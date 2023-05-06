const https = require('https');


function getRepos(username, done) {
  if (!username) return done(new Error('Please, provide a username!'));
  const option = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': 'github-app'
    }
  }
  const req = https.get(option, res => {
    res.setEncoding('utf-8');
    if (res.statusCode === 200) {
      let body = '';
      res.on('data', data => body += data);
      
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          done(null, result);
        }
        catch(error) {
          done(new Error('Unable to proceed data!'))
        }
      });
    } else {
      done(new Error(`Code ${ res.statusCode }. ${ res.statusMessage } while operating with server`))
    }
  });

  req.on('error', () => done(new Error('Unable to make request!')))
};

module.exports = { getRepos };
