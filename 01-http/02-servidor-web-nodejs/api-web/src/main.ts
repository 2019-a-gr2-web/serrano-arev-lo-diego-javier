import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import * as path from "path";
import * as favicon from "serve-favicon";

const cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication
    app.use(favicon(path.join(__dirname,'..','publico','imagenes','guantelete.ico')));
  app.use(cookieParser('Secret'));


  app.set('views engine', 'ejs' );
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.use(express.static('publico'));
  await app.listen(3002);
}
bootstrap();
