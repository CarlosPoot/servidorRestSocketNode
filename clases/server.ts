
import express from 'express';
import { SERVER_PORT } from '../constantes/enviroment';
import SocketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server{

    private static _instance:Server;
    public app:express.Application;
    public puerto:number;

    public io:SocketIO.Server;
    private httpServer:http.Server;

    private constructor( ){
        this.app = express();
        this.puerto = SERVER_PORT;
        this.httpServer = new http.Server(  this.app  );
        this.io = SocketIO( this.httpServer  );
        this.escucharSockets();    
    }

    public static get instancia(){
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){
        console.log( "Escuchando sockets" );
        this.io.on( 'connection', cliente => {
            console.log( "cliente conectado" );
            // Funcion empleada cuando el cliente se desconecta
            socket.desconectar( cliente );
            // mensajes del servidor
            socket.mensaje( cliente , this.io );
        });

    }

    public start(  callback:()=>void ){
        this.httpServer.listen(  this.puerto , callback );
    }

}