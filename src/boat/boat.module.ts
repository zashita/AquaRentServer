import { Module } from '@nestjs/common';
import { BoatService } from './boat.service';

@Module({
  providers: [BoatService]
})
export class BoatModule {}
