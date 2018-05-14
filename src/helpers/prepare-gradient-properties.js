import colorHexToRgb from './color-hex-to-rgb';
import ConvertAlphaHEXParameterToDec from './convert-alpha-parameter';
import { sortBy } from 'lodash/collection'

function prepareGradientProperties(colorsProperties) {
  let styleGradientPanel = 'linear-gradient(to right';
  let steps = [];
  let colors = [];
  let alphaChannels = [];
  let percentsStep = [];
  let data = [];
  if (colorsProperties) {
    Object.keys(colorsProperties).forEach((index) => {
      steps.push(colorsProperties[index].step);
    });
    const minMax = getMinMaxElements(steps);
    let i = 0;
    Object.keys(colorsProperties).forEach((index) => {
      const { step, color, alpha } = colorsProperties[index];
      const percentStep = getStepToPercent(step, minMax[1]);
      const rgbaColor = colorHexToRgb(`#${color}`);
      const alphaColor = ConvertAlphaHEXParameterToDec(alpha);
      data.push({
        key: i++,
        step: percentStep,
        color: rgbaColor,
        alpha: alphaColor,
        active: false,
      });
      const parsedColor = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${alphaColor})`;
      styleGradientPanel = `${styleGradientPanel}, ${parsedColor} ${percentStep}%`;
    });
  }
  return {
    gradient: `${styleGradientPanel})`,
    colors,
    alphaChannels,
    percentsStep,
    data
  };
}

function getMinMaxElements(arrayElement) {
  let min = arrayElement[0];
  let max = arrayElement[arrayElement.length - 1];
  arrayElement.forEach((element) => {
    if (min > element) {
      min = element;
    }
    if (max < element) {
      max = element;
    }
  });
  return [min, max];
}

function getStepToPercent(value, maxVaue) {
  return (value * 100) / maxVaue;
}


export function sortCollectionGradient(data) {
  const sortedData = sortBy(data, o => o.step)
  return sortedData.map((elem, index) => {
    elem.key = index;
    return elem
  });
}

export default prepareGradientProperties;