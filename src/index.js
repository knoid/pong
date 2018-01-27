import 'babel-polyfill';
import preact from 'preact';
import './base.scss';
import webrtcShim from './webrtc-shim';

Promise.all([
  import(/* webpackChunkName: "game" */ './game'),
  webrtcShim,
]).then(([game]) => {
  preact.render(preact.h(game.default), document.body);
});
