export const EAT_BEANS = 'EAT_BEANS';
export const GET_POINTS = 'GET_POINTS';

export function eatBeans(beans) {
  // eatBeans is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: EAT_BEANS,
    beans,
  };
}

export function getPoints(score) {
  return {
    type: GET_POINTS,
    score,
  };
}
