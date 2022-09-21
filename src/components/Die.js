import React from 'react'
import { nanoid } from 'nanoid'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    const faces = [
        [<div key={nanoid()} className='dot center middle'></div >],

        [<div key={nanoid()} className='dot top left'></div >,
        <div key={nanoid()} className='dot bottom right'></div >],

        [<div key={nanoid()} className='dot top left'></div >,
        <div key={nanoid()} className='dot center middle'></div >,
        <div key={nanoid()} className='dot bottom right'></div >],

        [<div key={nanoid()} className='dot top left'></div >,
        <div key={nanoid()} className='dot top right'></div >,
        <div key={nanoid()} className='dot bottom left'></div >,
        <div key={nanoid()} className='dot bottom right'></div >],

        [<div key={nanoid()} className='dot top left'></div >,
        <div key={nanoid()} className='dot top right'></div >,
        <div key={nanoid()} className='dot center middle'></div >,
        <div key={nanoid()} className='dot bottom left'></div >,
        <div key={nanoid()} className='dot bottom right'></div >],

        [<div key={nanoid()} className='dot top left'></div >,
        <div key={nanoid()} className='dot top right'></div >,
        <div key={nanoid()} className='dot center left'></div >,
        <div key={nanoid()} className='dot center right'></div >,
        <div key={nanoid()} className='dot bottom left'></div >,
        <div key={nanoid()} className='dot bottom right'></div >]

    ]
    let face = faces[props.value - 1]


    return (
        // <div className="die-face" style={styles} onClick={props.holdDice}>
        //     <h2 className="die-num">{face}</h2>
        // </div>

        <div onClick={props.holdDice} className='dice' style={styles}>
            {face}
        </div>
    )
}
