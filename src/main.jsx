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
