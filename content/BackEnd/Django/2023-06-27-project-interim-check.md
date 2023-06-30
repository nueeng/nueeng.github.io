---
title: "EcoCanvas 중간점검"
date: 2023-06-27
subtitle: "interim-check"
category: "Django"
draft: false
---

# Interim Check

프로젝트 진행도가 반 이상 지난 시점에서 중간점검을 코드리뷰를 통해 진행했다.

## Chat

Q. 왜 token으로 쿼리스트링?

- = userId로도 가능은하다 token으로 할 시 url을 통한 특정이나 보안에서 더 안전하기 때문에 token을 사용

- 코드 자체가 생소해서 Websocket 개념과 함께 제대로 공부해봐야할 것.

<br/>

## Payment

Q. 카드정보는 민감한 정보이다. 그냥 저장하기보다 보안에 대해서 생각해보았는지

- \*\*\*\* 표시로 저장하게끔 or DB에 저장할때 유저가 입력한 값을 해쉬로 저장할건지 고민중

- 값에 대한 사용처가 많은 정보 (주민등록 번호등) 민감하지만 사측에서 굉장히 재사용을 많이하는정보
  = 양방향 암호화를 많이 사용한다.(특정암호화를 정하고 암호화 복호화를 함수로 지정한 후 그 함수로 암복호화를 진행)
  AES-256를 많이 사용한다.

[참고자료](https://velog.io/@hwangninaa/%EC%96%91%EB%B0%A9%ED%96%A5-%EC%95%94%ED%98%B8%ED%99%94)

Q. 결제에서 Permission이 없어도 되는가

- Payment = Shop에 Permission
- Funding = Campaign에 Permission
- 이미 다 결제가 붙는 모델들에 Permission에 붙어있긴 해서 Permission설정을 따로 해줘야할까 하는 고민중.

Q. 오더 결제창을 띄워둔 채로 자리를 2시간 비웠다.

- 이러면 토큰이 만료된 상태에서 결제를 진행하였을 때 어떻게 될까?  
  이 상황을 생각해보면 Permission이 필요할 것

<br/>

## User

- 소셜계정이 구글은 일반유저인지 구글인지 구분이 안되는 상황
  어플리케이션은 등록이 되어있는데 뷰에서 email등이 안넣어져서 그런 것 같다
  개인적으로는 유저마다 UID 추가도 좋아보였다

- 아래 코드처럼 `""`와 비교하기 보단 길이값 비교나 null(python에서는 None)로
  비교한다던지 not이라던지.. 하는 방식이 좋을 것 같다

```python
    if verification_code == check_code:
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "가입완료"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif check_code == "":
        return Response({"empty": "인증코드를 입력해주세요"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"not_match": "잘못된 인증코드입니다"}, status=status.HTTP_400_BAD_REQUEST)
```

<br/>

## Shop, Notification

- 조회수 처리
- 통합검색
- 알림 어떻게 할건지 더 구체적으로 결정해야한다

마찬가지로 Websocket도 쓰고있어 Notification 부분이 이해가 쉽지 않다

<br/>

## Campaign

- 리뷰 코멘트 DetailView 합치기

Q. 작성자, 제목내용, 댓글내용을 기준으로 검색기능 추가 시도도 괜찮을 것 같은가?

- 검색도 좋지만 카테고리쪽이 더 좋을 것 같다는 의견.
- 카테고리
- 날짜
- 태그
  Category / Tag Example: 청소 펀딩 물품후원 등

- 캠페인 마감일이 지난 캠페인은 신청 못하도록 validation
- 캠페인 정원을 참여자수가 넘지 못하도록 validation

<hr/>

- Signal에 `@receiver`

  이캠페인 아이디를 통해서 필터카운트롤 통해서 갯수를 가져오고 멤버스가 넘지못하도록
  리시버 포스트시그널을 감지하면 크리에이트라는 필드가있는데크리에이트가 아닐때 save(필드) 거기서 참가자 필드에 대한 수정이 일어나는걸 감지할 수 있음

  ```
  post_save일어난후 pre_save일어나기전 sender=campagin
  def
  members = kwargs[''참가자'']
  if not created and member:
  일 경우 아래를 시작하라
  ```

  리시버가 많으면 코드파편화가 많이 일어난다
  그냥 뷰에서 해도 될 것 같기는 하다
  모집인원과 +1했을때 같거나 작으면성공 안되면 실패
  participant를 카운트하고 member랑 비교
  campaign_id Count participan의 갯수 values로 가져오고
  queryset의 멤버랑 비교
  num = queryset.participant.count()

<hr/>

- 페이지네이션 시리얼라이저 전후처리 문제  
  전체데이터를 시리얼라이징하는건가? 아니면 6개만 잘라서 시리얼라이징 하는건가?
  아마 후자일 가능성이 높아 시리얼라이저를 뒤쪽에 써주는 것이 좋을 것 같기도 하다.

  지금은 아래의 serialize 먼저 하고있는 코드. 사실 아무 차이가 없을 수도 있다. 더 알아보기

  ```python
    serializer = CampaignSerializer(queryset, many=True)

    pagination_instance = self.pagination_class()
    total_count = queryset.count()
    pagination_instance.total_count = total_count
    paginated_data = pagination_instance.paginate_queryset(
        serializer.data, request)

    return pagination_instance.get_paginated_response(paginated_data)
  ```

필터링 쿼리에서는 `filter()`없애서 데이터 자르지는 않도록 하기로 결정
`id=campaign.id`같은 부분들 파라미터로 처리도 가능하다 일반적이지는 않음

- 캠페인 더미데이터 json화해서 불러오고 테스트 분량 줄이기
  dummydata.json

[그린피스 UI와 필터목록 참고해보기](https://www.greenpeace.org/korea/?s=)

- 해시태그로 처리할건지 카테고리만 나눌건지 둘다 해볼건지
  해시태그는 쓴다면 어떤식으로 활용할건지 추가논의

- `is_valid()` 예외처리 else쓰면서 장황하게 하지 않고 더 간결하게 해보는 코드로 변경

대신 시리얼라이저에서 더 validation을 해야할 수도 있다.

```python
    def create_campaign_with_funding(self, request):
        campaign_serializer = CampaignCreateSerializer(data=request.data)
        funding_serializer = FundingCreateSerializer(data=request.data)

        campaign_serializer.is_valid(raise_exception=True) and funding_serializer.is_valid(raise_exception=True)
        campaign = campaign_serializer.save(user=request.user)
        funding_serializer.validated_data["campaign"] = campaign
        funding_serializer.save()
        response_data = {
            "message": "캠페인이 작성되었습니다.",
            "data": [campaign_serializer.data, funding_serializer.data],
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
```

수정 시리얼라이저에 `partial=True`줘서 부분수정 가능하도록 해서
값이 하나만 있어도 수정이 가능하게
