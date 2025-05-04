'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './KonamiGame.module.css';

const GRID_SIZE = 30;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 15, y: 15 },
  { x: 14, y: 15 },
  { x: 13, y: 15 }
];

const KonamiGame = ({ onClose }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);
  const lastDirectionRef = useRef('RIGHT');

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    const isOnSnake = snake.some(segment =>
      segment.x === newFood.x && segment.y === newFood.y
    );
    return isOnSnake ? generateFood() : newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }
      const newSnake = [head];
      const ateFood = head.x === food.x && head.y === food.y;
      if (ateFood) {
        setScore(prev => prev + 10);
        setFood(generateFood());
        newSnake.push(...prevSnake);
      } else {
        newSnake.push(...prevSnake.slice(0, -1));
      }
      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const newDirection = {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT'
      }[e.key];

      if (newDirection && 
          !(newDirection === 'UP' && lastDirectionRef.current === 'DOWN') &&
          !(newDirection === 'DOWN' && lastDirectionRef.current === 'UP') &&
          !(newDirection === 'LEFT' && lastDirectionRef.current === 'RIGHT') &&
          !(newDirection === 'RIGHT' && lastDirectionRef.current === 'LEFT')) {
        setDirection(newDirection);
        lastDirectionRef.current = newDirection;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(gameLoopRef.current);
      return;
    }
    gameLoopRef.current = setInterval(moveSnake, 100);
    return () => clearInterval(gameLoopRef.current);
  }, [direction, gameOver, moveSnake]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    lastDirectionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
    setFood(generateFood());
  };

  return (
    <div className={styles.gameContainer}>
      <button className={styles.exitButton} onClick={onClose}>
        Exit Game
      </button>
      <div className={styles.gameHeader}>
        <h2>🐍 Snake Game 🐍</h2>
        <p>Score: {score}</p>
        <p>Use arrow keys to move!</p>
      </div>
      <div className={styles.gameArea}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className={styles.snakeSegment}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />
        ))}
        <div
          className={styles.food}
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE
          }}
        >
          🎯
        </div>
      </div>
      {gameOver && (
        <div className={styles.gameOver}>
          <h3>Game Over!</h3>
          <p>Final Score: {score}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default KonamiGame; 