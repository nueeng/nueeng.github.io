---
title: "Django Method"
date: 2023-06-20
subtitle: "Method"
category: "Django"
draft: true
---

# Django QueryString

query_params는 request.GET의 더 정확한 이름으로, Django에서 사용하는 동일한 개념을 나타냅니다. HTTP 요청에서 쿼리 매개변수(query parameters)를 추출하는 방법입니다.

request.query_params를 사용하면 코드의 명확성을 높일 수 있습니다. GET 요청뿐만 아니라 모든 HTTP 메서드 유형이 쿼리 매개변수를 포함할 수 있으므로, 코드베이스를 더 정확하고 명시적으로 유지하는 데 도움이 됩니다. 즉, request.query_params를 사용하면 코드의 의도가 분명히 전달되고, 다른 HTTP 메서드에서도 쿼리 매개변수를 사용할 수 있다는 사실을 명시적으로 나타낼 수 있습니다.
https://www.django-rest-framework.org/api-guide/requests/
https://www.django-rest-framework.org/api-guide/filtering/

## Wadiz는 어떻게하고있었나

filter / order

모든 캠페인이 기본 url
진행중인 캠페인?end=N
종료된 캠페인?end=Y

&order=
최신순recent
마감임박순closing
조회순count
좋아요순like
모금금액순amount

ux 뒤로가기시 정렬, 필터값 남아있도록 할 수 있을까
