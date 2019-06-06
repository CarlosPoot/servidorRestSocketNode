import SocketIO from 'socket.io';
import { ListaUsuario } from '../clases/ListaUsuarios';
import { Usuario } from '../clases/Usuario';

export const usuariosConectados = new ListaUsuario();

export const conectarCliente = ( cliente:SocketIO.Socket )=>{
    let nuevoUsuario:Usuario = new Usuario(  cliente.id );
    usuariosConectados.agregar(  nuevoUsuario );
}

export const desconectar = (  cliente:SocketIO.Socket , io:SocketIO.Server )=>{
    cliente.on( "disconnect", ()=>{
        console.log(  "cliente desconectado"  );
        usuariosConectados.borrarUsuario( cliente.id );
        io.emit("usuarios-activos", usuariosConectados.getLista() );
    });
}

export const mensaje = (  cliente:SocketIO.Socket , io:SocketIO.Server )=>{
    
    cliente.on( 'mensaje', payload =>{
        console.log(  payload )
        io.emit( "nuevo-mensaje",  payload  );
    });

}

export const configurarUsuario = ( cliente:SocketIO.Socket, io:SocketIO.Server )=>{

    cliente.on('configurar-usuario', (  payload, calback )=>{
        usuariosConectados.actualizarNombre(  cliente.id, payload.nombre );
        io.emit("usuarios-activos", usuariosConectados.getLista() );
        calback( {
            status: "OK",
            mensaje: "Usuario " + payload.nombre + " configurado"
        });
    });

}


export const emitirUsuarios = (   cliente:SocketIO.Socket, io:SocketIO.Server )=>{
    cliente.on('obtener-usuarios', ()=>{
        io.to( cliente.id ).emit("usuarios-activos",  usuariosConectados.getLista() )
    });
}

