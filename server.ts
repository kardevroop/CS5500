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
const cors = require('cors');

require('dotenv').config();

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "tuitercluster.szy5h.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";

const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;

mongoose.connect(connectionString, function(error){
    if(error) console.log(error);
        console.log('connection successful');
    });

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
 }));

 let sess = {
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}
app.use(session(sess))
 
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