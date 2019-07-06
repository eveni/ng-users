const http = require('http')
const { readFileSync, writeFileSync } = require('fs')

const tooMuch = 1000000000000000000

function isValid(b) {
  var ret = true
  for (let x in b) if (!b[x]) {
    ret = false
    return false
  }
  return ret
}

function isNotRepeated(b, users) {
  var ret = true
  for (let x of users) {
    if (x.username == b.username) {
      ret = false
      return ret
    }
  }
  return ret
}

const read = () => JSON.parse(readFileSync('users.json').toString())
const write = d => writeFileSync('users.json', JSON.stringify(d, null, 2))

http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*'
  };


  switch (req.url) {
    case '/':
      let d = JSON.stringify(read(),null,2)
      res.writeHead(200, headers)
      res.end(d)
    case '/new':
      if (req.method == 'POST') {
        let b = ''
        req.on('data', c => b += c.toString())
        req.on('end', () => {
          try {
            let body = JSON.parse(b)
            let data = read()
            if (body && isValid(body) && isNotRepeated(body, data)) {
              let t = (Math.random() * tooMuch).toString().substr(0, 9)
              body.token = t
              data.push(body)
              write(data)
              res.writeHead(200, headers)
              res.end(JSON.stringify(body))
            } else {
              res.writeHead(200, headers)
              res.end("User Invalid or Already exist")
            }
          } catch (e) {
            console.log(e)
          }
        })

      } else {
        res.writeHead(200, headers)
        res.end("400 Bad Request")
      }

  }
}).listen(3131)

console.log('Server up on 3131')

