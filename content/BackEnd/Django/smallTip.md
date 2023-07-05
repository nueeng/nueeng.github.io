---
title: "Django small Tips"
date: 2023-06-04
subtitle: "small tip"
category: "Django"
draft: false
---

## migration 파일 한번에 지우기

Bash 쉘에서

```bash
find ./ -path "*/migrations/*.py" -not -name "__init__.py" -delete
```

## django.db.migrations.exceptions.NodeNotFoundError

```bash
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
```

이후

```bash
python manage.py makemigrations
python manage.py migrate
```

## ModuleNotFoundError: No module named 'django.db.migrations.migration'

```bash
pip install --upgrade --force-reinstall Django
```

## Bash쉘

명령어 입력하다가 다 지우기 `Ctrl + U`

## app단위 마이그레이션만 초기화

- python manage.py migrate <app_name> zero
- python manage.py makemigrations <app_name>
- python manage.py migrate <app_name>
