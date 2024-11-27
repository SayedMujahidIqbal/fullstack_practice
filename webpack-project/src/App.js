import { useState } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className="container">
            <h2>hello webpack {counter} clicks</h2>
            <button onClick={handleClick}>
                press
            </button>
        </div>
    )
}

export default App