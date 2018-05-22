import { convertColorDecParameterToHEX } from './convert-alpha-parameter';

export default function colorRgbToHEX(rgb) {
  let red = convertColorDecParameterToHEX(rgb.r).toString();
  let green = convertColorDecParameterToHEX(rgb.g).toString();
  let blue = convertColorDecParameterToHEX(rgb.b).toString();
  red = red.length === 1 ? `0${red}` : red;
  blue = blue.length === 1 ? `0${blue}` : blue;
  green = green.length === 1 ? `0${green}` : green;
  return `${red}${green}${blue}`;
}
