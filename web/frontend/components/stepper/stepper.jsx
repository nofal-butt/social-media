import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { Page } from '@shopify/polaris';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const StepperComponent = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (

        <div>
            <Page>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <Typography variant="h5">All steps completed!</Typography>
                    ) : (
                        <div>
                            <Typography variant="h5">{steps[activeStep]}</Typography>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Page>
        </div>

    );
};

export default StepperComponent;
