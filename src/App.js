import { useState } from "react";
import "./styles.css";

export default function App() {
  const [cards, setCards] = useState(questions);
  const [selectedQue, setSelectedQue] = useState("");

  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const swCardHndler = (event) => {
    let text = event.target.textContent;
    setSelectedQue(text);
    //index of selected card
    const ind = questions.findIndex((q) => q.question === text);
    //copy the original array with its object
    //by deepCopy function
    const updateQuestion = questions.map((val) => deepCopy(val));

    //switch between question and answer on selected card
    let tmp = updateQuestion[ind].question;
    updateQuestion[ind].question = updateQuestion[ind].answer;
    updateQuestion[ind].answer = tmp;
    //render the modified array

    setCards([...updateQuestion]);
  };
  return (
    <div>
      <FlashCards cards={cards} swCard={swCardHndler} selected={selectedQue} />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];

/*function FlashCards(props) {
  return (
    <div className="flashcards">
      {props.cards.map((card) => {
        console.log("props selected : " + props.selected);
        console.log(card.answer);
        return (
          <div
            className={props.selected === card.answer ? "selected" : null}
            onClick={props.swCard}
          >
            {card.question}
          </div>
        );
      })}
    </div>
  );
}*/

function FlashCards(props) {
  const [selectedId, setSelectedId] = useState(9103);
  const selectHandler = (id) => {
    console.log(id);
    setSelectedId(id !== selectedId ? id : null);
  };

  return (
    <div className="flashcards">
      {props.cards.map((card) => {
        return (
          <div
            key={card.id}
            className={selectedId === card.id ? "selected" : null}
            onClick={() => selectHandler(card.id)}
          >
            {selectedId === card.id ? card.answer : card.question}
          </div>
        );
      })}
    </div>
  );
}
