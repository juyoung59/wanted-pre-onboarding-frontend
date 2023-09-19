# 원티드 프리온보딩 프론트엔드
* 이 문서는 원티드 프리온보딩 프론트엔드 선발과제를 위해 작성되었습니다.

* 회원가입, 로그인을 통해 Todo List를 작성할 수 있습니다.


## 👩🏻 작성자
* 이름 : 이주영
* 생년월일 : 2000.05.09


## 👩🏻‍💻 프로젝트 실행 방법
1. 이 저장소를 클론합니다.
2. 프로젝트 디렉토리로 이동합니다.
3. 필요한 패키지를 설치합니다.

    ```
   npm install
    ```

4. 서버를 실행합니다.

    ```
   npm start
    ```

5. http://localhost:3000로 이동하여 확인해주세요.

## 🔗 배포 링크
https://master--wanted-pre-onboarding-jy.netlify.app/

## 📽️ 데모 영상
* 로컬 스토리지에 토큰이 없는 상태로 `/todo` 페이지에 접속한다면 `/signin` 경로로 리다이렉트
<img width="70%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/124108565/268876255-754f678e-8048-44ae-9471-84d501d85d29.gif"/>

* 조건에 맞는 이메일과 비밀번호 입력시 버튼 활성화
* 성공적으로 회원가입이 완료되었을 시 `/signin` 경로로 이동
* 성공적으로 로그인이 완료되었을 시 `/todo` 경로로 이동
<img width="70%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/124108565/268876262-46865ae7-fd75-4bde-be09-c95ebfedbe08.gif"/>

* Todo List (추가, 수정, 삭제 가능)
<img width="70%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/124108565/268876270-667a1dcc-164f-4d52-815e-05c3d0b9e388.gif"/>

* 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
<img width="70%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/124108565/268876274-c8902800-3bba-4082-ad0a-2b2f2cd7d3d4.gif"/>

## 📚 사용 라이브러리
React Router(react-router-dom), Styled Components
