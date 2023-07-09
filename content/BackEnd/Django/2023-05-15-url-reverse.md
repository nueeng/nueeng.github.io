---
title: "URL reverse"
date: 2023-05-15
subtitle: "URL reverse"
category: "Django"
draft: false
---

# URL reverse

```python
# tests.py
class ArticleCreateTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_data = {'email':'test@testuser.com', 'password':'1234'}
        cls.article_data = {'title':'some title', 'content':'some content'}
        cls.user = User.objects.create_user('test@testuser.com', '1234')

    def setUp(self):
        self.access_token = self.client.post(reverse('token_obtain_pair'), self.user_data).data['access']
```

테스트 코드 볼때마다 항상 궁금했었다 `reverse()`함수는 이름이 왜 reverse인걸까

`reverse()` 함수는 URL 패턴 이름을 사용하여 URL 문자열을 만드는 데 사용된다. 특히 다른app의 뷰에서 URL을 참조할 때 유용하다.

`reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None)`

```python
# 출처: 초보몽키님 블로그
from django.core.urlresolvers import reverse

reverse('blog:post_list') # '/blog/'
reverse('blog:post_detail', args=[10]) # '/blog/10/' args 인자로 리스트 지정 필요
reverse('blog:post_detail', kwargs={'id':10}) # '/blog/10/'
reverse('/hello/') # NoReverseMatch 오류 발생
```

url들이 각 뷰에 대해 app단위로 관리되고 있는 django에서 url이 변경되더라도 url자체값이 아닌 뒤에 지정한 name값으로 변경된 url을 추적한다면 편하게 테스트코드던 어디서 url을 쓰더라도 따로 변경 없이 사용이 가능해지는 것.

> `reverse()` 함수에서 URL 패턴 이름과 매개변수를 사용하여 URL을 생성하는 이유는 URLconf 파일의 변경이나 URL 구조의 변경에 대응하기 위함입니다. 만약 URL 문자열을 하드코딩하면, URLconf 파일이나 URL 구조의 변경이 생기면 해당 URL 문자열을 모두 수정해야 합니다. 하지만 URL 패턴 이름과 매개변수를 사용하면, URLconf 파일이나 URL 구조의 변경이 생겨도 `reverse()` 함수를 사용하는 코드는 변경할 필요가 없습니다.
> `reverse()` 함수가 이름을 거꾸로 돌리는 이유는, 일반적으로 URLconf 파일에서 패턴 이름과 관련된 URL 문자열을 작성하게 되는데, 이때 패턴 이름은 식별자로 사용되고, URL 문자열은 해당 패턴을 참조합니다. 따라서 `reverse()` 함수는 이 패턴 이름을 사용하여 URL 문자열을 생성하는 것입니다.

**아는 사람은 꼭 쓴다는 get_absolute_url() 부분 꼭 읽어보자**

참고링크:
[Django 공식문서 - reverse()](https://docs.djangoproject.com/en/4.2/ref/urlresolvers/)
[초보몽키의 개발공부로그](https://wayhome25.github.io/django/2017/05/05/django-url-reverse/) - 꼭 읽어보기 너무 잘 정리되어있음
