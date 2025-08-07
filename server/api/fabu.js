// server/api/fabu.js
module.exports = [
  {
    img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    title: '测试用户',
    phone: 17325768231,
    type: '我要买书',
    contact: '求一本毛概,价格为10元,交易地点在西区自提',
    image: 'https://img12.360buyimg.com/n1/jfs/t1/215130/6/41436/91094/664f82a4F2bc41e89/f0cf27eec698e4b3.jpg.avif',
    xiaoqv: '科教城西区',
    jiage: 10,
    name: '毛泽东思想和中国特色社会主义理论体系概论'
  },
  // 新增用例
  {
    img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    title: '测试用户',
    phone: 17325768231,
    type: '我要卖书',
    contact: '出售大学美育，9成新，欢迎联系',
    image: 'https://img13.360buyimg.com/n1/jfs/t1/105054/34/43156/42844/64c8a5c7F3beae04c/9e057b84b895af6b.jpg.avif',
    xiaoqv: '科教城西区',
    jiage: 12,
    name: '大学美育'
  },
  {
    img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    title: '测试用户',
    phone: 17325768231,
    type: '我要卖书',
    contact: '求购HTML5+CSS3网站设计基础教程，价格可议',
    image: 'https://img14.360buyimg.com/n1/s450x450_jfs/t1/174416/40/5781/65222/607ff5b5Eb973d601/be238baf7afb00cd.jpg.avif',
    xiaoqv: '科教城西区',
    jiage: 9,
    name: 'HTML5+CSS3网站设计基础教程（第2版）'
  },
  {
    img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RIOCytjiTTH1Ytuda8nqCAAAAA?rs=1&pid=ImgDetMain',
    title: '花开富贵',
    phone: 18088879197,
    type: '我要买书',
    contact: 'Java基础入门（第3版）低价转让',
    image: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/197424/28/40452/48548/66478ac3Fa3c70521/20c95cd8d0caa9e0.jpg.avif',
    xiaoqv: '科教城东区',
    jiage: 4,
    name: 'Java基础入门（第3版）'
  },
  {
    img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    title: '测试用户',
    phone: 17325768231,
    type: '我要买书',
    contact: '收Python程序开发案例教程，最好包邮',
    image: 'https://img12.360buyimg.com/n1/jfs/t1/213484/5/27190/23480/6422f8b5F8ffb15bc/9438939f0cb0572b.jpg.avif',
    xiaoqv: '科教城东区',
    jiage: 8,
    name: 'Python程序开发案例教程'
  },
  {
    img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RIOCytjiTTH1Ytuda8nqCAAAAA?rs=1&pid=ImgDetMain',
    title: '花开富贵',
    phone: 18088879197,
    type: '我要卖书',
    contact: '图说图解机器学习，正版，价格可议',
    image: 'https://img11.360buyimg.com/n1/jfs/t1/77309/21/6972/107676/5d5240ceE69979ff8/c1123273cf38defd.png.avif',
    xiaoqv: '科教城东区',
    jiage: 7,
    name: '图说图解机器学习'
  },
  {
    img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RIOCytjiTTH1Ytuda8nqCAAAAA?rs=1&pid=ImgDetMain',
    title: '花开富贵',
    phone: 18088879197,
    type: '我要卖书',
    contact: '卖一本C语言，有意者call',
    image: 'https://img12.360buyimg.com/n1/jfs/t1/148196/36/46101/19239/66fc9d3aF5d927209/371206842b7a2aeb.jpg.avif',
    xiaoqv: '科教城东区',
    jiage: 10,
    phone: 18088879197,
    name: 'C语言程序设计案例式教程（第2版）'
  },
    {
    img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RIOCytjiTTH1Ytuda8nqCAAAAA?rs=1&pid=ImgDetMain',
    title: '花开富贵',
    phone: 18088879197,
    type: '我要买书',
    contact: '卖一本信息技术基础，有意者call',
    image: 'https://img12.360buyimg.com/n1/jfs/t1/231821/16/17231/79749/662a7c0bF3aee6fd6/453f9c51d4cfb7c6.jpg.avif',
    xiaoqv: '科教城东区',
    jiage: 12,
    phone: 18088879197,
    name: 'C语言程序设计案例式教程（第2版）'
  }
];

module.exports.postBookData = function(newBook) {
  return new Promise((resolve, reject) => {
    try {
      data.push(newBook);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};