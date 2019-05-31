import { Injectable } from '@nestjs/common';
import { Libro } from './libro.model';

@Injectable()
export class LibroService {
  libros: Libro[] = [];
  recnum = 1;

  constructor() {}

  obtenerLibrosAutor(idAutor: number): Libro[] {
    const resultado = this.libros.filter(libro => {
      return libro.autorId == idAutor;
    });
    return resultado;
  }

  crearLibro(nuevoLibro: Libro): Libro {
    nuevoLibro.id = this.recnum;
    this.recnum++;
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  eliminarPorId(id: number): Libro[] {
    const indice = this.libros.findIndex(libro => {
      return libro.id === id;
    });
    this.libros.splice(indice, 1);
    return this.libros;
  }

  buscarPorNombre(nombre: string, idAutor: number): Libro[] {
    const resultado = this.obtenerLibrosAutor(idAutor).filter(libro => {
      return libro.nombre.includes(nombre);
    });
    return resultado;
  }
}
