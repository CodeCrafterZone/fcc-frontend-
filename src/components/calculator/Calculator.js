import React from "react";
import "./Calculator.css";

// Définition des données pour les boutons de la calculatrice
const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

// Définition des opérateurs
const operators = ["AC", "/", "x", "+", "-", "="];

// Définition des chiffres
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Composant pour afficher l'entrée et la sortie de la calculatrice
const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

// Composant pour les boutons de la calculatrice
const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

// Composant pour la grille des touches de la calculatrice
const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

// Composant principal de l'application de la calculatrice
const Calculator = () => {
  // Déclaration des états pour l'entrée, la sortie et les données de la calculatrice
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatorData, setCalculatorData] = React.useState("");

  // Fonction pour évaluer l'expression et mettre à jour l'état
  const handleSubmit = () => {
    console.log({ calculatorData });
    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  // Fonction pour effacer l'entrée de la calculatrice
  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  // Fonction pour gérer les chiffres saisis par l'utilisateur
  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  // Fonction pour gérer l'ajout de la virgule décimale
  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  // Fonction pour gérer les opérateurs saisis par l'utilisateur
  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  //Fonction pour gérer toutes les entrées de l'utilisateur
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  // Fonction pour mettre à jour la sortie de la calculatrice
  const handleOutput = () => {
    setOutput(calculatorData);
  };

  // Effet secondaire pour mettre à jour la sortie lorsque les données de la calculatrice changent
  React.useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  // Rendu JSX du composant App
  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default Calculator;
