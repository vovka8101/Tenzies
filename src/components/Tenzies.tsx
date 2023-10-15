import { useEffect, useState } from 'react';
import { GameField } from './GameField';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import './Tenzies.scss';
import { CountResults } from './CountResults';
import { CheckResults, formatTime } from '../assets/common/functions/functions';
import { BestResults } from './BestResults';
import { Game, Results } from '../assets/common/types/Tenzies.types';

function Tenzies() {
  const [fields, setFields] = useState<Game[]>(allNewDice());
  const [best, setBest] = useState<Results>({ bestRolls: 0, bestTime: 0 });
  const [rollCount, setRollCount] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const bestResults: string | null = localStorage.getItem('bestResults');

    if (bestResults) {
      setBest(JSON.parse(bestResults))
    }
  }, [])

  useEffect(() => {
    const allTheSameDices = fields.every(field => field.isHeld && (field.value === fields[0].value));

    if (allTheSameDices) {
      setIsWin(allTheSameDices);
      setTimerOn(false);
      const newRes = {
        bestRolls: rollCount,
        bestTime: time
      }

      if (CheckResults(best, newRes)) {
        setBest(newRes);
      }
    }
  }, [fields]);

  useEffect(() => {
    if (!timerOn) {
      return
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 50);
    }, 50);

    return () => clearInterval(timer);
  }, [timerOn]);

  function generateNumber(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  function allNewDice(): Game[] {
    const newDice: Game[] = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: generateNumber(),
        isHeld: false
      });
    }

    return newDice;
  }

  function handleRoll(): void {
    if (!isWin) {
      if (!timerOn) { setTimerOn(true) }
      setFields((oldFields): Game[] => {
        return oldFields.map((field): Game => ({
          ...field,
          value: field.isHeld ? field.value : generateNumber()
        }));
      });
      setRollCount(rollCount + 1);
    } else {
      setIsWin(false);
      setFields(allNewDice());
      setRollCount(0);
      setTime(0);
    }
  }

  function handleHold(id: string): void {
    if (!isWin) {
      if (!timerOn) { setTimerOn(true) }
      setFields((oldFields): Game[] => {
        return oldFields.map((field): Game => ({
          ...field,
          isHeld: field.id === id ? !field.isHeld : field.isHeld
        }))
      });
    }
  }

  return (
    <section className='game'>
      {isWin && <Confetti />}
      <h1 className='game__title'>Tenzies</h1>
      <p className="game__instruction">
        Roll until all dice are the same.<br />
        Click each die to freeze it at its current value
        between rolls.<br />
        Click on die or roll button to start the game.
      </p>
      <CountResults rollCount={rollCount} formatTime={() => formatTime(time)} />
      <GameField fields={fields} handleHold={handleHold} />
      <button className='game__roll-btn btn' onClick={handleRoll}>
        {isWin ? 'New game' : 'Roll'}
      </button>
      <BestResults {...best} />
    </section>
  )
}

export default Tenzies;
