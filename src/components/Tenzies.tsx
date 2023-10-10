import { useEffect, useState } from 'react';
import { GameField } from './GameField';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import './Tenzies.scss';

function Tenzies() {
  type Game = {
    readonly id: string;
    value: number;
    isHeld: boolean;
  }

  const [fields, setFields] = useState<Game[]>(allNewDice());
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const allTheSameDices = fields.every(field => field.isHeld && (field.value === fields[0].value));

    if (allTheSameDices) {
      setIsWin(allTheSameDices);
    }
  }, [fields]);

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
      setFields((oldFields): Game[] => {
        return oldFields.map((field): Game => ({
          ...field,
          value: field.isHeld ? field.value : generateNumber()
        }));
      });
    } else {
      setIsWin(false);
      setFields(allNewDice());
    }
  }

  function handleHold(id: string): void {
    if (!isWin) {
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
        between rolls.
      </p>
      <GameField fields={fields} handleHold={handleHold} />
      <button className='game__roll-btn' onClick={handleRoll}>
        {isWin ? 'New Game' : 'Roll'}
      </button>
    </section>
  )
}

export default Tenzies;
