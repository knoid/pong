import * as preact from 'preact';
import styles from './pong.scss';

const PADDLE_WIDTH = 0.2;
const BALL_VELOCITY = 0.5;
const MAX_BALL_VELOCITY_X = 0.9 * BALL_VELOCITY;

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

function p(delta) {
  return `${delta * 100}%`;
}

function Ball({ pos2D }) {
  return (
    <div class={styles.ball}>
      <div style={{ left: p(pos2D[0]), top: p(pos2D[1]) }} />
    </div>
  );
}

function Paddle({ pos }) {
  return (
    <div class={styles.paddle}>
      <div style={{ left: p(pos) }} />
    </div>
  );
}

const STATE_START = 1;
const STATE_LOOP = 2;

export default class Pong extends preact.Component {
  state = {
    ballPos: [0.5, 0.5],
    oponentPos: 0.5,
    playerPos: 0.5,
  };

  componentWillMount() {
    this.screenWidth = window.innerWidth;

    const coin = Math.random();

    this.props.dataChannel.onmessage = ({ data: rawData }) => {
      const data = JSON.parse(rawData);

      if (this.gameState === STATE_START && data.coin) {
        this.ballVelocity[1] = ((-1) ** (coin > data.coin)) * BALL_VELOCITY;
        this.gameState = STATE_LOOP;
        requestAnimationFrame(this.updateBallPosition);
      }

      if (data.ballVelocity) {
        this.setState(({ ballPos }) => ({ ballPos: [ballPos[0], 0] }));
        this.ballVelocity = data.ballVelocity;
      }

      if (data.position) {
        this.setState({ oponentPos: data.position });
      }
    };

    this.send({ coin });
  }

  onTouch = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const position = e.touches[0].clientX / this.screenWidth;
      this.setState({ playerPos: position });
      this.send({ position });
    }
  }

  updateBallPosition = () => {
    const now = performance.now();
    const timeDelta = (now - (this.lastNow || now)) / 1000;

    this.setState(({ ballPos, playerPos }) => {
      if (ballPos[0] >= 1 || ballPos[0] <= 0) {
        this.ballVelocity[0] *= -1;
      }

      const ballPaddleDiff = ballPos[0] - playerPos;
      const maxX = MAX_BALL_VELOCITY_X;
      if (ballPos[1] >= 1 && Math.abs(ballPaddleDiff) < PADDLE_WIDTH) {
        const [bVx] = this.ballVelocity;
        this.ballVelocity[0] = clamp(bVx + (ballPaddleDiff / PADDLE_WIDTH), -maxX, maxX);
        this.ballVelocity[1] = Math.sqrt((BALL_VELOCITY ** 2) - (bVx ** 2));
        this.send({ ballVelocity: this.ballVelocity });
        this.ballVelocity[1] *= -1;
      }

      return {
        ballPos: [
          ballPos[0] + (this.ballVelocity[0] * timeDelta),
          ballPos[1] + (this.ballVelocity[1] * timeDelta),
        ],
      };
    });

    this.lastNow = now;
    requestAnimationFrame(this.updateBallPosition);
  }

  send(data) {
    this.props.dataChannel.send(JSON.stringify(data));
  }

  ballVelocity = [0, 0];
  gameState = STATE_START;

  render(_, { oponentPos, playerPos, ballPos }) {
    return (
      <div
        class={styles.court}
        onTouchStart={this.onTouch}
        onTouchMove={this.onTouch}
      >
        <Paddle pos={oponentPos} />
        <Ball pos2D={ballPos} />
        <Paddle pos={playerPos} />
      </div>
    );
  }
}
