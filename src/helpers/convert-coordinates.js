export default function pixelsToPercent(value, totalValue) {
  return Math.round((value * 100) / totalValue || 1);
}
