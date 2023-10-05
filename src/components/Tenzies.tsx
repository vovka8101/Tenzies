import { useEffect, useState } from 'react';
import { GameField } from './GameField';
import { nanoid } from 'nanoid';
import './Tenzies.scss';

function Tenzies() {
  type Game = {
    readonly id: string;
    value: number;
    hold: boolean;
  }

  const [fields, setFields] = useState<Game[]>([]);

  useEffect(() => {
    const initialFields: Game[] = [];

    for (let i = 0; i < 10; i++) {
      initialFields.push({
        id: nanoid(),
        value: generateNumber(),
        hold: false
      });
    }

    setFields(initialFields);
  }, []);

  function generateNumber(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  function handleRoll(): void {
    setFields((oldFields): Game[] => {
      return oldFields.map((field): Game => ({
        ...field,
        value: field.hold ? field.value : generateNumber()
      }));
    });
  }

  return (
    <section className='game'>
      <h1 className='game__title'>Tenzies</h1>
      <p className="game__instruction">
        Roll until all dice are the same. Click
        each die to freeze it at its current value
        between rolls.
      </p>
      <GameField fields={fields} />
      <button className='game__roll-btn' onClick={handleRoll}>Roll</button>
    </section>
  )
}

export default Tenzies;
