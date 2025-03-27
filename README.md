## Disclaimer

This is a [Next.js](https://nextjs.org) PoC exploit to extract the answers for a [CrosswordLabs.com](https://crosswordlabs.com) puzzle!

- The discovery of this vulnerability was accidental and purely out of curiosity
- This write-up is intended to showcase real-world scenarios in discovering ways that DevSecOps can be applied to reduce these types of attacks, even if they are not malicious at all
- This is NOT intented to be used as a way to "cheat" or beat the system.  Truth is, whatever your instructor is teaching you - you need to learn it - and platforms like crosswordlabs.com make learning fun and interactive.  As an engineer I LOVE puzzles, and when an instructor puts together a game instead of just reading out of a textbook, I get excited and I'm hoping you do too!  So make sure you actually do the crossword puzzle, because it's probably back to more textbook stuff right after, lol.
- I am using words such as "vulnerability" and "exploit" because they describe the nature of the findings, but it's as simple as this... The answers to the puzzles are inside of the page source inside of a matrix array.  All I'm doing is copying and pasting the grid that is in plain text.  Anyone can copy/paste the answers and reconstruct the arrays to display the completed puzzle.  I am new to cybersecurity and this is my first write-up.  I don't believe this is a real "vulnerability", nor do I believe that I crafted a full "exploit", but I need to start somewhere and it simply just sounds "cooler".  Enjoy!

## Synopsis

While studying cybersecurity in school, our instructor used [CrosswordLabs.com](https://crosswordlabs.com) sometimes to give us exercises and games to learn with.

When you finish a crossword puzzle, it shows an animated star to celebrate your completeion!  I finished the puzzle early one day, and I noticed that you can repeatedly press or hold down the 'Enter' button to spam the animated star and it looks really interesting!  I thought someting like that could make a fun page transition, so I opened my browser's dev tools to see some details and started digging into the code on the page...

That was when I noticed the matrix array of characters and nulls inside the script writen on the main HTML page source.

```javascript
   var grid = [[...], [...], [...], ...]
```
## Exploration

Let's take a look at the first item in the grid array (grid[0]), which is also an array.

```javascript
 [null, null, null, null, {
    "down": {
        "index": 8, 
        "is_start_of_word": true
    }, 
    "char": "S", 
    "across": null
    },
    null, null, null, null, null, null, null, {
    "down": {
        "index": 14, 
        "is_start_of_word": true
    }, 
    "char": "B", 
    "across": null
    },
    null, null, null]
```
From here we can already assume we are seeing the letters that are supposed to be in the puzzle, surrounded by the null/blank spaces of the game grid.

But we wont know for sure unless we test it!

## The "Exploit"

Since we already have the array, you can copy/paste it into any IDE/text editor and program your display using any programming language!

For this exercise, I'm going to use Javascript to keep things simple and easy to display on a front-end static website, however you can probably program and display the results in your command line for faster results without the need to design anything.  

The basic PoC exploit for this is as follows...

```javascript 
    let grid = [[...], [...], [...], ...]

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
``` 

## Prepare and Display the Exploit

Wanting to save as much time as possible, I created a Next.js app (jsx and tailwind) and chose to create an extremely simple front-end for this PoC using React.

If you are unfamiliar with React, the useState() hook in React is basically just storing the data received from the exploit into a variable so we can use the data on the front-end.

- First we prepare the input received on the website.  Instructions state to copy and paste the entire variable, which will be received as a string.  
- We then remove the extra characters and semi-colon at the end of the pasted string, leaving only the array.
- Then we parse the remaining portion of the string and turn it into an itterable array.
- Sounds like a lot, but using Javascript it's very easy!

```javascript
    const prepareExploit = async (gridText) => {
        // Removing the "var grid = " & semi-colon at the end of paste
        let oldStrArr = gridText.slice(11)
        let newStrArr = oldStrArr.slice(0, -1)
        // Parse the string into an array and run exploit
        let gridArr = JSON.parse(newStrArr)
        const { myGrid, height, width } = await runExploit(gridArr)
        // Exploit returns the extracted letters, as well as the width and height of puzzle
        // console.log(myGrid, height, width)
        // Store response into React useState 
        setGridHeight(height)
        setGridWidth(width)
        setAnswerArray(myGrid)
        // Display answers on screen
        displayAnswers()
    }
```
- Now that we have what we need, we can display it on the screen.
- The extracted answers are in an ordered array, and we will want to display it in the same order it's displayed in the puzzle, so we will need the width and height of the puzzle to recreate our own display grid.
- The following function will reconstruct the game grid, store it into the application state, and display it on screen.

```javascript
    const displayAnswers = () => {
        // Create temp variables for display grid
        let tempGrid = []
        let tempRow = []
        let totalIndex = 0
        // Reconstruct the game grid
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                const item = answerArray[totalIndex]
                tempRow.push(item)
                totalIndex++
            }
            tempGrid.push(tempRow)
            tempRow = []
        }
        // Store final grid reconstructed into React useState
        setAnswerGrid(tempGrid)
    }

```
- And that's it!  Display the answer grid and design to your pleasing...

## Use the PoC to see in action!

Site is deployed on Vercel @ [Crossword Labs Hack PoC](https://crossword-labs-hack-poc.vercel.app) .

Instructions to use site: 
1. Right click anywhere on the web page and click "View Page Source"
2. Scroll down to the Javascript tag and find the 'grid' variable 
    - ( var grid = [[void, void, void, , etc... )
    - Javascript usually starts around line 300
3. Tripple click to select the entire line, copy, and paste in the text area
    - Submit the entire line, including the var grid = and the trailing semi-colon, but if your copy/paste has added any spaces or an extra line at the end it will return an error, so press backspace all the way to the semi-colon
4. Press Submit

## Thank you!

Thank you for checking out this write-up!  As I discover more throughout my years in cybersecurity, I may share more and will post a centralized link here at the bottom of all my write-ups once that comes together.  For now, thank you for your time!
