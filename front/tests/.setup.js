// To use imports 
require('@babel/register')();

require('ignore-styles');

const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
enzyme.configure({adapter: new Adapter()})