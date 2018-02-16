import React, { Component } from "react"
import Switch from "react-ios-switch"
import "normalize.css"
import { Howl, Howler } from "howler"
import "./App.css"
import wav from "./switch.wav"
import { loadState, saveState } from "./localStorage"

let switch_count = 9
let switchSound

class App extends Component {
  state = {
    switches: Array(switch_count).fill(false),
    width: window.innerWidth,
    height: window.innerHeight,
    count: 0
  }

  isNormalSize = (width, height) => {
    return width >= 640 && height >= 640
  }

  handleSwitched = (checked, i) => {
    const { switches, count } = this.state
    const nextCount = count + 1
    switches[i] = checked

    this.setState({
      switches: switches,
      count: nextCount
    })

    if (!switchSound.playing()) {
      switchSound.play()
    }

    saveState({ count: nextCount })
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

    const localStorageData = loadState()
    this.setState({ count: localStorageData ? localStorageData.count : 0 })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  render() {
    const { switches, width, height, count } = this.state
    const containerClassNames = this.isNormalSize(width, height)
      ? "switch-container switch-container--normal-size"
      : "switch-container"
    const columnClassNames = this.isNormalSize(width, height)
      ? "col col--normal-size"
      : "col"

    return (
      <div>
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

        <div className="counter-container">
          <div className="counter">{count}</div>
        </div>
      </div>
    )
  }
}

export default App
