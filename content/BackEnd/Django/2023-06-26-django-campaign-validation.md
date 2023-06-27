---
title: "Serializer Date validation"
date: 2023-06-26
subtitle: "시리얼라이저에서 밸리데이션 해보기"
category: "Django"
draft: false
---

# Date Validation

캠페인에 Date필드들이 있는데 시작일과 마감일이 있는 상태.

```python
class Campaign(BaseModel):
    class Meta:
        db_table = "campaign"

    STATUS_CHOICES = (
        (0, "미승인"),
        (1, "캠페인 모집중"),
        (2, "캠페인 종료"),
        (3, "캠페인 실패"),
    )

    ...

    campaign_start_date = models.DateTimeField("캠페인 시작일")
    campaign_end_date = models.DateTimeField("캠페인 마감일")
    activity_start_date = models.DateTimeField("활동 시작일", blank=True, null=True)
    activity_end_date = models.DateTimeField("활동 마감일", blank=True, null=True)

    ...

```

캠페인의 활동의 경우에는 활동 자체가 없는 캠페인이 있을 수 있다 생각해서 `blank=True, null=True` 속성을 줬다.

아래 네가지 필드에 validation이 필요했는데, 시작일은 절대 마감일 이전이어야 한다는 것이 지켜져야만 했다.

```python
    def validate_date(self, data):
        """
        캠페인 시작일이 마감일보다 늦는지 확인합니다.
        캠페인 활동 시작일만 있는지, 마감일만 있는지 또 시작일이 마감이보다 늦는지 확인합니다.
        """
        if data["campaign_start_date"] >= data["campaign_end_date"]:
            raise serializers.ValidationError(
                detail={"campaign_start_date": "캠페인 시작일은 마감일보다 이전일 수 없습니다."}
            )

        activity_start_date = data.get("activity_start_date")
        activity_end_date = data.get("activity_end_date")

        if activity_start_date and not activity_end_date:
            raise serializers.ValidationError(
                detail={"activity_end_date": "활동 종료일은 필수입니다."}
            )

        if not activity_start_date and activity_end_date:
            raise serializers.ValidationError(
                detail={"activity_start_date": "활동 시작일은 필수입니다."}
            )

        if activity_start_date and activity_end_date:
            if activity_start_date > activity_end_date:
                raise serializers.ValidationError(
                    detail={"activity_start_date": "활동 시작일은 마감일보다 이전일 수 없습니다."}
                )

        return data
```

1. 캠페인 시작일이 마감일보다 늦는지 확인한다.

2. 활동은 `blank=True, null=True`를 주었기에 캠페인 활동 시작일만 있는지, 마감일만 있는지에 대한 데이터 정합성을 확인한다.

3. 활동 시작일이 마감이보다 늦는지 확인한다.

Serializer단에서 확인하지 않고 Models.py에서 하는 방법도 다음에 해볼 예정
