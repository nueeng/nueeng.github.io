---
title: "dictionary, lambda"
date: 2023-04-28
subtitle: "dictionary, lambda"
category: "Python"
draft: false
---

## 1157번 문제

https://www.acmicpc.net/problem/1157

1. 문자를 입력받고
2. 중복을 없앤 리스트 두개를 for문 이용
3. dictinary 사용하여 문자 : 개수 저장
4. value로 정렬한 후, sort한 value[0] == value[1]라면 print("?") else: [0][0]

라는 구상으로 시작

---

## lambda

lambda식으로 sort하는게 너무 어려웠다.

```python
sorted(d.items(), key=lambda x: x[1])
```

요는 이 식을 쓰면서 `key=lambda x: x[1]`이 부분의 [0]일 경우는 key로 정렬, [1]일 경우는 value로 정렬이다.
`d.items`를 빼먹고 실행하다 `IndexError: string index out of range` 오류로 시간을 엄청 쓴 것 같다.. 그래도 처음 딕셔너리와 람다 이해하고 써본 좋은 기회였다

---

```python
# 단어를 딕셔너리로 문자 : 개수로 저장한 후
# value 로 sort, sort한 value[0] == value[1]라면 print("?")
word = input().lower()
word_set = set(word)

frequency = {}

for i in word_set:
    frequency[i]=word.count(i)

freq_sort = sorted(frequency.items(), key = lambda x: x[1], reverse=True)

if freq_sort[0][1] == freq_sort[1][1]:
    print("?")
else:
    print(freq_sort[0][0].upper())
```

이코드로 제출했더니 Index Error가 뜬다
input이 `z` 한글자일 때 `freq_sort[1][1]`에서 인덱스오류가 나는 것 같다.

```python
# 단어를 딕셔너리로 문자 : 개수로 저장한 후
# value 로 sort, sort한 value[0] == value[1]라면 print("?")
word = input().lower()
word_set = set(word)

frequency = {}

for i in word_set:
    frequency[i]=word.count(i)

freq_sort = sorted(frequency.items(), key = lambda x: x[1], reverse=True)
if len(freq_sort) != 1:
    if freq_sort[0][1] == freq_sort[1][1]:
        print("?")
    else:
        print(freq_sort[0][0].upper())
else:
    print(word.upper())
```

한글자일때 처리를 해주니 정답.
