import { sortBy } from 'lodash/collection';
import colorHexToRgb from './color-hex-to-rgb';
import colorRgbToHEX from './color-rgb-to-hex';
import {
  convertAlphaHEXParameterToDec,
  convertAlphaDecParameterToHEX,
} from './convert-alpha-parameter';

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
  return { min, max };
}

function getStepToPercent(value, maxVaue) {
  return (value * 100) / maxVaue;
}

function getPercentToStep(percent, maxValue) {
  return (percent * maxValue) / 100;
}

export function encodeGradientProperties(colorsProperties) {
  let styleGradientPanel = 'linear-gradient(to right';
  const data = [];
  let max = 0;
  if (colorsProperties) {
    const steps = getStepsArray(colorsProperties);
    const minMax = getMinMaxElements(steps);
    let i = 0;
    Object.keys(colorsProperties).forEach((index) => {
      const { step, color, alpha } = colorsProperties[index];
      max = parseFloat(minMax.max);
      const percentStep = getStepToPercent(step, max);
      const rgbaColor = colorHexToRgb(`#${color.replace('#', '')}`);
      const alphaColor = convertAlphaHEXParameterToDec(alpha);
      data.push({
        key: i,
        step: percentStep,
        color: rgbaColor,
        alpha: alphaColor,
        active: false,
      });
      const parsedColor = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${alphaColor})`;
      styleGradientPanel = `${styleGradientPanel}, ${parsedColor} ${percentStep}%`;
      i += 1;
    });
  }
  return {
    gradient: `${styleGradientPanel})`,
    data,
    max
  };
}

export function decodeGradientProperties(colorsProperties, maxStep) {
  return Object.keys(colorsProperties).map((index) => {
    const { color, alpha, step } = colorsProperties[index];
    const rgbColor = colorRgbToHEX(color);
    const alphaColor = convertAlphaDecParameterToHEX(parseFloat(alpha, 10));
    const item = colorsProperties[index];
    const stepValue = getPercentToStep(step, maxStep);
    return {
      ...item,
      step: stepValue,
      color: rgbColor,
      alpha: alphaColor,
    };
  });
}

export function sortCollectionGradient(data) {
  const sortedData = sortBy(data, o => o.step);
  return sortedData.map((elem, index) => {
    const resultElem = elem;
    resultElem.key = index;
    return elem;
  });
}
