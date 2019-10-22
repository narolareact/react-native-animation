/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './src/TimingAnimation'
import App from './src/SpringAnimation';
// import App from './src/decayAnimation';
// import App from './src/SequenceAndParreralAnimation';
// import App from './src/temp'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
