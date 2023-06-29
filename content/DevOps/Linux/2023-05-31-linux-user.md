---
title: "Linux User"
date: 2023-05-31
subtitle: "Linux의 유저체계"
category: "Linux"
draft: false
---

![linux penguin](image.png)

# UID, GID

Linux에서의 ID는 UID(User Identifier)라고 부른다.
UID가 0인 계정이 root 계정.

GID는 Group Identifier를 뜻하며, root의 GID는 똑같이 0이다.

OS에 따라서 1부터 100까지의 UID는 시스템 용도로 이미 따로 지정되어있다. RedHat은 499까지.
debian은 999까지 예약이 되어있다고 하는데, 지금 사용중인 ubuntu도 그런 것 같다.

## Command

- `cat /etc/passwd` UID 확인
- `cat /etc/group` GID 확인
- `useradd <username>` 사용자 생성
- `passwd` 현재 사용자 비밀번호 변경
- `sudo passwd <username>` 사용자 비밀번호
- `su <username>` 계정 전환
- `더 알게될때마다 추가해보기`

```
ubuntu config --default-user <username>
```

요부분은 WSL2에 zsh를 적용해놓아서 윈도우에서 명령프롬프트로 명령해야 작동이되었다.
