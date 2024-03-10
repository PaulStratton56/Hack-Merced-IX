import Questionnaire from "./components/Questionnaire"
import CircleDisplay from "./components/CircleDisplay"
import './App.css'
import { useState } from 'react';

const numberOfQuestions = 21;
//_________________________1_____2     3      4    5      6    7     8     9     10    11    12    13     14  15     16    17    18    19     20    21
var questionTypes = Array("MC", "MC", "MC", "SL", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "SL", "SL", "MC", "MC", "SL", "MC", "MC"); //MC for multiple choice, SL for slider
const questionParameters = [
  {name:"Questions 1: Do you have a high bloood pressure?", options:3, values: Array("yes", "no", "prefer not to say - questions will be disregarded - may lower accuracy")},
    {name:"Questions 2: Do you have high cholesterol?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 3: Have you gotten your cholesterol checked within the last 5 years?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 4: what is you BMI(Body Mass Index)?", max:100, min:1},
    {name:"Questions 5: Have you smoked at least 100 cigaretes in you entire life?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 6: Have you ever had a stroke?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 7: Have you ever had coronary heart disease (CHD) or myocardial infraction(MI)?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 8: Have you been physically active in the past 30 days?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 9: Do you consume fruits atleast once a day.?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 10: Do you consume vegetabels atleast once a day?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 11: Do you heavily drink alcohol(adult male 14 drinks per week - adult female 7 drinks per week)?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 12: Do you have any health care coverage, indlucing health insurance and prepaid plans such as HMO?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 13: Was there a time in the past 12 months when you neeeded to see a doctor but could not because of cost?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 14: How well would you say that your general health is(1 being excelent, 5 being poor)?", options: 5, values: Array("1", "2", "3", "4", "5")},
    {name:"Questions 15: Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good? scale 1-30 days", max:30, min:1},
    {name:"Questions 16: Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good? scale 1-30 days", max:30, min:1},
    {name:"Questions 17: Do you have difficulty climbing or walking up the stairs?", options:3, values: Array("yes", "no", "prefer not to say")},
    {name:"Questions 18: Is your sex male or female?", options:3, values: Array("male", "female", "prefer not to say")},
    {name:"Questions 19: How old are you?", max:100, min: 1},
    {name:"Questions 20: what is your education?", options:7, values: Array("none or just kindergarten", "1st-8th", "highschool", "Associate's", "4 year degree college/university", "secondary education", "prefer not to say")},
    {name:"Questions 21: how much income does your household make? (1 <$10,000; 5 < $35,000; 8 >= $75,000", options:8, values: Array("1", "2", "3", "4", "5", "6", "7", "8")}
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
    <body>
      <div className="title-bar">
        <h1>Diabetes Predictor</h1>
      </div>
      <div className="App">
        <div id="input">
          {/* Map through the questions and wrap each in a question-box container */}
          {questionParameters.map((question, index) => (
            <div key={index} className="question-box">
              <p>{question.name}</p>
              {question.options ? (
                <div>
                  {question.values.map((option, i) => (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${index}`}
                          value={i}
                          checked={questionValues[index] === i}
                          onChange={(e) => updateQuestionValue(index, e.target.value)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    type="range"
                    min={question.min}
                    max={question.max}
                    value={questionValues[index]}
                    onChange={(e) => updateQuestionValue(index, e.target.value)}
                    className="slider-input"
                  />
                  <p>{questionValues[index]}</p>
                </div>
              )}
            </div>
          ))}
          <button onClick={submitAnswers}>Submit</button>
        </div>
        <div id="output">
          <CircleDisplay className="outputDisplay" result={result} />
        </div>
      </div>
    </body>
  );
}


export default App;
