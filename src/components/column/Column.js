import React, { useState, useEffect } from 'react';

const Column = (props) => {
    console.log(props)
    return (
        <div className='column'>
            {props.value.name}
        </div>
    )
}

export default Column;
