import React, { Component } from "react"
import Switch from "react-ios-switch"
import "normalize.css"
import { Howl, Howler } from "howler"
import "./App.css"
import wav from "./switch.wav"

let switch_count = 9
let switchSound

class App extends Component {
  state = {
    switches: Array(switch_count).fill(false),
    width: window.innerWidth,
    height: window.innerHeight
  }

  isNormalSize = (width, height) => {
    return width >= 640 && height >= 640
  }

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

  handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const currentSwitchCount = this.state.switches.length

    if (this.isNormalSize(width, height)) {
      switch_count = 25
      if (currentSwitchCount === switch_count) {
        return
      }

      this.setState({
        switches: Array(switch_count).fill(false),
        width: width,
        height: height
      })
    } else {
      switch_count = 9

      if (currentSwitchCount === switch_count) {
        return
      }

      this.setState({
        switches: Array(switch_count).fill(false),
        width: width,
        height: height
      })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    switchSound = new Howl({ src: [wav] })

    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  render() {
    const { switches, width, height } = this.state
    const containerClassNames = this.isNormalSize(width, height)
      ? "switch-container switch-container--normal-size"
      : "switch-container"
    const columnClassNames = this.isNormalSize(width, height)
      ? "col col--normal-size"
      : "col"

    return (
      <div className={containerClassNames}>
        {switches.map((checked, i) => (
          <div className={columnClassNames} key={i}>
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
