import React from 'react';

import './Timer.css';
import alarmSound from './alarm.mp3';

class Timer extends React.Component{

  MAX_TIME = 5*60*1000;
  alarm = new Audio(alarmSound);

  constructor(props){
    super(props);

    this.state = {
      currentTime: this.MAX_TIME,
      isPause: false,
    }
  }

  componentDidMount(){
    const timer = setInterval(() => {

      if (!this.state.isPause){
        if (this.state.currentTime === 0){
          this.alarm.play();
          this.setState({
            isPause: true,
          })
        }
        else {
          this.setState(
            {currentTime: this.state.currentTime - 1000}
          );
        }
      }

    }, 1000);
  }

  computeMinute(totalSeconds){
    return Math.floor(totalSeconds/60000);
  }

  computeSecond(totalSeconds){
    return (totalSeconds/1000)%60;
  }

  getTimeInTwoDigits(number){
    return (number < 10 ? '0' : '') + number;
  }

  resetTimer = () => {
    this.setState({
      currentTime: this.MAX_TIME,
      isPause: false,
    });
  }

  pauseTimer = () => {
    this.alarm.pause();
    this.alarm.currentTime = 0;
    this.setState({
      isPause: true,
    })
  };

  resumeTimer = () => {
    this.setState({
      isPause: false,
    })
  };

  render() {
    return (
      <div className="Timer">
        <div className="Time">{this.getTimeInTwoDigits(this.computeMinute(this.state.currentTime))}:{this.getTimeInTwoDigits(this.computeSecond(this.state.currentTime))}</div>

        <div className="buttons">
          <div className="resetButton"><button onClick={this.resetTimer}>Reset Timer</button></div>
          <div className="pauseButton"><button onClick={this.pauseTimer}>Pause Timer</button></div>
          {
            this.state.isPause ? <div className="resumeButton"><button onClick={this.resumeTimer}>Resume Timer</button></div> : null
          }

        </div>


      </div>

    );
  }
}

export default Timer;