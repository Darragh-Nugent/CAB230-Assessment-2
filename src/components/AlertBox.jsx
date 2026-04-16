import { Alert, Snackbar } from "@mui/material";


export default function AlertBox({ message, setMessage, severity }) {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={6000}
            onClose={() => setMessage('')}
        >
            <Alert onClose={() => setMessage('')} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}