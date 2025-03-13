// 1. 터미널 명령어 "npm init -y" 입력 및 엔터 -> package.json 파일 생성 
// 2. 터미널 명령어 "npm install express" 입력 및 엔터 -> express 라이브러리 설치 완료 
// 3. 2번에서 설치한 express 라이브러리 사용해서 서버 코드(const app = express();) 작성 
// 4. 터미널 명령어 "npm install -g nodemon" 입력 및 엔터 -> nodemon 라이브러리 설치 완료 
//    터미널 명령어 "nodemon server.js" 기능 - 소스코드 변경 후 파일저장하면 서버 자동으로 재시작(다시 컴파일 처리)
//    터미널 명령어 "nodemon server.js" 입력 및 엔터 후 
//    터미널 창에 출력되는 메시지 
//    [nodemon] restarting due to changes...
//    [nodemon] starting `node server.js`
//    http://localhost:8080 에서 서버 실행중
const express = require('express');   // express 라이브러리 사용
const path = require('path');
const app = express();   // express 라이브러리 사용

// 서버 띄우는 코드(app.listen) (내 컴퓨터 Port 하나 오픈하는 문법이다. 이렇게 Port를 오픈해야 다른 컴퓨터가 내 컴퓨터 쪽으로 웹서비스를 연결하여 통신하여 들어올 수 있다.)
// 서버 띄울 PORT 번호 입력란 (Port 8080)
// app.listen(8080, ()=>{
// .env 파일에 저장해둔 환경변수를 다른 파일 (예) 서버파일(server.js) 에서 가져다쓰려면
// 서버파일(server.js)에 속한 소스코드에다가 process.env.PORT 이렇게 작성하면 그 자리에 값 8080이 남는다.       
app.listen(8080, function () {
  console.log('listening on 8080')
}); 

// express.static이라는걸 쓰시면 특정 폴더안의 파일들을 static 파일로 고객들에게 잘 보내줄 수 있다. 
// 그럼 아마 build 폴더 안의 css js img 파일들도 잘 사용할 수 있다. 
app.use(express.static(path.join(__dirname, 'react-project/build')));

// 누군가 / 페이지로 접속하면 리액트로 만든 html(index.html) 파일 보내준다.
// 그럼 localhost:8080 으로 접속하면 리액트 프로젝트가 나온다.
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});


// 서버에서도 라우팅을 담당해줄 수 있고 리액트에서도 라우팅을 담당해줄 수 있다. 
// 리액트는 react-router-dom을 설치하면 된다.
// 그럼 리액트상에서 누가 /list 로 접속하면 글목록 보여주고 /mypage 접속하면 마이페이지도 보여줄 수 있다. 
// 근데 리액트 라우터로 /list 페이지를 개발해놨는데 실제 localhost:8080/list 로 직접 URL 입력해서 접속하면 아무것도 안 뜬다. 
// 왜냐면 브라우저 URL창에 때려박는건 서버에게 요청하는거지 리액트 라우터에게 라우팅 요청하는게 아니기 때문이다. 
// 이걸 리액트가 라우팅하게 전권을 넘기고 싶다면 서버파일(server.js)에 다음과 같은 코드를 밑에 추가하기 
// 아래 코드에서 별표 '*' 라는 것은 모든 문자라는 뜻이다. 
// "고객이 URL란에 아무거나 입력하면 걍 리액트 프로젝트나 보내주셈"이라는 뜻인데 이렇게 하면 리액트 라우팅 잘된다. 
// 이 코드는 항상 서버파일(server.js) 가장 하단에 놓아야 잘 된다. 
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});