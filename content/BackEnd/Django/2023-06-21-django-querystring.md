---
title: "Query String"
date: 2023-06-21
subtitle: "Query String"
category: "Django"
draft: false
---

# DRF QueryString

Django에서는 `request.GET.get('<가져올 Query String>', None)`의 방법으로 Query String을 가져왔었다

DRF에서는 `request.query_params`도 사용이 가능하다.

> [query_params](https://www.django-rest-framework.org/api-guide/requests/)는 request.GET의 더 정확한 이름으로, Django에서 사용하는 동일한 개념을 나타냅니다. HTTP 요청에서 쿼리 매개변수(query parameters)를 추출하는 방법입니다.
> request.query_params를 사용하면 코드의 명확성을 높일 수 있습니다. GET 요청뿐만 아니라 모든 HTTP 메서드 유형이 쿼리 매개변수를 포함할 수 있으므로, 코드베이스를 더 정확하고 명시적으로 유지하는 데 도움이 됩니다. 즉, request.query_params를 사용하면 코드의 의도가 분명히 전달되고, 다른 HTTP 메서드에서도 쿼리 매개변수를 사용할 수 있다는 사실을 명시적으로 나타낼 수 있습니다.

?로 시작해 &, =등으로 연결하며 parameter를 줄 수 있다.

[필터링](https://www.django-rest-framework.org/api-guide/filtering/)

## Wadiz는 어떻게하고있었나

### filter

Key = end

Value =  
모든 캠페인이 기본 url  
진행중인 캠페인`?end=N`  
종료된 캠페인`?end=Y`

### order

Key = &order

Value =  
최신순 : `recent`  
마감임박순 : `closing`  
조회순 : `count`  
좋아요순 : `like`  
모금금액순 : `amount`

Front에서 UX고려해 뒤로가기시 정렬, 필터값 남아있도록 해보고싶다

Query String을 사용했으니 GET요청도 parameter를 포함해서 해야한다.

[query_params](../../../assets/content_images/query_params.png)

## 구현해본 코드

```python
class CampaignView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def get(self, request):
        # end = request.GET.get("end", None) 대신 query_params 사용해봄
        end = self.request.query_params.get("end", None)
        order = self.request.query_params.get("order", None)

        queryset = (
            Campaign.objects.select_related("user")
            .select_related("fundings")
            .prefetch_related("like")
            .prefetch_related("participant")
            .all()
        )

        if end == "N":
            queryset = queryset.filter(
                Q(status=1)
                & Q(campaign_start_date__lte=timezone.now())
                & Q(campaign_end_date__gte=timezone.now())
            )
        elif end == "Y":
            queryset = queryset.filter(status__gte=2)
        else:
            queryset = queryset.filter(status__gte=1)

        orders_dict = {
            "recent": queryset.order_by("-created_at"),
            "closing": queryset.order_by("campaign_end_date"),
            "popular": queryset.annotate(participant_count=Count("participant")).order_by("-participant_count"),
            "like": queryset.annotate(like_count=Count("like")).order_by("-like_count"),
            "amount": queryset.filter(
                ~Q(fundings=None) & Q(fundings__goal__gt=0)
            ).order_by("-fundings__amount"),
        }

        queryset = orders_dict[order]
```

1. `order_by()` 메소드로 순서정리
2. `annotate()` 메소드로 참가자나 좋아요의 Count 정리하여 순서정리
3. 펀딩이 없는 캠페인도 있어 Q객체로 필터링 후 펀딩 금액 오름차순 정리

마감임박순이 그저 end_date가 빠른순으로만 정렬된 상태. 현재날짜 기준으로 마감이 가까운 순으로 정렬한 뒤 그 이후는 최신순으로 정렬을 해볼 생각이다
