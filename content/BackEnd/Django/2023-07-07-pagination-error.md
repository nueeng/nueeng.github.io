---
title: "UnorderedObjectListWarning"
date: 2023-07-07
subtitle: "UnorderedObjectListWarning"
category: "Django"
draft: false
---

```python
    def get(self, request, campaign_id: int):
        """
        캠페인 댓글을 볼 수 있는 GET 요청 함수입니다.
        """
        queryset = get_object_or_404(Campaign, id=campaign_id)
        comment = queryset.comments.select_related("user").all()

        pagination_instance = self.pagination_class()
        paginated_data = pagination_instance.paginate_queryset(
            comment, request)

        serializer = CampaignCommentSerializer(paginated_data, many=True)

        return pagination_instance.get_paginated_response(serializer.data)
```

캠페인 get요청 함수에 `select_realted`를 달았더니

```bash
:200: UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered object_list: <class 'campaigns.models.CampaignComment'> QuerySet.
```

같은 에러가 떴다.

`python manage.py test campaigns`로 테스트를 해보니까 저런 Warning이 떴는데, 아마 select_related로 join을 시켜서 기본 ordering이 풀려서 지정을 해줘야하는 것 같았다.

`comment = queryset.comments.select_related("user").all().order_by("-created_at")`로 order값을 주니 해결되었다.
