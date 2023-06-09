---
title: "Git Basic"
date: 2023-07-08
subtitle: "Git Basic"
category: "etc"
draft: true
---

# Git

Git이 없는 세상을 상상해보자.

1. 변경내역확인이 어렵고, 2. 작업을 되돌리기 어렵고, 3. 협력하기 어려움
   개발에서의 버전 : 유의미한 변화가 결과물로 나온 것
   프로그램 개발 == 유의미한 변화를(버전을) 쌓아 프로그램을 만들어 나가는 것
   Git은 협업과 백업에 있어 버전관리에 필수적임

Git이 관리하는 세 개의 공간

1. working space - 버전 관리 대상이 위치한 작업 디렉터리
2. stage - 다음 버전이 될 후보가 올라가는 공간
3. repository - 버전이 만들어지고 저장되는 공간

# Github

Github = 원격 저장소 호스팅 서비스
간편한 백업과 협업을 위한 원격 저장소

# 명령어

pwd : 현재 경로를 출력하는 명령어 (대부분의 프로그래밍 언어에서도 사용가능)
(print working directory)

ls : 현재 디렉터리(폴더)에 존재하는 파일 및 디렉터리(폴더)를 보여라
(list)

ls -al : 현재 디렉터리(폴더)에 존재하는, 숨김 파일 및 디렉터리(폴더)까지도 모두 리스트 형태로 보여라
(all list)

(참고) clear : 명령어 창을 깨끗하게 비워라

cd <디렉터리 이름> : <디렉터리 이름>으로 이동해라 cd workspace
(change directory)
cf) cd로는 한 디렉터리 씩 밖에 이동 못함

<디렉터리 이름>에서 상위 디렉터리 : ..
ex) cd .. 입력 시 상위폴더로 감

mkdir <디렉터리 이름> : <디렉터리 이름>의 비어있는 디렉터리(폴더)를 만들어라
cf) 폴더를 만들 때는 띄어쓰기 지양, 필요한 경우 언더바 사용
(make directory)

touch <파일명> : <파일명>을 가진 비어있는 파일을 만들어라

rm <파일명> : <파일명>을 가진 (폴더가 아닌) 파일을 지워라
(remove)

vi <파일명> : <파일명>을 vi 편집기로 편집하겠다
vi로 파일을 열었으면, “입력모드”로 전환해야 어떤 내용을 입력할 수 있습니다
(visual editor)

입력 모드로 전환하는 방법 : a 혹은 i를 입력 (insert)
입력모드에서 빠져나오는 방법: ESC
항상 비어있는 한칸을 만들어주고 저장하는 것이 좋음
파일이 없더라도 touch 생략하고 vi <파일명>해도 만들어지긴 함

입력한 내용을 저장하는 방법 : (입력 모드에서 빠져나온 뒤) :w (그냥 w가 아닌 :w임)
vi 편집기 닫기: :q
(write, quit)
운영체제 입장에서 한칸 띄워놓고 저장해야 끝이라 인지함. 한칸 띄어쓰고 저장하는 습관 들이기

:wq 저장하고 닫아라 한번에 할 수도 있음

cat <파일명> : <파일명>에 적힌 내용을 보여줘라
(concatenate)

편집기 숫자 보이기 :set nu, 없애기 :set nonu
입력모드를 빠져나온 뒤 u : undo(변경사항 취소)

git init : 로컬 저장소 만들기 (.git이라는 숨김 폴더가 생김 .git이 있는곳이 작업 디렉터리가 됨)
(initialize)

git status : 작업 디렉터리 상태 확인하기 (정말 많이 쓸 명령어)
(Untracked files - 추적하고있지 않던 새로운 파일이 생겼습니다)

git add <파일명> : 파일을 스테이지로 add함

git add . : 현재 경로에 있는 모든 파일을 스테이지에 추가할거다
빼기는(use "git rm --cached <file>..." to unstage)

git commit <파일명> : 파일을 저장소로 commit함
버전의 유의미한 변화를 설명할 쪽지 그것이 커밋 메세지
커밋 메세지는 버전(커밋)에 남기는 쪽지. 어떤 변경사항을 담은 버전인지를 짧게 써주시면 됩니다.

git commit --message "<커밋 메세지>"
git commit -m "<커밋 메세지>" : 간단하게 본문없이 제목만으로 커밋하고 싶을때

git log : 지금까지 만든 커밋의 목록을 볼 수 있음

push : 내 로컬(컴퓨터)의 커밋을 원격저장소에 업로드하기

git push : 깃허브로 push

git clone <원격저장소 url> : 원격 저장소를 내 컴퓨터로 복제해서 가지고 오기

## 1

SSH(Secure Shell) 깃과 내가 보안을 통해 안전하게 정보를 주고받을 수 있게끔 하는 통신 방법
Git bash = Git 명령어를 치는 공간

Your identification has been saved in /c/Users/Nuee/.ssh/id_rsa
= 개인 키
Your public key has been saved in /c/Users/Nuee/.ssh/id_rsa.pub
= 공개 키
공개 키의 내용을 깃 허브에 전달해주면 됨.
터미널에서 특정 파일을 열어보는 명령어 = cat

깃허브에서 컴퓨터마다 여러 SSH키 등록이 가능

여기서부터 강의
어떤 코드를 쓰느냐만큼 그 코드를 관리하는 것이 중요, 깃과 깃허브가 그 관리를 용이하게 하는 것.

깃이 없으면 - 1. 변경내역확인이 어렵고, 2. 작업을 되돌리기 어렵고, 3. 협력하기 어려움

변경사항 = 버전
Git은 결국 버전을 관리하기 위한 것.

개발에서의 버전 : 유의미한 변화가 결과물로 나온 것.
프로그램 개발 == 유의미한 변화를(버전을) 쌓아 프로그램을 만들어 나가는 것

깃은 명령어로 학습하는 것이 좋음. sourcetree로 할 순 있지만 결국 명령어가 더 쉽고 빠름.

Github = 원격 저장소 호스팅 서비스
repository = 저장소
version = commit = 유의미한 변화

tensorflow
kubernetes

이름, 이메일 설정
Nuee@DESKTOP-N9CO64V MINGW64 ~
$ git config --global user.email nueeeng@gmail.com

Nuee@DESKTOP-N9CO64V MINGW64 ~
$ git config --global user.name "Choi Junyoung"

★깃이 관리하는 세 개의 공간 - 작업 디렉터리, 스테이지, 저장소(repository)
스테이지와 저장소는 눈에보이지는 않고, 깃이 관리하는 가상의 저장공간

index.html style.css function.js 세개로 웹페이지를 만들었다고 가정하자
작업 디렉터리 = 버전관리 대상이 위치한 공간이 작업 디렉터리(워크스페이스)라고 함(.git이라는 숨김파일이 있는 디렉터리)

스테이지 = 다음 버전이 될 후보가 올라가는 공간

저장소 = 버전이 만들어지고 저장되는 공간

변경하고 스테이지에 버전 후보를만들고 실제버전들이 저장소에 올라가고 무한반복

add : 디렉터리에서 스테이지에 후보군을 추가하는 것
commit : 스테이지에서 저장소로 버전을 추가하는 것

결국 변경 - add - commit 순서.

폴더 - 아무대나 우클릭 - git bash here로 그 폴더의 git을 설정하는것이 중요함.

★명령어(git bash, macOS에서 사용할 수 있음)
pwd : 현재 경로를 출력하는 명령어 (대부분의 프로그래밍 언어에서도 사용가능)(print working directory)

ls : 현재 디렉터리(폴더)에 존재하는 파일 및 디렉터리(폴더)를 보여라 (list)

ls -al : 현재 디렉터리(폴더)에 존재하는, 숨김 파일 및 디렉터리(폴더)까지도 모두 리스트 형태로 보여라 (all list)

(참고) clear : 명령어 창을 깨끗하게 비워라

cd <디렉터리 이름> : <디렉터리 이름>으로 이동해라 cd workspace (change directory)
cf) cd로는 한 디렉터리 씩 밖에 이동 못함

<디렉터리 이름>에서 상위 디렉터리 : ..
ex) cd .. 입력 시 상위폴더로 감

mkdir <디렉터리 이름> : <디렉터리 이름>의 비어있는 디렉터리(폴더)를 만들어라
cf) 폴더만들때는 띄어쓰기 지양

~ : 홈 디렉터리 (기본 명령어 경로)

touch <파일명> : <파일명>을 가진 비어있는 파일을 만들어라

rm <파일명> : <파일명>을 가진 (폴더가 아닌) 파일을 지워라

vi <파일명> : <파일명>을 vi 편집기로 편집하겠다
vi로 파일을 열었으면, “입력모드”로 전환해야 어떤 내용을 입력할 수 있습니다
입력 모드로 전환하는 방법 : a 혹은 i를 입력 (insert라고 뜸)
입력모드에서 빠져나오는 방법: ESC
항상 비어있는 한칸을 만들어주고 저장하는 것이 좋음
입력한 내용을 저장하는 방법 : (입력 모드에서 빠져나온 뒤) :w (그냥 w가 아닌 :w임)
vi 편집기 닫기: :q
운영체제 입장에서 한칸 띄워놓고 저장해야 끝이라는 것을 운영체제가 암.

특히 윈도우 사용하시는 분들 파일 저장할 때 “비어있는 한칸 띄고" 저장해주세요
더 좋은 습관
:wq 저장하고 닫아라 한번에 할 수도 있음 (입력한 내용을 저장하고 (w), vi 편집기를 닫아라 (q) )

파일이 없더라도 touch 생략하고 vi <파일명>해도 그냥 만들어지긴 함

cat <파일명> : <파일명>에 적힌 내용을 보여줘라

편집기 숫자 보이기 :set nu, 없애기 :set nonu

(참고) 입력모드를 빠져나온 뒤 u : undo(변경사항 취소)

“실습을 통해" 학습해주세요 꼭!

git init : 로컬 저장소 만들기 (.git이라는 숨김 폴더가 생김 .git이 있는곳이 작업 디렉터리가 됨)

git status : 작업 디렉터리 상태 확인하기 (정말 많이 쓸 명령어)
(Untracked files - 추적하고있지 않던 새로운 파일이 생겼습니다)

git add <파일명> : 파일을 스테이지로 add함

git add . : 현재 경로에 있는 모든 파일을 스테이지에 추가할거다
빼기는(use "git rm --cached <file>..." to unstage)

git commit <파일명> : 파일을 저장소로 commit함
버전의 유의미한 변화를 설명할 쪽지 그것이 커밋 메세지
커밋 메세지는 버전(커밋)에 남기는 쪽지. 어떤 변경사항을 담은 버전인지를 짧게 써주시면 됩니다.

커밋메세지는 제목과 본문으로 이루어짐. 맨윗줄이 제목, 한칸 띄고 본문을 적어주면 됌. 본문은 생략 가능
참고로 커밋메세지는 자세하게 작성하면 작성할수록 좋음.
이 변경사항은 어떤 변경사항을 갖는지 자세하게
때에따라선 링크를 첨부할수도 있고

git commit --message "<커밋 메세지>"
git commit -m "<커밋 메세지>" : 간단하게 본문없이 제목만으로 커밋하고 싶을때

git log : 지금까지 만든 커밋의 목록을 볼 수 있음

..

1. 임의의 위치에서 비어 있는 폴더를 만들어보세요. 폴더 이름은 sprata_git
2. git init으로 .git 숨김폴더(작업 디렉터리) 만들기
3. a.txt를 만들고 커밋
4. b.txt를 만들고 두번째 커밋
5. c.txt를 만들고 세번째 커밋

원격저장소 : 백업과 협업을 위해서

push : 내 로컬(컴퓨터)의 커밋을 원격저장소에 업로드하기

git push : 깃허브로 push

미니 프로젝트를 진행하실 때

1. 코드 상에서 유의미한 변화를 만들어냈으면 그때그때 commit
2. 적당히 commit이 쌓였다면 깃허브에 push
   Settings > Collaborators
   Add people에 다른 팀원의 깃허브 계정을 추가하고 버튼을 누르면 초대장이 발송됩니다.

권장할만한 방법은 아닙니다. 깃/깃허브 입문자에게 적합한 방식.
Pull Request를 통해 더 심화된 과정!

git push -u origin main 한 번만 해주면 됩니다.
이후로는 git push로 OK

git clone <원격저장소 url> : 원격 저장소를 내 컴퓨터로 복제해서 가지고 오기

## 2

git : version control system
github: 깃을 가시적으로 볼 수 있는 편하게 한 interface
공유 (fork) 업로드 다운로드 삭제 등을 클릭으로 가능하게끔

레포지터리 만들면 master임
git init / master or main 이라는 브랜치가 생김

.gitignore 파일
/dummy - 이 디렉터리를 추적하지 않게됨

민감한사항들은 .env파일을 만들어서 여기 저장하게 한다음에

git remote add origin <url> // origin은 닉네임
git remote -v //확인 커맨드
gir remote remove origin //삭제커맨드

remote = 깃허브뿐만아니라 모든 다른 에디터들

git push origin <브랜치>

브랜치 = 커밋한 것들이 가지가 쭉쭉 이어나가는
사람들마다 각자 브랜치를 만들어서 협업해나가면
git checkout <가고싶은 커밋의 id>
원래대로 가고싶을땐 master/main쓰면되겠지?
git branch <name>
git branch
git checkout -b <name> // 브랜치 이동
git push origin <name> // name브랜치를 origin저장소

합치기 : 1.복붙 2. pull request

# 3

working directory - stage - commit

1. git diff : 가장 최근 커밋에 대해서 가장 최근 버전과 현재 working directory의 차이점을 보여주는 명령어

working directory와의 차이를 보여주기 때문에 add를 통해 stage로 올리면 차이를 보여주지 않음

2. git diff --staged : stage와의 차이점보기

3. git diff <커밋> <커밋> : <커밋>부분에는 커밋 해쉬 ( 고유 id번호 ) 를 적어줘야함. 커밋끼리의 차이점 보기

두 해쉬의 순서를 바꿀 경우 결과가 반대로 나옴 순서가 중요함!! git diff<이 커밋에 비해><이 커밋이 뭐가 달라?>

4. git log --oneline : 깃 로그를 짧게 따와서 해쉬도 짧게 쓸 수 있음

작업 되돌리기 ( 실습이 많이 필요, 실무에서 예민한 상황일 때 실수하면 큰일남 )

만들어진 버전을 되돌리는 두 가지 방법 revert / reset
두 가지의 차이점을 아는 것이 중요함!

revert : 버전을 되돌린 새로운 버전 만들기 ( 그 버전과 완벽하게 동일한 새로운 커밋을 만듦 ) ( 지금까지의 작업에 영향을 주지 않음 )

지금까지 버전 동일하게 유지되고, 새로운 커밋이 원하는 그 전버전으로 되돌려짐

작업내역을 남기고 싶을 때 / 불필요한 커밋이 생길 수 있고, 지저분해질 수 있음

reset : 버전을 완전히 되돌리기

커밋의 log를 깔끔하게 유지하고 싶을 때

둘다 많이 쓰임!

reset에는 세가지 종류가 .. soft / mixed / hard

soft는 딱 commit만 하기 전으로 되돌아감

mixed는 stage로 add딱 하기 전으로 되돌아감

hard는 working directory에서의 변경사항까지도 볼 수 없게 리셋됨

여러개의 버전을 뛰어넘을 땐 hard를 많이 씀

push와는 별개의 내용 로컬 저장소에서만 reset이 되는것.

push도 취소 가능함 reset후에, git push --force or git push -f 하면 되긴하는데, 협업시에 사용은 좋지않음.

git reset 뒤에는 되돌아갈 커밋을 쓰면 됨

--soft / --mixed / --hard <커밋>
쓰지않으면 mixed가 기본값으로..

git revert 뒤에는 취소할 커밋을 쓰면 됨 (revert 를 취소라 생각하자)

작업물 임시저장하기 Stash

버리긴 아깝고 쓰긴 아쉬운 코드가 있을 때..

Stash를 사용하면 지금까지 한 작업물을 임시저장해뒀다가 불러올 수 있음

git stash : 변경사항 임시 저장하기

git stash -m "<message>" : 변경사항 메세지와 함께 임시 저장하기 (이쪽을 더 권장함)

stash 하면 임시저장되기 때문에, 변경사항들도 다 사라짐 진짜 어딘가로 저장만 해둘 수 있는 것

git stash list : 임시저장한 stash 리스트 불러오기
stash@{숫자} 가 순서라고 보면됨
숫자 == 최근에 임시저장되었을수록 0에 가깝다

git stash apply stash@{1} : 1번의 임시저장stash를 현재 작업물에 적용시킴

git stash drop stash@{숫자} : stash 삭제

branch
브랜치가 뭐에요??

버전의 분기입니다. 버전을 여러개의 흐름으로 관리하는 방법입니다.

브랜치로 관리를 잘 하면 무조건 +점수 commit log를 깔끔하게 관리하고, commit메시지를 얼마나 자세하게 적는지

1. 브랜치를 나눈다

2. 각자의 브랜치에서 작업한다.

3. (필요하다면) 나눈 브랜치를 합친다

브랜치를 나눈다면 협업할 때도 같은 부분을 다르게 수정한 부분만 보면 된다.!! = conflict

브랜치를 만들 때도 어디 기준으로 분기할지는 지금 위치 기준이라 위치한 브랜치가 중요함.

git branch : 브랜치 보기 , 현재 속한 (checkout 되어있는) 브랜치는 별 \* 로 뜸

git branch <브랜치 이름> : 브랜치 생성

git checkout <브랜치 이름> : 브랜치 변경

git checkout -b <브랜치 이름> : 브랜치 생성과 동시에 변경

git branch -d <브랜치 이름> : 삭제 , 체크아웃되어있으면 안됨

git diff <브랜치 이름> <브랜치 이름> : 브랜치끼리의 차이 보기 근데 별로 안쓰임 독립적이기 때문에

브랜치 이름 = 브랜치 전략을 수립해야함 회사, 조직마다 다름

기능을 위한건 feature/기능

메뉴는 menu/메뉴

릴리즈를 위한 네이밍
release/2.3.0 : 2.3.0버전 릴리스를 위한 브랜치

HEAD와 체크아웃

HEAD는 이정표, 포인터임 현재 작업중인 브랜치의 커밋을 가리킨다.

★일반적으로 현재 작업중인 브랜치의 가장 최신 커밋을 가리킨다.

checkout은 결국 head의 위치를 특정 브랜치의 최신 커밋으로 옮기는 것!!

메인을 수정하기보단, 그 버그 수정을 위한 브랜치를 만들고, 메인으로 합치고, 기능을 위한 브랜치 만들어서 커밋해서 메인으로 합치고
이런식의 반복임. 메인수정은 XX

Merge

했던 모든 브랜치의 커밋이 main브랜치로 커밋됨. 전부다

main 브랜치에서 merge를 해야함.

main에서 변화가 없었으면 그냥 병합하면 끝이니까 빨리감기 병합 (fast-forward merge)이라고 함.

변화가 있었으면 (이상황이 더 일반적) main과 병합할 브랜치 두개가 병합된 새로운 커밋이 생성됨!!

git merge <병합할 브랜치> : (병합할 브랜치에서) 병합하기

충돌 해결하기
revert, stash apply, merge에서 정말 자주 생김. 일상적으로 할 수 있을정도로 실습해야함

같은 내용을 다르게 수정했을 때 생김.

<<<<<<<HEAD
main <- 현재 브랜치(main)의 내용
=======
foo <- foo 브랜치 내용

> > > > > > > foo

둘중에 어느걸로 할거니?? 라는 거임

충돌이 발생했을 때 해결법

1. 직접 선별한다
   최종적으로 남기고싶은거 뺴고 전부다 지운다
   <<< 표시와 >>> 표시와 지울것 플러스 ====까지
   그리고 저장

2. add하고 git commit
   그럼 merge로 자동 commit 메시지가 떠줌

clone : git init할필요 없음 .git과 그 모든 버전들까지 전부 받아올 수 있는 것

pull request로 협업하기!!!!

일반적으로 내가 소유하지 않은 원격 저장소에 푸시할 수 있을까?

collaborator로 초대하면 가능은한데.. push권한은 최소화하는거가 좋음 쓰지마셈.

그 방법이 PR!! pull request
내 변경사항을 pull 하도록 request 하는것

받아들이면 merge

PR 5단계

1. 기여하려는 저장소를 본인의 계정으로 포크하기
2. 포크한 저장소를 클론하기
3. 브랜치 생성 후 생성한 브랜치에서 작업하기
4. 작업한 브랜치 푸쉬하기 ( ★작업한 브랜치를 푸쉬하는 것이 중요함 )
5. PR 보내기
