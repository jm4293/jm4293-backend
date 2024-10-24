# jm4293

## Description
### 1. Nest.JS
### 2. postgresql
### 3. TypeORM

## Structure
1. common
   1. enum
      1. 공통 enum
   2. guard
      1. JWT guard
         1. Http header의 Authorization에 담긴 JWT 토큰을 검증하는 guard
   3. response
      1. response
         1. 공통 response

2. config
   1. 공동 config

3. database
   1. model
      1. database table model
   2. repository
      1. database 요청 처리

4. module
   1. auth
      1. auth module
         1. 회원가입, 로그인, 비밀번호 찾기
   2. board
      1. board module
         1. 게시판 리스트, 게시글 작성, 게시글 수정, 게시글 삭제

5. type
   1. interface
      1. 공통 interface
