import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiclistaModule } from './modules/ciclista/ciclista.module';

@Module({
  imports: [CiclistaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
