let fs = require('fs')

let a = fs.readFileSync('users.json').toString()

let q = JSON.parse(a)


for(let x in q[0]){
  console.log(q[0][x])
}