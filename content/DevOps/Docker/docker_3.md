---
title: "Docker Compose"
date: 2023-06-02 5:57:52
subtitle: "도커"
category: "Category Docker"
draft: true
---


# Docker Compose
[![https://www.docker.com/](https://velog.velcdn.com/images/nueeng/post/998f94bc-69f6-4df1-8ced-924f34f233ea/image.png)](https://www.docker.com/)

## 05. docker-compose로 컨테이너 생성하기

<aside>
docker 명령어가 아닌 docker-compose를 활용해 컨테이너를 생성하는 방법을 알아보겠습니다.

</aside>

- docker 컨테이너 삭제하기
    
    ```bash
    sudo docker ps -a # docker에 존재하는 컨테이너 목록을 확인합니다.
    # CONTAINER ID   IMAGE          COMMAND              CREATED        STATUS        PORTS                               NAMES
    # 54445308314d   httpd:latest   "httpd-foreground"   23 hours ago   Up 23 hours   0.0.0.0:80->80/tcp, :::80->80/tcp   sweet_engelbart
    
    sudo docker rm -f $container_id # 컨테이너의 실행중 여부와 관계 없이 강제로 삭제합니다.
    ```
    
- docker-compose.yml 작성해보기
    
    ```yaml
    version: '3.8' # docker-compose.yml에 사용될 문법 버전을 정의합니다.
    
    services:
      example: # 서비스 이름을 지정합니다. 서비스 이름은 컨테이너끼리 통신할 때 사용됩니다.
        container_name: example # 컨테이너 이름을 지정합니다.
        image: 'httpd:latest' # 컨테이너를 생성할 때 사용될 이미지를 지정합니다.
        restart: always # 컨테이너가 종료됐을 때 다시 실행시켜 줍니다.
    ```
    
- 컨테이너 실행시켜보기
    
    ```bash
    # docker compose 명령어는 docker-compose.yml 파일이 존재하는 자리에서 실행해야 합니다.
    
    sudo docker compose up -d
    # up : docker-compose.yml 파일을 읽어 정의된 서비스들을 실행시킵니다.
    # -d : 컨테이너를 데몬(백그라운드)으로 실행시킵니다.
    ```
    
- 컨테이너 중지시키기

    ```bash
    docker에서 컨테이너를 중지시킬 때 stop혹은 down 옵션을 사용할 수 있습니다.
    
    두 옵션 모두 컨테이너를 중지할 때 사용되기 때문에 비슷해 보일 수 있지만 다른 용도로 사용되며, 사용 시 주의가 필요합니다.
    
    우선 컨테이너를 stop 명령어를 사용해 중지시켜 보겠습니다.
    
    sudo docker compose stop

    
    이후 docker ps 명령어를 쳐보면 컨테이너 목록에 아무것도 보여지지 않습니다.
    
    하지만 docker ps 명령어에 -a 옵션을 추가해 주면 중지 상태의 컨테이너를 확인할 수 있습니다.
    
    sudo docker ps -a
    

    sudo docker compose start

    start 명령어로 재시작 가능
    
    이번에는 docker compose down 명령어를 사용해 컨테이너를 중지시켜 보겠습니다.
    
    sudo docker compose down
    
    stop과는 다르게 컨테이너가 Removed 됐다는 로그를 확인할 수 있으며, 이와 같이 삭제 된 컨테이너는 docker ps -a 명령어로도 확인되지 않습니다.
    
    sudo docker ps -a
    
    즉, stop 명령어는 컨테이너를 완전히 삭제시키는 것이 아닌 중지 상태로 만드는 것이며, 이는 docker compose start 명령어로 다시 실행시킬 수 있습니다.
    
    반면 down 명령어로 컨테이너를 종료시켰을 때에는 해당 컨테이너 자체가 삭제되어 컨테이너를 다시 실행시키기 위해서는 docker compose up 명령어로 컨테이너를 다시 생성해야 합니다.
    ```

    docker run으로 실행한 컨테이너는 public ip로 바로 들어갈 수 있었는데, docker compose로 실행한 컨테이너는 실행되지 않음. 포트 포워딩 설정을 해주지 않았기 때문!