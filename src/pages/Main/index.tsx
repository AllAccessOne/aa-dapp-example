import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BNBLogo, ETHLogo, USDTLogo } from "../../assets/img";
import { listNetWorks, ChainNetwork } from "../../configs/data/blockchain"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useBlockchain from "../../blockchain/wrapper";
import { Account } from "../../blockchain/wrapper";
// import { transfer } from "../../blockchain old/transfer";
import Web3 from "web3";
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
    const [myAddress, setMyAddress] = useState<Account>({
        address: "",
        publicKey: ""
    });

    const [network, setNetwork] = useState<ChainNetwork>(listNetWorks.find(network => network.chainID === '97') as ChainNetwork)
    const walletURL: string = process.env.REACT_APP_WALLET_ENDPOINT + "/transaction" as string;
    const domainTest: string = process.env.REACT_APP_DOMAIN as string;
    const [open, setOpen] = React.useState(false);
    const [openLoadingPage, setOpenLoadingPage] = React.useState(false);
    const [statusSend, setStatusSend] = React.useState(false);
    const [infoTransactions, setInfoTransactions] = React.useState("");
    const { transfer, getBalance } = useBlockchain(network, myAddress);

    const handleCloseLoadingPage = () => {
        setOpenLoadingPage(false);
    };
    const handleOpenLoadingPage = () => {
        setOpenLoadingPage(true);
    };
    const handleSend = async (data: string) => {

        handleOpenLoadingPage();
        const text = await transfer(data) as string;
        if (text.slice(0, 7) === "Success") {
            setStatusSend(true);
        }
        else {
            setStatusSend(false);
        }
        handleClick();
        handleCloseLoadingPage();
        setInfoTransactions(text as string);

    };
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const SendBNB: InfoTransacions = {
        addressTo: "0x9B0A2787d685dd68245EfD2C737386F392cDD8aE",
        amount: "0.00001",
        origin: domainTest,
        symbol: "BNB"

    }
    const SendETHGoerli: InfoTransacions = {
        addressTo: "0x9B0A2787d685dd68245EfD2C737386F392cDD8aE",
        amount: "0.00001",
        origin: domainTest,
        symbol: "ETH"
    }
    const SendFlow: InfoTransacions = {
        addressTo: "0xfb201e731d5e0691",
        amount: "2",
        origin: domainTest,
        symbol: "Flow"
    }

    const handleSendSignRequest = (dataTransaction: InfoTransacions) => {
        if (!myAddress.address) {
            setStatusSend(false);
            setInfoTransactions("Please connect your wallet");
            handleClick();
            return false;
        }
        let intervalId: NodeJS.Timeout | undefined;

        const popupWindow = window.open(walletURL, "popup") as Window;
        popupWindow.postMessage({ type: "SIGN_REQ", data: dataTransaction }, "*");
        const handleTest = () => {
            popupWindow.postMessage({ type: "SIGN_REQ", data: dataTransaction }, "*")
        }
        intervalId = setInterval(handleTest, 1000);
        setTimeout(() => {
            clearInterval(intervalId)
        }, 60000)
        const handlePopupResponse = async (event: any) => {
            if (event.data.type === "STATUS") {
                const data = event.data.data;
                console.log(data);
                if (!data) {
                    setStatusSend(false);
                    setInfoTransactions("Reject from Wallet");
                    handleClick();
                    clearInterval(intervalId);
                    window.removeEventListener("message", handlePopupResponse);
                    popupWindow.close();
                    return false;
                }

                if (data.signed) {
                    if (network.core === 'evm') {
                        console.log(data.signed);
                        await handleSend(data.signed)
                    }
                    else {
                        console.log(data.signed);
                        setStatusSend(true);
                        setInfoTransactions("Successfully: " + data.signed.transactionId);
                        handleClick();
                    }
                }
                else if (data.error) {
                    setStatusSend(false);
                    setInfoTransactions(data.error);
                    handleClick();
                }
                else {
                    setStatusSend(false);
                    setInfoTransactions("Reject from Wallet");
                    handleClick();
                }
                clearInterval(intervalId);
                window.removeEventListener("message", handlePopupResponse);
                popupWindow.close();
            }
        };
        window.addEventListener("message", handlePopupResponse);
        return false;

    }
    return (
        <>
            <Header network={network} setNetwork={setNetwork} myAddress={myAddress} setMyAddress={setMyAddress} getBalance={getBalance} />
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
                                    I will send 2 Flow of you for address 0x090f8a70ed0dca73
                                </Typography>
                                <Button
                                    size="large"
                                    style={{ marginTop: "20px", borderRadius: '10px' }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        handleSendSignRequest(SendFlow)
                                    }
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
                                I will send 0.00001 BNB of you for address 0x9B0A2787d685dd68245EfD2C737386F392cDD8aE
                            </Typography>
                            <Button
                                size="large"
                                style={{ marginTop: "20px", borderRadius: '10px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleSendSignRequest(SendBNB)
                                }

                                }
                            > Send Transaction</Button>
                        </CardContent>
                    </Card>
                    : null
                }
                {network.chainID === '5' ?
                    <Card sx={{ maxWidth: 345 }}>

                        <CardMedia
                            component="img"
                            image={ETHLogo}
                            alt="USDT"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Send ETH to other Address
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I will send 0.00001 ETH of you for address 0x9B0A2787d685dd68245EfD2C737386F392cDD8aE
                            </Typography>
                            <Button
                                size="large"
                                style={{ marginTop: "20px", borderRadius: '10px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleSendSignRequest(SendETHGoerli)
                                }
                                }
                            > Send Transaction</Button>
                        </CardContent>
                    </Card>
                    : null
                }
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity={statusSend ? "success" : "error"} onClose={handleClose} sx={{ width: '100%' }}>
                        {infoTransactions}
                    </Alert>
                </Snackbar>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={openLoadingPage}>
                    <CircularProgress color='inherit' />
                </Backdrop>
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
export type SignedTransferResponse = { error?: string; signed?: string };
