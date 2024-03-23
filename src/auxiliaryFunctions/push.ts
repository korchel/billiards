import { IPushVector } from "../types/types";
import Ball from "../Ball";

const getPushAngle = (pushVector: IPushVector): number => {
  const { x1, x2, y1, y2 } = pushVector;
  return Math.atan2(y2 - y1, x2 - x1);
};

const push = (ball: Ball, pushVector: IPushVector): void => {
  const angle = getPushAngle(pushVector);
  ball.speed = { x: 4 * Math.cos(angle) * 60 / ball.mass, y: 4 * Math.sin(angle) * 60 / ball.mass };
};
  
export default push;
