import { AutorController } from './autor.controller';
import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';

@Module({
  imports: [],
  controllers: [AutorController],
  providers: [AutorService],
  exports: [AutorService],
})
export class AutorModule {}
