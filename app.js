const Koa = require('koa');


const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello Koa321321';
});

app.listen(3000);
console.log('http://localhost:3000')