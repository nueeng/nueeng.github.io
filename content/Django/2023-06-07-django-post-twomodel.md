---
title: "Django 두 모델 POST요청 보내보기"
date: 2023-06-07
subtitle: "두가지 모델을 한 View에서 POST 보내보자"
category: "Django"
draft: false
---

## 고민
<hr/>

```python
class CampaignView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request):
        campaigns = Campaign.objects.filter(Q(status=2)|Q(status=3))
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CampaignCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response({"message": "캠페인이 작성되었습니다.", "data": serializer.data}, status=status.HTTP_201_CREATED)
```

기존에 작성했던 코드

캠페인에 펀딩이 붙는 형태이기 때문에 우선 펀딩 여부를 판단하면서,  
펀딩이 붙는 캠페인이라면 캠페인 POST요청을 보내면서 펀딩 POST 요청도 같이 보내보고 싶었다.

지금보니 GET 함수의 `campaigns = Campaign.objects.filter(Q(status=2)|Q(status=3))`  
이부분도`status__gte=2`로도 처리 가능할 것 같다

<br/>

## 진행과정

<hr/>

```python
def post(self, request):
    if request.data["is_funding"] == "False":
        return self.create_campaign(request)
    else:
        return self.create_campaign_with_funding(request)
```
우선 POST 함수를 펀딩여부로 나누어주고

```python
def create_campaign(self, request):
    serializer = CampaignCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    response_data = {
        "message": "캠페인이 작성되었습니다.",
        "data": serializer.data
    }
    return Response(response_data, status=status.HTTP_201_CREATED)

def create_campaign_with_funding(self, request):
    campaign_serializer = CampaignCreateSerializer(data=request.data)
    funding_serializer = FundingCreateSerializer(data=request.data)
    
    if campaign_serializer.is_valid() and funding_serializer.is_valid():
        campaign = campaign_serializer.save(user=request.user)
        funding_serializer.validated_data['campaign'] = campaign
        funding_serializer.save()
        response_data = {
            "message": "캠페인이 작성되었습니다.",
            "data": [campaign_serializer.data, funding_serializer.data]
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "캠페인 및 펀딩 정보가 올바르지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
```

하나의 포스트를 두가지 경우로 모듈화시켜줬다

- 두 모델의 정보를 POST하다보니 두개의 serializer를 처리해야해서 조금 복잡해졌다.
    1. `if campaign_serializer.is_valid() and funding_serializer.is_valid():`
    캠페인 시리얼라이저가 유효한지 확인
    
    2. campaign = campaign_serializer.save(user=request.user)
    캠페인을 우선 요청한 유저정보와 저장

    3. funding_serializer.validated_data['campaign'] = campaign
    캠페인과 펀딩이 ForeignKey관계라서 `is_valid`를 거친 이후   
    `funding_serializer`에 campaign_id값이 없어  
    `django.db.utils.IntegrityError: NOT NULL constraint failed: funding.campaign_id`
    오류가 발생했었음.  
    campaign_id값을 추가해주는 과정

    4. funding_serializer.save()
    이후 저장

    5. "data": [campaign_serializer.data, funding_serializer.data]
    딕셔너리 형태에 두 데이터를 담기 위해 리스트형태로 저장