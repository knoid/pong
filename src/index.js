import 'babel-polyfill';
import 'webrtc-adapter';
import preact from 'preact';
import './base.scss';
import game from './game';

preact.render(preact.h(game), document.body);
