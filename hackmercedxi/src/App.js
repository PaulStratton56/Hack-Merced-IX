import Questionnaire from "./components/Questionnaire"
import CircleDisplay from "./components/CircleDisplay"
import './App.css'
import { useState } from 'react';

const numberOfQuestions = 2;
const questionTypes = ["MC", "SL"]; //MC for multiple choice, SL for slider
const questionParameters = [
  {name:"NameOfMCQuestion", options:3, values: ["Option1", "Option2", "Option3"]},
  {name:"NameOfSLQuestion", max:69, min:20}
];

function App() {
  const [result, setResult] = useState(10);
  const [questionValues, setQuestionValues] = useState(Array.from({ length: numberOfQuestions }, () => -1));

  const sendData = () => {
    var NNPackage = JSON.stringify(questionValues);
    var request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:5000/queryNetwork', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(NNPackage);

    request.onload = function(){
      console.log("Response found!!!.");
      updateResult(Number(this.responseText))
    };
  }

  const updateResult = (value) => {
    setResult(value);
  };

  const updateQuestionValue = (questionNumber, newValue) => {
    var newQuestionValues = [...questionValues];
    newQuestionValues[questionNumber] = Number(newValue);
    setQuestionValues(newQuestionValues);
  }

  const submitAnswers = () => {
    var failure = false;
    questionValues.forEach((value) => {
      if(value === -1){
        failure = true;
      }
    })
    if(failure){
      alert("You haven't filled out a question yet! Please select an answer for all questions. (Note: You must interact with all sliders to proceed.)");
    }
    else{
      console.log("Submitted! Calculating...");   
      console.log(questionValues);
      sendData();
    }
  }

  return (
    <div className="App">
      <div id="input">
        <Questionnaire questions={numberOfQuestions} questionTypes={questionTypes} questionParameters={questionParameters} questionUpdateFunction={updateQuestionValue} buttonText={"Submit"} buttonFunction={submitAnswers}/>
      </div>
      <div id="output">
        <CircleDisplay className="outputDisplay" result={result}/>
      </div>
    </div>
  );
}

export default App;
