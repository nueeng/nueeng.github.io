---
title: "Django 06 23 course"
date: 2023-06-23
subtitle: "Function Based View"
category: "Django"
draft: false
---

## Example Model

```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_summary(self):
        return self.content[:100]

    @staticmethod
    def get_total_posts():
        return Post.objects.count()
```

1. `__str__`를 사용하면 admin 페이지에서 object(1)대신 title로 볼 수 있다

2. `get_summary` 메소드를 모델에 정의해서 content를 100자까지 잘라 활용할 수 있다

3. `@staticmethod` 어노테이션을 붙이면 정적메소드를 활용하면 인스턴스 생성 없이 외부에서 `count()`를 세는 호출을 할 수 있다.

4. [공식문서](https://docs.djangoproject.com/en/4.2/ref/models/fields/)에 따르면  
   항상 쓰던 `auto_now_add=True` 대신 `default=timezone.now()`를 사용할 수도 있다.  
   그 차이는 `auto_now_add=True`옵션은 수정할 수 없지만, `default=timezone.now()`옵션은 수정할 수 있다.
   auto_now_add, auto_now 및 default 옵션은 서로 배타적이다. 같이 사용할 경우 에러를 일으킬 수 있다.

<br/>

## requirements.txt 분기

도커를 사용해 배포할 때 requirements.txt를 분기하는 작업이 필요함.

production, develop환경의 종속성을 나누어 관리해야 하는 것

requirements.dev.txt등으로 도커에서 argument를 달아 분기처리
