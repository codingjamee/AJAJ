import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { educationAuthRouter } from "./routers/educationRouter";
const cookieParser = require('cookie-parser');


const app = express();

// CRUD 예시 merge할때 삭제 예정
app.use(express.static(__dirname + '/public')) // css파일 등록부분
app.set('view engine', 'ejs') // ejs 설정
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// CORS 에러 방지
const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true, // header에 Access-Control-Allow-Credentials 포함 여부
  exposedHeaders: ['set-cookie'],
}
app.use(cors(corsOption));


// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, Elice 레이서 1차 프로젝트 3팀 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(educationAuthRouter);


// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
