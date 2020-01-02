import React from 'react'

import './style.scss'

import Button from '../customButton'
import WhiteSpace from '../whitespace'

const DefenitionCard = (props) => {
    return(<div className="defenition-card__container">
        <div className="defenition-card__title">{props.title}</div>
        <div className="defenition-card__text">{props.text}</div>
        <WhiteSpace space="2" />
        <Button text={props.buttonText}/>
    </div>)
}

export default DefenitionCard;