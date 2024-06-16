import { Module } from '@nestjs/common';
import { PositionController } from './PointPosition.controller';
import { PositionService } from './PointPosition.service';


@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
