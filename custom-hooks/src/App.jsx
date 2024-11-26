import { useState } from "react"

///// creating custom hook for counter ///////
// const useCounter = () => {
//   const [value, setValue] = useState(0)

//   const increase = () => {
//     setValue(value + 1)
//   }

//   const decrease = () => {
//     setValue(value - 1)
//   }

//   const zero = () => {
//     setValue(0)
//   }

//   return {
//     value,
//     increase,
//     decrease,
//     zero
//   }
// }


/////// defining useField() hook for user form /////
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) =>{
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


const App = () => {
  // const left = useCounter()
  // const right = useCounter()

  // return (
  //   <div>
  //     {left.value}
  //     <button onClick={left.increase}>left</button>
  //     <button onClick={right.increase}>right</button>
  //     {right.value}
  //   </div>
  // )

  // const [name, setName] = useState('')
  // const [born, setBorn] = useState('')
  // const [height, setHeight] = useState('')
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        {/* <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> OR */ }
        <input {...name} />
        <br/> 
        birthdate:
        {/* <input
          // type={born.type}
          // value={born.value}
          // onChange={born.onChange}

        />  OR */}
        <input {...born} />
        <br /> 
        height:
        {/* <input
          // type={height.type}
          // value={height.value}
          // onChange={height.onChange}
        /> OR */}
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}


export default App
