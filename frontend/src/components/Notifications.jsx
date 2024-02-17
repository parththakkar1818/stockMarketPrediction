// import React from "react";
import { /*ToastContainer,*/ toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyError = (errorText) => {
    toast.error(errorText, {
        position: "top-right",
        autoClose: 5000,
    });
}

export default notifyError