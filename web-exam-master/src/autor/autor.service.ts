import { Injectable } from '@nestjs/common';
import { Autor } from './autor.model';

@Injectable()
export class AutorService {
  autores: Autor[] = [];
  recnum = 1;

  constructor() {}

  crearAutor(nuevoAutor: Autor): Autor {
    nuevoAutor.id = this.recnum;
    this.recnum++;
    this.autores.push(nuevoAutor);
    return nuevoAutor;
  }

  eliminarPorId(id: number): Autor[] {
    const indice = this.autores.findIndex(autor => {
      return autor.id === id;
    });
    this.autores.splice(indice, 1);
    return this.autores;
  }

  buscarPorNombre(nombre: string) {
    const resultado = this.autores.filter(autor => {
      return autor.nombres.includes(nombre);
    });
    return resultado;
  }
}
