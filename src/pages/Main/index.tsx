import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from "../../components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { BNBLogo, USDTLogo } from "../../assets/img";

type InfoTransacions = {
    addressTo: string;
    amount: string;
    contractTo?: string;
    origin: string;
    symbol?: string;
};
const Main = () => {
    const cookies = new Cookies();
    const domainTest = "http://mymarketplace.com"
    const navigate = useNavigate();
    const myAddress = cookies.get('masterKey') ? cookies.get('masterKey') : "";

    useEffect(() => {
        if (!myAddress)
            navigate("/")
    }, [myAddress])
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
                            href="http://localhost:3000/transaction"
                            target="popup"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                cookies.set("transaction", JSON.stringify(SendETH))
                                return false;
                            }

                            }
                        > Send Transaction</Button>
                    </CardContent>
                </Card>
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
                            href="http://localhost:3000/transaction"
                            style={{ marginTop: "20px", borderRadius: '10px' }}
                            fullWidth
                            target="popup"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                cookies.set("transaction", JSON.stringify(SendUSDT))
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
