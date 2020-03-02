import * as React from 'react'
import ReactDOM from 'react-dom'
import MultipleInput from './src/index.jsx'



function handleChange(value) {
  console.log(value)
}


ReactDOM.render(
  <MultipleInput
    onChange={handleChange}
  />,
  document.getElementById('app')
)