import CircularProgress from '@mui/material/CircularProgress';
import Outcomes from './Outcomes';

export const CircleDisplay = (props) => {

    var resultText = Outcomes.GOOD;
    return (
        <>
            <CircularProgress className="output" variant="determinate" value={props.result}/>
            <div>{resultText}</div>
        </>
    )
}

export default CircleDisplay;