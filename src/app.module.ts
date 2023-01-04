import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';

@Module({
  imports: [BackendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
