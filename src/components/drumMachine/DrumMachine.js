import React from "react";
import "./DrumMachine.css"; // Importer le fichier CSS

class DrumMachine extends React.Component {
  componentDidMount() {
    // Ajouter un écouteur d'événements pour écouter les événements keydown
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Supprimer l'écouteur d'événements lorsque le composant est démonté
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    // Vérifier si la touche pressée correspond à l'une des touches de la machine à tambour
    const pressedKey = event.key.toUpperCase();
    const drumPad = document.querySelector(
      `.drum-pad[data-key="${pressedKey}"]`
    );
    if (drumPad) {
      // Si la touche de la machine à tambour existe, déclencher son audio et afficher la description associée
      const audioId = drumPad.id;
      const audioDescription = this.getAudioDescription(audioId);
      document.getElementById("display").innerText = audioDescription;
      this.playAudio(pressedKey);
    }
  };

  // Fonction pour obtenir la description du clip audio en fonction de son id
  getAudioDescription = (audioId) => {
    // Définir une map des descriptions des clips audio basées sur leurs ids
    const audioDescriptions = {
      "heater-1": "Heater 1",
      "heater-2": "Heater 2",
      "heater-3": "Heater 3",
      "heater-4": "Heater 4",
      clap: "Clap",
      "open-hh": "Open HH",
      "kick-n-hat": "Kick n Hat",
      kick: "Kick",
      "closed-hh": "Closed HH",
    };
    // Retourner la description pour l'id audio fourni ou une valeur par défaut si non trouvé
    return audioDescriptions[audioId] || "Inconnu";
  };

  // Fonction pour jouer l'audio lorsque le tambour est cliqué ou déclenché par une pression de touche
  playAudio(key) {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0; // Réinitialiser l'audio au début s'il est déjà en train de jouer
      audio.play();
    }
  }

  render() {
    // Définir un tableau de données de tambour
    const drumPadsData = [
      {
        id: "heater-1",
        key: "Q",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      },
      {
        id: "heater-2",
        key: "W",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      },
      {
        id: "heater-3",
        key: "E",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      },
      {
        id: "heater-4",
        key: "A",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      },
      {
        id: "clap",
        key: "S",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      },
      {
        id: "open-hh",
        key: "D",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      },
      {
        id: "kick-n-hat",
        key: "Z",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      },
      {
        id: "kick",
        key: "X",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      },
      {
        id: "closed-hh",
        key: "C",
        audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      },
    ];

    // Créer des éléments JSX de tambour à l'aide de la fonction map
    const drumPads = drumPadsData.map((pad) => (
      <div
        className="drum-pad"
        id={pad.id}
        key={pad.id}
        data-key={pad.key}
        onClick={() => {
          this.playAudio(pad.key);
          document.getElementById("display").innerText =
            this.getAudioDescription(pad.id);
        }}
      >
        {pad.key}
        {/* Élément audio HTML5 */}
        <audio className="clip" id={pad.key} src={pad.audio}></audio>
        {/* Vous pouvez également ajouter tout contenu supplémentaire pour chaque tambour ici */}
      </div>
    ));

    return (
      <div id="drum-machine">
        {/* Élément d'affichage */}
        <div id="display">{/* Contenu de l'affichage */}</div>
        {/* Tampons de tambour */}
        {drumPads}
      </div>
    );
  }
}

export default DrumMachine;
