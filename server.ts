/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *      <li>bookarks</li>
 *      <li>follows</li>
 *      <li>messages</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express, {Request, Response} from 'express';
import mongoose, { Mongoose } from 'mongoose';
//mongoose.connect('mongodb://localhost:27017/tuiter', function(error){
//    if(error) console.log(error);
//    console.log('connection successful');
//});
mongoose.connect('mongodb+srv://admin:IeEAddMqsyWTdC3s@tuitercluster.szy5h.mongodb.net/tuiter?retryWrites=true&w=majority', function(error){
    if(error) console.log(error);
        console.log('connection successful');
    });
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import DislikeController from "./controllers/DislikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowsController from "./controllers/FollowsController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthController";
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
const session = require("express-session");
var cors = require('cors');
const app = express();
app.use(express.json());
/*const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }*/
//app.use(cors());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
 }));
 

/*app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return next();
  });
*/
require('dotenv').config();
/*
app.set('trust proxy', 1);
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true } // needs HTTPS
}));

*/
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false
    }
 }

 app.use(session(sess));

console.log(process.env.ENV)
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
    app.use(session(sess));
     
 }
 
AuthenticationController(app);

const userDao = UserDao.getInstance();
const tuitDao = TuitDao.getInstance();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

//const userController = new UserController(app, userDao);
//const tuitController = new TuitController(app, tuitDao);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const followsController = FollowsController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);