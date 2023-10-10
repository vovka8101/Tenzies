import { FC } from 'react';

type FieldProps = {
  fields: {
    readonly id: string;
    value: number;
    isHeld: boolean;
  }[];
  handleHold: (id: string) => void;
}

export const GameField: FC<FieldProps> = ({ fields, handleHold }) => {
  const dotElements: JSX.Element[] = Array(9).fill(<div className="dot"></div>);

  return (
    <div className="game__field field">
      {fields.map(field => (
        <div
          key={field.id}
          onClick={() => handleHold(field.id)}
          className={'field__item' + ` field__item--${field.value}` + (field.isHeld ? ' field__item--active' : '')}
        >
          {dotElements}
        </div>
      ))}
    </div>
  )
}
