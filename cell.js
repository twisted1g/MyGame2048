export class Cell {
    constructor(gameBoard) {
        this.cellElement = document.createElement("div");
        this.cellElement.classList.add("cell");
        this.setValue(Math.random() > 0.5 ? 4 : 2);
        gameBoard.append(this.cellElement);
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;

        this.cellElement.style.setProperty("--x", x);
        this.cellElement.style.setProperty("--y", y);
    }

    setValue(value) {
        this.value = value;
        this.cellElement.textContent = this.value;
        const lightness = 100 - Math.log2(value) * 9;
        this.cellElement.style.setProperty("--lightness", `${lightness}%`);
    }
}
