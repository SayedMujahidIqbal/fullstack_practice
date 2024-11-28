import axios from "axios"
import React from "react"


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => {
      this.setState({ anecdotes: response.data })
    })
  }

  handlClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    )
    this.setState({ current })
  }

  render() {
    if(this.state.anecdotes.length === 0){
      return <div>no anecdotes...</div>
    }

    return(
      <div>
        <h1>Anecdote of the day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handlClick}>next</button>
      </div>
    )
  }
}

export default App
