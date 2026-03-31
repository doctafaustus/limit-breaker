import React from 'react';
const _d = new Date();
console.log(
  'Current date:',
  `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, '0')}-${String(_d.getDate()).padStart(2, '0')}`,
);
import ReactDOM from 'react-dom/client';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import './styles/main.scss';

const stytch = new StytchUIClient(import.meta.env.VITE_STYTCH_PUBLIC_TOKEN);

const theme = extendTheme({
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      500: '#2C5FDC',
      600: '#1A3EB8',
    },
    comm: { 500: '#FF6B6B', 100: '#FFE5E5' },
    intel: { 500: '#4ECDC4', 100: '#E0F7F6' },
    content: { 500: '#FFD93D', 100: '#FFF8DC' },
  },
  styles: {
    global: {
      body: {
        bg: '#F4F7FD',
        color: '#0F1B35',
      },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'purple' },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </ChakraProvider>
    </StytchProvider>
  </React.StrictMode>,
);
