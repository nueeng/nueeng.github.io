---
title: "reverse 에러"
date: 2023-05-23
subtitle: "reverse 에러"
category: "Django"
draft: false
---

```python
class UserMypageTest(APITestCase):
    def setUp(self):
        self.data = {
            "user_name":"test1234",
            "email":"test@testuser.com",
            "password":"Qwerasdf1234!",
        }
        self.user = User.objects.create_user('test1234', 'test@testuser.com', 'Qwerasdf1234!')

    def test_signin(self):
        response = self.client.post(reverse('token_obtain_pair'), self.data)
        self.assertEqual(response.status_code, 200)

    def test_get_user_data(self):
        access_token = self.client.post(reverse('token_obtain_pair'), self.data).data['access']
        response = self.client.get(
            path=reverse("my_page_view"),
            HTTP_AUTHORIZATION=f"Bearer {access_token}"
        )
        print(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user_name'], self.data['user_name'])
```

Testcode 작성 중 만난 에러.![](https://velog.velcdn.com/images/nueeng/post/a78560b0-ba7a-4811-a715-a7585f8055cf/image.png)

```python
from django.urls import path
from users import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('mypage/<int:user_id>/', views.MyPageView.as_view(), name='my_page_view'),
]
```

`mypage/<int:user_id>/`부분의 `user_id`값을 정해주지 않아서 나는 에러인 것 같았다.

```python
    def test_get_user_data(self):
        access_token = self.client.post(reverse('token_obtain_pair'), self.data).data['access']
        response = self.client.get(
            path=reverse("my_page_view", args=['1']),
            HTTP_AUTHORIZATION=f"Bearer {access_token}"
        )
        print(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user_name'], self.data['user_name'])
```

my_page_view의 arguments에 `args=['1']`로 id값을 주니 테스트가 잘 돌아갔다.

사실 args값을 이런식으로 일일이 지정해주는 것 보다는 `get_absolute_url`을 활용하는 편이 좋을 수 있다.

`URL reverse`게시글을 복습해야할 것 같다.

참고링크:
https://stackoverflow.com/questions/61757651/test-in-django-reverse-with-no-arguments-not-found
