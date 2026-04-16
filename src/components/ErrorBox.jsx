import { Alert, Snackbar } from "@mui/material";


export default function ErrorBox({ message, setMessage }) {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={6000}
            onClose={() => setMessage('')}
        >
            <Alert onClose={() => setMessage('')} severity="error">
                {message}
            </Alert>
        </Snackbar>
    );
}