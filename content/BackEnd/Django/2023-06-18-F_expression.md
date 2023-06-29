---
title: "F() expressions"
date: 2023-06-18
subtitle: "F() expressions"
category: "Django"
draft: false
---

# F() expressions

[F() expressions](https://docs.djangoproject.com/en/4.2/ref/models/expressions/#django.db.models.F)

- 데이터베이스의 필드 값을 가져오거나 조작하는 데 사용되는 표현식
- 쿼리의 필드 값을 가져와 연산을 수행하고, 결과를 쿼리에 사용하여 값을 업데이트 할 수 있도록 해줌(특정 필드의 값을 증가시키거나, 두 필드를 더하는 등..)
-

```python
reporter = Reporters.objects.get(name="Tintin")
reporter.stories_filed = F("stories_filed") + 1
reporter.save()

reporter.name = "Tintin Jr."
reporter.save()
```

위 코드는 F객체가 두번 적용되서 `save()`할때마다 +1 되어 결국 의도치 않게 +2가 되는 코드이다.  
F객체 사용할 때는 이런부분을 조심하면서 `save()`는 한번만 사용할 수 있도록 해야한다.
