import {MCQuestion, SliderQuestion} from "./Question"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const Questionnaire = (props) => {
    
    const questions = Array.from({ length: props.questions }, (_, index) => index);

    return(
        <>
            <Stack spacing={1}>
                {questions.map((_, index) => {
                    switch(props.questionTypes[index]){
                        case("MC"):
                            return(<MCQuestion questionUpdateFunction={props.questionUpdateFunction} questionNumber={index} parameters={props.questionParameters[index]}/>);
                        case("SL"):
                            return(<SliderQuestion questionUpdateFunction={props.questionUpdateFunction} questionNumber={index} parameters={props.questionParameters[index]}/>);
                        default:
                            return(<div>ERROR: What did you put as the question type for questionTypes{index+1}??</div>);
                    }
                })}
                <Button onClick={props.buttonFunction} variant="contained">{props.buttonText}</Button>
            </Stack>
        </>
    )
}

export default Questionnaire;