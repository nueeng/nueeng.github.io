---
title: "get, filter"
date: 2023-04-05
subtitle: "get, filter"
category: "Django"
draft: false
---

## 동일한 아이디 검증하기

> Q. 지금 회원가입은 데이터베이스에 동일한 사용자가 있어도 가입이 됩니다.  
> 사용자는 유일하게 만들어져야 하기 때문에 회원가입 시에 이미 있는 사용자 인지 확인하는 코드를 작성 해 주세요.

<br/>

```python
else:
    me = UserModel.objects.get(username=username)
    if me.username == username:
        return HttpResponse(f"이미 같은 이름 {me.username}이 존재합니다.")
```

질문의 예시로 나왔던 password 검증을 그대로 썼는데, 이 코드로도 작동은 잘 하는 것 같다. database 살펴보니 작성도 안되고는 있다.

```python
# 정답 예시안 코드
else:
    exist_user = UserModel.objects.filter(username=username)

if exist_user:
    return render(request, 'user/signup.html')
```

`if exist_user:` 이 부분이 아직 `if 1:`이렇게 밖에 느껴지지 않았다.

<br/>

# 정리

1.  if문

```python
A = []
B = [1,2,3]
if A: # False라서 else문이 실행됨
	else
if B: # True라서 if문이 실행됨
	else
```

## `filter()` 와 `get()`의 차이

#### filter(\*args, \*\*kwargs)

    Returns a new QuerySet containing objects that match the given lookup parameters.

#### get()

    get(\*args, \*\*kwargs)

    aget(\*args, \*\*kwargs)

    Asynchronous version: aget()

    Returns the object matching the given lookup parameters, which should be in the format described in Field lookups.

`filter()`와 `get()`은 return하는 row의 개수가 다르다.
`filter()`는 queryset을(비어있을 수도, 하나일수도, 2개 이상일수도 있는) 반환하고, `get()`은 한 개의 object를 반환하므로, 한 개 이상의 매칭되는 객체가 있다면 위의 if문은 True가 될 것이다.

`get()`은 `filter()`와 달리, 많은 에러를 발생시킨다.
하나의 row만 반환하기 때문에, 데이터가 없거나, 여러개일 경우 DoesNotExist나 MultipleObjectsReturned 에러를 뱉는다.

---

참고 문서:
https://docs.djangoproject.com/en/4.1/ref/models/querysets/#filter
