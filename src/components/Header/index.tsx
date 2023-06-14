import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { LogoText, Copy } from "../../assets/icon";
import { sliceAddress, copyAddress } from "../../utils";
import { Button } from "@material-ui/core";
import { getBalance, useBlockchain } from "../../blockchain";
import Web3 from "web3";
const Header = () => {
    const navigate = useNavigate();
    //  navigate("/home");
    const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
    const [balance, setBalance] = useState("0");
    const { web3 } = useBlockchain("https://goerli.blockpi.network/v1/rpc/public")

    useEffect(() => {
        getBalance(web3 as Web3).then(res => {
            setBalance(res)
        })
    }, [])
    return (
        <HeaderApp>
            <LogoText style={{ width: "20vh" }} />
            <InfoAccount>
                <Button onClick={() => copyAddress(myAddress)}
                    style={{ borderRadius: '10px' }}
                    variant="outlined"
                > <Copy style={{ marginRight: '10px' }} />{sliceAddress(myAddress)}
                </Button>
                <BalanceCard>
                    <div>Balance</div>
                    <div><b style={{ color: "green" }}>{balance}</b> ETH</div>
                </BalanceCard>
            </InfoAccount>
        </HeaderApp>
    );
};

export default Header;
const HeaderApp = styled.div`
  z-index: 99;
  display: flex;
  justify-content: space-between;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  width: 100vw;
  height: 48px;
  padding: 40px;
`;
const InfoAccount = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
`
const BalanceCard = styled.div`
    margin-left: 30px;
`
