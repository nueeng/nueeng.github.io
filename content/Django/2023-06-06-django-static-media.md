---
title: "static, media"
date: 2023-06-06
subtitle: "static과 media 추가하기"
category: "Django"
draft: false
---

## static

Django에서의 static, 즉 정적인 파일들은 images, JavaScript, CSS들이다.

- static file 다루기

  1. settings.py에 추가
     ```
     STATIC_ROOT = BASE_DIR / "static"
     STATIC_URL = "/static/"
     ```
  2. urls.py에 추가

     ```
     from django.conf import settings
     from django.conf.urls.static import static

     urlpatterns = [
         # ... the rest of your URLconf goes here ...
     ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
     ```

## media

유저들이 업로드하는 image, file들은 media폴더에서 관리한다.

- media file 다루기

  1. settings.py에 추가
     ```
     MEDIA_ROOT = BASE_DIR / "media"
     MEDIA_URL = "/media/"
     ```
  2. urls.py에 추가 (+=로도 가능)
     ```
     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
     ```

- HTTP Request Body의 Content-Type은 json이 아닌 form-data

## Deployment

위의 방법은 local환경에서 개발시에, 즉 Debug=True일 때 사용하는 방법이며, 배포환경에서는 따로 관리해줘야한다.

- 배포의 static은
  1. STATIC_ROOT 변경
     ```
     STATIC_ROOT = "/var/www/example.com/static/"
     ```
  2. `collectstatic` management 커맨드 실행
     ```bash
     $ python manage.py collectstatic
     ```

media는 `MEDIA_URL` 및 `MEDIA_ROOT` 을 잘 설정해줘야하는 것 같음.  
Nginx나 Apache와 잘 설정해보자

배포 참고링크:
https://docs.djangoproject.com/en/4.2/howto/static-files/deployment/
