import React from 'react'

export default function ScoreBoard(props) {
    return (
        <div className="score-board">
            <div>
                <p className="bold-text">Best Roll:</p>
                <p className="gradient-text">{props.bestRoll}</p>
            </div>
            <div>
                <p className="bold-text">Best Time:</p>
                <p className="gradient-text">{props.bestTime / 100}s</p>
            </div>
        </div>
    )
}
