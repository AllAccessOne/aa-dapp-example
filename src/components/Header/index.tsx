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
    const walletURL = "http://localhost:3000"
    const domainTest = "http://mymarketplace.com"
    const [myAddress, setMyAddress] = useState('');
    const [balance, setBalance] = useState("0");
    const [statusAddress, setStatusAddress] = useState(false);
    const { web3 } = useBlockchain(props.network.rpcUrls);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        updateChainId(props.network.chainID)
        setOpen(false)
    };

    useEffect(() => {
        const masterKey = cookies['masterKey'] || '';
        if (masterKey) {
            getBalance(web3 as Web3).then(res => {
                setBalance(res);
            })
        }
        setStatusAddress(!!masterKey);
        setMyAddress(masterKey);
    }, [cookies.masterKey]);

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
    return (
        <HeaderApp>
            <LogoText style={{ width: "20vh" }} />
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
                            removeCookieMasterKey();
                            return false;
                        }}><LogoutIcon></LogoutIcon></Button>
                </InfoAccount>

                : <>
                    <FormControlCustom>
                        <SelectCustom value={props.network.description} onChange={handleChange}>
                            {listNetWorks.map(network => (
                                <MenuItemCustom key={network.chainID} value={network.description}>
                                    <p>{network.description}</p>
                                </MenuItemCustom>
                            ))}
                        </SelectCustom>
                    </FormControlCustom>
                    <Button
                        href={walletURL}
                        size="large"
                        variant="contained"
                        target="popup"
                        color="primary"
                        style={{
                            borderRadius: '10px',

                        }}
                        onClick={() => {

                            updateDomain(domainTest);
                            updateChainId(props.network.chainID)
                            handleOpen();
                            return false;

                        }}
                    >Connect wallet</Button></>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <LogoText style={{ height: '40px', width: '500px' }} />

                    <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                        Please go to Allaccess.one website to confirm connect wallet.

                    </Typography>
                    <Button
                        style={{ marginTop: '30px' }}
                        onClick={() => handleClose()}>
                        Click here if you have confirmed
                    </Button>
                </Box>
            </Modal>
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