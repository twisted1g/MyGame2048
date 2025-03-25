export class SpaceCell {
    constructor(gameBoard, x, y) {
        const spaceCell = document.createElement("div");
        spaceCell.classList.add("space-cell");
        gameBoard.append(spaceCell);
        this.x = x;
        this.y = y;
    }

    linkCell(cell) {
        cell.setXY(this.x, this.y);
        this.linkedCell = cell;
    }

    unlinkCell() {
        this.linkedCell = null;
    }

    isEmpty() {
        return !this.linkedCell;
    }

    linkCellToMerge(cell) {
        cell.setXY(this.x, this.y);
        this.linkedCellToMerge = cell;
    }

    unlinkCellToMerge() {
        this.linkedCellToMerge = null;
    }

    hasCellToMerge() {
        return !!this.linkedCellToMerge;
    }

    canAccept(newCell) {
        return (
            this.isEmpty() ||
            (!this.hasCellToMerge() && this.linkedCell.value === newCell.value)
        );
    }

    mergeCells() {
        this.linkedCell.setValue(
            this.linkedCell.value + this.linkedCellToMerge.value
        );
        this.linkedCellToMerge.cellElement.remove();
        this.unlinkCellToMerge();
    }
}
