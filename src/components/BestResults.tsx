type BestResultsProp = {
    bestRolls: number
    bestTime: number
}

export const BestResults = ({ bestRolls, bestTime }: BestResultsProp) => {
  return (
    <section className="game__best-result best-result">
      <div className="best-result__rolls">{bestRolls}</div>
      <div className="best-result__time">{bestTime}</div>
    </section>
  )
}
