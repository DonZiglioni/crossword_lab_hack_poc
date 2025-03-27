export const runExploit = async (grid) => {
    // Get the full width and height of the puzzle
    let height = grid.length
    let width = grid[0].length
    // Create an array to store answers and spaces
    let myGrid = []
    // Loop through all arrays and extract the characters
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const square = grid[i][j]
            if (square === null) {
                myGrid.push(" ")
            } else {
                myGrid.push(square.char)
            }
        }
    }
    // Return array of answer characters and spaces 
    // (Push '*' or '-' instead of 'blank-space' on line 12 if displaying in CLI)
    // Returns game grid's width and height
    return { myGrid, height, width }
}
