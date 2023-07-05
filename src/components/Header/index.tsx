import React, { useEffect, useState } from "react";
import { listNetWorks, ChainNetwork } from "../../configs/data/blockchain"
import styled from "styled-components"
import { LogoText, Copy } from "../../assets/icon";
import { sliceAddress, copyAddress } from "../../utils";
import { Button } from "@material-ui/core";
import { getBalance, useBlockchain } from "../../blockchain";
import { useCookies } from 'react-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import Web3 from "web3";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
type Props = {
    network: ChainNetwork;
    setNetwork: React.Dispatch<React.SetStateAction<ChainNetwork>>
}
const Header = (props: Props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['masterKey', 'origin', 'chainId']);
    const walletURL: string = process.env.REACT_APP_WALLET_ENDPOINT as string;
    const domainTest: string = process.env.REACT_APP_DOMAIN as string;

    const [myAddress, setMyAddress] = useState('');
    const [balance, setBalance] = useState("0");
    const [statusAddress, setStatusAddress] = useState(false);
    const { web3 } = useBlockchain(props.network.rpcUrls);


    // useEffect(() => {
    //     const masterKey = cookies['masterKey'] || '';
    //     if (masterKey) {
    //         getBalance(web3 as Web3).then(res => {
    //             setBalance(res);
    //         })
    //     }
    //     setStatusAddress(!!masterKey);
    //     setMyAddress(masterKey);
    // }, [cookies.masterKey]);

    const updateDomain = (value: string) => {
        setCookie('origin', value, { path: '/' });
    };
    const updateChainId = (value: string) => {
        setCookie('chainId', value, { path: '/' });
    };
    const removeCookieMasterKey = () => {
        removeCookie('masterKey', { path: '/' });
    };
    const handleChange = async (event: any) => {
        const currentNetwork = listNetWorks.find(network => network.description === event.target.value) as ChainNetwork;
        props.setNetwork(currentNetwork);
    }
    const handleLogin = () => {
        const popupWindow = window.open(walletURL, "popup", 'width=500,height=700') as Window;
        const chainId = props.network.chainID;
        popupWindow.postMessage({ type: "CHAIN_ID", data: chainId }, "*");
        const handleTest = () => {
            popupWindow.postMessage({ type: "CHAIN_ID", data: chainId }, "*")
        }
        let intervalId: NodeJS.Timeout | undefined;
        intervalId = setInterval(handleTest, 1000);
        setTimeout(() => {
            clearInterval(intervalId)
            window.removeEventListener("message", handlePopupResponse);
            popupWindow.close();
        }, 60000)
        const handlePopupResponse = (event: any) => {
            if (event.data.type === "ADDRESS") {
                const address = event.data.data;
                setMyAddress(address);
                setStatusAddress(!!address);
                if (address)
                    getBalance(web3 as Web3, address).then(res => {
                        setBalance(res);
                    })
                clearInterval(intervalId);
                window.removeEventListener("message", handlePopupResponse);
                popupWindow.close();
            }
        };
        window.addEventListener("message", handlePopupResponse);

        return false;
    }
    return (
        <HeaderApp>
            <LogoText style={{ width: "200px", height: "100px" }} />
            <FormControlCustom>
                <SelectCustom disabled={statusAddress ? true : false} value={props.network.description} onChange={handleChange}>
                    {listNetWorks.map(network => (
                        <MenuItemCustom key={network.chainID} value={network.description}>
                            <p>{network.description}</p>
                        </MenuItemCustom>
                    ))}
                </SelectCustom>
            </FormControlCustom>
            {statusAddress ?
                <InfoAccount>
                    <Button onClick={() => copyAddress(myAddress)}
                        style={{ borderRadius: '10px' }}
                        variant="outlined"
                    > <Copy style={{ marginRight: '10px' }} />{sliceAddress(myAddress)}
                    </Button>
                    <BalanceCard>
                        <div>Balance</div>
                        <div><b style={{ color: "green" }}>{balance}</b> {props.network.title}</div>
                    </BalanceCard>
                    <Button
                        color="secondary"
                        style={{
                            borderRadius: '10px',
                            marginLeft: '10px'
                        }}
                        onClick={() => {
                            setMyAddress("");
                            setStatusAddress(false);
                            return false;
                        }}><LogoutIcon></LogoutIcon></Button>
                </InfoAccount>

                : <>

                    <Button

                        size="large"
                        variant="contained"

                        color="primary"
                        style={{
                            borderRadius: '10px',

                        }}
                        onClick={() => {
                            handleLogin()
                            return false;

                        }}
                    >Connect wallet</Button></>}

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
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
};
const FormControlCustom = styled(FormControl)`
  border-radius: 8px !important;
  height: 40px !important;
  margin-left: 10px !important;
  box-sizing: border-box;
`;

export const SelectCustom = styled(Select)`
  height: 40px !important;
  border-radius: 8px;
  font-family: "Inter" !important;
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  &:hover {
    border-radius: 8px !important;
  }
  box-sizing: border-box;
  border-radius: 8px !important;
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    border-radius: 8px !important;
  }
`;
const MenuItemCustom = styled(MenuItem)`
  height: 50px;
`;