---
title: "Q 객체"
date: 2023-06-19
subtitle: "Q Object"
category: "Django"
draft: false
---

# Q object

[공식문서 1](https://docs.djangoproject.com/en/4.2/ref/models/querysets/#query-related-tools)  
[공식문서 2](https://docs.djangoproject.com/en/4.2/topics/db/queries/#complex-lookups-with-q-objects)

Q 객체는 쿼리를 조합하고, OR 논리 연산자를 사용하여 복잡한 조건의 쿼리가 필요할 때 사용할 수 있다.

& (AND), | (OR), ^ (XOR) 연산자를 사용하여 결합할 수 있다.(XOR = 배타적 논리합)

Q객체는 사용할 때 항상 Q객체 뒤에 keyword argument가 와야한다. 예를 들어,

```python
Poll.objects.get(
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
    question__startswith="Who",
)
```

는 잘 작성된 쿼리지만,

```python
# INVALID QUERY
Poll.objects.get(
    question__startswith="Who",
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
)
```

이 쿼리는 Q객체가 뒤에 작성되었기 때문에 올바르지 않은 쿼리이다.

```python
from django.db.models import Q

obj, created = Person.objects.filter(
Q(first_name="Bob") | Q(first_name="Robert"),
).get_or_create(last_name="Marley", defaults={"first_name": "Bob"})
```

get_or_create와 연결하여 사용할 수도 있다.
