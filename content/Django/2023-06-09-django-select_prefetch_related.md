---
title: "Django select_related / prefetch_related"
date: 2023-06-09
subtitle: "설계부터 URL을 잘 짜자 + Testcode"
category: "Django"
draft: false
---

## Django ORM에서 쿼리가 날아가는 순간

[관련 공식문서](https://docs.djangoproject.com/en/4.2/ref/models/querysets/)

Django에서 QuerySet이 작성된 순간, DB에서 데이터를 가져오지는 않는다.
실제로 그 DB에서 print한다거나 value를 save할 때 로딩해서 가져온다.
즉 Django에서의 QuerySet의 기본 세팅은 `lazy evaluation`.

아래는 공식문서에서 제공하는 8가지 lazy evaluation 상황.

> 1. for문를 사용하여 QuerySet을 반복할 때 데이터베이스 쿼리가 실행되고 결과가 하나씩 검색됩니다.
>
> ```python
> for entry in Entry.objects.all():
>    print(entry.headline)
> ```
>
> 2. async + for문 (Django 4.1부터 지원): async for를 사용하여 QuerySet을 비동기적으로 반복할 수도 있습니다. 동기적 반복과 비동기적 반복은 동일한 캐시를 공유합니다.
>
> ```python
> async for e in Entry.objects.all():
>    results.append(e)
> ```
>
> 3. 슬라이싱: QuerySet은 파이썬의 배열 슬라이싱 구문을 사용하여 슬라이스할 수 있습니다. 평가되지 않은 QuerySet을 슬라이싱하면 일반적으로 다른 평가되지 않은 QuerySet이 반환됩니다. 그러나 슬라이싱 구문의 "step" 매개변수를 사용하면 데이터베이스 쿼리가 실행되고 리스트가 반환됩니다. 평가된 QuerySet을 슬라이싱하면 리스트가 반환됩니다.
> 4. Pickling/Caching: QuerySet을 Pickle로 변환하거나 캐시에 저장할 때 결과가 데이터베이스에서 읽혀집니다.
> 5. repr(): QuerySet에 repr()을 호출하면 평가됩니다. 이는 Python 대화형 인터프리터에서 편의를 위해 결과를 즉시 볼 수 있도록 해줍니다.
> 6. len(): QuerySet에 len()을 호출하면 평가됩니다. 예를 들어, 결과 목록의 길이를 반환합니다.
> 7. list(): QuerySet에 list()를 호출하여 강제로 평가할 수 있습니다.
>
> ```python
> entry_list = list(Entry.objects.all())
> ```
>
> 8. bool(): bool()을 사용하여 QuerySet을 불리언 컨텍스트에서 테스트하면 쿼리가 실행됩니다. 최소한 하나의 결과가 있는 경우 QuerySet은 True이고, 그렇지 않으면 False입니다.
>
> ```python
> if Entry.objects.filter(headline="Test"):
>     print("There is at least one Entry with the headline Test")
> ```

## select_related

---

<br/>

## prefetch_related

---
