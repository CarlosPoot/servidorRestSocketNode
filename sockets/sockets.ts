import SocketIO from 'socket.io';
import { ListaUsuario } from '../clases/ListaUsuarios';
import { Usuario } from '../clases/Usuario';

const usuariosConectados = new ListaUsuario();

export const conectarCliente = ( cliente:SocketIO.Socket )=>{
    let nuevoUsuario:Usuario = new Usuario(  cliente.id );
    usuariosConectados.agregar(  nuevoUsuario );
}

export const desconectar = (  cliente:SocketIO.Socket )=>{
    cliente.on( "disconnect", ()=>{
        console.log(  "cliente desconectado"  );
        usuariosConectados.borrarUsuario( cliente.id );
        console.log(cliente.id);
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
        console.log("Configurando cliente" + payload.nombre );
        usuariosConectados.actualizarNombre(  cliente.id, payload.nombre );
        calback( {
            status: "OK",
            mensaje: "Usuario " + payload.nombre + " configurado"
        });
    });

}


