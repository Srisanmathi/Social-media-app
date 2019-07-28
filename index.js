/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Chat from './components/Chat';
import Following from './components/Following';
import Inbox from './components/Inbox';
import NewMessage from './components/NewMessage';
import ThreeWayNavigation from './components/ThreeWayNavigation';
import Followers from './components/Followers';
import Interests from './components/Interests';
import InitialInterests from './components/InitialInterests'

AppRegistry.registerComponent(appName, () => App);
