import React from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GoogleIcon from '@mui/icons-material/Google';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 20px)',
        '& > *': {
            padding: theme.spacing(5),
            width: theme.spacing(50),
            height: theme.spacing(30),
            borderRadius: '10px'
        },
    },
}));
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 6,
};
const Login = () => {
    const navigate = useNavigate();
    //  navigate("/home");
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={classes.root}>
            <Paper elevation={10} >
                <h1>Allaccess.one</h1>
                <text>Please connect wallet to continue</text>
                <br></br>
                <Button onClick={handleOpen} size="large" style={{ marginTop: "80px", borderRadius: '10px' }} fullWidth variant="contained" color="primary">Connect Wallet</Button>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Continue with Allaccess wallet
                    </Typography>
                    <Button
                        href="http://localhost:3000/"
                        fullWidth
                        size="large"
                        variant="contained"
                        target="_blank"
                        color="primary"
                        style={{
                            marginTop: "20px",
                            borderRadius: '10px',

                        }}
                        onClick={async () => await navigate('/home')}
                    >Login with Google</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Login;