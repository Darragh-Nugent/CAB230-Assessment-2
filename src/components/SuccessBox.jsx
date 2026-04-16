import { Alert, Snackbar } from "@mui/material";

export default function ErrorBox({ message, setMessage }) {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={1500}
            onClose={() => setMessage('')}
        >
            <Alert onClose={() => setMessage('')} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
}