---
title: "Docker Compose"
date: 2023-06-01 5:57:52
subtitle: "도커"
category: "Category Docker"
draft: true
---

# Docker Compose

[![https://www.docker.com/](https://velog.velcdn.com/images/nueeng/post/998f94bc-69f6-4df1-8ced-924f34f233ea/image.png)](https://www.docker.com/)


## 컨테이너 포트 포워딩 설정하기

<aside>
직접 생성한 컨테이너를 외부에서 접근할 수 있도록 포트포워딩 설정을 해주는 방법에 대해 알아보겠습니다.

</aside>

- 포트 포워딩(port forwarding)이란?
    
    <aside>
    db, web, ssh 등 다양한 서비스는 기본적으로 가지고 있는 포트 번호가 존재합니다.
    
    - 포트 번호 예시
        - http : 80
        - https : 443
        - postgresql : 5432
        - django : 8000
        - ssh : 22
    
    포트 포워딩이라는 이름과 같이, 외부에서 서버의 특정 포트에 접근했을 때 지정한 서비스로 전달해 주는 것을 의미합니다.
    
    예를 들어 특정 컨테이너의 포트포워딩 설정을 80:8000과 같이 해줬다면, 외부에서 80 포트로 접속했을 때 해당 컨테이너의 8000번 포트로 접속하겠다는 의미입니다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1a78f2e-efec-4a3a-a0c7-4f40454f6b83/Untitled.png)
    
    ※ 웹 브라우저에서 naver.com과 같은 사이트에 접근할 때 https://www.naver.com과 같은 주소로 접근하게 되는데, http 프로토콜은 기본적으로 80 포트를 사용하고 https 프로토콜은 443 포트를 사용하게 되며 이는 웹 브라우저에 주소를 입력할 때 생략됩니다.
    
    </aside>
    
- docker-compose.yml
    
    ```yaml
    version: '3.8' # docker-compose.yml에 사용될 문법 버전을 정의합니다.
    
    services:
      example: # 서비스 이름을 지정합니다. 서비스 이름은 컨테이너끼리 통신할 때 사용됩니다.
        container_name: example # 컨테이너 이름을 지정합니다.
        image: 'httpd:latest' # 컨테이너를 생성할 때 사용될 이미지를 지정합니다.
        ports: # 포트포워딩을 설정해줍니다.
         - 80:80 # 외부에서 80 포트로 접속했을 때 컨테이너의 80 포트로 연결해줍니다.
        restart: always # 컨테이너가 종료됐을 때 다시 실행시켜 줍니다.
    ```
    
- 컨테이너 실행시켜보기
    
    ```bash
    sudo docker compose up -d
    ```
    
- 컨테이너 로그 확인하기
    
    <aside>
    💡 docker로 앱을 배포하다 보면 배포가 정상적으로 되고 있는지 정상적으로 확인해야 하는 경우가 있습니다. 이 때, docker compose logs 명령어를 사용해 컨테이너가 정상적으로 동작하는지 확인할 수 있습니다.
    
    sudo docker compose logs
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a16b053c-134c-47a4-b5a7-307160ab1c47/Untitled.png)
    
    이 때, -f 옵션을 추가하면 컨테이너가 동작하며 발생하는 로그를 실시간으로 확인할 수 있습니다.
    
    sudo docker compose logs -f
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f3dad29-aefd-4fe8-9550-ab2d538a9c41/Untitled.png)
    
    ※ -f 옵션을 사용한 경우 ctrl+c를 입력해 탈출할 때까지 해당 컨테이너의 로그를 실시간으로 출력합니다.
    
    </aside>