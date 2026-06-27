'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './KonamiGame.module.css';

const GRID_SIZE = 30;
const INITIAL_SNAKE = [
  { x: 15, y: 15 },
  { x: 14, y: 15 },
  { x: 13, y: 15 },
];
const INITIAL_SPEED = 150;
const MIN_SPEED = 50;
const SPEED_DECREASE = 5;
const SCORE_INCREMENT = 10;
const MAX_QUEUED_DIRECTIONS = 2;
const CELL_PCT = 100 / GRID_SIZE;
const OPPOSITES = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

const getHighScore = () => {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
  }
  return 0;
};

const saveHighScore = (score) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('snakeHighScore', score.toString());
  }
};

const KonamiGame = ({ onClose }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getHighScore());
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef(null);
  const directionRef = useRef('RIGHT');
  const directionQueueRef = useRef([]);
  const snakeRef = useRef(INITIAL_SNAKE);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  // Lock background scroll while the modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Buffer direction changes; only one is consumed per tick so a fast
  // double-press (e.g. while moving RIGHT: DOWN then LEFT) can't skip
  // the intermediate move and walk the snake straight into itself.
  const enqueueDirection = useCallback((newDir) => {
    const queue = directionQueueRef.current;
    const last =
      queue.length > 0 ? queue[queue.length - 1] : directionRef.current;
    if (
      newDir !== last &&
      OPPOSITES[newDir] !== last &&
      queue.length < MAX_QUEUED_DIRECTIONS
    ) {
      queue.push(newDir);
    }
  }, []);

  const generateFood = useCallback(() => {
    const maxAttempts = 100;
    for (let attempts = 0; attempts < maxAttempts; attempts++) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) return newFood;
    }
    return { x: 0, y: 0 };
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      if (directionQueueRef.current.length > 0) {
        directionRef.current = directionQueueRef.current.shift();
      }

      const head = { ...prevSnake[0] };
      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      if (
        prevSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head];
      const ateFood = head.x === food.x && head.y === food.y;

      if (ateFood) {
        const newScore = score + SCORE_INCREMENT;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          saveHighScore(newScore);
        }
        setSpeed((prevSpeed) =>
          Math.max(MIN_SPEED, prevSpeed - SPEED_DECREASE)
        );
        setFood(generateFood());
        newSnake.push(...prevSnake);
      } else {
        newSnake.push(...prevSnake.slice(0, -1));
      }

      return newSnake;
    });
  }, [food, gameOver, isPaused, score, highScore, generateFood]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setFood(generateFood());
  }, [generateFood]);

  const restartGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    directionRef.current = 'RIGHT';
    directionQueueRef.current = [];
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setFood(generateFood());
  }, [generateFood]);

  useEffect(() => {
    const KEY_TO_DIR = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
      w: 'UP',
      W: 'UP',
      s: 'DOWN',
      S: 'DOWN',
      a: 'LEFT',
      A: 'LEFT',
      d: 'RIGHT',
      D: 'RIGHT',
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault();
        if (gameOver) restartGame();
        else if (gameStarted) togglePause();
        else startGame();
        return;
      }
      if (e.key === 'Enter' && gameOver) {
        e.preventDefault();
        restartGame();
        return;
      }
      if (gameOver || isPaused || !gameStarted) return;
      const dir = KEY_TO_DIR[e.key];
      if (dir) enqueueDirection(dir);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    gameOver,
    isPaused,
    gameStarted,
    togglePause,
    startGame,
    restartGame,
    onClose,
    enqueueDirection,
  ]);

  // Pause when the tab becomes hidden mid-game
  useEffect(() => {
    const handleVisChange = () => {
      if (document.hidden && gameStarted && !gameOver && !isPaused) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisChange);
  }, [gameStarted, gameOver, isPaused]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!gameStarted || gameOver || isPaused) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        enqueueDirection(deltaX > 0 ? 'RIGHT' : 'LEFT');
      }
    } else if (Math.abs(deltaY) > minSwipeDistance) {
      enqueueDirection(deltaY > 0 ? 'DOWN' : 'UP');
    }
  };

  useEffect(() => {
    if (gameOver || isPaused || !gameStarted) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [speed, gameOver, isPaused, gameStarted, moveSnake]);

  return (
    <div className={styles.gameContainer}>
      <button className={styles.exitButton} onClick={onClose}>
        ✕ Exit
      </button>

      <div className={styles.gameHeader}>
        <h2>🐍 Snake Game 🐍</h2>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Score:</span>
            <span className={styles.statValue}>{score}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>High Score:</span>
            <span className={styles.statValue}>{highScore}</span>
          </div>
        </div>
        {!gameStarted && (
          <p className={styles.instruction}>
            Press <kbd>Space</kbd> or tap to start!
          </p>
        )}
        {gameStarted && !gameOver && (
          <p className={styles.instruction}>
            {isPaused ? (
              <>
                <span className={styles.paused}>⏸ Paused</span> - Press{' '}
                <kbd>Space</kbd> to resume
              </>
            ) : (
              <>
                Arrows / <kbd>WASD</kbd> to move • <kbd>Space</kbd> to pause •{' '}
                <kbd>Esc</kbd> to exit
              </>
            )}
          </p>
        )}
      </div>

      <div
        className={styles.gameArea}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.grid}></div>
        {snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`${styles.snakeSegment} ${
              index === 0 ? styles.snakeHead : ''
            }`}
            style={{
              left: `${segment.x * CELL_PCT}%`,
              top: `${segment.y * CELL_PCT}%`,
              width: `${CELL_PCT}%`,
              height: `${CELL_PCT}%`,
            }}
          />
        ))}
        <div
          className={styles.food}
          style={{
            left: `${food.x * CELL_PCT}%`,
            top: `${food.y * CELL_PCT}%`,
            width: `${CELL_PCT}%`,
            height: `${CELL_PCT}%`,
          }}
        >
          🍎
        </div>
        {!gameStarted && (
          <div className={styles.startOverlay}>
            <button className={styles.startButton} onClick={startGame}>
              Start Game
            </button>
          </div>
        )}
        {isPaused && gameStarted && (
          <div className={styles.pauseOverlay}>
            <div className={styles.pauseText}>⏸ Paused</div>
            <div className={styles.pauseHint}>Press Space to resume</div>
          </div>
        )}
      </div>

      {gameOver && (
        <div className={styles.gameOver}>
          <div className={styles.gameOverContent}>
            <h3>🎮 Game Over!</h3>
            <div className={styles.finalStats}>
              <div className={styles.finalStat}>
                <span className={styles.finalStatLabel}>Final Score:</span>
                <span className={styles.finalStatValue}>{score}</span>
              </div>
              {score >= highScore && score > 0 && (
                <div className={styles.newRecord}>🏆 New High Score!</div>
              )}
              <div className={styles.finalStat}>
                <span className={styles.finalStatLabel}>High Score:</span>
                <span className={styles.finalStatValue}>{highScore}</span>
              </div>
            </div>
            <div className={styles.gameOverButtons}>
              <button className={styles.restartButton} onClick={restartGame}>
                Play Again
              </button>
              <button className={styles.exitButtonSmall} onClick={onClose}>
                Exit
              </button>
            </div>
            <p className={styles.gameOverHint}>
              <kbd>Space</kbd> / <kbd>Enter</kbd> to play again • <kbd>Esc</kbd>{' '}
              to exit
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KonamiGame;
