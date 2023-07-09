---
title: "Serializer"
date: 2023-04-26
subtitle: "Serializer"
category: "Django"
draft: false
---

# Serializer

1. 직렬화

   > **직렬화**란 컴퓨터 과학의 데이터 스토리지 문맥에서 데이터 구조나 오브젝트 상태를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정이다. [출처](https://ko.wikipedia.org/wiki/%EC%A7%81%EB%A0%AC%ED%99%94)

2. 데이터 검증(validation)
   - 필드에 유효한 값이 들어가는지
   - 커스텀 validation

- 이전에 탬플릿 썼을 때 직렬화를 하지 않아도 괜찮았던 이유는 `render` 와 `DTL 탬플릿 문법`을 사용했었기 때문
  이제는 프론트와 데이터를 주고받을 때 `{{ post }}`등이 아닌 json타입 데이터로 주고받을 것

- Object(queryset이나 data)를 json화 시키는것이 serializer이다.

---

## serializer의 validate

- `is_valid()` Built-in 함수를 들여다보자
  is_valid가 함수가 없었다면 if age isdigit():이런식으로 하나하나 다 검증을 직접 해줘야한다

```python
serializer = ArticleCreateSerializer(article, data=request.data)
serializer.is_valid(raise_exception=True)
serializer.save()
```

이 세줄은 외워쓸 수 있을정도가 되어야한다

- object -> json이 직렬화
  json -> object이 역직렬화

위 세줄의 코드가 역직렬화를 하고 있었다고 생각하면 됨

#### validate 순서

1. 필드에 대한 유효성 검사
   - 이쪽은 그냥 건들 수가 없음(ex. age필드에 abc를 입력하고싶어도 못함.)
2. 커스텀 validate
   - 1번의 유효성 검사가 끝나고 난 후에 더 추가로 할 검사들을 추가하는 개념

---

```python
# views.py
class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"가입완료!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message":f"{serializer.errors}"}, status=status.HTTP_400_BAD_REQUEST)
```

```python
# serializers.py
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = super().create(validated_data)
        password = user.password
        user.set_password(password) # 비밀번호 암호화 해싱해주는 함수
        user.save() # DB에 저장
        return user
```

- serializer가 있어서 view에서는 회원가입 진짜 실행만하고, 검증같은 부분은 serializer로 분리하여 더 개별적이고 독립적으로 관리 가능한 장점이 생기기도함

- serializer에서 queryset을 기준으로 직렬화 할 때는 many=True 속성을 줘야함, object 기준으로 직렬화 할 때는 주지 않아도 됨.(many=False가 기본값)
