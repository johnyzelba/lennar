import { Body, Controller, Get, Post } from '@nestjs/common';
import { PositionService } from './PointPosition.service';

export type Point = {
  y: number;
  x: number
}

export type Circle = Point & {
  radius: number
}

export type Rectangle = Point & {
  width: number;
  height: number
}

export type Data = {
  point: Point,
  shape: Circle | Rectangle
};

@Controller('position')
export class PositionController {
  constructor(private service: PositionService) {}

  @Post('/isinshape')
  async isinShape(@Body() body: Data): Promise<any> {    
    return await this.service.isInShape(body);
  }
}
