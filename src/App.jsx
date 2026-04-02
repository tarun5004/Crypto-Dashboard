import { AppProviders } from './context/AppProviders.jsx'
import { ToastContainer } from './components/common/ToastContainer.jsx'
import { AppRouter } from './routes/AppRouter.jsx'

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
      <ToastContainer />
    </AppProviders>
  )
}

export default App
