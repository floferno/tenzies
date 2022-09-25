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

        <div onClick={props.holdDice} className={`${props.roll && "shake"} dice`} style={styles} >
            {face}
        </div>
    )
}
