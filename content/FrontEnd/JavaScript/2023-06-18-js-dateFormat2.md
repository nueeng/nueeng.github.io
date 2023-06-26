---
title: "DateFormat 2"
date: 2023-06-18
subtitle: "JavaScript date format2"
category: "JavaScript"
draft: false
---

```python
    # serializers.py

    campaign_start_date = serializers.SerializerMethodField()
    campaign_end_date = serializers.SerializerMethodField()

    def get_campaign_start_date(self, obj):
        return obj.campaign_start_date.strftime("%Y년 %m월 %d일 %R")

    def get_campaign_end_date(self, obj):
        return obj.campaign_end_date.strftime("%Y년 %m월 %d일 %R")
```

마감임박 데이터는 빨간색으로 Badge를 달아주고 싶었는데,

serializer로 미리 직렬화를 시켜서 프론트에 가져오니 js상에서 날짜를 계산할 수가 없었다.

```js
// 마감임박 Boolean
const isAboutToClose = (endDate) => {
  const today = new Date().getDate();
  const endFormatted = endDate.replace(/년|월|일/g, "-");
  const end = new Date(endFormatted).getDate();

  const differenceInDays = end - today;
  return differenceInDays >= 0 && differenceInDays <= 3;
};
```

그래서 위의 함수로 년/월/일을 js상의 데이터와 연산할 수 있도록 형태를 포매팅을 해준 뒤, `getDate()` 메소드로 날짜의 차이를 계산해서 마감임박 Badge를 달아줄 수 있었다.

이외에 다양한 Date객체 연산

```js
console.log(date.getFullYear()); // 2023
console.log(date.getMonth()); // 5 (JavaScript에서 월은 0부터 시작하므로 6월은 5로 표현됩니다.)
console.log(date.getDate()); // 6 (일자)
console.log(date.getHours()); // 0 (시간)
console.log(date.getMinutes()); // 0 (분)
console.log(date.getSeconds()); // 0 (초)
console.log(date.getTime()); // 1675651200000 (타임스탬프)
```
