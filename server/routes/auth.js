const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保头像目录存在
const avatarDir = path.join(__dirname, '../static/avatars');
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

// 配置multer上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${req.body.username}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage: storage });

// 注册接口
router.post('/register', upload.single('avatar'), (req, res) => {
  // 从req.body获取用户名密码，从req.file获取头像信息
  const { username, password } = req.body;
  const avatar = req.file ? `/avatars/${req.file.filename}` : '/未登录.png';

  // TODO: 实现用户注册逻辑
  // 1. 检查用户名是否已存在
  // 2. 密码加密处理
  // 3. 保存用户信息到数据存储
  
  res.json({ success: true, message: '注册成功', data: { username, avatar } });
});

module.exports = router;