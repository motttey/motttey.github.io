# mochiduko-20

my portfolio

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deploy to motttey.github.io
`dist`ディレクトリ以下を [motttey.github.io](https://motttey.github.io/) にパブリッシュする。

変更をコミットし、ローカルの動作を確認した後に次を実行

```bash
$ git checkout deploy-master
$ npm run generate
$ git subtree push --prefix dist origin2 masterv3
```
