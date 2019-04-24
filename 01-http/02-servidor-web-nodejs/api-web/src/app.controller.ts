import {Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {response} from "express";

const Joi = require('@hapi/joi');
@Controller('/api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()   //metodo http
    @HttpCode(200)
    postHello() {
        return 'Hola mundo en post';
    }

    //@Get('/hello-world')    //metodo hhtp
    //getHello(): string {
    //  return this.appService.getHello();
    //}

    // ----------------------

    @Get('/adivina')
    adivina(@Headers() headers): string {

        console.log('Headers', headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroDeCabecera = Number(headers.numero);

        if (numeroDeCabecera == numeroRandomico) {
            return 'Ok';
        } else {
            return ' 😞 ';
        }
    }

    // ---------------------------------------------------

    //?llave=valor&llave2=valor2
    // PARAMETROS DE CONSULTA -> QUERY PARAMS
    @Get('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if(queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    //PARAMETROS DE RUTA -> ROUTE PARAMS
    @Get('/ciudad/:idCiudad')
    ciudad(@Param() routeParams) {
        switch (routeParams.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que mash ñañosh';
            default:
                return 'Buenas tardes';
        }
    }

    //PARAMETROS DE CUERPO -> BODY PARAMS
    @Post('registroComida')
    registroComida(
        @Body() bodyParams,
        @Response() response
    ) {
        if(bodyParams.nombre && bodyParams.cantidad) {
            const cantidad = Number(bodyParams.cantidad);
            if(bodyParams.cantidad > 1) {
                response.set('Premio','Guatita');
            }
            return response.send({mensaje:'Registro'});
        } else {
            return response.status(400).send({
                mensaje:'ERROR, no envia nombre o cantidad',
                error:400});
        }
    }

    @Get('/semilla')
    semilla(@Request() request, @Response()) {
        console.log(request.cookies);
        const cookies = request.cookies;  //JSON
        const esquemaValidacionNumero= Joi.object().keys({
            numero:Joi.number().integer()
        })

        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);

        if(resultado.error){
            console.log('Resultado: ', resultado);
        }else {
            console.log('Numero valido');
        }
        const
        if(cookies.micookie) {
            response.cookie('fechaServidor', new Date().getTime());
            return response.send('ok');
        } else {
            return response.send(':)') ;
        }
    }

    // ---------------------------------------------------

    /*
    Segmento inicial -> /api
    4 acciones:
      1) Segmento accion: 'hello-world' -> GET
      2) Segmento accion: 'hola mundo' -> POST
      3) Segmento accion: '' -> PUT
      4) Segmento accion: '' -> DELETE
     */

    @Get('/hello-world')
    helloWorld(): string {
        return 'Hello World'
    }

    @Post('/hola-mundo')
    holaMundo() {
        return 'Hola Mundo'
    }

    @Put('/salut-monde')
    salutMonde() {
        return 'Salut Monde'
    }

    @Delete('/hallo-welt')
    halloWelt(): string {
        return 'Hallo Welt'
    }

}




/*
class usuario {
  atributoPublico;
  private atributoPrivado;
  protected atributoProtegido;

  constructor(atributoPublico, atributoPrivado, atributoProtegido) {
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

  @metodoA()
  public metodoPublico(@parametroA() a) {}
  @metodoB()
  private metodoPrivado() {}
  protected metodoProtegido () {}

*/

const json = [
    {
        "llave":"valor",
        "key":"value",
        "nombre":"Kevin",
        "edad":24,
        sueldo:10.50,
        "casado":false,
        "hijos":null,
        mascotas:[
            "cachetes",
            1,
            1.10,
            false,
            null,
            {
                "nombre":"JACK"
            }
        ]
    }
];

let objeto:any = {
    propiedad:'valor',
    propiedadDos: 'valor2'
};

objeto.propiedad;        // -> valor
objeto.propiedadDos;     // -> valor 2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';

//Eliminar una propiedad
delete objeto.propiedadTres;        // -> forma peligros
objeto.propiedadTres = undefined;    // -> forma segura