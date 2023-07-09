---
title: "Jquery Like 구현"
date: 2023-06-14
subtitle: "Like"
category: "JavaScript"
draft: true
---

1. Show / Hide

```js
function open_pw1(){
            $('#pw_box1').show()
        }
        function hide_pw1(){
            $('#pw_box1').hide()
        }

<button onclick="open_pw1()"> ...
```

2. 적용시켜본 Post 오픈 클로즈 버튼함수

```js
function open_gpbox() {
  $("#gpbox_cj").show();
}
function close_gpbox() {
  $("#gpbox_cj").hide();
}
function open_gpbox() {
  $("#gpbox_cj").toggle(); // show -> hide , hide -> show
}
```

정확한 문법

```js
$(selector).show(speed, callback);
$(selector).hide(speed, callback);
```

- selector : "#id"
- speed : "slow", "fast", milisecond의 숫자(숫자열)로 속도지정 가능
- callback
  현재 실행중인 함수가 끝나면(여기선 show or hide함수) 뒤이어 callback에 설정한 함수가 실행된다.
  show or hide함수가 끝나기 전에 callback함수가 실행되면 에러가 날 것을 방지할 수 있다.

```js
$("#tagID").toggle(); // show -> hide , hide -> show
```

토글함수는 현재 상태에서 반대값으로 넘겨줌.
