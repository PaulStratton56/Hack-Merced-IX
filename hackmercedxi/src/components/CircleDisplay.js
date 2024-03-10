import LinearProgress from '@mui/material/LinearProgress';
import Outcomes from './Outcomes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../App.css';

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffc008', // Color for the loaded part of the bar
      }
    }
  });
  
export const CircleDisplay = (props) => {

    console.log(props.result);
    console.log(props.result * 100);
    console.log(100 - (props.result*100));
    
    var score = Math.floor(100-(props.result*100));
    var resultText;
    switch(true){
        case(score > 50):
            resultText = Outcomes.GOOD;
            break;
        case(score > 10):
            resultText = Outcomes.MID;
            break;
        case(score >= 0):
            resultText = Outcomes.BAD;
            break;
        default:
            resultText = "Something went wrong :/";
            break;
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <LinearProgress
                    variant="determinate" 
                    color="primary"
                    style={{ border: "4px solid black", height: "1.5rem", width: "105%"}}
                    value={score}
                />
            </ThemeProvider>
            <div className="outputText">
                Your score is: {score} <br></br>
                <div className="scoreDescription">

                    {resultText}
                </div>
            </div>
        </>
    )
}

export default CircleDisplay;