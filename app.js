import * as React from 'react'
import ReactDOM from 'react-dom'
import MultipleInput from './src/index.jsx'



function handleChange(value) {
  console.log(value)
}

function handleSelectedChange(isCeil) {
  console.log(isCeil)
}


ReactDOM.render(
  <MultipleInput
    onChange={handleChange}
    selectMax="3"
    selectChange={handleSelectedChange}
    inputReg={/^\d*$/}
  />,
  document.getElementById('app')
)