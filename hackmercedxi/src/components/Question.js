import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {amber} from '@mui/material/colors';
import {useState} from "react";
import '../App.css'

export const MCQuestion = (props) => {

    const options = Array.from({ length: props.parameters.options }, (_, index) => index);

    const handleChange = (event) => {
        props.questionUpdateFunction(props.questionNumber, event.target.value);
    }
    
    return (
        <>
            <FormControl>
                <FormLabel id={props.questionNumber}>{props.parameters.name}</FormLabel>
                <RadioGroup
                    onChange={handleChange}
                >
                    {options.map((_, index) => {
                        return(<FormControlLabel value={index} control={<Radio sx={{ color: amber[800], '&.Mui-checked': {color: amber[600],}}}
                         />} label={<Typography style={{ fontFamily: 'Consolas' }}>{props.parameters.values[index]}</Typography>} />)
                    })}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export const SliderQuestion = (props) => {
    const [value, setValue] = useState(props.parameters.min + Math.floor((props.parameters.max) * 0.2));
    const handleChange = (event) => {
        setValue(event.target.value);
        props.questionUpdateFunction(props.questionNumber, event.target.value);
    }

    return (
        <>
            <label htmlFor={String(props.questionNumber)}>{props.parameters.name}</label>
                <Slider sx={{ color: amber[500] }} marks={[{value: props.parameters.min+(props.parameters.max*0.01), label: props.parameters.min}, {value: props.parameters.max*0.99, label: props.parameters.max}]} id={String(props.questionNumber)} onChange={handleChange} valueLabelDisplay="auto" value={value} min={props.parameters.min} max={props.parameters.max} />
        </>
    )
}   