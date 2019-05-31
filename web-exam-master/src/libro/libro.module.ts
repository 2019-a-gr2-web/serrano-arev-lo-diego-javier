import { LibroController } from './libro.controller';
import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';

@Module({
  imports: [],
  controllers: [LibroController],
  providers: [LibroService],
  exports: [LibroService],
})
export class LibroModule {}
