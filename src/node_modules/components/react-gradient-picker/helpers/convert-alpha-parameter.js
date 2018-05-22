export function convertAlphaHEXParameterToDec(alphaHEX) {
  return parseFloat((parseInt(alphaHEX, 16) / 255).toFixed(2), 10);
}

export function convertAlphaDecParameterToHEX(alphaDEC) {
  return (Math.ceil((alphaDEC * 25500) / 100)).toString(16);
}

export function convertColorDecParameterToHEX(alphaDEC) {
  return alphaDEC.toString(16);
}
