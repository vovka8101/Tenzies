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
  const [isWin, setIsWin] = useState(false);

  function getInitialFields(): Game[] {
    const initialFields: Game[] = [];

    for (let i = 0; i < 10; i++) {
      initialFields.push({
        id: nanoid(),
        value: generateNumber(),
        hold: false
      });
    }

    return initialFields;
  }

  function generateNumber(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  useEffect(() => {
    setFields(getInitialFields());
  }, []);

  function handleRoll(): void {
    setFields((oldFields): Game[] => {
      return oldFields.map((field): Game => ({
        ...field,
        value: field.hold ? field.value : generateNumber()
      }));
    });
  }

  function handleHold(id: string): void {
    setFields((oldFields): Game[] => {
      return oldFields.map((field): Game => ({
        ...field,
        hold: field.id === id ? !field.hold : field.hold
      }))
    })

    setIsWin(fields.every(field => field.value === fields[0].value));
  }

  function handleNewGame() {
    setFields(getInitialFields());
    setIsWin(false);
  }

  return (
    <section className='game'>
      <div className="game__content">
        <h1 className='game__title'>Tenzies</h1>
        <p className="game__instruction">
          Roll until all dice are the same. Click
          each die to freeze it at its current value
          between rolls.
        </p>
        <GameField fields={fields} handleHold={handleHold} />
        {isWin
          ? <button className='game__roll-btn' onClick={handleNewGame}>New game</button>
          : <button className='game__roll-btn' onClick={handleRoll}>Roll</button>
        }
      </div>
    </section>
  )
}

export default Tenzies;
