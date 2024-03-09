import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import {useState} from "react";

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
                        return(<FormControlLabel value={index} control={<Radio />} label={props.parameters.values[index]} />)
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
            <Slider id={String(props.questionNumber)} onChange={handleChange} valueLabelDisplay="auto" value={value} min={props.parameters.min} max={props.parameters.max} />
        </>
    )
}