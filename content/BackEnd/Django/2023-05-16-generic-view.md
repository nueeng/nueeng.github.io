---
title: "Generic View"
date: 2023-05-16
subtitle: "Generic View"
category: "Django"
draft: false
---

```python
# 지역정보 API
class LocationList(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        queryset = Location.objects.all()

        locationsearch = self.request.query_params.get('locationsearch', None)
        # city or state
        if locationsearch is not None:
            if " " in locationsearch:
                locationsearch.split(" ")
                city = locationsearch.split(" ")[0]
                state = locationsearch.split(" ")[1]
                queryset = queryset.filter(Q(city__icontains=city)&
                                        Q(state__icontains=state)
                                        ).distinct()
            else:
                queryset = queryset.filter(Q(city__icontains=locationsearch)|
                                        Q(state__icontains=locationsearch)
                                        ).distinct()

        return queryset
```

팀원분중에 이미 검색필터링 기능을 활용해보셨던 분이 계셔서 조언을 얻어 드디어 쓸만한 코드가 완성되었다. ([블로그 링크](https://hr1998.tistory.com/41))
city, state를 나누어 받지 말고, 백엔드에서 한번에(locationsearch라는 변수로) 받아서 백엔드에서 validation하자는 아이디어로 출발, 많은 validation을 하지는 않았지만 지역 자동완성을 구현할 수 있었다.

상속받고있는`generics.ListAPIView`에 대한 이해가 우선시되어야 했다.

# Generic? APIView

> 제네릭 프로그래밍은 데이터 형식에 의존하지 않고, 하나의 값이 여러 다른 데이터 타입들을 가질 수 있는 기술에 중점을 두어 재사용성을 높일 수 있는 프로그래밍 방식이다. - [위키백과](https://ko.wikipedia.org/wiki/%EC%A0%9C%EB%84%A4%EB%A6%AD_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)

DRF에서 generic이 붙은 APIView는 일반적인 CRUD(Create, Retrieve, Update, Delete) 작업을 수행하는 데 필요한 코드를 미리 작성되어 있어 코드 재사용성이 높다. 상속만 받으면 편하게 사용할 수 있는 것

평소에 구현하고있던 APIView를 상속받아 작성한 view들은 직접 구현을 해야하지만 generic view는 구현을 거의다 이미 해놓았다고 보면 된다.

예를 들어, GenericAPIView를 상속하면 get(), post(), put(), delete()와 같은 일반적인 HTTP 요청 메서드에 대한 구현을 쉽게 할 수 있다.

## Generic View 요소

> Basic settings
> 다음 속성들은 기본 뷰 동작을 제어합니다.

- `queryset`: 이 뷰에서 객체를 반환하는 데 사용될 쿼리셋입니다. 일반적으로 이 속성을 설정하거나 `get_queryset()` 메서드를 오버라이드해야 합니다. 뷰 메서드를 오버라이드하는 경우에는 이 속성에 직접 접근하는 대신 `get_queryset()`을 호출해야 합니다. 이유는 queryset이 한 번 평가되고 그 결과가 이후의 모든 요청에 대해 캐시되기 때문입니다.
- `serializer_class`: 입력 유효성 검사, 역직렬화 및 출력 직렬화에 사용될 시리얼라이저 클래스입니다. 일반적으로 이 속성을 설정하거나 `get_serializer_class()` 메서드를 오버라이드해야 합니다.
- `lookup_field`: 개별 모델 인스턴스의 객체 조회에 사용될 모델 필드입니다. 기본값은 'pk'입니다. 하이퍼링크 API를 사용하는 경우, 커스텀 값을 사용해야 하는 경우 API 뷰와 시리얼라이저 클래스 모두 lookup 필드를 설정해야 함에 유의해야 합니다.
- `lookup_url_kwarg`: 객체 조회에 사용될 URL 키워드 인자입니다. URL 구성은 이 값을 대응시키는 키워드 인자를 포함해야 합니다. 설정하지 않으면 lookup_field와 동일한 값이 기본값으로 사용됩니다.
  다음 속성들은 목록 뷰와 함께 Pagination을 제어하는 데 사용됩니다.

> Pagination:

- `pagination_class`: 목록 결과를 페이지별로 분할하는 데 사용될 페이징 클래스입니다. 기본값은 `rest_framework.pagination.PageNumberPagination`으로 설정되는 DEFAULT_PAGINATION_CLASS 설정 값과 동일합니다. `pagination_class=None`로 설정하면 이 뷰에서 Pagination이 비활성화됩니다.

> Filtering:

- `filter_backends`: 쿼리셋을 Filtering하는 데 사용될 필터 백엔드 클래스의 목록입니다. 기본값은 DEFAULT_FILTER_BACKENDS 설정 값과 동일합니다.

## ListAPIView

위에서 사용한 `ListAPIView`를 통해 데이터목록을 get요청으로 받는 기본적인 generic view이다.
이외에도 CreateAPIView, RetriveAPIView, UpdateAPIView, DestroyAPIView 등 DRUD의 기본적인 부분들을 다양하게 지원하고있다. [cdrf.co](https://www.cdrf.co/)에서 확인해보자

`Mixin` : ListCreateAPIView : ListAPIView + CreateAPIView 같은 형태로 두가지를 동시에 상속시키는 형태로도 활용할 수 있다

### get_queryset

get_queryset method를 재정의하여 데이터베이스에서 조회할 쿼리셋을 얻을 수 있다. 다음과 같은 기본 형태를 가지고있다.

```python
    def get_queryset(self):
        """
        Get the list of items for this view.
        This must be an iterable, and may be a queryset.
        Defaults to using `self.queryset`.

        This method should always be used rather than accessing `self.queryset`
        directly, as `self.queryset` gets evaluated only once, and those results
        are cached for all subsequent requests.

        You may want to override this if you need to provide different
        querysets depending on the incoming request.

        (Eg. return a list of items that is specific to the user)
        """
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.all()
        return queryset
```

### query_params

> request.query_params is a more correctly named synonym for request.GET.<br/>
> 코드 내부의 명확성을 위해 Django의 표준 request.GET 대신 request.query_params를 사용하는 것이 좋습니다. 이렇게 하면 코드베이스를 보다 정확하고 명확하게 유지하는 데 도움이 됩니다. 모든 HTTP 메서드 유형에는 GET 요청뿐만 아니라 쿼리 매개변수가 포함될 수 있습니다.

request요청에 get을 쓸 때 붙여주면 더 명확하게 가능하지만 사용하지 않아도 좋은 코드라고한다..

# Django Q Objects

Q 객체는 Django ORM(Object-Relational Mapping)을 사용하여 데이터베이스에 대한 복잡한 쿼리를 작성하는 데 도움을 줄 수 있다.

```python
from django.db.models import Q

result = MyModel.objects.filter(Q(condition1) & Q(condition2)) # and
result = MyModel.objects.filter(Q(condition1) | Q(condition2)) # or
result = MyModel.objects.filter(~Q(condition)) # not
```

&, |, ~ and or not을 조합하여 동적인 쿼리 작성이 가능하다

`__icontain`을 사용하면 대소문자를 가리지 않고 포함된 모든 object를 가져올 수 있다.(`__contain`의 경우는 대소문자 구분)
`.distinct`를 사용하면 중복 데이터가 있을 경우(특히 or를 사용할 때) 중복 데이터들을 제거해줄 수 있다.

[cdrf.co](https://www.cdrf.co/)라는 사이트에서 DRF에 내장되어있는 class-based views 와 serializers를 확인할 수 있다. 자주 참고해보자!
