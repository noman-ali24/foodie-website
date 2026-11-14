import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import muiTheme from './theme/muiTheme.js';
import './index.css';
import App from './app/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
