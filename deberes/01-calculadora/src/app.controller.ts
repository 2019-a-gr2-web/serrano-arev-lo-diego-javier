import {Controller, Get, Post, HttpCode,Headers,Body,Response, Request, Delete,Put, Query} from '@nestjs/common';
import { AppService } from './app.service';


@Controller('/01calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


//casi se daña el repo

  //Método GET - SUMA
  @Get('/suma')
  @HttpCode(200)
  suma(@Headers() headers, @Request() request, @Response() response) {

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(headers.numero);
    const numB = Number(headers.numero2);
    const resp = numA + numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos',100,{signed:true});
    }
    console.log('Headers: ', headers);

    if(!cookieSegura.user) {
      response.cookie('user', 'jukishio');
    }
    const numIntentos = cookieSegura.intentos - resp;
    if(cookieSegura.intentos){
      response.cookie('Intentos Disponibles',numIntentos,{signed:true});
    }

    if(numIntentos <=0){
      const respuesta = {
        resultado: `Resultado: ${resp}`,
        user: `user: ${cookie.user}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: resp,
        user: `user: ${cookie.user}`,
      };

      return response.send(respuesta);
    }

  }

  //Método POST - RESTA
  @Post('/resta')
  @HttpCode(201)
  resta(@Body() parametros, @Response() response, @Request() request ){
    console.log(parametros);

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(parametros.numero);
    const numB = Number(parametros.numero2);
    const numResta = numA-numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos',100,{signed:true});
    }


    if(!cookieSegura.nombreUsuario) {
      response.cookie('user', 'jukishio');
    }

    const numIntentos = cookieSegura.intentos - numResta;

    if(numIntentos <=0){
      const respuesta = {
        resultado: numResta,
        user: `user:: ${cookie.user}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: numResta,
        user: `user: ${cookie.user}`,
        mensaje: `tiene ${numIntentos} intentos`      };

      return response.send(respuesta);
    }



  }

  //Metodo PUT - MULTIPLICACION
  @Put('/multiplicacion')
  @HttpCode(202)
  multiplicacion(@Query() parametros, @Response() response, @Request() request){

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(parametros.numero);
    const numB = Number(parametros.numero2);
    const numMult = numA*numB;

    if(!cookieSegura.intentos){
      response.cookie('intentos','100',{signed:true});
    }


    if(!cookieSegura.user) {
      response.cookie('user', 'jukishio');
    }

    const numIntentos = cookieSegura.intentos - numMult;




    if(numIntentos <=0){
      const respuesta = {
        resultado: numMult,
        user: `user: ${cookie.nombreUsuario}`,
        mensaje: "SE HAN HAGOTADO LOS TOKENS"
      };
      response.send(respuesta);
    }else{
      const respuesta = {
        resultado: numMult,
        user: `user: ${cookie.user}`,
      };
      if(cookieSegura.intentos){
        response.cookie('Intentos Disponibles',numIntentos,{signed:true});
      }
      return response.send(respuesta);
    }

  }


  //Metodo DELETE - DIVISION
  @Delete('/division')
  @HttpCode(203)
  division(@Headers() paramHeader, @Body() paramBody, @Response() response, @Request() request){

    const cookie = request.cookies;
    const cookieSegura = request.signedCookies;
    const numA = Number(paramHeader.numero);
    const numB = Number(paramBody.numero2);

    if (numB == 0) {
      return response.send('EL NUMERO DEBE DE SER DISTINTO DE 0')

    } else {
      const numDiv = numA / numB;
      if(!cookieSegura.intentos){
        response.cookie('intentos','100',{signed:true});
      }


      if(!cookieSegura.user) {
        response.cookie('user', 'jukishio');
      }

      const numIntentos = cookieSegura.intentos - numDiv;

      if(numIntentos <=0){
        const respuesta = {
          resultado: numDiv,
          user: `user: ${cookie.user}`,
          mensaje: "SE HAN HAGOTADO LOS TOKENS"
        };
        response.send(respuesta);
      }else{
        const respuesta = {
          resultado: numDiv,
          user: `user: ${cookie.user}`,
        };
        if(cookieSegura.intentos){
          response.cookie('Intentos Disponibles',numIntentos,{signed:true});
        }
        return response.send(respuesta);
      }
    }

  }
}
