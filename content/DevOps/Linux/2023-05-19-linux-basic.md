---
title: "Linux Basic"
date: 2023-05-19
subtitle: "Linux 기초"
category: "Linux"
draft: false
---

![linux penguin](image.png)

# Linux

> 컴퓨터 OS 커널의 일종인 리눅스 커널, 또는 리눅스 커널을 사용하는 운영체제를 가리키는 말이기도 하다. GNU 쪽 사람들은 리눅스는 커널일 뿐이고, 이 커널을 가져다가 GNU 프로그램들을 올려 만든 운영체제는 GNU/Linux라고 이야기하며 이런 명칭에 민감하게 반응하는 경우도 있다. 소스 코드가 공개되어 있는 대표적인 오픈 소스 소프트웨어다. 컴퓨터 역사상 가장 많은 참여자가 관여하고 있는 오픈 소스 프로젝트다. 모바일 운영체제로 유명한 안드로이드 역시 리눅스 커널을 가져다 쓰고 있다. ([출처](https://namu.wiki/w/Linux#s-1))

## WSL2

써봤더니 느리다. venv설치가 너무 오래걸린다 원래 이런걸까

## Ubuntu

- What is debian?
  - linux 자체가 특정 OS인 것이 아니다. Windows에 7, 8, 10 등의 다양한 OS가 존재하듯, Linux도 Debian, Ubuntu, Redhat, CentOS 등의 OS가 존재한다.

## Linux Command

- **./**가 현재 있는 경로에서 command를 실행하겠다는 의미  
  모든 명령어의 경로가 ./가 생략되어있다고 생각하면 된다.

- ./로 시작하면 지금폴더부터 시작하는 상대경로
- /로 시작하면 root부터시작하는 절대경로

```bash
Linux의 명령어는 명령어 -옵션 의 구조로 이루어져 있습니다.
ls    # 파일 목록을 보여주는 명령어
ls -l # -l : 파일 목록을 리스트로 더 자세히 보여주는 옵션
ls -a # -a : 숨김 파일까지 보여주는 옵션

2개 이상의 옵션을 한번에 사용할 수도 있습니다.

ls -al # 옵션의 순서는 무관합니다.

일부 명령어는 *source와 *destination의 구조로 이루어져 있습니다.

cp a.txt a_copy.txt # a.txt를 a_copy.txt로 복사
cp -r folder folder_copy # folder를 복사 할 때는 -r 옵션이 필요합니다.
```

- `ls`
- `pwd` : Print Working Directory
- `cp` : Copy files
- `rm` : Remove (-rf: recursive + force(directory를 지울때는 꼭 필요))
- `mv` : move / rename (mv `옵션` `이동 할 파일` `이동 될 위치`)
- `cd` : Go to the home directory
- `cd` - : Return to the previous directory
- `cd` `<directory>` (tab키 사용해보자) change dircetory
- `cd` ..
- `cd` /
- `chmod` : Change mode 파일의 권한(permission)변경 r=read w=write x=execute
  ![](https://blog.kakaocdn.net/dn/dKxXah/btq1jkZjWmO/2sWah94UmO18fUdkXzEnM1/img.png)[이미지 출처](https://recipes4dev.tistory.com/175)
- `clear`
- `touch` 파일 생성
- `mkdir` 폴더 생성
- `cat` : concatenate 파일 열기 (출력만가능)
- `head` : 파일의 시작 부분부터 보기 (기본이 10줄, -50등으로 옵션 추가가능)
- `tail` : 파일의 끝 부분부터 보기 (기본이 10줄, -50등으로 옵션 추가가능)
- `vi` : vi(visual editor) 파일 편집 (i, esc, :wq, u(undo) yw:커서가 있는 단어 복사, yy 한줄 복사 p붙여넣기 ...)
- `vim` : vi + improved vi도 vim이 실행되도록 되어있음
- `kill` 강제종료
- `man` -명령어 매뉴얼 보기
- `code` (vscode)
- `whoami`
- `sudo` (SuperUser Do)
- `apt-get` : apt = **Advanced Package Tool**
- `yum`, `pacman` : ?
- `sudo` apt-get install
- `sudo` apt-get update : apt-get으로 설치 가능한 패키지 리스트 최신화
- `sudo` apt-get upgrade : 위에서 업데이트한 리스트 실제 설치
- `lsb_release` -a : ubuntu version
- `which` : which python3 파이썬 경로 출력(binary path?)
- `unzip`
- `passwd` : 비밀번호 변경
- `ping` 네트워크 상황(핑)점검
- `history`
- `exit`
- `shutdown`
- `git` ...

```bash
grep word ./* # 현재 경로의 모든 파일을 대상으로 word라는 단어가 포함된 파일 찾기
grep word ./* -r # -r 옵션을 붙이면 디렉토리 내부까지 모두 탐색합니다.
```

```bash
find / -name "*.txt" # 최상위 경로에서 .txt로 끝나는 파일 혹은 디렉토리 검색
find ./ -type d # 현재 경로에서 모든 디렉토리 검색
find ./ -type f -name "*.txt" # 현재 경로에서 .txt로 끝나는 파일 검색
```

```bash
history # 지금까지 사용한 명령어 출력
```

```bash
htop # 현재 사용중인 리소스 확인하기
```

```bash
df -h # 디스크 여유 공간 확인하기
```

```bash
du -sh ./* # 현재 경로의 파일 및 디렉토리가 차지하는 용량 확인하기
```

터미널 관리자 권한으로 실행하기  
code ~/.zshrc  
alias python=python3.11 : 3.11을 기본값으로 실행하기  
설치할 것이 있다면 <설치할 것> install ubuntu로 구글링  
리눅스 말고 꼭 윈도우에 깔아야하는 것들도 있음 ex)mongoDB..

### vi Command

- vi 편집기 mode 종류
  - insert mode : 텍스트를 입력 할 수 있는 상태
  - commend mode : 특수한 commend를 입력 할 수 있는 상태
- insert mode 진입 방법
  - `i` : 현재 위치에서 insert mode 진입
  - `a` : 현재 위치에서 커서를 한 칸 앞으로 이동 후 insert mode 진입
  - `A` : 현재 위치에서 가장 마지막 텍스트로 이동 한 후 insert mode 진입
  - `o` : 현재 위치에서 한칸 개행 한 후 insert mode 진입
  - `esc` : insert mode 나가기
- commend mode 명령어
  - `u` : undo (ctrl + z와 동일)
  - `ctrl + r` : redo
  - `gg` : 커서를 가장 처음으로 옮김
  - `G` : 커서를 마지막 줄로 옮김
  - `dd` : line 잘라내기
  - `yy` : line 복사
  - `p` : 붙여넣기
  - `:se nu` : 라인 줄 표시(set number)
  - `:숫자` : 숫자 라인으로 이동 (ex - `:10` : 10번째 라인으로 이동)
  - 특정 단어 검색
    - `/word` : word라는 단어를 검색
    - `/\cword` : 대소문자를 구분하지 않고 word라는 단어를 검색 (ex - /\cword)
    - `n` : 다음 단어 검색
    - `N` : 이전 단어 검색
  - 수정한 문서 저장
    `:w` : 저장
    `:q` : 나가기
    `:wq` : 저장 하고 나가기
    `:q!` : 수정내역이 있어도 저장하지 않고 강제로 나가기

## Linux Directory

- 디렉토리를 구분하는 문자가 윈도우('\', 역슬래시)와 달리 리눅스는 '/'(슬래시)
- 윈도우에서는 폴더(folder)라고 불리는 명칭이 리눅스에서는 디렉토리(directory)라고 불림
- 리눅스 시스템의 디렉토리 구조는 전체적으로 역 트리(tree) 구조
- 명령어의 종류와 성격, 사용권한등에 따라 각각의 디렉토리들로 구분

- directory가 `/`이면 ls 입력 시 `bin`,`dev`,`home` 등이 보이는데, 이것들이 다 linux 관련 폴더들 linux의 루트 폴더임.
  - `home` 사용자 홈 디렉토리가 생성되는 곳
  - `media` CD_ROM이나 USB같은 외부 장치를 연결하는 디렉토리
  - `opt` 추가 패키지가 설치되는 디렉토리
  - `dev` 장치파일들이 저장되어 있는 디렉토리
  - `root` root계정의 홈 디렉토리 (/ 디렉토리와는 다름)
  - `sys` 리눅스 커널관련 정보가 있는 디렉토리
  - `usr` 기본 실행파일과 라이브러리 파일, 헤더 파일등의 파일이 저장되어있는 디렉토리
  - `boot` 부팅에 필요한 정보를 가진 파일들이 있는 디렉토리
  - `var` 시스템 운영중에 발생한 데이터와 로그가 저장되는 디렉토리
  - `tmp` 시스템 사용중에 발생한 임시데이터가 저장됨 (부팅 시 초기화)
  - `srv` FTP나 Web등 시스템에서 제공하는 서비스의 데이터가 저장되는 디릭토리
  - `run` 실행중인 서비스와 관련된 파일이 저장되는 디렉토리
  - `proc` 프로세스 정보 등 커널 관련 정보가 저장되는 디렉토리입니다.
  - `mnt` (mount)파일 시스템을 임시로 연결하는 디렉토리
  - `etc` 리눅스 설정을 위한 각종 파일들을 가지고 있는 디렉토리

![](https://blog.kakaocdn.net/dn/48thh/btrjWoBqE9N/zNKiC8M6WIkQWrKQJQkpM0/img.png)[출처](https://computer-science-student.tistory.com/408)

지금 연결하고 있는 WSL2 기준, mnt의 c d g등으로 윈도우와 연결이 가능  
`/mnt`에서 윈도우의 파일이 변경 가능한 것  
linux의 home directory에서 작업해도 되지만,  
윈도우에 파일들을 저장하는 것이 WSL에 큰 일이 나더라도 안전할 수 있다

이런식으로 `/mnt`에서 linux 콘솔을 사용하여 윈도우에 파일을 건드릴 수 있지만,  
반대로 윈도우에서 linux 파일들을 건드리기 시작하면 망가지기 시작할 수 있다  
윈도우에선 어느 linux 파일도 건드리지 않기!

#### Deadsnakes로 ubuntu에 파이썬 설치하기

https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa

apt는 패키지를 다운로드 받기 위해 데이터베이스에 찾으러감. 어떤 패키지는 데이터베이스에 없을 수도 있음  
그때 PPA(Personal Package Archive)로 따로 update 해줄 수 있음

```
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
```

## Git CLI

```
sudo apt-get install git
```

터미널로 깃허브 관리하기
https://github.com/cli/cli/blob/trunk/docs/install_linux.md

```
git config --global user.name `유저네임`
git config --global user.email <이메일>
```

이후 authorization..  
명령어도 공부

## Linux python version

버전 관리
