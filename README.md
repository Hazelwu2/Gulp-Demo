# Gulp-Demo
This is a Gulp-Demo for building initialization website. include package for js, images, sass.
![Gulp Demo](https://i.imgur.com/cJiObyX.png)

## 功能
1. Copy Html
2. 自動壓縮圖片
3. Sass/Scss 轉換成 CSS
4. Minify css
5. 打包所有 js 成 main.js
6. Watch 自動監視，一改變不用Refresh頁面

## 安裝步驟
1. 將專案 Clone 下來
2. sudo npm install bower gulp -g
結合Gulp、Bower，必須確保npm 有安裝 `bower`, `gulp`
3. npm update
4. cd project專案內，`npm install -l`
根據專案的package.json清單，安裝清單內的所有套件
5. bower install
根據專案的bower.json清單，安裝jQuery, Bootstrap
6. `gulp` 即可開始跑

### 注意事項
Bower內安裝jQuery為3.2.1版、Bootstrap為3.3.7版，若需要更改，請至Bower.json內修改版本號
