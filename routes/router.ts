
import {  Router, Request, Response } from 'express';
import Server from '../clases/server';

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
});

export default router;