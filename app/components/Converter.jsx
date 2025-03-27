"use client"
import React, { useState } from 'react'
import Input from './Input'
import Output from './Output'
import { runExploit } from '../utils'

const Converter = () => {
    const [answerGrid, setAnswerGrid] = useState([])
    const [answerArray, setAnswerArray] = useState([])
    const [gridWidth, setGridWidth] = useState(0)
    const [gridHeight, setGridHeight] = useState(0)

    const displayAnswers = () => {
        let tempGrid = [];
        let tempRow = [];
        let totalIndex = 0;
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                const item = answerArray[totalIndex];
                tempRow.push(item);
                totalIndex++;
            }
            tempGrid.push(tempRow);
            tempRow = [];
        }
        setAnswerGrid(tempGrid);
    }

    const prepareExploit = async (gridText) => {
        // Removing the "var grid = " & semi-colon at the end of paste
        let oldStrArr = gridText.slice(11)
        let newStrArr = oldStrArr.slice(0, -1)
        // Parse the string into an array and run exploit
        let gridArr = JSON.parse(newStrArr)
        const { myGrid, height, width } = await runExploit(gridArr)
        // Exploit returns the extracted letters, as well as the width and height of puzzle
        // console.log(myGrid, height, width)
        setGridHeight(height)
        setGridWidth(width)
        setAnswerArray(myGrid)
        // Display answers on screen
        displayAnswers()
    }


    return (
        <div className="flex flex-col  md:flex-row w-full h-[70%]">
            <div className=" md:w-[50%] h-[50%] md:h-full ">
                <Input prepareExploit={prepareExploit} />
            </div>
            <div className=" md:w-[50%] h-[50%] md:h-full ">
                {answerGrid && <Output answerGrid={answerGrid} height={gridHeight} width={gridWidth} />}
            </div>

        </div>
    )
}

export default Converter