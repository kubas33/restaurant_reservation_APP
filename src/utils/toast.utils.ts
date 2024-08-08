import {toast, ToastOptions, ToastContent, TypeOptions} from 'react-toastify';

interface ShowToastOptions {
    type: TypeOptions;
    message: ToastContent | string;
}

export const showToast = ({ type, message }: ShowToastOptions) => {
    const options: ToastOptions = {
        type: type,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    toast(message, { ...options, type });
};
