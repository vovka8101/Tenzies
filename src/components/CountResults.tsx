import { FC } from 'react';

type CountResultsProp = {
  rollCount: number
  formatTime: () => string
}

export const CountResults: FC<CountResultsProp> = ({ rollCount, formatTime }) => {
  return (
    <section className="game__counter counter">
      <div className="counter__rolls">Rolls: {rollCount}</div>
      <div className="counter__timer">Timer: {formatTime()}</div>
    </section>
  )
}