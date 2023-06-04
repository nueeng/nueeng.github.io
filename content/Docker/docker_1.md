---
title: "Docker Basic"
date: 2023-06-01 5:57:52
subtitle: "도커 시작"
category: "Category Docker"
draft: true
---

# Docker

[![https://www.docker.com/](https://velog.velcdn.com/images/nueeng/post/998f94bc-69f6-4df1-8ced-924f34f233ea/image.png)](https://www.docker.com/)

- Application을 컨테이너 환경에서 테스트 및 배포할 수 있게 해주는 소프트웨어 플랫폼.

## Container

<a href="https://www.weave.works/blog/a-practical-guide-to-choosing-between-docker-containers-and-vms">
<img src="https://images.contentstack.io/v3/assets/blt300387d93dabf50e/bltb6200bc085503718/5e1f209a63d1b6503160c6d5/containers-vs-virtual-machines.jpg">
</a>

        
- 보통 배포는 하나의 서버에서 모든걸 해결하는게 아닌, 2개 이상의 서버가 필요하게 되는데 그 때 Docker를 사용하면 동일하지만 독립적인 환경 즉, 컨테이너를 쉽게 생성하고 관리할 수 있다.

## Image
> Docker 이미지는 Docker 컨테이너를 생성하기 위한 실행 가능한 패키지입니다. Docker 이미지는 애플리케이션, 라이브러리, 환경 설정 및 모든 종속성을 포함하는 파일 시스템의 스냅샷입니다. 이러한 이미지는 읽기 전용이며, 컨테이너를 실행하는 데 필요한 모든 정보를 가지고 있습니다.

- Layer
- Build
- registry


## SSH
Linux 환경에서 작업할 때는 일반적으로 서버에 직접 접근에서 작업하는 것이 아닌, ssh 연결을 하여 작업하게 된다.

`SSH`란 `Secure SHell`의 약자로, 네트워크 상에 존재하는 다른 컴퓨터에 접근하거나
파일을 업/다운로드 하는 등의 작업을 할 수 있는 프로토콜이다.

AWS EC2 인스턴스를 `ssh -i <.pem file private key> ubuntu@<EC2 Public IPv4 address>`로 실행하자.

연결 후,  

`sudo apt update` apt install 명령어로 설치할 수 있는 패키지들을 최신화한다.  
※ update 옵션은 os 설치 후 최초 한 번만 실행시켜 주면 된다.


https://docs.docker.com/get-started/overview/