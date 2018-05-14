export default function ConvertAlphaHEXParameterToDec(alphaHEX) {
  return parseFloat((parseInt(alphaHEX, 16) / 255).toFixed(2), 10);
}

export function ConvertAlphaDecParameterToHEX(alphaDEC) {
  return (Math.ceil((alphaDEC * 25500) / 100)).toString(16);
}
