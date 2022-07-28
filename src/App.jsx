import { useEffect, useState } from 'react'

import Score from './components/Score';
import './App.css';
import GameComponent from './components/GameComponent';
import selectWinner from './game/winnerselector';

import defaultrules from './assets/images/image-rules.svg'
import bonusrules from './assets/images/image-rules-bonus.svg'
import icon from './assets/images/icon-close.svg'

import paperIcon from './assets/images/icon-paper.svg'
import rockIcon from './assets/images/icon-rock.svg'
import scissorsIcon from './assets/images/icon-scissors.svg'
import lizardIcon from './assets/images/icon-lizard.svg'
import spockIcon from './assets/images/icon-spock.svg'


const components = [
  {
    name: 'Paper',
    icon: paperIcon,
    value: 'paper',
    fromColor: 'hsl(230, 89%, 62%)',
    toColor: 'hsl(230, 89%, 65%)',
    extraClass: 'paper',
  },
  {
    name: 'Scissors',
    icon: scissorsIcon,
    value: 'scissors',
    fromColor: 'hsl(39, 89%, 49%)',
    toColor: 'hsl(40, 84%, 53%)',
    extraClass: 'scissors',
  },
  {
    name: 'Rock',
    icon: rockIcon,
    value: 'rock',
    fromColor: 'hsl(349, 71%, 52%)',
    toColor: 'hsl(349, 70%, 56%)',
    extraClass: 'rock',
  },
  {
    name: 'Lizard',
    icon: lizardIcon,
    value: 'lizard',
    fromColor: 'hsl(261, 73%, 60%)',
    toColor: 'hsl(261, 72%, 63%)',
    extraClass: 'lizard',
  },
  {
    name: 'Spock',
    icon: spockIcon,
    value: 'spock',
    fromColor: 'hsl(189, 59%, 53%)',
    toColor: 'hsl(189, 58%, 57%)',
    extraClass: 'spock',
  }

]

const games = [
  {
    name: 'Default',
    value: 'default',
    components: 3
  },
  {
    name: 'Full',
    value: 'full',
    components: 5
  }
]

function App() {

  const [showAnswer, setShowAnswer] = useState(false);
  const [game, setGame] = useState(games[0])
  const [score, setScore] = useState(0);

  const [personSelection, setPersonSelection] = useState(null);
  const [computerSelection, setComputerSelection] = useState(null);

  const [answer, setAnswer] = useState(null);
  const [resultMsg, setResultMsg] = useState("")

  const [showRules, setshowRules] = useState(false);

  const selectComponent = (component) => {
    setShowAnswer(true)
    setPersonSelection(component);
    setTimeout(() => {
      computerSelect()
    }, 1000);
  }

  const computerSelect = () => {
    const random = Math.floor(Math.random() * game.components);
    setComputerSelection(components[random]);
  }

  const selectGame = (game) => {
    setGame(game);
  }

  const selectWhoWon = () => {
    const result = selectWinner(personSelection.value, computerSelection.value)
    if (result === "tie") {
      setAnswer(null)
      setResultMsg("You Tied!")
    }
    if (result === 'win') {
      setResultMsg("You won!")
      setAnswer(personSelection)
      setScore(current => current += 1)
    }
    if (result === "lose") {
      setResultMsg("You lost!")
      setAnswer(computerSelection)
      setScore(current => current -= 1)
    }
  }

  const playAgain = () => {
    setShowAnswer(false);
    setPersonSelection(null);
    setComputerSelection(null);
    setAnswer(null);
    setResultMsg("")
  }

  useEffect(() => {
    if (personSelection && computerSelection) {
      selectWhoWon()
    }
  }, [personSelection, computerSelection])

  return (
    <div className='app'>
      <Score game={game} score={score} />
      {
        !showAnswer && (
          <div className="game">
            {
              game.value === "default" && (
                <div className="default-game">
                  {
                    components.slice(0, 3).map((component, index) => (
                      <GameComponent key={`component___${index}`} component={component} click={selectComponent} />
                    ))
                  }
                </div>
              )
            }
            {
              game.value === "full" && (
                <div className="full-game">
                  <div className="row-1">
                    <GameComponent component={components[1]} click={selectComponent} />
                  </div>
                  <div className="row-2">
                    <GameComponent component={components[4]} click={selectComponent} />
                    <GameComponent component={components[0]} click={selectComponent} />
                  </div>
                  <div className="row-3">
                    <GameComponent component={components[3]} click={selectComponent} />
                    <GameComponent component={components[2]} click={selectComponent} />
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      {
        showAnswer && (
          <div className="game game-answers">
            <div className="answer order-1">
              <p>You picked</p>
              <div className="answer-component">
                {
                  personSelection && (
                    <GameComponent component={personSelection} correct={answer?.value === personSelection?.value} />
                  )
                }
              </div>
            </div>
            <div className='win-option order-2'>
              {
                resultMsg !== "" && (
                  <>
                    <h1 className='win-option-title text-uppercase'>{resultMsg}</h1>
                    <button className='play-btn' onClick={playAgain}>PLAY AGAIN</button>
                  </>
                )
              }
            </div>
            <div className="answer order-3">
              <p>The House picked</p>
              <div className="answer-component">
                {
                  computerSelection && (
                    <GameComponent component={computerSelection} correct={answer?.value === computerSelection?.value} />
                  )
                }
              </div>
            </div>
          </div>
        )
      }
      <div className="games">
        {
          games.map((game_, index) => (
            <button key={`game__${index}`} className={`btn btn-game mb-2 ${game.value === game_.value && "active"}`} onClick={e => selectGame(game_)}>{game_.name}</button>
          ))
        }
        <button className="btn btn-game mb-2" onClick={e => setshowRules(true)}>RULES</button>
      </div>
      {
        showRules && (
          <div className="rules-holder">
            <div className="rules-holder-header">
              <h1 className='m-0 p-0'>RULES</h1>
              <button className='btn close-btn' onClick={e => setshowRules(false)}>
                <img src={icon} alt="" />
              </button>
            </div>
            <div className="rules-holder-body">
              {
                game.value === "default" && (
                  <img src={defaultrules} alt='Default game rules' />
                )
              }
              {
                game.value === "full" && (
                  <img src={bonusrules} alt='Default game rules' />
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
