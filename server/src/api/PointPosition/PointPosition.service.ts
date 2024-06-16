import { Injectable } from '@nestjs/common';
import { Circle, Data, Point, Rectangle } from './PointPosition.controller';

const isPointInsideCircle = (point: Point, circle: Circle) => {
  const { x: cx, y: cy, radius } = circle;
  const { x: px, y: py } = point;

  const distance = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
  return distance <= radius;
}

const isPointInsideRectangle = (point: Point, rectangle: Rectangle) => {
  const { x: x1, y: y1, width , height} = rectangle;
  const {x: px, y: py} = point;

  const x2 = x1 + width;
  const y2 = y1 + height;
  return px >= x1 && px <= x2 && py >= y1 && py <= y2;
}

@Injectable()
export class PositionService {
  constructor() {}

  async isInShape(body: Data): Promise<any> {
    const {point, shape} = body;

    if (shape.hasOwnProperty('radius')) {
      return isPointInsideCircle(point, shape as Circle);
    } else if (shape.hasOwnProperty('height') && shape.hasOwnProperty('width')) {
      return isPointInsideRectangle(point, shape as Rectangle);
    }
  }
}
