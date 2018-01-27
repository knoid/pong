import WebRTCutils from 'webrtc-adapter/src/js/utils';
import commonShim from 'webrtc-adapter/src/js/common_shim';

const { browser } = WebRTCutils.detectBrowser(window);
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
  commonShim.shimCreateObjectURL(window);
  commonShim.shimMaxMessageSize(window);
  commonShim.shimSendThrowTypeError(window);
  browserShim.shimGetUserMedia(window);

  switch (browser) {
    case 'chrome':
      browserShim.shimMediaStream(window);
      browserShim.shimSourceObject(window);
      browserShim.shimPeerConnection(window);
      browserShim.shimOnTrack(window);
      browserShim.shimAddTrackRemoveTrack(window);
      browserShim.shimGetSendersWithDtmf(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'firefox':
      browserShim.shimSourceObject(window);
      browserShim.shimPeerConnection(window);
      browserShim.shimOnTrack(window);
      browserShim.shimRemoveStream(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'edge':
      browserShim.shimPeerConnection(window);
      browserShim.shimReplaceTrack(window);

      // the edge shim implements the full RTCIceCandidate object.
      break;
    case 'safari':
      browserShim.shimRTCIceServerUrls(window);
      browserShim.shimCallbacksAPI(window);
      browserShim.shimLocalStreamsAPI(window);
      browserShim.shimRemoteStreamsAPI(window);
      browserShim.shimTrackEventTransceiver(window);
      browserShim.shimCreateOfferLegacy(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    default:
      break;
  }
}).catch(() => {
  // eslint-disable-next-line no-alert
  alert('Unsupported browser!');
});
