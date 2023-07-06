import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BNBLogo, USDTLogo } from "../../assets/img";
import { listNetWorks, ChainNetwork } from "../../configs/data/blockchain"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
type InfoTransacions = {
    addressTo: string;
    amount: string;
    contractTo?: string;
    origin: string;
    symbol?: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Main = () => {
    const [network, setNetwork] = useState<ChainNetwork>(listNetWorks.find(network => network.chainID === '97') as ChainNetwork)
    const walletURL: string = process.env.REACT_APP_WALLET_ENDPOINT + "/transaction" as string;
    const [statusTransaction, setStatusTransaction] = useState("");
    const domainTest: string = process.env.REACT_APP_DOMAIN as string;
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const SendETH: InfoTransacions = {
        addressTo: "0x9B0A2787d685dd68245EfD2C737386F392cDD8aE",
        amount: "0.001",
        origin: domainTest,
        symbol: "BNB"

    }
    const SendUSDT: InfoTransacions = {
        addressTo: "0x9B0A2787d685dd68245EfD2C737386F392cDD8aE",
        amount: "2",
        origin: domainTest,
        contractTo: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        symbol: "USDT"
    }
    const handleSendSignRequest = (dataTransaction: InfoTransacions) => {
        const popupWindow = window.open(walletURL + "/transaction", "popup", 'width=500,height=700') as Window;
        popupWindow.postMessage({ type: "SIGN_REQ", data: dataTransaction }, "*");
        const handleTest = () => {
            popupWindow.postMessage({ type: "SIGN_REQ", data: dataTransaction }, "*")
        }
        setTimeout(handleTest, 1000)

        // const handlePopupResponse = (event: any) => {
        //     if (event.data.type === "STATUS") {
        //         const status = event.data.data;
        //         status ?
        //             setStatusTransaction(status) : setStatusTransaction("Success!")
        //         handleClick()
        //         window.removeEventListener("message", handlePopupResponse);
        //         popupWindow.close();
        //     }
        // };
        // window.addEventListener("message", handlePopupResponse);
        return false;
    }
    return (
        <>
            <Header network={network} setNetwork={setNetwork} />
            <BodyApp>

                {
                    network.chainID === "flow-testnet" ?
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
                        </Card> : null
                }
                {network.chainID === '97' ?
                    <Card sx={{ maxWidth: 345 }}>

                        <CardMedia
                            component="img"
                            image={BNBLogo}
                            alt="BNB"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Send BNB to other Address
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I will send 0.01 BNB of you for address 0x9B0A2787d685dd68245EfD2C737386F392cDD8aE
                            </Typography>
                            <Button
                                size="large"
                                href={walletURL}
                                target="popup"
                                style={{ marginTop: "20px", borderRadius: '10px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleSendSignRequest(SendETH)
                                }

                                }
                            > Send Transaction</Button>
                        </CardContent>
                    </Card>
                    : null
                }
                {network.chainID === '97' ?
                    <Card sx={{ maxWidth: 345 }}>

                        <CardMedia
                            component="img"
                            image={USDTLogo}
                            alt="USDT"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Send USDT to other Address
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I will send 10 USDT of you for address 0x9B0A2787d685dd68245EfD2C737386F392cDD8aE
                            </Typography>
                            <Button
                                size="large"
                                href={walletURL}
                                style={{ marginTop: "20px", borderRadius: '10px' }}
                                fullWidth
                                target="popup"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleSendSignRequest(SendUSDT)
                                }
                                }
                            > Send Transaction</Button>
                        </CardContent>
                    </Card>
                    : null
                }
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} sx={{ width: '100%' }}>
                        {statusTransaction}
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
