/**
 * Created by bykovdenis on 01.09.17.
 */
import { createMuiTheme } from 'material-ui/styles';

const muiTheme = createMuiTheme({
  palette: {
    padding: 'initial',
  },
  button: {
    color: '#ffffff',
    backgroundColor: '#ed3e49',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#d82934',
    },
    '&:focus': {
      backgroundColor: '#d82934',
      borderColor: 'rgba(0,0,0,0.125)',
    },
    '&:active': {
      backgroundColor: '#d82934',
      borderColor: 'rgba(0,0,0,0.125)',
    },
  },
});

export default muiTheme;