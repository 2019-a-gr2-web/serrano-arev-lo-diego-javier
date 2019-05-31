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
import { LibroService } from './libro.service';
import { Libro } from './libro.model';

@Controller('libro')
export class LibroController {
  constructor(private readonly _libroService: LibroService) {}

  @Get('gestion/:id')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Param('id') id,
    @Session() sesion,
  ) {
    let libros: Libro[] = [];
    let nombreUsuario = '';
    if (busqueda) {
      libros = this._libroService.buscarPorNombre(busqueda, +id);
    } else {
      libros = this._libroService.obtenerLibrosAutor(+id);
    }
    if (sesion.usuario) {
      nombreUsuario = sesion.usuario;
      response.render('libro-inicio', {
        nombreUsuario: nombreUsuario,
        arreglo: libros,
        autorId: id,
      });
    } else {
      response.redirect('/login');
    }
  }

  @Get('crear/:autorId')
  crearGet(@Res() response, @Session() sesion, @Param('autorId') autorId) {
    let nombreUsuario = '';
    if (sesion.usuario) {
      nombreUsuario = sesion.usuario;
      response.render('libro-crear', {
        nombreUsuario: nombreUsuario,
        autorId: autorId,
      });
    } else {
      response.redirect('/login');
    }
  }

  @Post('crear')
  crear(@Res() response, @Session() sesion, @Body() libro: Libro) {
    this._libroService.crearLibro(libro);
    response.redirect('/libro/gestion/' + libro.autorId);
  }

  @Post('borrar/:id')
  eliminarTienda(
    @Res() res,
    @Param('id') id: number,
    @Query('autorId') autorId: number,
  ) {
    this._libroService.eliminarPorId(+id);
    res.redirect('/libro/gestion/' + autorId);
  }
}
