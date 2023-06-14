---
title: "자바스크립트 date 포맷"
date: 2023-06-14
subtitle: "JavaScript date format"
category: "JavaScript"
draft: false
---

# django와 dateFormat 맞추기

## 백엔드 실수

```python
# django views.py
    if campaign_serializer.is_valid() and funding_serializer.is_valid():
        campaign = campaign_serializer.save()
        funding_serializer.validated_data["campaign"] = campaign
        funding_serializer.save()
        response_data = {
            "message": "캠페인이 수정되었습니다.",
            "data": [campaign_serializer.data, funding_serializer.data],
        }
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        # 여기에 추가
        return Response(
            {
                "message": "캠페인 수정에 실패했습니다.",
                # error occured
                "errors": [
                    campaign_serializer.errors,
                    funding_serializer.errors,
                ],
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
```

위의 코드로는 error가 뜰 때 마다  
`AssertionError: You must call .is_valid() before accessing .errors .` 에러가 떴다. `is_valid()`전에는 serializer에 관련된 모든것이 불러올 수 없다는 것 같아 다음 코드를 `else:` 아래에 추가해줬다

```python
campaign_serializer.is_valid()
funding_serializer.is_valid()
```

이제서야 프론트에서 response에 찍히는 error메세지를 볼 수 있었다.

문제를 확인해보니..

## JavaScript Date Format

[Mozilla Date() 생성자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)

```js
activity_end_date: [
  "Datetime의 포멧이 잘못되었습니다. 이 형식들 중 한가지를 사용하세요: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].",
];
activity_start_date: [
  "Datetime의 포멧이 잘못되었습니다. 이 형식들 중 한가지를 사용하세요: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].",
];
campaign_end_date: [
  "Datetime의 포멧이 잘못되었습니다. 이 형식들 중 한가지를 사용하세요: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].",
];
campaign_start_date: [
  "Datetime의 포멧이 잘못되었습니다. 이 형식들 중 한가지를 사용하세요: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].",
];
```

django 기준의 Datetime Format과 프론트에서 전하는 date의 format이 다른상태인 것 같았다. 실제로 console.log를 찍어보니

```js
Wed, 31 May 2023 15:00:00 GMT
Fri, 02 Jun 2023 15:00:00 GMT
Wed, 31 May 2023 15:00:00 GMT
Thu, 01 Jun 2023 15:00:00 GMT
```

js에서는 이런식으로 찍히고있었다

[ISO parse](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#ecmascript_5_iso-8601_format_support)  
ISO(국제표준화기준)에서 정한 데이트 포맷으로 변환하는 함수가 있었다

ISO 8601에 따라 표현된 날짜와 시간  
날짜: 2016-10-27  
조합된 UTC 날짜 및 시간: 2016-10-27T17:13:40+00:00 || 2016-10-27T17:13:40Z || 20161027T171340Z

```js
// 캠페인 시작일
const handleCampaignStartDate = (date) => {
  setCampaignStartDate(date.toISOString());
};
```

`toISOString()`함수를 사용해서 해결했다.

이외에 다양한 함수들

```js
const today = new Date();

today.toString();
// Wed Jun 14 2023 22:49:37 GMT+0900 (한국 표준시)

today.toDateString();
// Wed Jun 14 2023

today.toLocaleString();
// 2023. 6. 14. 오후 10:49:37

today.toLocaleDateString();
// 2023. 6. 14.

today.toGMTString();
// Wed, 14 Jun 2023 13:49:37 GMT

today.toUTCString();
// Wed, 14 Jun 2023 13:49:37 GMT

today.toISOString();
// 2023-06-14T13:49:37.938Z
```
