"use client"
import React, { useState } from 'react'

const Input = ({ prepareExploit }) => {
    const [gridText, setGridText] = useState('')

    return (
        <div className="flex flex-col gap-4 justify-around h-full items-center  ">

            <ol className='list-decimal px-10 mx-20  w-[80%] flex flex-col justify-center rounded-xl py-4 shadow-2xl shadow-[rgba(0,0,0,0.25)]'>
                <li>Right click on website and click "View Page Source"</li>
                <li>Scroll down to the javascript tag and find the 'grid' variable ( var grid = [[void, void, void, { }, etc... )</li>
                <li>Tripple click to select the entire line, copy, and paste below!</li>
            </ol>

            <textarea
                className="border-1 h-[50%] w-[80%] border-[rgba(0,0,0,0.25)] shadow-2xl shadow-[rgba(0,0,0,0.25)]"
                type="text"
                value={gridText}
                placeholder='Paste grid variable including the "var grid = "'
                onChange={(e) => { setGridText(e.target.value) }}
            >
            </textarea>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    prepareExploit(gridText)
                }}
                className="bg-green-100 px-6 py-2 rounded-full font-bold border-2 border-green-700 hover:bg-green-700 hover:border-green-100 hover:text-white shadow-2xl shadow-[rgba(0,0,0,0.40)]">
                Submit
            </button>
        </div>
    )
}

export default Input