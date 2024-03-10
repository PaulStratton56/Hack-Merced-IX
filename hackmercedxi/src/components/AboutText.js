

export const AboutText = () => {
    return(
        <>
            <div id="aboutText">
            Diabetes is a serious condition that forever affects the lifestyle of anyone who has it. <br></br><br></br>
            For this project, we chose diabetes as our target for risk assesment with neural networks. 
            The presence of the condition can have high correlation with a lot of simpler factors about a person who most people would know about themselves at the top of their head. 
            This sets the stage for this project. <br></br><br></br>
            Neural Networks are ideal for capturing any correlation a set of features or qualities have about a certain outcome or fact. 
            We employed publicly available health datasets to see what factors seemed to affect the chance of diabetes the most, 
            and which of those people could answer about without the need for laboratory studies. 
            This resulted in a model that, while it does lose some information from the deeper medical metrics, 
            provides a good estimate for risk of diabetes with good confidence interval, 
            which can help people make informed decisions about contacting a medical specialist for a deeper look into their health prospects. <br></br><br></br>
            Be advised: This is a hackathon project, and under <span style={{color: "#FF0000"}}>NO</span> circumstance should this be used as real medical advice.

                
            </div>
        </>
    )
}

export default AboutText;