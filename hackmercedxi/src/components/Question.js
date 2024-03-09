import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

export const MCQuestion = (props) => {
    
    const options = Array.from({ length: props.parameters.options }, (_, index) => index);

    return (
        <>
            <FormControl>
                <FormLabel id="radioLabel">{props.parameters.name}</FormLabel>
                <RadioGroup
                    defaultValue="HI"
                    name="radioButtons"
                >
                    {options.map((_, index) => {
                        return(<FormControlLabel value={props.parameters.values[index]} control={<Radio />} label={props.parameters.values[index]} />)
                    })}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export const SliderQuestion = (props) => {
    

    return (
        <>
            <label for="theSlider">{props.parameters.name}</label>
            <Slider name="theSlider" valueLabelDisplay="auto" defaultValue={props.parameters.min + Math.floor((props.parameters.max) * 0.2)} min={props.parameters.min} max={props.parameters.max} />
        </>
    )
}