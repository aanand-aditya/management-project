import express from 'express';
import connect from './connection';
import initRoutes from '../app/routes';
import bodyParser from 'body-parser';

export default function start() {
  let app = express();
  app.use(bodyParser.json());
  connect(err => {
  	if(err) {
  	  console.log('Nahi ho ra connect');
  	  return;
  	}
    initRoutes(app);
  	app.listen(3000, () => {
  	  console.log("Server started at port 3000");
    });
  });
}