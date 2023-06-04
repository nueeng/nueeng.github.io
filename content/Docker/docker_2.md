---
title: "Docker Setup"
date: 2023-06-01 5:57:52
subtitle: "도커"
category: "Category Docker"
draft: true
---

# Docker

[![https://www.docker.com/](https://velog.velcdn.com/images/nueeng/post/998f94bc-69f6-4df1-8ced-924f34f233ea/image.png)](https://www.docker.com/)


- docker 패키지 설치
    
    ```bash
    sudo apt install docker.io -y
    # 만약 아래와 같은 에러가 발생한다면
    # E: Package 'docker.io' has no installation candidate
    # sudo apt update 명령어 실행 후 docker 패키지를 다시 설치해주세요
    ```
    
- docker 설치 확인
    
    ```bash
    sudo docker --version # 도커 버전이 출력되는지 확인합니다.
    # Docker version 20.10.12, build 20.10.12-0ubuntu2~20.04.1 - 정상
    # command not found: docker 와 같은 문구가 출력될 경우 docker가 설치되었는지 확인해야 합니다.
    ```
    
- docker 컨테이너 생성하기
    
    ```bash
    sudo docker run -d -p 80:80 httpd:latest
    # run : 이미지를 사용해 컨테이너를 실행시킵니다.
    # -d : 컨테이너를 데몬(백그라운드)으로 실행시킵니다.
    # 80:80 : 80번 포트로 접속했을 때 컨테이너에 접근할 수 있도록 포트포워딩 설정을 해줍니다.
    # httpd:latest : httpd의 가장 최신 이미지를 사용해 컨테이너를 생성합니다.
    ```
    
- 실행중인 컨테이너 확인하기
    
    ```bash
    sudo docker ps # 실행중인 컨테이너 목록 확인하기
    # CONTAINER ID : 컨테이너가 가지고 있는 고유한 id
    # IMAGE : 컨테이너가 생성될 때 사용된 이미지
    # COMMAND : 컨테이너가 생성될 때 실행되는 명령어
    # CREATED : 생성 후 경과 시간
    # STATUS : 컨테이너 상태
    # PORTS : 사용중인 포트
    
    sudo docker ps -a
    # -a : 중지된 컨테이너 목록까지 포함해서 모두 확인하기
    ```
    
- 다운받은 이미지 확인하기
    
    ```bash
    sudo docker images
    # REPOSITORY : 이미지 저장소 이름
    # TAG : 이미지 버전
    # IMAGE ID : 이미지의 고유한 id
    # CREATED : 이미지 생성일(마지막 업데이트 일)
    # SIZE : 이미지 용량
    ```
    
- 컨테이너 내부로 들어가보기
    
    ```bash
    sudo docker exec -it $container_id /bin/bash
    # $containser_id : sudo docker ps를 쳤을 때 확인되는 container_id를 입력합니다.
    # /bin/bash : 컨테이너에 접속할 때 사용되는 쉘을 입력합니다.
    # 이미지에 따라 /bin/bash라는 쉘이 존재하지 않을 수 있는데, 이 경우에는 /bin/sh를 사용해 접속합니다.
    # 나가기 exit
    ```
    