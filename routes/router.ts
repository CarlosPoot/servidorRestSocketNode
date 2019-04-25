
import {  Router, Request, Response } from 'express';

const router:Router = Router();

router.get('/mensajes', ( req:Request , res:Response )=>{

    res.json({
        ok:true,
        mensaje : "todo bien"
    });

});

router.post('/mensajes', ( req:Request , res:Response )=>{

    let cuerpo = req.body.cuerpo;
    let de     = req.body.de;

    res.json({
        ok:true,
        cuerpo,
        de
    });

});

export default router;