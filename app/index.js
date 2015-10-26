'use strict';

/**
 * SimplySocial Application
 *
 * This is an Angular application that uses React to support is components.
 *
 * Using ES6 syntax with browserify babel transformer.
 *
 * Data is static json but fetched via resources to simulate actual api responses.
 *
 */

/**
 * Import styles
 */

let CSS = require('./app.scss');

// Initialize app
import app from './app';

// Load configuration
import routeConfig from './config/route';

// Load Services
import UserService from './services/user.service';
import MessageService from './services/message.service';

// Load components
import Recursive from './components/recursive';
import Modal from './components/modal';
import UtilityBar from './components/utility-bar';
import SocialFeed from './components/social-feed';
import UserProfile from './components/user-profile';
import UserSettings from './components/user-settings';
