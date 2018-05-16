import colorHexToRgb from './color-hex-to-rgb';
import colorRgbToHEX from './color-rgb-to-hex';
import {
  convertAlphaHEXParameterToDec,
  convertAlphaDecParameterToHEX,
} from './convert-alpha-parameter';
import { sortBy } from 'lodash/collection'

export function encodeGradientProperties(colorsProperties) {
  let styleGradientPanel = 'linear-gradient(to right';
  let colors = [];
  let alphaChannels = [];
  let percentsStep = [];
  let data = [];
  if (colorsProperties) {
    const steps = getStepsArray(colorsProperties);
    const minMax = getMinMaxElements(steps);
    let i = 0;
    Object.keys(colorsProperties).forEach((index) => {
      const { step, color, alpha } = colorsProperties[index];
      const percentStep = getStepToPercent(step, minMax[1]);
      const rgbaColor = colorHexToRgb(`#${color.replace('#', '')}`);
      const alphaColor = convertAlphaHEXParameterToDec(alpha);
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

export function decodeGradientProperties(colorsProperties) {
  return Object.keys(colorsProperties).map((index) => {
    const { color, alpha } = colorsProperties[index];
    const rgbColor = colorRgbToHEX(color);
    const alphaColor = convertAlphaDecParameterToHEX(parseFloat(alpha, 10));
    const item = colorsProperties[index];
    return {
      ...item,
      color: rgbColor,
      alpha: alphaColor,
    }
  });
}

function getStepsArray(data) {
  return Object.keys(data).map(index => data[index].step);
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
