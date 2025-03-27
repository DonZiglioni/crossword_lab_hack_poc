"use client"
import React, { useState } from 'react'

const Input = ({ prepareExploit }) => {
    const [gridText, setGridText] = useState('')

    return (
        <div className="flex flex-col gap-4 justify-around h-full items-center  ">

            <ol className='list-decimal mx-20'>
                <li>Right click on website and click "View Page Source"</li>
                <li>Scroll down to the javascript tag and find the 'grid' variable ( var grid = [[void, void, void, { }, etc... )</li>
                <li>Tripple click to select the entire line, copy, and paste below!</li>
            </ol>

            <textarea
                className="border-2 h-[50%] w-[80%] border-black"
                type="text"
                value={gridText}
                placeholder='Paste grid variable including the "var grid = "'
                onChange={(e) => { setGridText(e.target.value) }}
            >
            </textarea>

            <button onClick={() => prepareExploit(gridText)} className="bg-amber-100 p-4">Submit</button>
        </div>
    )
}

export default Input