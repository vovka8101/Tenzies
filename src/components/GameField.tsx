import { FC } from 'react';
import { Game } from '../assets/common/types/Tenzies.types';

type FieldProps = {
  fields: Game[];
  handleHold: (id: string) => void;
}

export const GameField: FC<FieldProps> = ({ fields, handleHold }) => {
  const dotElements: JSX.Element[] = Array.from(Array(9), (_, i) => <div key={i} className="dot"></div>);

  return (
    <section className="game__field field">
      {fields.map(field => (
        <div
          key={field.id}
          onClick={() => handleHold(field.id)}
          className={'field__item' + ` field__item--${field.value}` + (field.isHeld ? ' field__item--active' : '')}
        >
          {dotElements}
        </div>
      ))}
    </section>
  )
}
