# simple-blog-frontend

使用 Vite + VUE3 构建的简约风格的个人博客网站的前端系统，UI 风格参考了 [Innei](https://innei.ren/) 和 [Paul](https://paugram.com/) 网站。由于没有配置 mock，所以正常预览需搭配后端服务器一起使用。

目前只有前台的展示，涉及到登陆管理员，发表、修改、删除文章，添加、修改、删除栏目，审核、删除评论等操作需要自己发送请求（或者直接在数据库操作）（后台还没做 😂，挖个坑吧）。

## 展示

![Snipaste_2022-11-13_12-32-54](https://typora-picgo-1312201263.cos.ap-guangzhou.myqcloud.com/img/202211131237053.jpg)

![Snipaste_2022-11-13_12-33-26](https://typora-picgo-1312201263.cos.ap-guangzhou.myqcloud.com/img/202211131237622.jpg)

![Snipaste_2022-11-13_12-33-35](https://typora-picgo-1312201263.cos.ap-guangzhou.myqcloud.com/img/202211131237896.jpg)

![Snipaste_2022-11-13_12-33-44](https://typora-picgo-1312201263.cos.ap-guangzhou.myqcloud.com/img/202211131237524.jpg)

![Snipaste_2022-11-13_12-34-02](https://typora-picgo-1312201263.cos.ap-guangzhou.myqcloud.com/img/202211131237846.jpg)

## 技术栈

Vite + Vue3 + vue-router + pinia + element-plus + axios + vee-validate + marked + awesome-font

## 特性

1. SPA 单页面网站；
2. 首页展示文章列表；
3. 文章页的内容使用 markdown 语法展示；
4. 文章内容标题跳转功能；
5. 文章评论功能；
6. 自动适配黑暗主题，并提供切换主题按钮；
7. 适配移动端。

## 准备

1. nodejs 环境，[指路](https://nodejs.org/en/)；
2. 启动服务器 server，[指路](https://github.com/fwr220807/simple-blog-server)。

## 构建

```bash
// 下载项目到本地
git clone https://github.com/fwr220807/simple-blog-frontend
// 进入项目目录后，安装依赖
npm install
// 启动项目
npm run dev
```

## 证书

[MIT](https://github.com/fwr220807/simple-blog-frontend/blob/main/LICENSE)
