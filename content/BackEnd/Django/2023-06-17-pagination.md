---
title: "DRF Pagination"
date: 2023-06-17
subtitle: "DRF Pagination"
category: "Django"
draft: false
---

# Pagination

[공식문서](https://www.django-rest-framework.org/api-guide/pagination/)

페이지네이션을 사용할 경우 API Response가 `count`, `next`, `previous`, `results`로 달라진다.

```bash
{
    "count": 48,
    "next": "http://127.0.0.1:8000/campaigns/?page=3",
    "previous": "http://127.0.0.1:8000/campaigns/",
    "results": [
        {
            "id": 7,
            ...
        },
        {
            "id": 8,
            ...
        },
        ...
    ]
}
```

요청된 데이터를 페이지네이션 객체의 `paginate_queryset()` 메소드로 전달하여 페이지네이션된 결과를 얻을 수 있다. 그리고 이 결과를 `get_paginated_response()` 메소드에 전달하여 페이지네이션된 응답을 생성할 수 있다.

<br/>

## PageNumberPagination

- QueryString이 `/api/users?page=2`처럼 현재 페이지 기준으로 잡힘
- 페이지 크기(한 페이지당 항목 수)는 설정할 수 있으며, 기본값은 PAGE_SIZE = 10
- 일반적으로 사용하는 방식인 것 같다

<br/>

## LimitOffsetPagination

- QueryString이 `api/users?limit=10&offset=20`으로 잡힘
- limit은 페이지당 반환할 데이터의 개수, offset은 건너뛸 데이터의 개수(첫 페이지는 `api/users?limit=10&offset=0`)
- 결국 offset 번째 레코드부터 offset+limit-1 번째 레코드까지
- PageNumberPagination보다 유연성이 높은데, 페이지 번호를 사용하면 항상 일정한 순서대로 결과를 가져오게 되지만, 오프셋을 사용하면 원하는 위치에서 시작하여 원하는 만큼의 결과를 가져올 수 있다.

<br/>

## CursorPagination

- 고정된 정렬을 볼 수 밖에 없고, 임의로 인덱싱할 수 없다.
- 하지만 일관적으로 데이터를 불러올 수 있고 커서라는 포인터를 기준으로 전달하므로 데이터의 누락, 중복에서 자유롭다.
- 모바일에서 선호되고, 구현이 조금 까다로운 것 같다.. 프론트도 무한 스크롤 등... 추후 도전해보기

<br/>

## 구현해본 코드

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    "PAGE_SIZE": 6,
}
```

```python
# views.py
class CampaignView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def get(self, request):
        queryset = Campaign.objects.filter(
            status__gte=1).select_related("fundings")
        serializer = CampaignSerializer(queryset, many=True)

        pagination_instance = self.pagination_class()
        paginated_data = pagination_instance.paginate_queryset(serializer.data, request)

        return pagination_instance.get_paginated_response(paginated_data)
```

paginate_queryset에 serialize한 데이터를 넘겨줄 때 .data를 붙여줘야한다.

```python
# pagination.py를 만들어 customize
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
```

`pagination.py`를 만들어 세부옵션을 조정할 수 있다.

[cdrf BasePagination](https://www.cdrf.co/3.13/rest_framework.pagination/BasePagination.html)에서 DRF Builtin Pagination 확인할 수 있다.
