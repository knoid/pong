const serverBaseAPI = window.SIGNALING_SERVER ||
  `${window.location.origin.replace(/:[0-9]+$/, ':3000')}/`;
let privateId;

function doFetch(path, data) {
  return fetch(serverBaseAPI + path, {
    method: 'POST',
    body: JSON.stringify({ privateId, data }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    mode: 'cors',
  });
}

export async function discoverPeers(nickname) {
  const response = await doFetch('register', { nickname });
  const data = await response.json();
  ({ privateId } = data);
  return new EventSource(data.feed);
}

export function sendIceCandidate(iceCandidate) {
  doFetch('iceCandidate', { iceCandidate });
}

export function sendOffer(publicId, description) {
  doFetch('offer', { description, publicId });
}

export function sendAnswer(publicId, description) {
  doFetch('answer', { description, publicId });
}
