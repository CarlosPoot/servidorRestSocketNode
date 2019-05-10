import SocketIO from 'socket.io';

export const desconectar = (  cliente:SocketIO.Socket )=>{
    
    cliente.on( "disconnect", ( cliente )=>{
        console.log(  "cliente desconectado"  );
    });

}

export const mensaje = (  cliente:SocketIO.Socket , io:SocketIO.Server )=>{
    
    cliente.on( 'mensaje', payload =>{
        console.log(  payload )
        io.emit( "nuevo-mensaje",  payload  );
    });

}


