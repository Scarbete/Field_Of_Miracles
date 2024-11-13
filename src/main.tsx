import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routeConfig } from '@/routes/routeConfig.tsx'
import { Provider } from 'react-redux'
import store from '@/redux/app/store.ts'
import { ToastContainer } from 'react-toastify'
import './styles/bundle.scss'

const root = document.getElementById('root')!

createRoot(root).render(
    <Provider store={store}>
        <ToastContainer />
        <RouterProvider
            router={routeConfig}
            future={{ v7_startTransition: true }}
        />
    </Provider>
)