---
title: "사용자 입력 픽스시키기"
date: 2023-05-12
subtitle: "Fix Information"
category: "Django"
draft: false
---

지역 정보를 모델로서 만들고, 사용자가 입력시킬 때 자동완성이랄지 이런 기능을 통해 입력시키고 싶은 상황.

숨고 웹사이트의 지역정보는 프론트에서 choice에 하드코딩을 하는 방식도 가능하고, 백엔드측에서 db에 데이터를 넣어서 구현도 가능하다
지역같은 정보는 거의 잘 바뀌지 않으니 양측에서 모두 구현이 가능하다

Client에게 데이터의 입력을 그대로 맡기면, validation하기도 힘들고 나중에 데이터 검색시에 variation이 너무 많아지게된다. (ex\_ 서울시, 강남구 서울시 강남구 서울시강남구 서울시 강ㄴㅁ구 ...)
품종 지역 데이터가 픽스되어있어야 확장성도 좋다!

지금 상태로 FK로 묶어 id로 입력하고 join시키면서 데이터를 불러오는 것이 가능하지만 조금 어려울 수 있는 작업이라고 하셨다 `prefetch_related`라는 기능을 사용하면 좋다

결론은 Charfield로 바꾸기..

```python
class Location(models.Model):
    class Meta:
        db_table = "location"

    city = models.CharField(max_length=20, default='')
    state = models.CharField(max_length=20, default='')


class Species(models.Model):
    class Meta:
        db_table = "species_breeds"

    species = models.CharField(max_length=20, default='')
    breeds = models.CharField(max_length=30, default='')


class PetOwner(CommonModel):
    location = models.CharField("지역", max_length=50) # FK였던 필드
    species = models.CharField("종/품종", max_length=30) # FK였던 필드
```

지역 :
품종 :
입력을하면

지역에다가 클라이언트가 입력할때 입력을 하자마자 api 호출을 할 수 있도록

location테이블을 조회하는 table을 만들어보기

서울입력하면 서울이 포함된 스트링의 리스트를 리턴
리스트를 보여주는 형태
돋보기를 달아서 클릭을 하면 모달 띄워서 거기서 리스트를 띄우던지라던가.!
검색버튼을 달아서 누르면 비슷한값들 팝업될 수 있게

지역정보를 입력하면 밑에 관련 단어들을 지속적으로 띄워줄 수 있는 쿼리

품종 지역 데이터가 픽스되어있어야 확장성이 너무좋아짐

api호출 자바스크립트로

js로 구현할 수 있을까..

참고하라고 주셨던 stackoverflow 링크:
https://stackoverflow.com/questions/73517196/how-to-handle-real-time-api-calls-on-user-input-using-javascript

### 07-09 추가

지금와서 생각해보면 프론트에서 모두 처리하는게 좋을 수도 있을 것 같다. 한국의 지리정보는 잘 안바뀌고, 이 데이터를 위해 백엔드와 통신하는 비용이라던지가 너무 아까울 수 있을 것 같다.
