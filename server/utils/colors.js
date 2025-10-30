
export function getRandomColor() {
  const colors = [
    { r: 1, g: 0, b: 0 },
    { r: 0, g: 1, b: 0 },
    { r: 0, g: 0, b: 1 },
    { r: 1, g: 1, b: 0 },
    { r: 1, g: 0, b: 1 },
    { r: 0, g: 1, b: 1 },
    { r: 1, g: 0.5, b: 0 }
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}