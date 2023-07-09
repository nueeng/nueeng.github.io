---
title: "Upload Image"
date: 2023-04-13
subtitle: "Upload Image"
category: "Django"
draft: false
---

# 이미지 업로드

`static` 폴더에서 css, 첨부img, js등의 정적 부분을 관리한다면, FileField를 통해 저장하는 모든 파일은 `media` 폴더에서 관리한다.

## settings.py

우선 settings.py의 media URL을 잡아준다.

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

## pip install pillow

`pillow`라는 파이썬 이미지 처리 라이브러리가 필요하다.

## models.py

```python
class UserModel(AbstractUser):
    class Meta:
        db_table = "my_user"

    nickname = models.CharField(max_length=256, default='')
    speech = models.CharField(max_length=256, default='')
    site_address = models.CharField(max_length=256, default='')
    tmi = models.CharField(max_length=256, default='')
    follow = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follower')
    image = models.ImageField(upload_to="", null=True, blank=True)
    # 여기서 upload_to="", 는 MEDIA_ROOT를 의미합니다.
```

models.py에 image 추가
`ImageField`로 추가했었는데, `FileField`라는 것도 있는 모양이다

#### null=True / blank=True

![](https://velog.velcdn.com/images/nueeng/post/310c75cd-2187-4b0c-b24e-cd03202c6cb8/image.png)
라고한다
default = 기본값지정
blank=True : ""를 허용한다
null=True : none값을 허용한다
python은 null이 없음 그래서 None

### views.py

```python
    elif request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        password2 = request.POST.get('password2', '')
        nickname = request.POST.get('nickname', '')
        speech = request.POST.get('speech', '')
        site_address = request.POST.get('site_address', '')
        tmi = request.POST.get('tmi', '')
        image = request.FILES.get('image', '')
        ...
        UserModel.objects.create_user(username=username, password=password, speech=speech, nickname=nickname, site_address=site_address, tmi=tmi, image=image)
        return redirect('/login')
```

image는 FILES인 점에 주목

###

```html
<form
  class="form-area"
  method="post"
  action="/profile_edit/"
  enctype="multipart/form-data"
>
  <div class="input-group mb-3">
    <label class="input-group-text margin_zero" for="image">사진</label>
    <input
      type="file"
      class="form-control border_del"
      id="image"
      name="image"
    />
  </div>
</form>
```

form에 `enctype="multipart/form-data"` 이부분 빼먹기 너무 쉬웠다.
form에 꼭 적어주어야함 안적어주면 파일이 아닌 그냥 이미지파일 이름 텍스트만 전송하니 유의해야한다.

## `<input>`태그의 value

```html
<div class="mb-3">
  <label for="title" class="form-label">제목</label>
  <input
    type="text"
    class="form-control"
    id="title"
    name="title"
    value="{{ tweet.title }}"
  />
  <div id="titleHelp" class="form-text">다이어리를 꾸며주세요</div>
</div>
<div class="form-group mb-2">
  <textarea
    class="form-control"
    style="resize: none"
    name="my-content"
    id="my-content"
  >
{{ tweet.content }}</textarea
  >
</div>
```

#### `value="{{ tweet.title }}"` or `value="{{ request.tweet.title }}"`

여기부분을 value값을 미리 줘버리면 수정 시에 폼에 먼저 입력되었던 값 자동으로 불러오기가 가능하다.
request 여부가 이전에 미리 render가 되어있었으면 안적어줘도 되는 것 같다는데, 다시 알아봐야 할 것 같다.

#### `{{ tweet.content }}`

아래의 tweet.content는 `input`이 아니고 `textarea`라서 닫히기 전 사이에 적어줘야 하는데 계속 `input`이랑 똑같이 안에 적어서 애먹었었던 것 같다..
