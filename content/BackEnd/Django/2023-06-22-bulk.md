---
title: "Bulk create and update"
date: 2023-06-22
subtitle: "Bulk"
category: "Django"
draft: false
---

# Django bulk

Django 모델에서 데이터를 저장하는 방법은 다양하지만, 여러 개의 객체를 최적화된 방식으로 저장하려면 bulk를 사용하면 좋다
Bulk Create(대량 생성)

bulk를 사용하면 한 번에 여러 객체를 생성한다. bulk_create 내장 함수를 통해 빠르고 쉽게 생성이 가능하다.

---

1. `bulk_create()`

bulk_create() 함수는 한 번에 여러 개의 객체를 생성하는 데 사용된다. 입력한 객체들을 한 번의 데이터베이스 쿼리로 삽입하므로, 데이터베이스 작업 속도를 크게 향상시킬 수 있다.

> "대량으로 생성할 객체들을 나타내는 목록을 인자로 받아, 데이터베이스에 한 번의 쿼리로 새로운 객체들을 추가합니다. 이는 많은 양의 데이터를 삽입해야 할 때 유용한 메서드입니다."

```
Person.objects.bulk_create([
Person(name='John'),
Person(name='Tom'),
])
```

2. Bulk Update

update() 함수는 한 번에 여러 개의 객체를 업데이트하는 데 사용된다. 일반적인 객체 업데이트 방식인 `save()` 메서드를 사용하는 것보다 훨씬 효율적으로 작동합니다. update() 함수를 사용하면 데이터베이스 쿼리가 한 번만 실행되므로 작업 시간을 단축할 수 있습니다.

> "주어진 필터 조건에 해당하는 객체들을 업데이트합니다. 이 메소드는 지정한 필드들의 값을 한 번의 데이터베이스 쿼리로 업데이트하는데, 이는 객체를 가져와서 하나씩 업데이트하는 것보다 훨씬 빠릅니다."

```
Person.objects.filter(name='John').update(name="Tony")
```
