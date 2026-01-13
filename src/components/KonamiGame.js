'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './KonamiGame.module.css';

const GRID_SIZE = 30;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 15, y: 15 },
  { x: 14, y: 15 },
  { x: 13, y: 15 },
];
const INITIAL_SPEED = 150;
const MIN_SPEED = 50;
const SPEED_DECREASE = 5;
const SCORE_INCREMENT = 10;

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
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getHighScore());
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef(null);
  const lastDirectionRef = useRef('RIGHT');
  const snakeRef = useRef(INITIAL_SNAKE);

  // Keep snake ref in sync
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  const generateFood = useCallback(() => {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) {
        return newFood;
      }
      attempts++;
    }
    // Fallback: return a safe position if all attempts fail
    return { x: 0, y: 0 };
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      switch (direction) {
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

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check collision with self
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

        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
          saveHighScore(newScore);
        }

        // Increase speed (decrease interval) with each food eaten
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
  }, [direction, food, gameOver, isPaused, score, highScore, generateFood]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setFood(generateFood());
  }, [generateFood]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          togglePause();
        } else if (!gameStarted) {
          startGame();
        }
        return;
      }

      if (gameOver || isPaused || !gameStarted) return;

      const newDirection = {
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
      }[e.key];

      if (
        newDirection &&
        !(newDirection === 'UP' && lastDirectionRef.current === 'DOWN') &&
        !(newDirection === 'DOWN' && lastDirectionRef.current === 'UP') &&
        !(newDirection === 'LEFT' && lastDirectionRef.current === 'RIGHT') &&
        !(newDirection === 'RIGHT' && lastDirectionRef.current === 'LEFT')
      ) {
        setDirection(newDirection);
        lastDirectionRef.current = newDirection;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, isPaused, gameStarted, togglePause, startGame]);

  // Touch controls for mobile
  const touchStartRef = useRef({ x: 0, y: 0 });

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
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && lastDirectionRef.current !== 'LEFT') {
          setDirection('RIGHT');
          lastDirectionRef.current = 'RIGHT';
        } else if (deltaX < 0 && lastDirectionRef.current !== 'RIGHT') {
          setDirection('LEFT');
          lastDirectionRef.current = 'LEFT';
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && lastDirectionRef.current !== 'UP') {
          setDirection('DOWN');
          lastDirectionRef.current = 'DOWN';
        } else if (deltaY < 0 && lastDirectionRef.current !== 'DOWN') {
          setDirection('UP');
          lastDirectionRef.current = 'UP';
        }
      }
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

    // Clear existing interval
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    // Set new interval with current speed
    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [speed, gameOver, isPaused, gameStarted, moveSnake]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    lastDirectionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setFood(generateFood());
  };

  // Save high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighScore(score);
      saveHighScore(score);
    }
  }, [gameOver, score, highScore]);

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
                Use arrow keys or <kbd>WASD</kbd> to move • Press{' '}
                <kbd>Space</kbd> to pause
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
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className={styles.food}
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
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
          </div>
        </div>
      )}
    </div>
  );
};

export default KonamiGame;
