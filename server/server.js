// 1. 터미널 명령어 "npm init -y" 입력 및 엔터 -> package.json 파일 생성 
// 2. 터미널 명령어 "npm install express" 입력 및 엔터 -> express 라이브러리 설치 완료 
// 3. 2번에서 설치한 express 라이브러리 사용해서 서버 코드(const app = express();) 작성 
// 4. 터미널 명령어 "npm install -g nodemon" 입력 및 엔터 -> nodemon 라이브러리 설치 완료 
//    터미널 명령어 "nodemon server.js" 기능 - 소스코드 변경 후 파일저장하면 서버 자동으로 재시작(다시 컴파일 처리)
//    터미널 명령어 "nodemon server.js" 입력 및 엔터 후 
//    터미널 창에 출력되는 메시지 
//    [nodemon] restarting due to changes...
//    [nodemon] starting `node server.js`
//    http://localhost:8040 에서 서버 실행중
const express = require('express');   // express 라이브러리 사용
const path = require('path');
const app = express();   // express 라이브러리 사용

// 리액트(React)는 서버와의 통신은 거의 ajax로 진행한다.
// POST요청, 로그인해서 세션만들기 이런것도 ajax로 잘 된다. 
// 근데 nodejs 서버파일(server.js) 상단엔
// app.use(express.json());
// var cors = require('cors');
// app.use(cors());
// 이 코드 넣고 시작해야 리액트(React)와 nodejs 서버간 ajax 요청 잘 된다. 
// 이거 쓰려면 서버프로젝트 터미널에서 npm install cors 설치해야 한다. 
// express.json() 은 사용자가 보낸 array/object 데이터를 출력해보기 위해 필요하고
// cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요하다. 
app.use(express.json());
var cors = require('cors');
app.use(cors());

// 서버 띄우는 코드(app.listen) (내 컴퓨터 Port 하나 오픈하는 문법이다. 이렇게 Port를 오픈해야 다른 컴퓨터가 내 컴퓨터 쪽으로 웹서비스를 연결하여 통신하여 들어올 수 있다.)
// 서버 띄울 PORT 번호 입력란 (Port 8040)
// app.listen(8040, ()=>{
// .env 파일에 저장해둔 환경변수를 다른 파일 (예) 서버파일(server.js) 에서 가져다쓰려면
// 서버파일(server.js)에 속한 소스코드에다가 process.env.PORT 이렇게 작성하면 그 자리에 값 8040이 남는다.       
app.listen(8040, function () {
  console.log('listening on 8040')
}); 

// *** 리액트로 만든 웹문서(HTML) 전송하는법 *** 
// 무슨 서버언어를 쓰든간에 리액트(React)로 개발한 웹문서 html 파일(index.html)을 고객에게 보내주면 그게 서버랑 리액트(React) 합치는거 끝이다. 
// 리액트(React)로 개발을 다 마친 후 npm run build 라는걸 하시면 dist라는 폴더가 생기고 안에 html css js 파일이 생성된다.
// 그 중에 웹문서 html 파일(index.html)은 사진에 보이는 index.html 파일 딱 하나이다. 
// 왜냐면 기본적인 리액트(React) 프로젝트는 SPA(Single Page Application)라는걸 만들어주는데
// SPA(Single Page Application)는 기본적으로 웹문서 html 파일 하나만 쓴다. 

// express.static이라는걸 쓰시면 특정 폴더안의 파일들을 static 파일로 고객들에게 잘 보내줄 수 있다. 
// 그럼 아마 dist 폴더 안의 css js img 파일들도 잘 사용할 수 있다. 
// app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(express.static(path.join(__dirname, 'react-project/dist')));

// 누군가 메인 페이지('/')로 접속하면 리액트로 만든 웹문서 html('/react-project/dist/index.html') 파일 보내준다.
// 그럼 localhost:8040 으로 접속하면 리액트 프로젝트가 나온다.
app.get('/', function (요청, 응답) {
  // 응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
  응답.sendFile(path.join(__dirname, '/react-project/dist/index.html'));
});

// Rest API - GET 방식
// DB에 저장된 상품명 데이터 추출해서 사용자(client)에게 전송 -> 리액트(React) 웹브라우저 화면 상품명 데이터 출력 
app.get('/product', function (요청, 응답) {
  // 사용자(client)가 웹브라우저 화면에서 Http - GET 요청 -> 응답.json 함수 사용해서 object/array 유형의 자료(데이터)를 사용자(client)에게 전송 -> 리액트(React) 웹브라우저 화면 상품명 데이터 출력 
  응답.json({ name: 'black shoes' })
})

// 서버에서도 라우팅을 담당해줄 수 있고 리액트(React)에서도 라우팅을 담당해줄 수 있다. 
// 리액트(React)는 react-router-dom을 설치하면 된다.
// 그럼 리액트(React)상에서 누가 /list 로 접속하면 글목록 보여주고 /mypage 접속하면 마이페이지도 보여줄 수 있다. 
// 근데 리액트(React) 라우터로 /list 페이지를 개발해놨는데 실제 localhost:8040/list 로 직접 URL 입력해서 접속하면 아무것도 안 뜬다. 
// 왜냐면 브라우저 URL창에 때려박는건 서버에게 요청하는거지 리액트(React) 라우터에게 라우팅 요청하는게 아니기 때문이다. 
// 이걸 리액트(React)가 라우팅하게 전권을 넘기고 싶다면 서버파일(server.js)에 다음과 같은 코드를 밑에 추가하기 
// 아래 코드에서 별표 '*' 라는 것은 모든 문자라는 뜻이다. 
// "고객이 URL란에 아무거나 입력 또는 개발 안한 기능/웹페이지 주소 입력 하면 걍 리액트(React) 프로젝트('/react-project/dist/index.html')나 보내주셈"이라는 뜻인데 이렇게 하면 리액트(React) 라우팅 잘된다. 
// 이 코드는 항상 서버파일(server.js) 가장 하단에 놓아야 잘 된다. 
app.get('*', function (요청, 응답) {
  // 응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
  응답.sendFile(path.join(__dirname, '/react-project/dist/index.html'));
});