import { Results } from "../assets/common/types/Tenzies.types"
import { formatTime } from "../assets/common/functions/functions"

export const BestResults = ({ bestRolls, bestTime }: Results) => {
  return (
    <section className="game__best-result best-result">
      <h2 className="best-result__title">Best results:</h2>
      <div className="best-result__content">
        <div className="best-result__rolls">Rolls: {bestRolls}</div>
        <div className="best-result__time">Time: {formatTime(bestTime)}</div>
      </div>
    </section>
  )
}
