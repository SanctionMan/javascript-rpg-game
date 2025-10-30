export function getRandomColor() {
    const colors = [
        new BABYLON.Color3.Red(),
        new BABYLON.Color3.Green(),
        new BABYLON.Color3.Blue(),
        new BABYLON.Color3.Yellow(),
        new BABYLON.Color3.Purple(),
        new BABYLON.Color3.Teal(),
        new BABYLON.Color3.Orange()
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
