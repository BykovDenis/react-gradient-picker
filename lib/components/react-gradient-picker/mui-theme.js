'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = require('material-ui/styles');

var muiTheme = (0, _styles.createMuiTheme)({
  palette: {
    padding: 'initial'
  },
  button: {
    color: '#ffffff',
    backgroundColor: '#ed3e49',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#d82934'
    },
    '&:focus': {
      backgroundColor: '#d82934',
      borderColor: 'rgba(0,0,0,0.125)'
    },
    '&:active': {
      backgroundColor: '#d82934',
      borderColor: 'rgba(0,0,0,0.125)'
    }
  }
}); /**
     * Created by bykovdenis on 01.09.17.
     */
exports.default = muiTheme;