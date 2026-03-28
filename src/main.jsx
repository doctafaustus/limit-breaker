import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './context/AppContext'
import './styles/main.scss'

const theme = extendTheme({
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      500: '#6C63FF',
      600: '#4A42CC',
    },
    comm: { 500: '#FF6B6B', 100: '#FFE5E5' },
    intel: { 500: '#4ECDC4', 100: '#E0F7F6' },
    content: { 500: '#FFD93D', 100: '#FFF8DC' },
  },
  styles: {
    global: {
      body: {
        bg: '#F8F7FF',
        color: '#1A1930',
      }
    }
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'purple' },
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
