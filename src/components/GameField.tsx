import { FC } from 'react'; // instead of: ({ fields }: FieldProps)

type FieldProps = {
  fields: {
    readonly id: string;
    value: number;
    hold: boolean;
  }[];
  handleHold: (id: string) => void;
}

export const GameField: FC<FieldProps> = ({ fields, handleHold }) => {
  return (
    <div className="game__field field">
      {fields.map(field => (
        <div
          key={field.id}
          onClick={() => handleHold(field.id)}
          className={'field__item' + (field.hold ? ' field__item--active' : '')}
        >
          {field.value}
        </div>
      ))}
    </div>
  )
}
