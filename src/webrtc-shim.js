import { detectBrowser } from 'webrtc-adapter/src/js/utils';
import * as commonShim from 'webrtc-adapter/src/js/common_shim';

const { browser } = detectBrowser(window);
const browserShimImport = (() => {
  switch (browser) {
    case 'chrome':
      return import(/* webpackChunkName: "webrtc-adapter.chrome" */ 'webrtc-adapter/src/js/chrome/chrome_shim');
    case 'edge':
      return import(/* webpackChunkName: "webrtc-adapter.edge" */ 'webrtc-adapter/src/js/edge/edge_shim');
    case 'firefox':
      return import(/* webpackChunkName: "webrtc-adapter.firefox" */ 'webrtc-adapter/src/js/firefox/firefox_shim');
    case 'safari':
      return import(/* webpackChunkName: "webrtc-adapter.safari" */ 'webrtc-adapter/src/js/safari/safari_shim');
    default:
      return Promise.reject();
  }
})();

module.exports = browserShimImport.then((browserShim) => {
  switch (browser) {
    case 'chrome':
      browserShim.shimGetUserMedia(window);
      browserShim.shimMediaStream(window);
      browserShim.shimPeerConnection(window);
      browserShim.shimOnTrack(window);
      browserShim.shimAddTrackRemoveTrack(window);
      browserShim.shimGetSendersWithDtmf(window);
      browserShim.shimGetStats(window);
      browserShim.shimSenderReceiverGetStats(window);
      browserShim.fixNegotiationNeeded(window);

      commonShim.shimRTCIceCandidate(window);
      commonShim.shimConnectionState(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      commonShim.removeAllowExtmapMixed(window);
      break;
    case 'firefox':
      browserShim.shimGetUserMedia(window);
      browserShim.shimPeerConnection(window);
      browserShim.shimOnTrack(window);
      browserShim.shimRemoveStream(window);
      browserShim.shimSenderGetStats(window);
      browserShim.shimReceiverGetStats(window);
      browserShim.shimRTCDataChannel(window);
      browserShim.shimAddTransceiver(window);
      browserShim.shimCreateOffer(window);
      browserShim.shimCreateAnswer(window);

      commonShim.shimRTCIceCandidate(window);
      commonShim.shimConnectionState(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      break;
    case 'edge':
      browserShim.shimGetUserMedia(window);
      browserShim.shimGetDisplayMedia(window);
      browserShim.shimPeerConnection(window);
      browserShim.shimReplaceTrack(window);

      // the edge shim implements the full RTCIceCandidate object.

      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      break;
    case 'safari':
      browserShim.shimRTCIceServerUrls(window);
      browserShim.shimCreateOfferLegacy(window);
      browserShim.shimCallbacksAPI(window);
      browserShim.shimLocalStreamsAPI(window);
      browserShim.shimRemoteStreamsAPI(window);
      browserShim.shimTrackEventTransceiver(window);
      browserShim.shimGetUserMedia(window);

      commonShim.shimRTCIceCandidate(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      commonShim.removeAllowExtmapMixed(window);
      break;
    default:
      break;
  }
}).catch(() => {
  // eslint-disable-next-line no-alert
  alert('Unsupported browser!');
});
