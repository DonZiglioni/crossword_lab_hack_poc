
export const runExploit = async (grid) => {
    let height = grid.length
    let width = grid[0].length
    // console.log("W: ", width, "H: ", height);
    let myGrid = []

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const square = grid[i][j];
            if (square === null) {
                myGrid.push(" ")
            } else {
                myGrid.push(square.char);
            }
        }
    }
    return { myGrid, height, width }
}
