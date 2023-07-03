---
title: "배포 전과정"
date: 2023-06-29
subtitle: "배포 전과정"
category: "AWS"
draft: true
---

EC2 인스턴스 만들때
storage는 넉넉히 14~16gb
보안그룹 가서 포트를 다음과 같이 열어야함
![Alt text](image-3.png)

PuTTY로 켰으면

sudo apt-get update -y
sudo apt-get install -y
-y옵션은 yes or no 선택지 바로 Yes시켜주게끔 하는 옵션

sudo apt-get install docker.io -y

sudo apt-get install docker-compose

sudo vi docker-compose.yml

```yml
version: "3"
services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins_cicd
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /jenkins:/var/jenkins_home
    ports:
      - "8080:8080"
    privileged: true
    user: root
```

/var/ 이후 경로는 바꿔도 되긴하는데 그냥 쓰자

sudo docker-compose up -d
도커 컨테이너 올리기
빌드하면서 이미지를 올리겠다

sudo docker-compose ps -a
-a로 모든 컨테이너를 볼수있음 -a가 없으면 올라가있는 컨테이너만 확인

sudo docker logs 컨테이너id

인바운드 규칙 편집에
8080, 8000, http 세개 추가

IPv4:8080
도커 컨테이너가 올라가있어야 접속가능함

1. 아래 명령어로 docker로 들어가 키를 확인하거나
   sudo docker exec -it 1 /bin/bash
   cd /var/jenkins_home/secrets/
   cat initialAdminPassword

sudo로 들어갔으면 sudo입력 하지 않아도됨

2. sudo docker ps <컨테이너 ID>
   id 다칠필요 없음
   그럼 jenkins password를 알려줌 그거로 http://3.37.130.97:8080/에 입력

비밀번호를 입력해 왼쪽 기본 세팅으로 도커 이미지 안에 세팅값 추가

admin계정생성 후
![Alt text](image.png)
이 화면

### sudo docker exec -it 1 /bin/bash

젠킨스 ssh키를 젠킨스 도커 컨테이너 안에 작성해줄것이다.

- 젠킨스 도커 컨테이너 들어가기
  이후 컨테이너 안에서
  cd /
  cd /var/jenkins_home/
  mkdir ./.ssh
- 폴더만들기

ssh-keygen -t rsa -f /var/jenkins_home/.ssh/jenkins_ci

엔터로 이메일 패스워드는 생략가능
.pub가 public key, 없는게 private key
private key와 pubkey의 차이는?

-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----

---절취선까지 복사해야함

Jenkins 관리로 와서 Credentials
(http://3.37.130.97:8080/manage/credentials/)

Global눌러서 Add Crendentials

Kind = SSH Username with private key

Username만 구분할 수 있도록 아무거나

Private Key - Enter directly 선택한 뒤 Key에 절취선 포함해서 붙여넣어주고 Create

띄울 깃허브 settings가서 Deploy keys

가서 .pub 공개키를 key에 붙여넣어줌
ssh-rsa AAAAB3NzaC1yc2EAAAAD 이후중략..

Webhooks에서 payload url에

http://3.37.130.97:8080/github-webhook/ 넣어주고 Add webhook

젠킨스 홈 - 새로운 ITEM - Freestyle Project로 추가

SSH 깃허브 포크 복사후

소스코드 관리
Git
Repositories URL 에 복붙
Credentials 선택

빌드유발
GitHub hook trigger for GITScm polling 체크

Build Steps에 어떤 쉘 명령어를 시킬지 정하기

```bash
python3 ./manage.py makemigrations
python3 ./manage.py migrate
```

requirements가 있다면 넣어도 좋음
pip install -r requirements.txt

jenkins 컨테이너 안에서

sudo apt-get update -y
sudo apt-get install -y
-y옵션은 yes or no 선택지 바로 Yes시켜주게끔 하는 옵션

sudo apt-get install docker.io -y

apt-get install python3 pip -y

+pip install로 django 설치

- 에러
  Building in workspace /var/jenkins_home/workspace/test-jenkins
  FATAL: Git repository URL 2 is an empty string in job definition. Checkout requires a valid repository URL
  java.lang.IllegalArgumentException: Git repository URL 2 is an empty string in job definition. Checkout requires a valid repository URL

구성 - repository에 시뻘건 글씨 git -remote -h -git@github.com/주소/:HEAD 같은 에러. 이 명령어를 PuTTY 로 실행시켜주자

- 에러2
  File "/var/jenkins_home/workspace/test-jenkins/AIA6_BackEnd/settings.py", line 13, in <module>
  with open(secret_file, 'r') as f:
  FileNotFoundError: [Errno 2] No such file or directory: '/var/jenkins_home/workspace/test-jenkins/secrets.json'
  Build step 'Execute shell' marked build as failure
  Finished: FAILURE

작업환경은 /var/jenkins_home/workspace/test-jenkins/ 안에 있다.

환경변수로 secrets.json이 있는 프로젝트였는데 추가해주지 않아 발생했던 에러

apt-get install vim으로 vi를 설치한 후에 secrets.json을 만들어 해결

- 에러3
  FATAL: Git repository URL 2 is an empty string in job definition. Checkout requires a valid repository URL
  java.lang.IllegalArgumentException: Git repository URL 2 is an empty string in job definition. Checkout requires a valid repository URL

빈 두번째 Repository를 만들어뒀더니 떴던 에러

### PuTTY환경에서 직접 설치해보면서 디버깅하는 방법

requirements.txt 를 설치하면서 에러가 났다면

pip install -r requirements.txt를 컨테이너에서 치면서 확인해볼 수 있다

### 궁금한점

GitHub hook trigger for GITScm polling의 의미

push시에 자동화가 어떻게 이루어지고 있는가

## 메모리 초과

EC2 Free tier를 사용하면메모리 초과로 젠킨스 컨테이너가 멈춰버리는 경우가 있다.
1GB 메모리라는 적은 용량이기에..
때문에 스왑메모리를 사용해보는게 좋다.
컨테이너 환경 안이 아닌 나와서 ubuntu@환경에서 순서대로 입력. 오래걸리니까 천천히 기다리고 .
sudo dd if=/dev/zero of=/swapfile bs=128M count=16

sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

- 껐다켜도 동작할 수 있게끔

sudo vi /etc/fstab

최하단에 아래 명령어 추가하고 저장
/swapfile swap swap defaults 0 0

명령어 `free`를 치면 스왑메모리 확인이 가능하다

#### 젠킨스 슬랙에 연결하기

슬랙 워크스페이스 추가

앱에서 젠킨스 추가
단계에서
팀 하위 도메인: jenkins-vpm6985
통합 토큰 자격 증명 ID: xw5aWFTB0kBhh6eGoypBNOq5 토큰을 값으로 사용하여 암호 텍스트 자격 증명을 생성합니다.

두개의 값을 저장

젠킨스 페이지로와서 Jenkins 관리

Plugins

slack 검색해서 slack notification - install without restart

#### 젠킨스 비밀번호를 잃어버렸을 경우

cd /var/jenkins_home/
에 vi config.xml에서 useSecurity를 false로 하고 비밀번호를 바꾼 후 다시 true로 해주는게 좋음
sudo docker-compose restart

다시 젠킨스관리 / Credentials
Global credentials (unrestricted)

secret text
secret에는 통합토큰자격증명
ID는 아무거나

젠킨스 파일 환경설정으로 와서
build steps
고급버튼 누르고 success랑

빌드후조치
Notify Success
Notify Every Failure
체크

고급 눌러서
workspace에 팀하위도메인

credential

Channel에 #어디로 메세지날릴지 #일반 등으로

## 도커올리기

젠킨스 환경으로 와서(/var/jenkins_home/workspace/test-jenkins/)

vi Dockerfile

```bash
FROM python:3.8
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY . .
EXPOSE 8000
CMD ["./manage.py","runserver","8000"]
```

sample1

```bash
FROM python:3.11.2

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apt-get update
RUN apt-get install -y apt-utils vim curl
RUN apt-get -y install python3
RUN apt-get -y install python3-pip
RUN pip install --upgrade pip
RUN apt-get install python3-dev default-libmysqlclient-dev build-essential
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["./manage.py", "runserver","8000"]
```

sample2

cd ../../이후
vi Docker_CD.sh

```bash
DOCKER_REPOSITORY_NAME=$1
ID=DOCKER_HUB_ID
PW=DOCKER_HUB_PW
#docker image의 첫 tag를 확인 후, 다음 버전의 image를 생성
#만약 처음 생성되는 이름이라면 0.01 이름으로 생성해준다.
TAG=$(docker images | awk -v DOCKER_REPOSITORY_NAME=$DOCKER_REPOSITORY_NAME '{if ($1 == DOCKER_REPOSITORY_NAME) print $2;}')
# 만약 [0-9]\.[0-9]{1,2} 으로 버전이 관리된 기존의 이미지 일 경우
if [[ $TAG =~ [0-9]\.[0-9]{1,2} ]]; then
    NEW_TAG_VER=$(echo $TAG 0.01 | awk '{print $1+$2}')
    echo "현재 버전은 $TAG 입니다."
    echo "새로운 버전은 $NEW_TAG_VER 입니다"
# 그 외 새롭게 만들거나, lastest or lts 등 tag 일 때
else
    # echo "새롭게 만들어진 이미지 입니다."
    NEW_TAG_VER=0.01
fi
# 현재 위치에 존재하는 DOCKER FILE을 사용하여 빌드
docker build -t $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER .
# docker hub에 push 하기위해 login
docker login -u $ID -p $PW
if [ $NEW_TAG_VER != "0.01" ]; then
    docker rmi $DOCKER_REPOSITORY_NAME:$TAG
fi
# 새로운 태그를 설정한 image를 생성
docker tag $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER
# docker hub에 push
docker push $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER
# tag가 "latest"인 image를 최신 버전을 통해 생성
docker tag $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER $ID/$DOCKER_REPOSITORY_NAME:latest
# latest를 docker hub에 push
docker push $ID/$DOCKER_REPOSITORY_NAME:latest
# 버전 관리에 문제가 있어 latest를 삭제
docker rmi $ID/$DOCKER_REPOSITORY_NAME:latest
docker rmi $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER
```

버전자동화

젠킨스로와서 Build Steps
execute shell 추가

```bash
bash /var/jenkins_home/CICD/Docker_CD.sh "ecocanvas_backend"
```

이름맞춰서

dockerhub에서
create repository
Docker_CD와 이름맞춰서

#### ERROR: Error fetching remote repo 'origin'

도커 컨테이너를 내려버리는 실수를 해서
ssh 연결 키부터 다 취소가 되어버림. remote 연결까지.

#### 에러 : docker no such image

sudo systemctl restart docker
도커 재시작

df -h
도커 파일 용량확인

### ec2 용량 문제 에러

ec2를 쓸때 프리티어 기본 8기가는 너무작다.
write /var/lib/docker/tmp/GetImageBlob1462395733: no space left on device
항상 이에러에서 머물러있었음
ec2 storage를 넓혀주고 빌드해보자

##

# 이제부터 CD 배포 인스턴스

CD 환경에 스왑메모리
apt install get 까지만 진행

CI 환경에 젠킨스에 vi docker-compose.yml
여기에 어떤 서비스를 어떻게 올릴건지

```bash
version: "2"

service:
  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx:/etc/nginx/conf.d
    depends_on:
      - django_web

  django_web:
    image: nuee123/coovie_backend:latest
    container_name: django_web

    command: gunicorn --bind 0.0.0.0:8000 AIA6_BackEnd.wsgi:application
    expose:
      - "8000"
```

80포트(http)로 들어온 신호를 구니콘과 엮어 8000포트로 내보낼거다?

mkdir nginx
cd nginx
vi nginx.conf

```bash
upstream django_web {
    ip_hash;
    server django_web:8000;
}
server {
    location / {
        proxy_pass http://django_web/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /static {
        alias /staticfiles/;
    }
    listen 80;
    server_name localhost;
}
```

static 사용하지 않았으면 /static세줄은 지우기

젠킨스관리 - 플러그인 - available plugins - Publish Over SSH 체크

이후 Download로 Restart 체크해서 재시작까지

젠킨스관리 - System - 맨 아래 Publish Over SSH

Key에 처음 발급한 PrivateKey를 절취선까지 넣어줌

SSH Server - 고급
![Alt text](image-1.png)
hostname은 ipv4

SSH로 초반에 만든 키는 임의로 만들었던 거고
지금 입력하는 pemkey는 초반에 PuTTY로 만든 pem을 입력해야함

젠킨스 - 프로젝트 - 구성(톱니) - 빌드후 조치

슬랙 notification이 위로오게끔 해야함
무엇을 먼저 동작시켜야하는지 고려해야함

![Alt text](image-2.png)

SSH: Connecting from host [5da709b8c751]
SSH: Connecting with configuration [CoovieServer] ...
SSH: EXEC: completed after 601 ms
SSH: Disconnecting configuration [CoovieServer] ...
ERROR: Exception when publishing, exception message [Exec exit status not zero. Status [1]]
Build step 'Send build artifacts over SSH' changed build result to UNSTABLE
[Slack Notifications] found #25 as previous completed, non-aborted build
Finished: UNSTABLE

mv docker-compose.yml ./deploy/
mv nginx/ ./deploy/

CI환경 deploy에 docker yml과 nginx 옮겨주기

CD환경에서 deploy 폴더가 만들어져야함
sudo docker-compose pull
가 잘 되어야함

잘 CD가 되었는지 확인은
CD환경에서 sudo docker ps로 잘 up되고있는지

volumes 설정으로 내맘대로 올리고 싶은 것을 올려 세팅할 수 있도록

CD서버에는 건드리지 않아야함

https://www.dongyeon1201.kr/9026133b-31be-4b58-bcc7-49abbe893044

이 환경에 대한 이해가 필수적이어야 이제 https에 대한 접근이 가능하고, 기능을 덧붙여 나갈 수 있다

80이 http, 443이 https

22번포트는 SSH

고정되어있는 규약 포트

TCP IP
