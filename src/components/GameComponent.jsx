
const GameComponent = ({ component, correct, click }) => {
  return (
    <div className={`component ${component.extraClass} ${correct && 'correct-answer'}`} style={{ '--from-color': component.fromColor, '--to-color': component.toColor }} onClick={e => click && click(component)}>
      <img src={component.icon} alt="rock" aria-label={component.name} />
    </div>
  )
}

export default GameComponent