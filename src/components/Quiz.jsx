import { useState, useEffect } from "react"
import { decode } from 'html-entities'

export default function Quiz() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
      .then(res => {
        if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
      })
      .then(data => 
        {
          if (data.response_code === 0 && data.results) {
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
          }

          else {
            console.error("API returned an error code:", data.response_code)
          }
        })
      .catch(err => {
        console.error("Caught a network issue gracefully:", err.message)
      })
    }, [])
    // console.log(questions)

  return (
    <div className="quiz-div">
      {questions.map((q, index) => {
        return (
          <div key={index}>
            <p>{q.question}</p>
            <div className="answer-buttons">
              {q.answers.map((answer, i) => (
                <button key={i}>{answer}</button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}