---
title: "Reverse Accessor"
date: 2023-05-18
subtitle: "Reverse Accessor"
category: "Django"
draft: false
---

# 정참조 / 역참조

정참조는 항상 하나지만 (article.user)
역참조는 queryset으로 여러개일 수 있으므로 .all()이나 .filter등을 붙여줘야함

역참조 `_set`은 모델명(테이블명)에 붙여야함
보통 `related_name`은 복수형으로 s붙여주는게 가독성도 좋고 많이 쓰는방식

```python
# 비대칭 재귀참조
class User(models.Model):
    follow = models.ManyToManyField(
        'self',
        # 비대칭
        symmetrical=False,
        # 역참조시 사용할 이름
        related_name='follower',
    )

    def __str__(self):
        return self.name
```

`ForeignKey(unique=True)`와 `OneToOneField`는 같은건데, 후자를 써야함(전자는 Warning Message)

## FK가 두개인 경우?

FK로 하나의 모델에 두개의 FK가 연결된 경우나 ManytoMany의 경우는 꼭 `related_name`을 설정해줘야 한다. 모델의 클래스에 `_set`을 붙여나가므로 어느 FK의 역참조 이름인지 알 수 없기 때문.

# Queryset

Queryset은 Object의 집합임.
`.all()`, `.get()`, `.filter()`등을 써서 불러온 것은 모두 queryset으로 불러오는것!(queryset 갯수가 0개이든 1개이든 2개이상이든 상관 X)

역참조에는 `.all()`, `.get()`, `.filter()`가 꼭 붙어야하는게 맞습니다 (FK일 때)
OneToOne일때는 `.all()`, `.get()`, `.filter()`가 필요없습니다 (오직하나라서 queryset이 아님)(\_set도 안붙여도 됨)
-> OneToOne의 역참조는 정참조와 사용하는 방법이 같다!
그안의 오브젝트를 직접 가져오고싶다면 `user.article_set.filter("조건")[0]`
이런식으로 슬라이싱해보기

`.filter().filter()` 연속으로도 가능, 하지만 Q객체를 이용하는 편이 가독성이라던지 좋을 수 있다.
