export function convertStepToPercent(value, max) {
  return (value * 100) / max;
}

export function convertStepsToPercents(data, max) {
  return data.map(elem => convertStepToPercent(elem, max));
}

export function convertPercentsToStep(data, max) {
  return data.map(elem => (max * elem) / 100);
}

export function getStepPosition(posX, widthContainer) {
  return (posX / widthContainer).toFixed(2);
}
