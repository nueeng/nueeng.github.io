---
title: "Project 세팅"
date: 2023-04-03
subtitle: "Project 세팅"
category: "Django"
draft: false
---

# Django 기본 프로젝트 세팅

## venv 설정

```bash
python -m venv venv

bash:
source venv/Scripts/activate

cmd:
venv\Scripts\activate  #비활성화 : deactivate
venv\bin\activate #for mac
```

## Install

```bash
$ pip install django #업그레이드 : python -m pip install --upgrade pip
$ pip install djangorestframework
```

DRF 인스톨 시 django는 알아서 깔리기 때문에 아래만 쳐줘도 OK

필요할 때 아래 패키지 취사선택하여 인스톨

```bash
$ pip install django-dotenv
$ pip install Pillow
$ pip install django-cors-headers
$ pip install djangorestframework-simplejwt
$ pip install drf-spectacular
```

- dotenv (secret_key 설정)
  https://github.com/jpadilla/django-dotenv

```python
# .env
SECRET_KEY = "xxxx"
```

```python
# settings.py
import os
SECRET_KEY = os.environ.get("SECRET_KEY")
```

- simple jwt
  https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html
- Pillow
  https://pypi.org/project/Pillow/
- cors
  https://pypi.org/project/django-cors-headers/
- drf Yet another swagger generator
  https://drf-yasg.readthedocs.io/en/stable/readme.html
- drf-spectacular
  https://drf-spectacular.readthedocs.io/en/latest/readme.html

_autopep8등도 선택사항. black같은 포매터도 있다_

모두 install해준 뒤

```
pip freeze > requirements.txt
```

requirements.txt를 받을 때는

```
pip install -r requirements.txt
```

## 프로젝트 세팅

```
django-admin startproject <프로젝트이름> . (점 찍기 전에 한칸 띄워야 함)

django-admin startapp user
django-admin startapp tweet
```

프로젝트 이름은 어차피 설정폴더 이름과 같기 때문에 `config`로 하는경우도 많다. config쪽이 보기 좋은 것 같다.

앱 만들기 (SNS 기능을 만들고있는 강의라 user와 tweet 사용)
_**명령어 실행 후 settings.py에 installed_apps의 리스트에 'tweet', 'user' 도 추가해야함**_
DRF의 경우 `    'rest_framework',`도 추가해주기, `cors-header`나 `simple jwt`등도 공식문서 보고 잘 추가해줘야 하는것들이 많다.

### 4. migrate

```
python manage.py makemigrations
python manage.py migrate
```

models.py에 변경사항이 있을 때 마다 반영시켜주기

### 5. 서버실행

```
python manage.py runserver
```

http://127.0.0.1:8000/ 디폴트 주소

---

### admin 만들기

```
python manage.py createsuperuser
```

<br/>

### 프로젝트 폴더

- setting.py

django project의 기본 환경설정들을 담당하고 있음

- urls.py

django project의 api를 담당하고 있음 접속할 수 있는 url주소를 관리하는 공간

강의는 파이참 기준이라 쑥쑥 진도가 나갔는데, vscode로 새로 진행하다보니 직접 실행시키는 구동방법들을 찾아나가며 진행해야했다 제일 문제였던 부분은

- urls.py

```python
from . import views

urlpatterns = [path('first/', views.first_view, name='first_view'),]
```

- views.py

```python
from django.shortcuts import render

def first_view(request):
    return render(request,'my_test.html')
```

이 부분을 templates 안의 my_test.html과 추가했는데, **TemplateDoesNotExist at /first/**라는 Error를 만났다.

이것저것 시도하다 구글링해서 알아본 결과, Templates의 경로 지정을 해주지 않아 발생한 Error였다.

```python
import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

`'DIRS': [os.path.join(BASE_DIR, 'templates')],`
의 경로가 빈 리스트였기에 발생했던 것. os.path.join이 뭔지도 모르겠지만 django에서 처음으로 만난 Error였다.

templates의 s를 빠뜨려 생기기도하고, 추가로 생긴 app을 settings.py의 installed apps에 넣지 않아도 발생한다고 한다.
