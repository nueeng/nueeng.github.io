---
title: "Gatsby Highlighting Code"
date: 2023-06-11
subtitle: "highlight code"
category: "Blog"
draft: false
---

# Gatsby-remark-highlight-code

[공식문서](https://www.gatsbyjs.com/plugins/gatsby-remark-highlight-code/)

## Install

```bash
npm install --save gatsby-transformer-remark gatsby-remark-highlight-code @deckdeckgo/highlight-code
```

루트폴더에서 설치 후

`gatsby-config.js`에 아래 설정 추가

```js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-highlight-code`,
        },
      ],
    },
  },
];
```

<br/>

## Component

```js
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();
```

위의 컴포넌트를 추가해줘야하는데, 블로그마다 다른 것 같다.

`index.js`나 `layout.js`에 추가해주면 될 것 같은데, 이 테마에선 layout/index.js에 추가해줬더니 적용됐다

<br/>

## Theme

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-highlight-code`,
          options: {
            terminal: "carbon",
            theme: "blackboard",
          },
        },
      ],
    },
  },
];
```

`gatsby-config.js`에서 옵션을 주면 theme을 자유롭게 바꿀 수 있다

적용해도 로컬환경에서 바로 안바뀌어서 찾아봤더니 `.cache` 폴더를 지웠다 `gatsby develop`으로 확인해야 바뀐모습을 확인할 수 있었다

carbon terminal에서 적용가능한 테마들은 [링크](https://docs.deckdeckgo.com/?path=/story/components-highlight-code--highlight-code&args=theme:panda;editable:true)에서 확인할 수 있다
