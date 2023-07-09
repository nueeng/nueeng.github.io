---
title: "input tag"
date: 2023-04-07
subtitle: "input tag"
category: "Django"
draft: false
---

# <input value=nametag>

```python
def sign_up_view(request):
    if request.method == 'GET':
        return render(request, 'accounts/sign_up.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        name = request.POST.get('name', None)
        email = request.POST.get('email', None)
        password = request.POST.get('password', None)
        password2 = request.POST.get('password2', None)

        if password != password2:
            return render(request, 'accounts/sign_up.html', {'error':'비밀번호가 다릅니다.'})
        else:
            # get_user_model()은 장고의 auth기본제공함수
            exist_account = get_user_model().objects.filter(username=username)
            if exist_account:
                return render(request, 'accounts/sign_up.html', {'error':'사용자가 존재합니다.'})
            else:
                # create_user도 장고의 auth기본제공함수
                AccountModel.objects.create_user(username=username, password=password, email=email, name=name)
                return redirect('/sign-in')
                # render랑 redirect랑 어떤식으로 다른건지.?
```

강의를 다시 떠올리고 참고해가며 새로 작성했던 회원가입 페이지 views.py의 코드

html도 새로 만들었었는데 계속 `ValueError at /sign-up/ The given username must be set` 이 에러로 2시간 버렸다.
`if exist_user:`에 is not None 을 붙여야 한다는 의견도 있었는데, 회원가입 버튼을 로그인화면으로 가지 않고 database에도 저장이 되질 않았다.

결국 해결했는데, html 태그 문제였다.

```html
<div class="form-floating mb-3">
  <input
    type="text"
    class="form-control"
    id="username"
    placeholder="username"
  />
  <label for="username">ID</label>
</div>
```

부트스트랩으로 긁어온 코드였는데, `input`태그에서 `name`이 빠지면 `method="post", action="/sign-up/"`을 쓰더라도 자꾸 None값으로 불러오는 것 같았다.
`name="username"` 추가했더니 바로 잘 돌아간다.

프론트엔드와 Django template 문법을 열심히 다시 공부해야할 것 같다.
