import { useState, useEffect } from "react"
import { decode } from 'html-entities'

export default function Quiz() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => 
        {
          // console.log(data)
          const quizData = data.results.map(q => {
            const randomIndex = Math.floor(Math.random() * (q.incorrect_answers.length + 1))
            const answers = [...q.incorrect_answers]
            answers.splice(randomIndex, 0, q.correct_answer)
            return { 
              question: decode(q.question),
              answers: answers
            }
          })
          setQuestions(quizData)
        })
    }, [])
    // console.log(questions)

  return (
    <div className="quiz-div">
      {questions.map((q, index) => {
        return (
          <div key={index}>
            <p>{q.question}</p>
            <ul>
              {q.answers.map((answer, i) => (
                <button key={i}>{answer}</button>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}