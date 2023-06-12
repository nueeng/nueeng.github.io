---
title: "select_related / prefetch_related"
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

.select_related("fundings")를 사용하는 경우와 사용하지 않는 경우의 차이점은 실제 데이터베이스 쿼리의 실행 방식과 결과에 있습니다.

.select_related("fundings")를 사용하는 경우:

    fundings 관계에 있는 모든 객체를 미리 가져옵니다.
    이로 인해 추가적인 JOIN 쿼리가 실행되어 모든 Campaign 객체와 관련된 fundings 데이터가 한 번의 쿼리로 가져와집니다.
    fundings 필드에 대한 역참조가 가능하며, 해당 데이터에 즉시 액세스할 수 있습니다.

.select_related("fundings")를 사용하지 않는 경우:

    Campaign 객체만 가져옵니다.
    fundings 필드에 대한 역참조가 가능하지 않습니다.
    실제로 fundings 필드에 접근하는 시점에서 필요한 데이터를 가져오기 위해 추가적인 쿼리가 실행됩니다. 이는 지연로딩(lazy loading)이라고도 알려져 있습니다.

.select_related("fundings")를 사용하면 데이터베이스에서 Campaign 및 관련 fundings 데이터를 미리 가져오므로, 필요한 데이터를 한 번의 쿼리로 가져올 수 있습니다. 이는 데이터베이스 부하를 줄이고 성능을 향상시킬 수 있습니다. 그러나 fundings 데이터가 많은 경우에는 불필요한 데이터를 가져오게 되어 메모리 사용량이 늘어날 수도 있습니다.

반면, .select_related("fundings")를 사용하지 않으면 데이터베이스에서는 필요한 데이터만 가져오게 되고, 필요한 시점에 추가적인 쿼리가 실행되므로 메모리 사용량은 감소합니다. 그러나 이는 필요한 데이터를 가져오기 위해 추가적인 쿼리 실행이 필요하므로, 데이터베이스 부하가 증가할 수 있습니다.

따라서, .select_related("fundings")를 사용할지 여부는 성능과 메모리 사용량을 고려하여 결정해야 합니다. 만약 fundings 데이터가 많거나 자주 접근하는 필드라면 .select_related("fundings")를 사용하여 성능을 향상시킬 수 있습니다. 하지만 fundings 데이터가 크지 않거나 자주 접근하지 않는 필드라면 .select_related("fundings")를 사용하지 않아도 됩니다.

---

        2개를 붙이는게 select와 prefetch의 차이는 inner
        2개의 테이블에 대해 조회
        select는 쿼리에 inner가 붙어 1개의 쿼리로 반환
        prefetch는 안쓰고 2개의 쿼리로 반환
        별도의 쿼리가 필요하냐, 붙여진 쿼리가 필요하냐의 목적성을 염두
        F객체 데이터의 값이 수정(update)될 때 유효성, 안전성을 보장, 파이썬연산이아닌 데이터베이스 연산으로 쿼리를 최적화
        어노테이션

print(queryset.query)로 확인해보기

## prefetch_related

---
