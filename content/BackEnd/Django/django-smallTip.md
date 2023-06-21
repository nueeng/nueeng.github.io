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
find ./ -type f -name '000\*' -exec rm {} \;
```

- 경로를 잘 확인하고 써야한다. 하위 폴더 000~를 전부다 지운다.

## django.db.migrations.exceptions.NodeNotFoundError 에러

```bash
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
```

이후

```bash
python manage.py makemigrations
python manage.py migrate
```

## ModuleNotFoundError: No module named 'django.db.migrations.migration' 에러

```bash
pip install --upgrade --force-reinstall Django
```
