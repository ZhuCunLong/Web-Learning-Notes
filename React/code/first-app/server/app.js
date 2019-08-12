const Koa = require('koa')
const app = new Koa()

app.use(require('./router/index').routes())

app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})
