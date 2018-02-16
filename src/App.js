import React, { Component } from "react"
import Switch from "react-ios-switch"
import "normalize.css"
import { Howl, Howler } from "howler"
import "./App.css"
import wav from "./switch.wav"

const SWITCH_COUNT = 9
let switchSound

class App extends Component {
  state = { switches: Array(SWITCH_COUNT).fill(false) }

  handleSwitched = (checked, i) => {
    const switches = this.state.switches
    switches[i] = checked

    this.setState({
      switches: switches
    })

    if (!switchSound.playing()) {
      switchSound.play()
    }
  }

  componentDidMount() {
    switchSound = new Howl({ src: [wav] })
  }

  render() {
    const switches = this.state.switches

    return (
      <div className="switch-container">
        {switches.map((checked, i) => (
          <div className="col" key={i}>
            <Switch
              checked={checked}
              onChange={checked => this.handleSwitched(checked, i)}
              className="switch"
            />
          </div>
        ))}
      </div>
    )
  }
}

export default App
