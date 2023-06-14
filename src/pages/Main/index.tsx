import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from "@mui/material/Button";
import { useBlockchain } from "../../blockchain";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Web3 from "web3";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const steps = ['Start', 'Pending', 'Success'];

const Main = () => {
    const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
    const { web3 } = useBlockchain("https://goerli.blockpi.network/v1/rpc/public");
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    const [typeTransaction, setTypeTransaction] = useState<"success" | "error">("success");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [infoTransaction, setInfoTransaction] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const sendTransaction = async (web3: Web3, data: FormData) => {
        const privateKey = "e19d5570950218a0f385f098b9b6c050a63aca31a286da271075a33a8ae7b3da";
        // const privateKey = "";
        const { addressTo, amount } = data;
        try {
            const weiValue = Math.round(parseFloat(amount) * 10 ** 18);
            const hexValue = web3.utils.toHex(weiValue ? weiValue : 0);

            const price = await web3.eth.getGasPrice();
            const gasLimit = await web3.eth.estimateGas({
                to: addressTo,
                from: web3.defaultAccount as string,
                value: hexValue,
                data: "0x",
            });

            const tx = {
                to: addressTo,
                from: web3.defaultAccount as string,
                value: hexValue,
                gas: gasLimit,
                gasPrice: price,
                data: "0x",
            };
            const signedTransaction: any = await web3.eth.accounts.signTransaction(tx, privateKey);
            const sendSignedTransaction = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            sendSignedTransaction
                .on("transactionHash", (transactionHash) => {
                    setTransactionHash(transactionHash);
                    setInfoTransaction("start");
                })
            await sendSignedTransaction;
            setInfoTransaction("success");
            setTransactionHash("");
            setTypeTransaction("success")
        } catch (error) {
            setInfoTransaction("error");
            handleClose();
            handleAlert();
            setTypeTransaction("error")

        }
    };
    const handleAlert = () => {
        setOpenAlert(true);
    };
    useEffect(() => {
        if (infoTransaction === "success" || infoTransaction === "start") {
            handleComplete();
            handleNext()
            if (infoTransaction === "success") {
                handleClose();
                handleAlert();
            }
        }
        setInfoTransaction("");
        console.log(infoTransaction);
    }, [infoTransaction])
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };


    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <>

            <Header />
            <BodyApp>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        image="https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png"
                        alt="Flow"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Send Flow to other Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            I will send 0.01 Flow of you for address 0x090f8a70ed0dca73
                        </Typography>
                        <Button
                            size="large"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                        > Send Transaction</Button>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>

                    <CardMedia
                        component="img"
                        image="https://www.spectre.ai/assets/images/assets/ETH-logo.png?v=2.13"
                        alt="ETH"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Send ETH to other Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            I will send 0.01 ETH of you for address 0x04E407C7d7...0dBcafA5E3Afe
                        </Typography>
                        <Button
                            size="large"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                sendTransaction(web3 as Web3, {
                                    addressTo: myAddress,
                                    amount: "0.00001"
                                })
                                handleOpen();
                            }}
                        > Send Transaction</Button>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>

                    <CardMedia
                        component="img"
                        image="https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png"
                        alt="DAI"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Send DAI to other Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            I will send 10 DAI of you for address 0x04E407C7d7...0dBcafA5E3Afe
                        </Typography>
                        <Button
                            size="large"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                        > Send Transaction</Button>
                    </CardContent>
                </Card>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {allStepsCompleted() ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>

                                        {
                                            transactionHash ?
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CircularProgress style={{ marginBottom: '20px' }} />
                                                </Box>
                                                : null
                                        }
                                        {
                                            transactionHash ?
                                                "Transaction Hash: " + transactionHash

                                                :
                                                null
                                        }

                                    </Typography>

                                </React.Fragment>
                            )}
                        </div>
                    </Box>
                </Modal>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeTransaction} sx={{ width: '100%' }}>
                        {typeTransaction == "success" ? "Successfully Transaction!" : "Failed Transaction!"}

                    </Alert>
                </Snackbar>
            </BodyApp>
        </>
    );
};

export default Main;


const BodyApp = styled.div`
  display: flex;
  text-align: center;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  padding: 40px;
  margin-top: 40px;
`;
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 6,
};



type FormData = {
    addressTo: string;
    amount: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});