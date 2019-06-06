import { Usuario } from './Usuario';



export class ListaUsuario{

    private lista:Usuario[] = [];

    constructor(){

    }

    public agregar(  usuario:Usuario ):Usuario{
        this.lista.push(  usuario );
        console.log( this.lista )
        return usuario;
    }


    public actualizarNombre( id:string, nombre:string ):void{
        for( let usuario of this.lista ){
            if( usuario.id == id ){
                usuario.nombre = nombre;
            }
        }
    }


    public getLista(){
        return this.lista.filter(  usuario => usuario.nombre !== 'sin-nombre' );
    }


    public getUsuario( id:string ){
        return this.lista.find(  usuario => usuario.id == id  );
    }


    public getUsuarioSala( sala:string ){
        return this.lista.filter( usuario => usuario.sala == sala  );
    }

    public borrarUsuario( id:string){
        let temUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => usuario.id !== id )
        return temUsuario;
    }


}