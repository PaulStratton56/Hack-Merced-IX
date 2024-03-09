import CircularProgress from '@mui/material/CircularProgress';
import ResultText from "./ResultText"
import Outcomes from './Outcomes';

export const CircleDisplay = () => {
    var resultText = Outcomes.GOOD;
    return (
        <>
            <CircularProgress variant="determinate" value={80}/>
            <div>{resultText}</div>
        </>
    )
}

export default CircleDisplay;