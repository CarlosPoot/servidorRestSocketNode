
import {  Router, Request, Response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';

const router:Router = Router();

router.post('/mensajes', ( req:Request , res:Response )=>{
    let cuerpo = req.body.cuerpo;
    let de     = req.body.de;
    let payload = {
        mensaje :cuerpo,
        de: de
    }

    let servidor = Server.instancia;
    servidor.io.emit('nuevo-mensaje', payload);

    res.json({
        ok: true,
        status: "Mensaje enviado correctamente"
    })

});

router.post('/mensajes/:idUsuario', ( req:Request , res:Response )=>{
    let cuerpo = req.body.cuerpo;
    let de     = req.body.de;
    let id     = req.params.idUsuario;
    
    let payload = {
        de,
        cuerpo
    }

    let server = Server.instancia;
    server.io.in( id ).emit( "mensaje-privado", payload );
    res.json({
        ok:true,
        mensaje:"mensaje enviado"
    });
});

// servicio para obtener todos los IDs de los sockets
router.get("/usuarios" ,( req, res  )=>{

    const server:Server = Server.instancia;

    server.io.clients( (  error:any, clientes:string[] )=>{

        if( error ){
            return res.json({
                ok:false,
                error
            })
        }

        res.json({
            ok:true,
            clientes
        })

    });

})

// servicio para obtener todos los IDs de los sockets
router.get("/usuarios/detalle" ,( req, res  )=>{

    res.json({
    ok:true,
    clientes: usuariosConectados
    })

})

export default router;