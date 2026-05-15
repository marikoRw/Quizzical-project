import { useState } from 'react'
import StartPage from './components/StartPage.jsx'
import Quiz from './components/Quiz.jsx'

import './App.css'

function App() {

  const [isStarted, setIsStarted] = useState(false)

  function startQuiz() {
    setIsStarted(true)
  }

  return (
    <>
      {
        isStarted ? <Quiz /> : <StartPage startQuiz={startQuiz} />
      }
    </>
  )
}

export default App
