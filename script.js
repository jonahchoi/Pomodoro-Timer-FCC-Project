class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
    this.state = {
      break: 5,
      session: 25,
      timerTitle: "Session",
      timer: 25 * 60,
      pause: true };

    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);

    this.audioRef = React.createRef();
  }

  componentDidUnmount() {
    clearInterval(this.interval);
  }

  handleDecrementBreak() {
    let breakTime = this.state.break;

    if (breakTime > 1) {
      breakTime--;
    }
    if (this.state.timerTitle === 'Break') {
      this.setState({
        break: breakTime,
        timer: breakTime * 60 });

    } else {
      this.setState({
        break: breakTime });

    }
  }

  handleIncrementBreak() {
    let breakTime = this.state.break;
    if (breakTime < 60) {
      breakTime++;
    }
    if (this.state.timerTitle === 'Break') {
      this.setState({
        break: breakTime,
        timer: breakTime * 60 });

    } else {
      this.setState({
        break: breakTime });

    }

  }

  handleDecrementSession() {
    let sessionTime = this.state.session;

    if (sessionTime > 1) {
      sessionTime--;
    }
    if (this.state.timerTitle === 'Session') {
      this.setState({
        session: sessionTime,
        timer: sessionTime * 60 });

    } else {
      this.setState({
        session: sessionTime });

    }

  }

  handleIncrementSession() {
    let sessionTime = this.state.session;
    if (sessionTime < 60) {
      sessionTime++;
    }
    if (this.state.timerTitle === 'Session') {
      this.setState({
        session: sessionTime,
        timer: sessionTime * 60 });

    } else {
      this.setState({
        session: sessionTime });

    }

  }

  handleReset() {
    clearInterval(this.interval);
    this.interval = undefined;
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
    this.setState({
      break: 5,
      session: 25,
      timerTitle: "Session",
      timer: 25 * 60,
      pause: true });

  }

  switchTimer() {
    if (this.state.timerTitle === "Session") {
      this.setState({
        timerTitle: "Break",
        timer: this.state.break * 60 });

    } else if (this.state.timerTitle === "Break") {
      this.setState({
        timerTitle: "Session",
        timer: this.state.session * 60 });

    }
  }

  handlePlayPause() {
    if (this.interval === undefined) {
      this.runTimer();
    }
    this.setState({
      pause: !this.state.pause });

  }

  runTimer() {
    this.interval = setInterval(() => {
      if (this.state.timer === 0) {
        this.audioRef.current.play();
        this.switchTimer();
        return;
      }
      if (this.state.pause) {

        return;
      }
      this.setState({
        timer: this.state.timer - 1 });


    }, 1000);
  }

  convertTime(totalSeconds) {
    let time = totalSeconds;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  render() {

    return /*#__PURE__*/(
      React.createElement("div", { className: "clock" }, /*#__PURE__*/
      React.createElement("h1", { className: "title" }, "Pomodoro Timer"), /*#__PURE__*/

      React.createElement("div", { id: "break-box" }, /*#__PURE__*/
      React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", className: "fa-solid fa-minus", onClick: this.handleDecrementBreak }), /*#__PURE__*/
      React.createElement("p", { id: "break-length" }, this.state.break), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", className: "fa-solid fa-plus", onClick: this.handleIncrementBreak })), /*#__PURE__*/


      React.createElement("div", { id: "session-box" }, /*#__PURE__*/
      React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", className: "fa-solid fa-minus", onClick: this.handleDecrementSession }), /*#__PURE__*/
      React.createElement("p", { id: "session-length" }, this.state.session), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", className: "fa-solid fa-plus", onClick: this.handleIncrementSession })), /*#__PURE__*/


      React.createElement("div", { id: "timer-box" }, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, this.state.timerTitle), /*#__PURE__*/
      React.createElement("p", { id: "time-left" }, this.convertTime(this.state.timer)), /*#__PURE__*/
      React.createElement("button", { id: "start_stop", className: "", onClick: this.handlePlayPause }, /*#__PURE__*/React.createElement("i", { className: `fa fa-${this.state.pause ? 'play' : 'pause'}` })), /*#__PURE__*/

      React.createElement("button", { id: "reset", className: "fa-solid fa-rotate-right", onClick: this.handleReset }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav", ref: this.audioRef }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById('app'));