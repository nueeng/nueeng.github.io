---
title: "args, kwargs"
date: 2023-04-21
subtitle: "args, kwargs"
category: "Python"
draft: false
---

# \*args, \*\*kwargs

- 언제 사용할까?
  입력하는 데이터들이 정해져 있지 않을 때

```python
def add(*args, **kwargs):
    print(args)
    print(kwargs)

add(1,2,3,4,5,num1=1,num2=2)
```

1,2,3,4,5는 args, `num1=1`, `num2=2`는 kwargs로 들어감
<br/>

```python
def add2(option, a,b,c,*args, **kwargs):
    print(args)
    print(kwargs)

add(1,2,3,4,5,num1=1,num2=2)
```

변수 들어가는 순서도 중요합니다 keyword가 없는걸 왼쪽으로 보내야 합니다

```python
def add3(*args):
    print(args)

number_list = [1,2,3,4,5,6,7,8]
add(*number_list) # 이런식으로 별을 붙여주면 괄호가 없어진다고 보면 됨 이게 언패킹
add(*[x for x in range(1, 8)]) # 이것도 같은 식
```

---

### keys() values() items()

```python
a = {
    "num1": 6123612,
    "num2": 34253545812,
    "num3": 2347234648254382,
    "num4": 3725825812,
    "num5": 347134632,
    "num6": 5372334634612,
}

# key만 돌리고 싶을 때
for i in a.keys():
    print(i)

for i in a.values():
    print(i)

for k, v in a.items():
    print(f"키 : {k} / 값 : {v}")
```
