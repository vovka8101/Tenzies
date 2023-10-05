import { FC } from 'react'; // instead of: ({ fields }: FieldProps)

type FieldProps = {
  fields: {
    readonly id: string;
    value: number;
    hold: boolean;
  }[]
}

export const GameField: FC<FieldProps> = ({ fields }) => {
  return (
    <div className="game__field field">
      {fields.map(field => (
        <span>{field.value} </span>
      ))}
    </div>
  )
}
