import { AppProviders } from './context/AppProviders.jsx'
import { AppRouter } from './routes/AppRouter.jsx'

const App = () => {
    return (
    <AppProviders>
        <AppRouter />
    </AppProviders>
    )
}

export default App

