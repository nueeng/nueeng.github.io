---
title: "DRF renderer"
date: 2023-07-08
subtitle: "DRF renderer"
category: "Django"
draft: false
---

# API Response 노출

배포 시에 내부 API Template이 안보이게끔 해야한다.

보안을 위해 정말 중요하고 기본적인 사항이었는데 팀 단위로 놓치고 있었던 것 같다. API주소가 노출되더라도 다른 사이트들에서는 대부분 API요청 URL에 대해 json형태로 데이터들을 반환시켜줄 뿐 Template을 렌더링하고 있지는 않았다.

단순하게 json Response만 노출될 수 있도록 고쳐야한다.

```bash
STATE='random_string'
DEBUG='True'
ALLOWED_HOSTS=localhost,127.0.0.1
```

env 환경변수 내용에 `=` 앞뒤로 띄어쓰기가 꼭 없게끔 해야한다.

`DEBUG='False'`로 수정해줘야 한다.

```python
from distutils.util import strtobool

DEBUG = strtobool(os.environ.get("DEBUG"))
```

배포 담당하신 분께서는 이부분을 strtobool이라는 메소드로 처리하신 것 같다.

렌더러클래스 수정

렌더러 클래스 조정하면 개발자도구 네트워크 탭을가서 Reponse를 요청해도 템플릿이 안보이게 할 수 있다

```python
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        # 'rest_framework.renderers.BrowsableAPIRenderer',
    ]
```

DRF 기준으론 이 두 줄의 코드가 default인 것 같다. 지정해서 위의 `JSONRenderer`만 렌더링할 수 있게끔 설정하면 된다.
