import React from 'react'
import Container from './Container/Container';
import './styled.css'

const WhiteBoard = ({onClickWhiteBoard}) => {
    return (
        <div className='white-board'>
          <Container onClickWhiteBoard={onClickWhiteBoard}/>
        </div>
    )
}
export default WhiteBoard