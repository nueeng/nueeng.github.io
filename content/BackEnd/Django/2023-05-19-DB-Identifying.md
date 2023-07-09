---
title: "식별 / 비식별"
date: 2023-05-19
subtitle: "Identifying"
category: "Django"
draft: false
---

# 식별 / 비식별

- Article모델의 pk는? : id -> 비식별 관계  
  = Article 모델이 별도의 pk를 가지고 있을 경우

- Article모델의 pk는? : 내부에 있는 author필드 -> 식별관계
  Article 모델이 내장되어있는 pk를 가지고 있는경우
  (primary_key=True)를 주면됨
  게시글이 있는데, 작성자가 없다 이런경우가 없다 그래서 이런 경우는 식별로 해도됨

만약 사용자 데이터만 삭제하고 게시글은 남기고싶을 땐,
비식별관계 : author필드를 비워두면 됨
식별관계 : 불가능함, pk필드이기 때문에 비울 수가 없다.

식별은 많이는 안쓰는 것 같다.
