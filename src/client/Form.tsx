import React,{ useState } from "react"

const Form = ({handleChange, name, text}) => {
  return(<input type={'text'} value={text} name={name} onChange={(e) => handleChange(e)}></input>)
}

export default Form