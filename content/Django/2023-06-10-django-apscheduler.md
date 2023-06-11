---
title: "Django apscheduler 써보기"
date: 2023-06-10
subtitle: "Advanced Python Scheduler"
category: "Django"
draft: false
---

## Django apscheduler

---

1. **Scheduler?**  
   코드 실행을 예약시켜 일정한 주기마다 실행될 수 있도록 해주는 Scheduler들이 있다.  
   회원들에게 일률적으로 보내는 메일, 모바일 application에서 보내는 push 알람들이 모두 이 Scheduler들로 보내는 것이라고 한다. 유명한 Scheduler로 Linux의 crontab이라는걸 많이 쓰는 것 같다.  
   파이썬에서는 [Advanced Python Scheduler](https://apscheduler.readthedocs.io/en/3.x/userguide.html)라는 라이브러리를 사용하는데, Django에서 편하게 사용할 수 있도록 해주는 패키지가 따로 있었다.  
   [PyPI django-apscheduler](https://pypi.org/project/django-apscheduler/)  
   근데 결국 Django apscheduler도 기본 파이썬 apscheduler의 연장선이라, apscheduler를 잘 사용할 수 있어야 잘 응용할 수 있는 것 같다.

2. **Install**

   ```bash
   pip install django-apscheduler
   ```

   `settings.py`에 설정

   ```python
   INSTALLED_APPS = (
       # ...
       "django_apscheduler",
   )

   APSCHEDULER_DATETIME_FORMAT = "N j, Y, f:s a"

   SCHEDULER_DEFAULT = True
   ```

<br/>

## Apply

---

```python
views.py
def check_campaign_status():
    now = timezone.now()  # UTC로 찍힘
    # now = timezone.localtime() # 한국 로컬타임 찍힘
    print(now)
    campaigns = Campaign.objects.filter(Q(status=2) | Q(status=3))

    for campaign in campaigns:
        if campaign.enddate <= now:
            campaign.status = 4
            campaign.save()
```

status가 2인 캠페인 중 완료 날짜가 되거나 지난 캠페인의 status를3으로 바꿔주는 함수.  
timezone.now()는 UTC기준 시각으로 찍히고,  
timezone.localtime()은 로컬 시각(한국)으로 찍히는데, 뭘 사용해야 할지는  
settings.py 시각과 MySQL에 찍히는 DB 시간 고려해서 정해야할 것 같다.

```python
# operator.py

from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import register_events, DjangoJobStore

from .views import check_campaign_status


def start():
    """
    캠페인 status 체크 실행 함수입니다.
    Blocking이 아닌 BackgroundScheduler를 활용하여 백그라운드에서 작동합니다.
    minute = '*/1' 로 1분마다 스케줄러 발동시켜 테스트해볼 수 있습니다.
    @scheduler.scheduled_job('cron', hour = '0', minute = '1', name = 'check')
    위 코드로 매일 1시에 스케줄링하도록 할 예정이나, 테스트는 아직 못해봤습니다.

    """
    scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)
    scheduler.add_jobstore(DjangoJobStore(), "djangojobstore")
    register_events(scheduler)

    # @scheduler.scheduled_job('cron', minute = '*/1', name = 'check')
    @scheduler.scheduled_job("cron", hour="1", name="check")
    def check():
        check_campaign_status()

    scheduler.start()
```

```python
# apps.py
from django.apps import AppConfig
from django.conf import settings


class CampaignsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "campaigns"

    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from . import operator

            operator.start()
```

<br/>

##

---

<br/>
