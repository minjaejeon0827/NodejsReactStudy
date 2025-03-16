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
// 서버 띄울 PORT 번호 입력란 (Port 8080)
// app.listen(8080, ()=>{
// .env 파일에 저장해둔 환경변수를 다른 파일 (예) 서버파일(server.js) 에서 가져다쓰려면
// 서버파일(server.js)에 속한 소스코드에다가 process.env.PORT 이렇게 작성하면 그 자리에 값 8080이 남는다.       
app.listen(8080, function () {
  console.log('listening on 8080')
}); 

// *** 리액트로 만든 웹문서(HTML) 전송하는법 *** 
// 무슨 서버언어를 쓰든간에 리액트(React)로 개발한 웹문서 html 파일(index.html)을 고객에게 보내주면 그게 서버랑 리액트(React) 합치는거 끝이다. 
// 리액트(React)로 개발을 다 마친 후 npm run build 라는걸 하시면 build라는 폴더가 생기고 안에 html css js 파일이 생성된다.
// 그 중에 웹문서 html 파일(index.html)은 사진에 보이는 index.html 파일 딱 하나이다. 
// 왜냐면 기본적인 리액트(React) 프로젝트는 SPA(Single Page Application)라는걸 만들어주는데
// SPA(Single Page Application)는 기본적으로 웹문서 html 파일 하나만 쓴다. 

// express.static이라는걸 쓰시면 특정 폴더안의 파일들을 static 파일로 고객들에게 잘 보내줄 수 있다. 
// 그럼 아마 build 폴더 안의 css js img 파일들도 잘 사용할 수 있다. 
app.use(express.static(path.join(__dirname, 'react-project/build')));

// 누군가 / 페이지로 접속하면 리액트로 만든 웹문서 html(index.html) 파일 보내준다.
// 그럼 localhost:8080 으로 접속하면 리액트 프로젝트가 나온다.
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});


// 서버에서도 라우팅을 담당해줄 수 있고 리액트(React)에서도 라우팅을 담당해줄 수 있다. 
// 리액트(React)는 react-router-dom을 설치하면 된다.
// 그럼 리액트(React)상에서 누가 /list 로 접속하면 글목록 보여주고 /mypage 접속하면 마이페이지도 보여줄 수 있다. 
// 근데 리액트(React) 라우터로 /list 페이지를 개발해놨는데 실제 localhost:8080/list 로 직접 URL 입력해서 접속하면 아무것도 안 뜬다. 
// 왜냐면 브라우저 URL창에 때려박는건 서버에게 요청하는거지 리액트(React) 라우터에게 라우팅 요청하는게 아니기 때문이다. 
// 이걸 리액트(React)가 라우팅하게 전권을 넘기고 싶다면 서버파일(server.js)에 다음과 같은 코드를 밑에 추가하기 
// 아래 코드에서 별표 '*' 라는 것은 모든 문자라는 뜻이다. 
// "고객이 URL란에 아무거나 입력하면 걍 리액트(React) 프로젝트나 보내주셈"이라는 뜻인데 이렇게 하면 리액트(React) 라우팅 잘된다. 
// 이 코드는 항상 서버파일(server.js) 가장 하단에 놓아야 잘 된다. 
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});


// 리액트(React)는 웹문서 HTML을 이쁘게 만들어주는 툴(자바스크립트 기반 웹프레임워크)이다. 
// 왜 쓰는지도 모르고 리액트(React) 배우는 사람들이 많은데 
// 리액트(React)는 대단한거 아니고 앱처럼 부드럽게 동작하는 웹문서 html을 만들고 싶을 때 사용하는 툴(자바스크립트 기반 웹프레임워크)이다.
// 카톡 같은 모바일 앱 생각해보면 그런 앱들은 새로고침 없이 페이지 전환이 샥샥 되죠?
// 그런 식으로 페이지 새로고침할 필요없이 부드럽게 전환되는 사이트를 만들고 싶을 때 리액트(React) 쓰면 된다. 
// 그런 웹사이트를 전문용어로 SPA(Single Page Application) 이라고 한다. 
// 쌩자바스크립트로도 가능한데 코드 길어져서 귀찮아서 리액트(React) 쓰는 것임.

// Q. 리액트에서 DB데이터 보여주고 싶으면? 
// 예를 들어서 DB에서 글목록 데이터를 꺼내서 웹문서 HTML로 보여주고 싶은 경우
// server-side rendering / client-side rendering 둘 중 하나 선택하면 된다. 
// server-side rendering은 웹문서 html을 서버가 만들어서 보내주는 것이다. 

// nodejs 강의처럼
// 1. DB에서 데이터 뽑아서
// 2. 글목록.html 파일에 꽂아넣고
// 3. 그 웹문서 html 파일을 서버에서 보내주는 것임 

// client-side rendering은 웹문서 html을 리액트(React)가 웹브라우저 안에서 만드는 것이다.

// 1. 리액트(React)가 서버에 GET요청으로 DB데이터를 가져와서
// 2. 그걸 웹문서 html(index.html)로 만들어서 보여주는 것임 

// 리액트(React)를 쓰는 경우 보통 client-side rendering을 한다.
// 그래서 DB에 있는 상품목록을 가져와서 리액트에서 보여주고 싶으면 
// 이런 식으로 코드를 짠다. 

// 1. 서버는 누군가 /product로 GET요청을 하면 DB에서 데이터 꺼내서 보내주라고 Rest API를 서버파일(server.js)에 짠다. 
// 2. 리액트(React)는 상품목록을 보여주고 싶을 때 서버 /product 주소로 GET요청 날리면 된다.
// 3. 그럼 서버로 부터 데이터 받아오겠죠? 그걸 가지고 웹문서 html(index.html)에 집어넣든 맘대로 개발하면 된다. 

// 그래서 리액트(React)는 서버와의 통신은 거의 ajax로 진행한다.
// POST요청, 로그인해서 세션만들기 이런것도 ajax로 잘 된다. 

// 근데 nodejs 서버파일(server.js) 상단엔
// app.use(express.json());
// var cors = require('cors');
// app.use(cors());
// 이 코드 넣고 시작해야 리액트(React)와 nodejs 서버간 ajax 요청 잘 된다. 
// 이거 쓰려면 서버프로젝트 터미널에서 npm install cors 설치해야 한다. 
// express.json() 은 사용자가 보낸 array/object 데이터를 출력해보기 위해 필요하고
// cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요하다. 


// Q. 리액트(React)프로젝트 코드 수정할 때 마다 build 작업을 해야하나요? 
// 그럴 필요 없다.
// 그건 나중에 사이트를 aws, google cloud 이런 곳에 발행할 때만 한 번 해주면 된다. 
// 평소에 개발할 땐 리액트(React)도 localhost로 미리보기 띄워놓고, 서버도 localhost로 미리보기를 띄워두고 개발 진행하면 별 문제 없다.

// - 다만 리액트(React) -> 서버 ajax 요청시 /product 이렇게 말고 http://서버주소/product 잘 입력하고
// - 서버에 cors 옵션 잘 켜놓으면 된다. 

// 서버주소 입력하는게 귀찮으면  
// 리액트(React)에서 package.json이라는 파일을 열어서 proxy라는 부분 설정을
// 서버 미리보기 띄우던 localhost:어쩌구 주소로 설정해주면 된다. 

// 그러면 리액트(React)에서 ajax 요청 대충해도 localhost:어쩌구 주소로 ajax 요청을 알아서 보내준다. 
// 참고 URL - https://create-react-app.dev/docs/proxying-api-requests-in-development/
// 이걸 참고하자. 

// *** 서브디렉토리에 리액트(React)앱 발행하고 싶은 경우 ***
// 지금 메인페이지가 리액트(React)앱인데 그거 말고
// /react 이렇게 접속하면 리액트(React)로 만든 웹문서 html
// / 이렇게 접속하면 public 폴더에 있던 그냥 main.html
// 보여주고 싶은 경우 어떻게 하냐면 
// 서버파일(server.js)의 라우팅을 아래처럼 바꿔주고
// app.use( '/', express.static( path.join(__dirname, 'public') ))
// app.use( '/react', express.static( path.join(__dirname, 'react-project/build') ))

// app.get('/', function(요청,응답){
//   응답.sendFile( path.join(__dirname, 'public/main.html') )
// }) 
// app.get('/react', function(요청,응답){
//   응답.sendFile( path.join(__dirname, 'react-project/build/index.html') )
// })

// (리액트(React)프로젝트 내의 package.json)
// {
//   "homepage": "/react",
//   "version": "0.1.0",
//   ... 등
// } 
// 위의 리액트(React) 프로젝트 내의 package.json에 "homepage"라는 항목을
// 여러분이 발행을 원하는 서브디렉토리명으로 새로 기입해주면 된다. 

// 그럼 방금 서버파일(server.js)에서 /react 접속시 리액트(React) 프로젝트 보내고 
// / 접속시 일반 웹문서 html 파일 보내라고 했으니 정말 그렇게 된다. 
// 딱히 쓸 일은 별로 없다. 

// *** vite 키워드(npm create vite@latest) 사용해서 리액트(React) 프로젝트 생성 방법 ***
// 참고 URL - https://bo5mi.tistory.com/196

// *** 리액트(React) 프로젝트 생성시 Window PowerShell 응용 프로그램 화면에서 아래와 같은 오류 메시지 출력시 해결 방법 *** 
// 참고 URL - https://hellcoding.tistory.com/entry/VSCode-%EC%98%A4%EB%A5%98-%EC%9D%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C
// 오류 메시지 1
// npm : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Program Files\nodejs\npm.ps1 파일을 로드할 수 없습니다. 
// 자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오.
// 위치 줄:1 문자:1
// + npm create vite@latest
// + ~~~
//     + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
//     + FullyQualifiedErrorId : UnauthorizedAccess

// 오류 메시지 2
// npx : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Program Files\nodejs\npx.ps1 파일을 로드할 수 없습니다. 
// 자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오.
// 위치 줄:1 문자:1
// + npx create-react-app react-project
// + ~~~
//     + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
//     + FullyQualifiedErrorId : UnauthorizedAccess

// 위의 오류 메시지 1,2 해결 방법
// 1. Window PowerShell 응용 프로그램 관리자 실행
// 2. Window PowerShell 응용 프로그램 터미널 환경에서 명령어 "cd D:\minjae\NodejsReactStudy\react-project" 입력 및 엔터 -> 파일 경로 이동 
// 3. Window PowerShell 응용 프로그램 터미널 환경에서 명령어 "get-ExecutionPolicy" 입력 및 엔터 -> 현재 권한상태값 "Restricted" 확인
// 4. Window PowerShell 응용 프로그램 터미널 환경에서 권한 상태값을 "RemoteSigned"으로 변경하기 위해 명령어 "Set-ExecutionPolicy RemoteSigned" 입력 및 엔터 -> 명령어 "Y" 입력 및 엔터 
// 5. Window PowerShell 응용 프로그램 터미널 환경에서 권한 상태값이 "RemoteSigned"으로 변경되었는지 확인하기 위해 "get-ExecutionPolicy" 입력 및 엔터 -> 권한상태값 "RemoteSigned" 출력되면 권한상태값 변경 완료