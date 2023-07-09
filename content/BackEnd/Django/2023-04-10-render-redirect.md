---
title: "render / redirect"
date: 2023-04-10
subtitle: "render / redirect"
category: "Django"
draft: false
---

## Problem

![](https://velog.velcdn.com/images/nueeng/post/7e22d0c3-24ad-474a-90ed-374030a232d8/image.png)
개인 과제 중 상품리스트를 출력하는 페이지에서 유저이름은(admin) django template 문법으로 불러와지는데, 정작 불러와야하는 product의 테이블 값들은 하나도 불러오지 못하고 있었다.
models.py도 고쳐보고 DB 테이블을 삭제도 했다가 모든 코드들 체크도 해봤지만 잘 모르겠다.

정답은 render를 제대로 안해서 일어난 문제였다. html에서 django template 문법을 사용하려면 view에서 html로 변수를 넘겨줘야했는데.. dictionary로 주는 방식이 익숙치 못했던 것.

---

```python
from django.shortcuts import render, redirect
```

render와 redirect의 차이는 무엇일까

## render / redirect

#### render()

```python
render(request, template_name, context=None, content_type=None, status=None, using=None)
```

Combines a given template with a given context dictionary and returns an HttpResponse object with that rendered text.
Django does not provide a shortcut function which returns a TemplateResponse because the constructor of TemplateResponse offers the same level of convenience as render().

render()의 첫 번째, 두 번째 인자는 고정값이다.
즉 request, 향할 html.명은 필수요소. context는 dictionary로 들어가야하는 선택인자로, key값은 탬플릿에서 쓸 변수이름, value값은 django(python)에서 쓴 변수가 된다.
status는 상태코드로 성공시 200이 기본값. using은 렌더링하는 엔진을 바꿀 수 있다.

#### redirect()

```python
redirect(to, *args, permanent=False, **kwargs)
```

Returns an HttpResponseRedirect to the appropriate URL for the arguments passed.
The arguments could be:
A model: the model’s get_absolute_url() function will be called.
A view name, possibly with arguments: reverse() will be used to reverse-resolve the name.
An absolute or relative URL, which will be used as-is for the redirect location.
By default issues a temporary redirect; pass permanent=True to issue a permanent redirect.

첫 번째 인자인 to에 가야할 url을 지정. 절대URL(https:로 어디서나 바로 갈 수 있는), 상대URL(지금 경로 기준으로 directory 옮겨다녀야 하는) 모두 가능하다.
urls.py에 지정한 이름으로 이동해다닐 수 있다.

![](https://velog.velcdn.com/images/nueeng/post/73985adc-40fb-41a8-aa30-e826e05741c6/image.png)

```python
@login_required
def product_list(request): # 상품리스트
        user = request.user.is_authenticated

        # 렌더링 피드백
        products = Product.objects.all() # queryset으로 받은걸 dictionary형으로 3번째 인자인 context로 넣어줌

        if user:
            return render(request, 'erp/product_list.html', {'product': products}) # 여기서 몇시간..
        else:
            return redirect('/sign-in')
```

사이즈를 S M L Free로 했었는데 왜 1234로 뜨는걸까.

참고자료 :
<https://docs.djangoproject.com/en/4.2/topics/http/shortcuts/>
