
import express from 'express';
import { SERVER_PORT } from '../constantes/enviroment';

export default class Server{

    public app:express.Application;
    public puerto:number;

    constructor( ){
        this.app = express();
        this.puerto = SERVER_PORT;
    }

    start(  callback:Function ){
        this.app.listen(  this.puerto , callback );
    }

}