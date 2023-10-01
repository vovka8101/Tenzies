import './Tenzies.scss';

function Tenzies() {
  return (
    <section className='game'>
      <h1 className='game__title'>Tenzies</h1>
      <p className="game__instruction">
        Roll until all dice are the same. Click 
        each die to freeze it at its current value 
        between rolls.
      </p>
    </section>
  )
}

export default Tenzies;
