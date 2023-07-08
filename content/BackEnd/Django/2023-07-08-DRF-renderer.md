---
title: "UnorderedObjectListWarning"
date: 2023-07-07
subtitle: "UnorderedObjectListWarning"
category: "Django"
draft: false
---

내부 api template 안보이게끔 그리고 

api주소 노출안하는게 진짜 중요하구나

단순하게 json 리스폰스 값만 보여준다던가.

env파일 = 제일 문제되는게 expiredapp 이런건 = 앞에 띄어쓰기 없으면 문제가 될 수 있음
환경변수 쓸 때는 = 앞뒤로 띄어쓰기 없게끔

디버그모드
렌더러클래스 수정
렌더러 클래스 조정하면 안보이게 할 수 있다 

    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        # 'rest_framework.renderers.BrowsableAPIRenderer',
    ]