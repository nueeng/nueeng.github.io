---
title: "Django Method"
date: 2023-06-01
subtitle: "Method"
category: "Django"
draft: true
---

https://devvvyang.tistory.com/37
https://www.programink.com/django-tutorial/django-queryset.html

queryset Method

objects.all()
objects.get(**kwargs)
objects.filter(**kwargs)
objects.exists()

objects.first()
objects.last()

objects.aggregate()
objects.order_by(\*fields) -는 내림차순
exclude(\*\*kwargs)

annotate(\*args, \*\*kwargs): ?
distinct() 중복제거
count()
values_list(\*fields, flat=False)

Field lookup filter

**exact : 정확히 일치
**contains : 포함하는지
**startwith : 시작하는지
**endwith : 끝나는지
**isnull true시 null만 조회
**in = [] 리스트 안 문자열이 하나라도 포함된
**year, **month, **day, **date

gt (greater than) : >  
lt (less than) : <  
gte (greater than or equal) : >=  
lte (less than or equal) : <=

```python
In : Drink.objects.filter(id__gt=6) & Drink.objects.filter(korean_name__contains = "라임")
```

& and
| or
