import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Query,
  Session,
  Param,
} from '@nestjs/common';
import { AutorService } from './autor.service';
import { Autor } from './autor.model';

@Controller('autor')
export class AutorController {
  constructor(private readonly _autorService: AutorService) {}

  @Get('inicio')
  inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Session() sesion,
  ) {
    let autores: Autor[] = [];
    let nombreUsuario = '';
    if (busqueda) {
      autores = this._autorService.buscarPorNombre(busqueda);
    } else {
      autores = this._autorService.autores;
    }
    if (sesion.usuario) {
      nombreUsuario = sesion.usuario;
      response.render('autor-inicio', {
        nombreUsuario: nombreUsuario,
        arreglo: autores,
      });
    } else {
      response.redirect('/login');
    }
  }

  @Get('crear')
  crearGet(@Res() response, @Session() sesion) {
    let nombreUsuario = '';
    if (sesion.usuario) {
      nombreUsuario = sesion.usuario;
      response.render('autor-crear', {
        nombreUsuario: nombreUsuario,
      });
    } else {
      response.redirect('/login');
    }
  }

  @Post('crear')
  crear(@Res() response, @Session() sesion, @Body() autor: Autor) {
    this._autorService.crearAutor(autor);
    response.redirect('/autor/inicio');
  }

  @Post('borrar/:id')
  eliminarTienda(@Res() res, @Param('id') id: number) {
    this._autorService.eliminarPorId(+id);
    res.redirect('/autor/inicio');
  }
}
