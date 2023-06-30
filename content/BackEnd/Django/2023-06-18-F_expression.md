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

[참고할만한 글](https://blog.myungseokang.dev/posts/django-f-class/)

## Apply

[필드의 값을 서로 비교하여 항목을 선택할 수 있나요?](https://django-orm-cookbook-ko.readthedocs.io/en/latest/f_query.html)

```python
    def check_funding_success():
        """
        종료된 캠페인의 펀딩 성공여부를 판단해 펀딩에 실패한 캠페인의
        status를 3으로 바꿉니다.
        """
        now = timezone.now()
        campaigns = Campaign.objects.filter(status=2).filter(fundings__amount__lt=F("fundings__goal"))

        for campaign in campaigns:
            campaign.status = 3
            campaign.save()
```

캠페인이 펀딩에 종료일까지 성공하지 못했을 때, 현재금액(amount)가 목표금액(goal)에 달하지 못했을 경우, 캠페인의 status를 실패처리하도록 apscheduler로 관리하고 싶었다.

이때 위 링크를 참고해 goal에 못미치는 펀딩일 경우 status를 3으로 바꾸고 save시키는 함수를 작성했다.
