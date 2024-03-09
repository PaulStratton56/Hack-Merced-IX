import Outcomes from "./Outcomes"

export const ResultText = (props) => {
    switch(props.outcome){
        case(Outcomes.GOOD): // Good outcome
            return(
                <div>Who cares?</div>
            )
        case(Outcomes.MID): // Mid outcome
            return(
                <div>You're screwed.</div>
            )
        case(Outcomes.BAD): // Bad outcome
            return(
                <div>You're stupid.</div>
            )
        default:
            return(
                <div>You're impossible..?</div>
            )
    }
}

export default ResultText;