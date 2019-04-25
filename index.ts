import Server from './clases/server';
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors  from 'cors';

const servidor = new Server();

//configurar body parser
servidor.app.use( bodyParser.urlencoded( { extended : true }  )  );
servidor.app.use( bodyParser.json() );
servidor.app.use(  cors( { origin : true, credentials:true }  )  )

servidor.app.use( router );

servidor.start(  (error:Error)=>{
    if( error )
        throw new Error(  error.message  );

    console.log(`Servidor corriendo en el puerto ${ servidor.puerto }`);
});