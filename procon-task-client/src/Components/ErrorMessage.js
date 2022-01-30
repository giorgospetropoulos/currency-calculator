import React from "react";
import { Alert } from "react-bootstrap";

//Display Error Message in bootstrap alert
const ErrorMessage = ({variant="info", children}) => {
    return (
        <Alert variant={variant} style={{fontSize:20}}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage;