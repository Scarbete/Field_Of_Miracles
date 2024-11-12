import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastOptions: ToastOptions = {
    autoClose: 1000,
    position: 'top-right',
    theme: 'dark'
}

export function alertToast(type: 'info' | 'success' | 'error', message: string) {
    const notify = () => toast[ type ](message, toastOptions)
    notify()
}
