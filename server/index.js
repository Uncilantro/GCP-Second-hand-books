const express = require('express');
const cors = require('cors');//用来跨域
const bookdate = require('./api/bookdate');
let fabu = require('./api/fabu');
const login = require('./api/login');
const app =express();
const port =3000;//允许跨域
const authRouter = require('./routes/auth.js');

app.use('/api', authRouter);
app.use(cors());
app.use(express.json());


app.get('/api/bookdate',(req,res)=>{
    res.json(bookdate);
});


// 获取发布列表
app.get('/api/fabu', (req, res) => {
    res.json(fabu);
});

// 新增发布（买/卖书）
app.post('/api/fabu', (req, res) => {
    const data = req.body;
    if (data) {
        // 简单校验
        fabu.unshift(data); // 新发布的放最前面
        res.json({ code: 0, msg: '发布成功', data });
    } else {
        res.status(400).json({ code: 1, msg: '参数错误' });
    }
});

app.get('/api/login',(req,res)=>{
    res.json(login);
});

app.listen(port,() =>{
    console.log('server is running at http://localhost:3000');
})