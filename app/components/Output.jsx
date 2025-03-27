import React from 'react'

export const Row = ({ row }) => {
    return (
        <div className={`flex flex-row justify-evenly w-full items-center `}>
            {row.map((item, idx) => {
                return (
                    <div key={idx} className='text-center border-1 border-[rgba(0,0,0,.15)] w-full h-full flex flex-col items-center justify-center font-bold'>
                        {item}
                    </div>
                )
            })}
        </div>
    )
}

const Output = ({ answerGrid, height, width }) => {
    return (
        <div className={`flex flex-col justify-around h-full items-center p-10 border-0 rounded-xl border-[rgba(0,0,0,0.25)] m-10 shadow-2xl shadow-[rgba(0,0,0,0.25)] `}>
            {answerGrid.map((row, index) => {
                return (
                    <Row row={row} key={index} />
                )
            })}
        </div>
    )
}

export default Output