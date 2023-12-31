import React, { useEffect, useState } from "react";
import { listNetWorks, ChainNetwork } from "../../configs/data/blockchain"
import styled from "styled-components"
import { LogoText, Copy } from "../../assets/icon";
import { sliceAddress, copyAddress } from "../../utils";
import { Button } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Account } from "../../blockchain/wrapper";
type Props = {
    network: ChainNetwork;
    setNetwork: React.Dispatch<React.SetStateAction<ChainNetwork>>;
    myAddress: Account;
    setMyAddress: React.Dispatch<React.SetStateAction<Account>>;
    getBalance: () => Promise<string | undefined>;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Header = (props: Props) => {
    const walletURL: string = process.env.REACT_APP_WALLET_ENDPOINT as string;
    const domainTest: string = process.env.REACT_APP_DOMAIN as string;
    const [openLoadingPage, setOpenLoadingPage] = React.useState(false);
    const [balance, setBalance] = useState("0");
    const [statusAddress, setStatusAddress] = useState(false);
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
    const handleCloseLoadingPage = () => {
        setOpenLoadingPage(false);
    };
    const handleOpenLoadingPage = () => {
        setOpenLoadingPage(true);
    };

    const handleChange = async (event: any) => {
        const currentNetwork = listNetWorks.find(network => network.description === event.target.value) as ChainNetwork;
        props.setNetwork(currentNetwork);
    }
    const handleLogin = () => {
        let intervalId: NodeJS.Timeout | undefined;
        const popupWindow = window.open(walletURL, "popup") as Window;
        const dataLogin = {
            chainId: props.network.chainID,
            origin: domainTest
        }
        popupWindow.postMessage({ type: "LOGIN_REQ", data: dataLogin }, "*");
        clearInterval(intervalId);
        const handleTest = () => {
            popupWindow.postMessage({ type: "LOGIN_REQ", data: dataLogin }, "*")
        }
        intervalId = setInterval(handleTest, 1000);
        setTimeout(() => {
            clearInterval(intervalId)
        }, 60000)
        const handlePopupResponse = (event: any) => {
            if (event.data.type === "ADDRESS") {
                const rawAccount = event.data.data;

                if (rawAccount) {
                    const account: Account = JSON.parse(rawAccount);
                    props.setMyAddress(account);
                    setStatusAddress(!!account.address);
                    // if (address)
                    //     getBalance().then(res => {
                    //         setBalance(res as string);
                    //     })
                    handleOpenLoadingPage()
                    setTimeout(() => handleCloseLoadingPage(), 3000);
                }
                else {
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

    useEffect(() => {
        const fetchBalance = async () => {
            if (props.myAddress) {
                const balance: string = await props.getBalance() as string;
                setBalance(balance);
            }

        }

        fetchBalance();
    }, [props.myAddress, props.getBalance(), props.network]);
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
                    <Button onClick={() => copyAddress(props.myAddress.address)}
                        style={{ borderRadius: '10px' }}
                        variant="outlined"
                    > <Copy style={{ marginRight: '10px' }} />{sliceAddress(props.myAddress.address)}
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
                            props.setMyAddress({ address: "", publicKey: "" });
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Connect wallet failed!
                </Alert>
            </Snackbar>
            <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={openLoadingPage}>
                <CircularProgress color='inherit' />
            </Backdrop>
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