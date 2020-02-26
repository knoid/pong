(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{149:function(e,t,r){"use strict";r.r(t),r.d(t,"shimLocalStreamsAPI",(function(){return o})),r.d(t,"shimRemoteStreamsAPI",(function(){return i})),r.d(t,"shimCallbacksAPI",(function(){return s})),r.d(t,"shimGetUserMedia",(function(){return c})),r.d(t,"shimConstraints",(function(){return a})),r.d(t,"shimRTCIceServerUrls",(function(){return d})),r.d(t,"shimTrackEventTransceiver",(function(){return m})),r.d(t,"shimCreateOfferLegacy",(function(){return p}));var n=r(10);function o(e){if("object"==typeof e&&e.RTCPeerConnection){if("getLocalStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in e.RTCPeerConnection.prototype)){const t=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addStream=function(e){this._localStreams||(this._localStreams=[]),this._localStreams.includes(e)||this._localStreams.push(e),e.getAudioTracks().forEach(r=>t.call(this,r,e)),e.getVideoTracks().forEach(r=>t.call(this,r,e))},e.RTCPeerConnection.prototype.addTrack=function(e){const r=arguments[1];return r&&(this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]),t.apply(this,arguments)}}"removeStream"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);const t=this._localStreams.indexOf(e);if(-1===t)return;this._localStreams.splice(t,1);const r=e.getTracks();this.getSenders().forEach(e=>{r.includes(e.track)&&this.removeTrack(e)})})}}function i(e){if("object"==typeof e&&e.RTCPeerConnection&&("getRemoteStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in e.RTCPeerConnection.prototype))){Object.defineProperty(e.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=e=>{e.streams.forEach(e=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(e))return;this._remoteStreams.push(e);const t=new Event("addstream");t.stream=e,this.dispatchEvent(t)})})}});const t=e.RTCPeerConnection.prototype.setRemoteDescription;e.RTCPeerConnection.prototype.setRemoteDescription=function(){const e=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(t){t.streams.forEach(t=>{if(e._remoteStreams||(e._remoteStreams=[]),e._remoteStreams.indexOf(t)>=0)return;e._remoteStreams.push(t);const r=new Event("addstream");r.stream=t,e.dispatchEvent(r)})}),t.apply(e,arguments)}}}function s(e){if("object"!=typeof e||!e.RTCPeerConnection)return;const t=e.RTCPeerConnection.prototype,r=t.createOffer,n=t.createAnswer,o=t.setLocalDescription,i=t.setRemoteDescription,s=t.addIceCandidate;t.createOffer=function(e,t){const n=arguments.length>=2?arguments[2]:arguments[0],o=r.apply(this,[n]);return t?(o.then(e,t),Promise.resolve()):o},t.createAnswer=function(e,t){const r=arguments.length>=2?arguments[2]:arguments[0],o=n.apply(this,[r]);return t?(o.then(e,t),Promise.resolve()):o};let c=function(e,t,r){const n=o.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n};t.setLocalDescription=c,c=function(e,t,r){const n=i.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.setRemoteDescription=c,c=function(e,t,r){const n=s.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.addIceCandidate=c}function c(e){const t=e&&e.navigator;if(t.mediaDevices&&t.mediaDevices.getUserMedia){const e=t.mediaDevices,r=e.getUserMedia.bind(e);t.mediaDevices.getUserMedia=e=>r(a(e))}!t.getUserMedia&&t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=function(e,r,n){t.mediaDevices.getUserMedia(e).then(r,n)}.bind(t))}function a(e){return e&&void 0!==e.video?Object.assign({},e,{video:n.compactObject(e.video)}):e}function d(e){const t=e.RTCPeerConnection;e.RTCPeerConnection=function(e,r){if(e&&e.iceServers){const t=[];for(let r=0;r<e.iceServers.length;r++){let o=e.iceServers[r];!o.hasOwnProperty("urls")&&o.hasOwnProperty("url")?(n.deprecated("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,t.push(o)):t.push(e.iceServers[r])}e.iceServers=t}return new t(e,r)},e.RTCPeerConnection.prototype=t.prototype,"generateCertificate"in e.RTCPeerConnection&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:()=>t.generateCertificate})}function m(e){"object"==typeof e&&e.RTCTrackEvent&&"receiver"in e.RTCTrackEvent.prototype&&!("transceiver"in e.RTCTrackEvent.prototype)&&Object.defineProperty(e.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function p(e){const t=e.RTCPeerConnection.prototype.createOffer;e.RTCPeerConnection.prototype.createOffer=function(e){if(e){void 0!==e.offerToReceiveAudio&&(e.offerToReceiveAudio=!!e.offerToReceiveAudio);const t=this.getTransceivers().find(e=>"audio"===e.receiver.track.kind);!1===e.offerToReceiveAudio&&t?"sendrecv"===t.direction?t.setDirection?t.setDirection("sendonly"):t.direction="sendonly":"recvonly"===t.direction&&(t.setDirection?t.setDirection("inactive"):t.direction="inactive"):!0!==e.offerToReceiveAudio||t||this.addTransceiver("audio"),void 0!==e.offerToReceiveVideo&&(e.offerToReceiveVideo=!!e.offerToReceiveVideo);const r=this.getTransceivers().find(e=>"video"===e.receiver.track.kind);!1===e.offerToReceiveVideo&&r?"sendrecv"===r.direction?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":"recvonly"===r.direction&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):!0!==e.offerToReceiveVideo||r||this.addTransceiver("video")}return t.apply(this,arguments)}}}}]);
//# sourceMappingURL=webrtc-adapter.safari.7a19ecac27550f33e851.js.map