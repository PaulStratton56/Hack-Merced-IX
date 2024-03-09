import Questionnaire from "./components/Questionnaire"
import CircleDisplay from "./components/CircleDisplay"
import './App.css'

function App() {
  var numberOfQuestions = 2;
  var questionTypes = Array("MC", "SL"); //MC for multiple choice, SL for slider
  var questionParameters = Array(
    {name:"NameOfMCQuestion", options:3, values: Array("Option1", "Option2", "Option3")},
    {name:"NameOfSLQuestion", max:69, min:20}
  );

  return (
    <div className="App">
      <div id="input">
        <Questionnaire questions={numberOfQuestions} questionTypes={questionTypes} questionParameters={questionParameters} buttonText={"Submit"}/>
      </div>
      <div id="output">
        <CircleDisplay/>
      </div>
    </div>
  );
}

export default App;
