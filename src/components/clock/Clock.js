import React from "react";
import "./Clock.css";

// Définition du nom du projet
const projectName = "25-5-clock";

// Fonction pour gérer les intervalles avec précision
const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  // Fonction wrapper pour mettre à jour le prochain intervalle
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  // Fonction pour annuler l'intervalle
  cancel = function () {
    return clearTimeout(timeout);
  };
  // Démarrage de l'intervalle
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

// Définition des composants React

// Composant pour contrôler la durée de la pause et de la session
class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        {/* Bouton pour diminuer la durée */}
        <button
          className="btn-level"
          id={this.props.minID}
          onClick={this.props.onClick}
          value="-"
        >
          &#x25BC; {/* Flèche vers le bas (Unicode) */}
        </button>
        {/* Affichage de la durée */}
        <div className="btn-level" id={this.props.lengthID}>
          {this.props.length}
        </div>
        {/* Bouton pour augmenter la durée */}
        <button
          className="btn-level"
          id={this.props.addID}
          onClick={this.props.onClick}
          value="+"
        >
          &#x25B2; {/* Flèche simple vers le haut */}
        </button>
      </div>
    );
  }
}

// Composant principal de la minuterie
class Clock extends React.Component {
  constructor(props) {
    super(props);
    // Initialisation de l'état de la minuterie
    this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "white" },
    };
    // Liaison des méthodes aux instances de la classe
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Méthode pour définir la durée de la pause
  setBrkLength(e) {
    this.lengthControl(
      "brkLength",
      e.currentTarget.value,
      this.state.brkLength,
      "Session"
    );
  }

  // Méthode pour définir la durée de la session
  setSeshLength(e) {
    this.lengthControl(
      "seshLength",
      e.currentTarget.value,
      this.state.seshLength,
      "Break"
    );
  }

  // Méthode pour contrôler la durée
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === "running") {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === "+" && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else if (sign === "-" && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60,
      });
    } else if (sign === "+" && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60,
      });
    }
  }

  // Méthode pour contrôler la minuterie
  timerControl() {
    if (this.state.timerState === "stopped") {
      this.beginCountDown();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped" });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }

  // Méthode pour démarrer le compte à rebours
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000),
    });
  }

  // Méthode pour décrémenter le temps restant
  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }

  // Méthode pour contrôler les phases de la minuterie
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === "Session") {
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, "Break");
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.seshLength * 60, "Session");
      }
    }
  }

  // Méthode pour changer la couleur de l'alarme lorsque le temps est presque écoulé
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: "#a50d0d" } });
    } else {
      this.setState({ alarmColor: { color: "white" } });
    }
  }

  // Méthode pour déclencher le son de l'alarme lorsque le temps est écoulé
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }

  // Méthode pour basculer entre la session et la pause
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: "white" },
    });
  }

  // Méthode pour formater le temps restant
  clockify() {
    if (this.state.timer < 0) return "00:00";
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  // Méthode pour réinitialiser la minuterie
  reset() {
    this.setState({
      brkLength: 5,
      seshLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "white" },
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return (
      <div className="container">
        <div className="main-title">25 + 5 Clock</div>
        {/* Contrôle de la durée de la pause */}
        <TimerLengthControl
          addID="break-increment"
          length={this.state.brkLength}
          lengthID="break-length"
          minID="break-decrement"
          onClick={this.setBrkLength}
          title="Break Length"
          titleID="break-label"
        />
        {/* Contrôle de la durée de la session */}
        <TimerLengthControl
          addID="session-increment"
          length={this.state.seshLength}
          lengthID="session-length"
          minID="session-decrement"
          onClick={this.setSeshLength}
          title="Session Length"
          titleID="session-label"
        />
        {/* Affichage de la minuterie */}
        <div className="timer" style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.clockify()}</div>
          </div>
        </div>
        {/* Contrôles de la minuterie */}
        <div className="timer-control">
          <button id="start_stop" onClick={this.timerControl}>
            ▶❚❚{" "}
            {/* Symbole Play */
            /* ❚❚  Symbole Pause */}
          </button>
          <button id="reset" onClick={this.reset}>
            🔁 {/* Symbole de réinitialisation */}
          </button>
        </div>
        {/* Élément audio pour l'alarme */}
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}
// Rendu du composant Timer
export default Clock;
