import { Controller, Get, Res, Post, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response, @Session() sesion) {
    let nombreUsuario = '';
    if (sesion.usuario) {
      nombreUsuario = sesion.usuario;
      response.render('inicio', {
        nombreUsuario: nombreUsuario,
      });
    } else {
      response.redirect('/login');
    }
  }

  @Get('login')
  login(@Res() response, @Session() sesion) {
    response.render('login');
  }

  @Post('login')
  async loginUser(
    @Body('nombre') nombre: string,
    @Res() response,
    @Session() sesion,
  ) {
    sesion.usuario = nombre;
    response.redirect('/');
  }

  @Get('logout')
  logout(@Res() response, @Session() sesion) {
    sesion.usuario = undefined;
    sesion.destroy();
    response.redirect('/login');
  }
}
