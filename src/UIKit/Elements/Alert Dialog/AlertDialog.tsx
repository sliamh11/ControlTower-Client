import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { red } from "@mui/material/colors";

const AlertDialog = ({ open }) => {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{color: red[500], textAlign: "center"}} id="alert-dialog-title">
                    {"Server Disconnected"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We are working on solving the problem as quickly as possible, 
                        thank you for your patient.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AlertDialog;