import { createMuiTheme, Theme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      light: '#FF6428',
      main: '#FF9678',
      dark: '#c41c00',
      contrastText: '#FFF',
    },
    navy: {
      light: '#7383A2',
      main: '#445577',
      dark: '#002f6c',
      contrastText: '#FFF',
    },
  },
});
