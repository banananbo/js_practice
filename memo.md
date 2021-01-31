## HTML作成
```public/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TEST</title>
    <script src="js/app.js"></script>
  </head>
  <body>
    <div id="app">test app</div>
  </body>
</html>
```
WEBサーバーで表示確認

## yarn初期化
```
yarn init -y
```

```package.json
{
  "name": "test5",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```
パッケージ管理の準備が出来た。

## webpack準備
### yarnによるwebpackのインストール

```
yarn add --dev webpack webpack-cli
```

```package.json
{
  "name": "test4",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.13.0",
    "webpack-cli": "^4.3.1"
  }
}
```
node_modules というディレクトリが作られ、webpack利用に必要なパッケージがインストールされる。
これらの詳細の情報は、同時に作成されたyarn.lockに記録される。
### テスト用のjsの準備
```src/app.js
let test = ()=> {alert("webpack test");};
test();
```

### webpackの設定ファイル準備
```webpack.config.js
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: env,
}
```

### webpack実行
npxとは、パッケージ管理しているnodeモジュールを簡単に実行できる仕組み
node_modules/.bin 以下の実行ファイルを実行できる。
```sh
npx webpack --mode=development
asset app.js 802 bytes [emitted] (name: main)
./src/app.js 49 bytes [built] [code generated]
webpack 5.14.0 compiled successfully in 137 ms
```
```src/js/app.js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
eval("let test = ()=> {alert(\"webpack test\");};\ntest();\n\n//# sourceURL=webpack://test5/./src/app.js?");
/******/ })()
;
```
##### 【参考】webpackのmodeオプション
下記のようにproductionモードで実行すると、出力結果が異なる 不要な記述が省略されていることが分かる
```sh
npx webpack --mode=production # もしくはmodeを付けない場合はproductionで実行される
```
```dist/app.js
console.log("webpack test");
```
https://webpack.js.org/configuration/mode/

## babelの導入
```
yarn add --dev @babel/core @babel/preset-env babel-loader core-js
```
webpackの設定に、jsファイルはbabelを通すように設定
```webpack.config.js
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        }
      ]
  },
```
babelの設定用にファイルを２つ追加する
```.babelrc
{
    "presets": [[ "@babel/env", { "modules": false } ]],
    "env": {
       "test": {
            "presets": [[ "@babel/env", { "targets": { "node": "current" } } ]]
        }
    }
}
```
```.browserslistrc
> 1%
```
再び、webpackを実行すると、ES5に対応した書き方に変換されていることがわかる。

```public/js/app.js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
eval("var test = function test() {\n  alert(\"webpack test\");\n};\n\ntest();\n\n//# sourceURL=webpack://test5/./src/app.js?");
/******/ })()
;
```
IEでエラーが出ないことを確認

## vue.jsを入れる
```sh
yarn add --dev vue vue-loader vue-template-compiler
```

### jsをVueのものに書き換えていく
```src/app.js
import Vue from 'vue';
import Hello from './Hello.vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue(Hello).$mount('#app');
});
```
vueの単一コンポーネントファイルを追加
```src/Hello.vue
<template>
  <div>
    <p>{{ greeting }} World!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: ''
    };
  },
  created() {
    this.greeting = 'hello';
  }
}
</script>
```
### webpack 実行
```sh
npx webpack --mode="development"
asset app.js 239 KiB [emitted] (name: main)
runtime modules 916 bytes 4 modules
cacheable modules 223 KiB
  modules by path ./src/ 2.13 KiB
    ./src/app.js 152 bytes [built] [code generated]
    ./src/Hello.vue 1.04 KiB [built] [code generated]
    ./src/Hello.vue?vue&type=template&id=184cbba9& 197 bytes [built] [code generated]
    ./src/Hello.vue?vue&type=script&lang=js& 336 bytes [built] [code generated]
    ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Hello.vue?vue&type=template&id=184cbba9& 267 bytes [built] [code generated]
    ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Hello.vue?vue&type=script&lang=js& 172 bytes [built] [code generated]
  modules by path ./node_modules/ 221 KiB
    ./node_modules/vue/dist/vue.runtime.esm.js 218 KiB [built] [code generated]
    ./node_modules/vue-loader/lib/runtime/componentNormalizer.js 2.71 KiB [built] [code generated]
webpack 5.14.0 compiled successfully in 2064 ms
```
ブラウザで問題なく表示されていることを確認

### 単一コンポ―ネント CSS対応
```sh
yarn add --dev style-loader css-loader
```
webpackにcss用の設定を追加
```
 module: {
    rules: 
    [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'vue-style-loader',
          loader: 'css-loader',
        }
      ]
  },
```

```sh
npx webpack --mode="development"
asset app.js 257 KiB [compared for emit] (name: main)
runtime modules 1.19 KiB 5 modules
cacheable modules 232 KiB
  modules by path ./src/ 3.39 KiB 9 modules
  modules by path ./node_modules/ 229 KiB
    ./node_modules/vue/dist/vue.runtime.esm.js 218 KiB [built] [code generated]
    ./node_modules/vue-loader/lib/runtime/componentNormalizer.js 2.71 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.14.0 compiled successfully in 2071 ms
```
CSSが app.js に埋め込まれ、適用されるようになった。

## Typescript対応
```sh
yarn add --dev typescript ts-loader
```

### app.js →　app.tsへ
内容はとくにいじらず

### Hello.vueをts対応
```Hello.vue
<script lang="ts">
```

### webpack設定
```webpack.config.js
entry: './src/app.ts',

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
              loader: 'ts-loader',
              options: {
                  appendTsSuffixTo: [/\.vue$/]
              }
              }
          ]
        }
``` 
"moduleResolution": "node",
"allowSyntheticDefaultImports": true
の2行が無いと、import Vue from 'vue'　のようなインポートができなかった。Typescriptの決まりなのか？

```tsconfig.json
{
    "compilerOptions": {
        "target": "es5",
        "module": "es2015",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        "baseUrl": "./",
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true
    },
    "include": [
        "./src/*.vue",
        "./src/*.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}
```
試しに、型をつけてみる
```Hello.vue
<script lang="ts">
export default {
  data() {
    return {
      greeting: ''
    };
  },
  created() {
    this.greeting = 'hello';
  },
  computed:{
      computed_greeting():string{
          return this.greeting;
      }
  }
}
</script>
```
これでwebpackが通り、TypeScriptが扱えている
```
npx webpack --mode="development"
asset app.js 257 KiB [compared for emit] (name: main)
runtime modules 1.19 KiB 5 modules
cacheable modules 233 KiB
  modules by path ./src/ 3.57 KiB 9 modules
  modules by path ./node_modules/ 229 KiB
    ./node_modules/vue/dist/vue.runtime.esm.js 218 KiB [built] [code generated]
    ./node_modules/vue-loader/lib/runtime/componentNormalizer.js 2.71 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.14.0 compiled successfully in 4685 ms
```

```
  computed:{
      computed_greeting():string{
          return 1;
      }
  }
```
ためしにこうやると、こける
```
npx webpack --mode="development"
asset app.js 257 KiB [emitted] (name: main)
runtime modules 1.19 KiB 5 modules
cacheable modules 232 KiB
  modules by path ./src/ 3.56 KiB 9 modules
  modules by path ./node_modules/ 229 KiB
    ./node_modules/vue/dist/vue.runtime.esm.js 218 KiB [built] [code generated]
    ./node_modules/vue-loader/lib/runtime/componentNormalizer.js 2.71 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]

ERROR in /home/obana/js/vue/test5/src/Hello.vue.ts
[tsl] ERROR in /home/obana/js/vue/test5/src/Hello.vue.ts(19,11)
      TS2322: Type 'number' is not assignable to type 'string'.
```
## Hello.vueをもうすこしTypeScriptっぽく
```Hello.vue
<script lang="ts">
export type DataType ={
      greeting:string
}
export default {
  data():DataType{
    return {
      greeting: ''
    };
  },
  created() {
    this.greeting = 'hello';
  },
  computed:{
      computed_greeting():string{
          return this.greeting;
      }
  }
}
</script>
```



## webpack.configにエイリアスを登録
webpackでファイルをインポートする際に、パスの指定がしやすくなります。
```webpack.config
  resolve: {
    alias: {
      '@src': path.join(__dirname, 'src'),
      '@lib': path.join(__dirname, 'src/lib'),
      '@pages': path.join(__dirname, 'src/pages'),
      vue: 'vue/dist/vue.esm.js',
    }
  },
```

## webpackをスクリプトに登録
```package.json
  "scripts": {
    "dev": "webpack --watch"
  }
```
yarn dev で、上記のスクリプトが呼ばれ、ファイル変更後即座にwebpackが動いてくれるようになります。
webpackの設定などを変更した場合は一度止めて再度実行しないと適用されないので注意。

## vue-router対応
```sh
yarn add --dev vue-router
```

### Hello.vue を pages配下に移動　コピーして、Home.vueを作成

### app.vueに追加
```app.js
import Vue from 'vue';
import Home from '@pages/Home.vue';
import Hello from '@pages/Hello.vue';
import VueRouter from 'vue-router';


let routes = [
  { name:"home"  ,path: '/', component: Home },
  { name:"hello" ,path: '/hello', component: Hello },
]

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

document.addEventListener('DOMContentLoaded', () => {
  // new Vue(Hello).$mount('#app');
  new Vue({
    el: '#app',
    router: router
  });
});
```

### index.html
```index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TEST</title>
    <script src="js/app.js"></script>
  </head>
  <body>
    <div id="app">
      <router-link to="/">home</router-link>
      <router-link to="/hello">hello</router-link>
      <router-view></router-view>
    </div>
  </body>
</html>
```

### 動作確認
これでvue-routerが動作しました。

### routeを外だし
```routes.ts
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@pages/Home.vue';
import Hello from '@pages/Hello.vue';

let routes = [
    { name:"home"  ,path: '/', component: Home },
    { name:"hello" ,path: '/hello', component: Hello },
];

Vue.use(VueRouter);
export default  new VueRouter({
  routes
});
```
```app.ts
import Vue from 'vue';
import router from '@src/router.ts';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router: router
  });
});
```

### vuex 
```sh
yarn add --dev vuex
```

## app.tsに追加
```app.ts
import Vue from 'vue';
import router from '@src/router.ts';
import Vuex from 'vuex'

interface State {
  test: string
}

let store = new Vuex.Store({
  state: {
    test: "Test Vuex"
  } as State,
  modules:{
  },
  mutations:{
  },
  getters:{
  },
  actions:{
  }
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router: router,
    store: store
  });
});
```

## Home.vueで参照を確認
ひとまず動けば良い
```Home.vue
<template>
    <p>{{ this.$store.state.test }} World!</p>
</template>
```

## vuexを分離
```app.ts
import Vue from 'vue';
import router from '@src/router.ts';
import store from '@src/store/index.ts';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router: router,
    store: store
  });
});
```

```store/index.ts
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

interface State {
  test: string
}

export default new Vuex.Store({
  state: {
    test: "Test Vuex"
  } as State,
  modules:{
  },
  mutations:{
  },
  getters:{
  },
  actions:{
  }
})
```
一応vuexが動いていることが確認できた。

