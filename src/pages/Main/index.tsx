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
                            href="http://localhost:3000/sign-transaction/%7B%22to%22:%20%220x1234567890abcdef%22,%22value%22:%20%220.001%22%7D"
                            target="popup"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                window.open('http://localhost:3000/sign-transaction/%7B%22to%22:%20%220x1234567890abcdef%22,%22value%22:%20%220.001%22%7D', 'popup', 'width=500,height=600');
                                return false;
                            }

                            }
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
                            href="http://localhost:3000/sign-transaction/%7B%22to%22:%20%220x04e407c7d7c2a6aa7f2e66b0b8c0dbcafa5e3afe%22,%22value%22:%20%220.001%22,%20%22tokenContract%22%20:%20%220x73967c6a0904aA032C103b4104747E88c566B1A2%22%7D"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            target="popup"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                window.open('http://localhost:3000/sign-transaction/%7B%22to%22:%20%220x04e407c7d7c2a6aa7f2e66b0b8c0dbcafa5e3afe%22,%22value%22:%20%220.001%22,%20%22tokenContract%22%20:%20%220x73967c6a0904aA032C103b4104747E88c566B1A2%22%7D', 'popup', 'width=500,height=600');
                                return false;
                            }
                            }
                        > Send Transaction</Button>
                    </CardContent>
                </Card>

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