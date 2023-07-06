---
title: "SQL Basic"
date: 2023-02-05
subtitle: "SQL Basic"
category: "SQL"
draft: false
---

# SQL

1. 같지않음 : !=
   select \* from orders
   where course_title != "웹개발 종합반";
1. 범위 : between
   select \* from orders
   where created_at between "2020-07-13" and "2020-07-15";
1. 포함 : in
   select \* from checkins
   where week in (1, 3); (1,3주차사람들의 것만 체크가능)
1. 패턴(문자열 규칙) : like
   select \* from users
   where email like '%daum.net';

1. 숫자열은 '' or "" 표시 하지않음
   문자열은 꼭 해야하지만!

1. BETWEEN 연산자는 이상 이하의 의미임.

1. select week, round(avg(likes),2) from checkins
   group by week

round (필드, 숫자)로 숫자까지 반올림이 가능함. 숫자로 몇째자리까지 표시할 것 인지 선택 가능
라운드로 감싸주기

4. 연산자 < = > 쓸 때는
   무조건 부등호 먼저, 그리고 나서 이상 이하 표기할때는 =.
   <=

   > = 식으로.

5. 쿼리 작성순서

1) show tables로 어떤 테이블이 있는지 살펴보기
2) 제일 원하는 정보가 있을 것 같은 테이블에 select \* from 테이블명 limit 10 쿼리 날려보기
3) 원하는 정보가 없으면 다른 테이블에도 2)를 해보기
4) 테이블을 찾았다! 범주를 나눠서 보고싶은 필드를 찾기
5) 범주별로 통계를 보고싶은 필드를 찾기
6) SQL 쿼리 작성하기!

6. 별칭 Alias : 알리아스

1) 별칭 o를 달아줌으로써 orders 테이블을 o.의 course_tilte 을 불러오라는식으로 가능.
   보통 1~2글자의 알파벳으로 설정
   select \* from orders o
   where o.course_title = '앱개발 종합반'

2) select 절 뒤의 필드 뒤에 as로 별칭을 직접 달아줄 수 있음.
   select payment_method, count(\*) as cnt from orders o
   where o.course_title = '앱개발 종합반'
   group by payment_method

7. 한 테이블에 모든 정보를 담을 수도 있겠지만, 불필요하게 테이블의 크기가 커져 불편해집니다.
   그래서, 데이터를 종류별로 쪼개 다른 테이블에 담아놓고 연결이 필요한 경우 연결할 수 있도록 만들어놓습니다.

예를 들면, users와 checkins 테이블에 동시에 존재하는 user_id 처럼요.
이런 필드를 두 테이블을 연결시켜주는 열쇠라는 의미로 'key'라고 부릅니다.

SQL의 Join은 엑셀의 vlookup과 동일하다고 생각하시면 됩니다 :-)

8. left join = 왼쪽 친구를 기준으로 오른쪽을 붙인다!
   inner join은 두 테이블에서 모두 가지고있는 데이터만 출력함. Null값 있으면 출력 안함. 교집합만

Left join은 순서가 중요함 누구를 누구에 붙일건지. inner 조인은 널 날라가는 대신 순서 상관 없어서 더 쉬움

9.  💎 SQL 문법 순서
    SELECT
    FROM
    WHERE
    GROUP BY
    HAVING
    ORDER BY

💎 SQL 실제 실행 순서
FROM : 각 테이블 확인
ON : 조인 조건 확인
JOIN : 테이블 조인 (병합)
WHERE : 데이터 추출 조건 확인
GROUP BY : 특정 칼럼으로 데이터 그룹화
HAVING : 그룹화 이후 데이터 추출 조건 확인
SELECT : 데이터 추출
DISTINCT : 중복 제거
ORDER BY : 데이터 정렬

10. 알리아스를 설정했으면, 모든 필드를 .을 써서 지정해줘야함.

11. Inner join 두번 사용하기
    select c1.title, c2.week, count(\*) from courses c1
    inner join checkins c2
    on c1.course_id = c2.course_id
    inner join orders o
    on c2.user_id = o.user_id
    where o.created_at like '2020-08%'
    -- 정답지에는 where o.created_at >= '2020-08-01'
    group by c1.title, c2.week
    order by c1.title, c2.week

12. count 은 NULL을 세지 않는답니다!

13. union all 을 사용하면 그 전에 했던 order by는 의미가 없어짐. subquery를 사용해서 다시 해줘야함

14. Subquery

select u.user_id, u.name, u.email from users u
where user_id in (
select user_id from orders o
where payment_method = 'kakaopay'
)

select u.user_id, u.name, u.email from users u
inner join orders o on u.user_id = o.user_id
where o.payment_method = 'kakaopay'

두 코드가 같은 결과값임. 쿼리 속의 쿼리문. 가장 속에 있는 쿼리부터 실행해서 결과를 만들고 그 밖의 쿼리들을 실행.
위의 서브쿼리는 where절에 있지만, select절에도 있을 수 있고, from절에서도 있을 수 있음.

15. select 절에 들어가는Subquery

select c.checkin_id,
c.user_id,
c.likes,
(
select avg(likes) from checkins
where user_id = c.user_id
) as avg_likes_user
from checkins c

16. from절에 들어가는 Subquery

select pu.user_id, pu.point, b.avg_likes from point_users pu
inner join (
select c.user_id, round(avg(likes),1) as avg_likes from checkins c
group by c.user_id
) b on pu.user_id = b.user_id

17. 아래 두개는 같은 쿼리. 쿼리 속의 쿼리를 이해해보자

select \* from point_users pu
where point > (
select avg(pu.point) from users u
inner join point_users pu on u.user_id = pu.user_id
where u.name like ('이%')
)

select \* from point_users pu
where point > (
select avg(point) from point_users pu
where user_id in (
select user_id from users where name like '이%'
)
)

18. distinct
    SELECT DISTINCT 컬럼명 FROM 테이블명;
    COUNT는 갯수를 그냥 세는 것이고, DISTINCT는 중복되는 것들을 제외하고 보여주는 것.

SELECT course_id, count(DISTINCT user_id) from checkins c
group by course_id

19.

select c.course_id,
count(distinct (c.user_id)) as cnt_checkins,
a.cnt_total
from checkins c
inner join (
select o.course_id, count(o.user_id) as cnt_total from orders o
group by o.course_id
) a on c.course_id = a.course_id
group by c.course_id

select a.course_id, b.cnt_checkins, a.cnt_total from
(
select o.course_id, count(o.user_id) as cnt_total from orders o
group by o.course_id
) a
inner join
(
select course_id, count(distinct(user_id)) as cnt_checkins from checkins c
group by course_id
) b on a.course_id = b.course_id

두 쿼리가 같은데, 오더는 안됐네..

20. 비율은 (A/B) as ratio

21. with tableN as ~ 를 사용하면 위에 더러운 쿼리를 깔끔하게 정리가 가능

with table1 as (
select course_id, count(distinct(user_id)) as cnt_checkins from checkins
group by course_id
), table2 as (
select course_id, count(\*) as cnt_total from orders
group by course_id
)
select c.title,
a.cnt_checkins,
b.cnt_total,
(a.cnt_checkins/b.cnt_total) as ratio
from table1 a
inner join table2 b on a.course_id = b.course_id
inner join courses c on a.course_id = c.course_id

22. SUBSTRING 문법

select user_id, email, SUBSTRING_INDEX(email,'@',1) from users u
이메일이라는 필드를 @를 기준으로 자르고, 1이라치면 아이디를 가져오기, -1이라치면 도메인을 가져오기 @는 문자열이니까 '' 잊지말기!!

select order_no, SUBSTRING(created_at,1,10) as date from orders
필드명, 시작포인트, 몇자인지

select order_no, SUBSTRING(created_at,1,10) as date, count(\*) from orders
group by date
group by를 통해 날짜별 발주 통계

23. -- CASE WHEN 문법

select pu.user_id, pu.point,
(case when pu.point > 10000 then '잘 하고 있어요!'
else '조금만 더 파이팅!' end) as msg
from point_users pu

-- 통계처럼 사용하기
select a.lv, count(\*) from(
select pu.user_id, pu.point,
(case when pu.point > 10000 then '1만 이상'
when pu.point > 5000 then '5천 이상'
else '5천 미만' end) as lv
from point_users pu
) a
group by a.lv

-- 더 나아가 with table로 정의
with table1 as (
select pu.user_id, pu.point,
(case when pu.point > 10000 then '1만 이상'
when pu.point > 5000 then '5천 이상'
else '5천 미만' end) as lv
from point_users pu
)
select a.lv, count(\*) as cnt
from table1 a
group by a.lv

24.

1)  select ed.enrolled_id,
    count(ed.enrolled_id) as total_course,
    a.done_course,
    round((a.done_course/count(ed.enrolled_id)),2) as ratio
    from enrolleds_detail ed
    inner join (
    select ed.enrolled_id, count(ed.done) as done_course from enrolleds_detail ed
    where done = 1
    group by ed.enrolled_id
    ) a on a.enrolled_id = ed.enrolled_id
    group by ed.enrolled_id

2)  select a.enrolled_id, b.done_cnt, a.total_cnt, round((b.done_cnt/a.total_cnt),2) as ratio
    from (
    select enrolled_id, count(_) as total_cnt from enrolleds_detail ed
    group by ed.enrolled_id
    ) a
    inner join
    (
    select enrolled_id, count(_) as done_cnt from enrolleds_detail ed
    where done = 1
    group by ed.enrolled_id
    ) b on a.enrolled_id = b.enrolled_id
3)  with table1 as (
    select enrolled_id, count(_) as total_cnt from enrolleds_detail ed
    group by ed.enrolled_id
    ), table2 as(
    select enrolled_id, count(_) as done_cnt from enrolleds_detail ed
    where done = 1
    group by ed.enrolled_id
    )
    select a.enrolled_id,
    b.done_cnt,
    a.total_cnt,
    round((b.done_cnt/a.total_cnt),2) as ratio
    from table1 a
    inner join table2 b on a.enrolled_id = b.enrolled_id

4)  select enrolled_id,
    sum(done) as done_cnt,
    count(_) as total_cnt,
    round((sum(done)/count(_)),2) as ratio
    from enrolleds_detail
    group by enrolled_id

위의 네가지 쿼리가 모두 같은 결과임..

25. date_format

SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') AS DATE FROM DUAL

식으로 사용,
