---
title: "json parse"
date: 2023-04-20
subtitle: "json parse"
category: "Django"
draft: false
---

# JSON parse error

Expecting property name enclosed in double quotes:

![](https://velog.velcdn.com/images/nueeng/post/80098227-080e-4bd6-8120-e91d8a5cce8f/image.png)

참고링크:
https://stackoverflow.com/questions/62347538/json-parse-error-expecting-property-name-enclosed-in-double-quotes-line-11-co

Django를 익히면서 trailing comma를 붙이는 걸 많이 습관화하려하고 있었는데, JSON 데이터를 사용할 때는 마지막 comma를 붙이면 error를 뱉는 것 같다. 언어와 형식에 따라 잘 구분해야 한다.

> #### Q. JSON에서는 꼭 따옴표를 ' 대신에 " 를 써야하나요?
>
> A. 네! 파이썬에서는 따옴표 사용에 대해서 관대하지만 JSON은 반드시 큰 따옴표로 써주는것이 규격입니다.

`"`대신 `'`를 사용해도 비슷한 에러를 보인다고한다.

---

# view() got an unexpected keyword argument ''

![](https://velog.velcdn.com/images/nueeng/post/45ea2527-80ca-4c1d-86c9-3f2f012cab2d/image.png)

```python
# urls.py
urlpatterns = [
    path("<int:id>/", views.article_view, name="article_view"),
]
```

```python
# views.py
@api_view(['GET','PUT',"DELETE"])
def article_view(request, article_id):
```

view와 url을 연결시켜 줄 때 path는 `id`로, view의 parameter는 `article_id`로 다르게 설정되어서 나타났던 에러.
url의 `<int:id>`를 article_id로 변경하니 바로 페이지가 뜬다.
항상 연결할 때 parameter를 잘 맞춰줘야 한다.
