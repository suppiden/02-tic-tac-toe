import { useState } from "react"
import { Square } from "./components/Square.jsx"
import { TURNS, WINNER_COMBOS} from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal.jsx"



function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const[turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner)
      }else if(checkEndGame(newBoard)){
        setWinner(false)
      }
    }

    const resetGame = () =>{
      setBoard(Array(9).fill(null))
      setTurn(TURNS.x)
      setWinner(null)
    }

    return (
    <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Resetea el juego</button>
      <section className='game'>
        {
          board.map((square, index)=> {
          return(
            <Square
            key={index}
            index = {index}
            updateBoard={updateBoard}
            >{board[index]}
            </Square>
          )  

          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <section>
       <WinnerModal resetGame={resetGame} winner={winner}/>
      </section>
    </main>
  )
      
      }
export default App
