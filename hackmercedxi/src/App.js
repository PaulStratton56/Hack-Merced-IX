import {SliderQuestion, MCQuestion} from "./components/Question";
import AboutText from "./components/AboutText";
import {amber} from '@mui/material/colors';
import CircleDisplay from "./components/CircleDisplay";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import './App.css';
import { useState } from 'react';

const numberOfQuestions = 20;
//_________________________1_____2     3      4    5      6    7     8     9     10    11    12    13     14  15     16    17    18    19     20
var questionTypes = Array("MC", "SL", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "MC", "SL", "MC", "MC", "SL", "SL", "MC", "MC"); //MC for multiple choice, SL for slider
const questionParameters = [
    {name:"Question 1: How well would you say that your general health is (1 being excellent, 3 being poor)?", options: 3, values: Array("1", "2", "3")},
    {name:"Question 2: Now thinking about your mental health, which includes stress, depression, and problems with emotions, about how many days during the past 30 days was your mental health not good? Choose between 0-30 days.", max:30, min:0},
    {name:"Question 3: Have you had a checkup with your doctor within the last 5 years?", options:2, values: Array("Yes", "No")},
    {name:"Question 4: Do you have high blood pressure?", options:2, values: Array("Yes", "No")},
    {name:"Question 5: Do you take medicine for high blood pressure?", options:2, values: Array("Yes", "No")},
    {name:"Question 6: Do you have high cholesterol?", options:2, values: Array("Yes", "No")},
    {name:"Question 7: Have you ever had coronary heart disease (CHD) or myocardial infraction (MI)?", options:2, values: Array("Yes", "No")},
    {name:"Question 8: Have you ever had a stroke?", options:2, values: Array("Yes", "No")},
    {name:"Question 9: Have you ever had skin cancer?", options:2, values: Array("Yes", "No")},
    {name:"Question 10: Have you ever had chronic obstructive pulmonary disease (COPD)?", options:2, values: Array("Yes", "No")},
    {name:"Question 11: Have you been diagnosed clinically or personally with depression?", options:2, values: Array("Yes", "No")},
    {name:"Question 12: Have you ever had a kidney disease?", options:2, values: Array("Yes", "No")},
    {name:"Question 13: What is your gender?", options:2, values: Array("Male", "Female")},
    {name:"Question 14: What is your household income? (1 <$10,000; 5 < $35,000; 8 >= $75,000)", max: 8, min: 1},
    {name:"Question 15: Do you have difficulty climbing or walking up stairs?", options:2, values: Array("Yes", "No")},
    {name:"Question 16: Have you smoked >= 100 cigaretes in your entire life?", options:2, values: Array("Yes", "No")},
    {name:"Question 17: How old are you?", max:100, min: 1},
    {name:"Question 18: what is your BMI (Body Mass Index)?", max:100, min:1},
    {name:"Question 19: what is your education?", options:4, values: Array("none or just kindergarten", "1st-8th", "High School", ">= 4 year degree college/university",)},
    {name:"Question 20: Have you been physically active in the past 30 days?", options:2, values: Array("Yes", "No")},
];

function App() {
  const [result, setResult] = useState(0.4);
  const [questionValues, setQuestionValues] = useState(Array.from({ length: numberOfQuestions }, () => -1));

  const sendData = () => {
    var NNPackage = JSON.stringify(questionValues);
    var request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:5000/queryNetwork', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(NNPackage);

    request.onload = function(){
      console.log("Response found!!!.");
      updateResult(Number(this.responseText));
    };
  }

  const updateResult = (value) => {
    document.getElementById("output").style.display = "flex";
    setResult(value);
  };

  const updateQuestionValue = (questionNumber, newValue) => {
    var newQuestionValues = [...questionValues];
    newQuestionValues[questionNumber] = Number(newValue);
    setQuestionValues(newQuestionValues);
    // setResult(newValue);
  } 

  const submitAnswers = () => {
    var failure = false;
    questionValues.forEach((value) => {
      if(value === -1){
        // failure = true;
      }
    })
    if(failure){
      alert("You haven't filled out a question yet! Please select an answer for all questions. (Note: You must interact with all sliders to proceed.)");
    }
    else{
      console.log("Submitted! Calculating...");   
      console.log(questionValues);
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling animation
      });
      sendData();
    }
  }

  

  return (
    <body>
      <div className="title-bar"> 
        <h1 class="swaying-text">|| HACKING DIABETES ||</h1>
        <IconButton size="large" style={{marginRight: "3rem"}} href="https://github.com/PaulStratton56/Hack-Merced-IX">
          <GitHubIcon fontSize="inherit" style={{color: "#403908"}} />
        </IconButton>
      </div>
      <div className="App">
        <div id="appContainer">
          <div id="input">
            {/* Map through the questions and wrap each in a question-box container */}
            {questionParameters.map((question, index) => (
              <div key={index} className="question-box">
                <p>{question.name}</p>
                {question.options ? (
                  <div>
                    <MCQuestion
                      parameters={{
                        options: question.options,
                        values: question.values,
                        max: question.max
                      }}
                      questionUpdateFunction={updateQuestionValue}
                      questionNumber={index}
                    />
                  </div>
                ) : (
                  <div>
                    <SliderQuestion
                      parameters={{
                        min: question.min,
                        max: question.max
                      }}
                      questionUpdateFunction={updateQuestionValue}
                      questionNumber={index}
                    />
                    <p>{(questionValues[index] !== -1) ? "Currently Selected: " + String(questionValues[index]) : "Please select a value."}</p>
                  </div>
                )}
              </div>
            ))}
            <Button sx={{ '&:hover':{backgroundColor: "#ffe082",}, width:"100%", height:"4rem", fontSize:"2rem", backgroundColor: amber[500], color: "#000000" }} onClick={submitAnswers} variant="contained">Submit!</Button>
          </div>
          <div id="output">
            <CircleDisplay className="outputDisplay" result={result} />
            <AboutText/>
          </div>
        </div>
      </div>
    </body>
  );
}


export default App;
