import { useState } from "react"
// import { decode } from 'html-entities'
import { structuredMockQuestions } from "../mockdata"
import confetti from "canvas-confetti"

export default function Quiz() {
  const [questions, setQuestions] = useState(structuredMockQuestions)
  const [isGameOver, setIsGameOver] = useState(false)
  
  // useEffect(() => {
  //   fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
  //   .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`)
  //         }
  //         return res.json()
  //       })
  //       .then(data => 
  //       {
  //         if (data.response_code === 0 && data.results) {
  //           const quizData = data.results.map(q => {
  //             const randomIndex = Math.floor(Math.random() * (q.incorrect_answers.length + 1))
  //             const answersArray = [...q.incorrect_answers]
  //             answersArray.splice(randomIndex, 0, q.correct_answer)
  //             return {
  //               questionId: crypto.randomUUID(),
  //               question: decode(q.question),
  //               correct_answer: decode(q.correct_answer),
  //               answers: answersArray.map(ans => {
  //                   return {text: decode(ans), isSelected: false}
  //                 })
  //             }
  //           })
  //           setQuestions(quizData)
  //         }

  //         else {
  //           console.error("API returned an error code:", data.response_code)
  //         }
  //       })
  //       .catch(err => {
  //         console.error("Caught a network issue gracefully:", err.message)
  //     })
  // }, [])

  function isChosen(questionId, answerText) {
    setQuestions(prevQuestions => {
      return prevQuestions.map(q => {
        if (q.questionId === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans => {
              if (ans.text === answerText) {
                return { ...ans, isSelected: !ans.isSelected }
              }
              else {
                return { ...ans, isSelected: false}
              }
            })
          }
        }
        return q
      })
    })
  }

  function gameEnd() {
    setIsGameOver(true)
    const finalScore = questions.filter(q => 
    q.answers.some(ans => ans.isSelected && ans.text === q.correct_answer)).length

    if (finalScore === 5) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      })
    }
  }

  function gameReset() {
    setIsGameOver(false)
    setQuestions(structuredMockQuestions)
  }

  
  return (
    <div className="whole-quiz-div">
      {/* quiz question and answer buttons */}
      <div className="quiz-div">
        {questions.map((q, index) => {
          return (
            <div className="question" key={index}>
              <p>{q.question}</p>
              <div className="answer-buttons">
                {q.answers.map((answer, i) => {
                  
                  let classChoice
                  if (!isGameOver) {
                    classChoice = answer.isSelected ? "isSelected" : ""
                  }
                  else {
                    if (answer.text === q.correct_answer) {
                      classChoice = "isCorrect"
                    }
                    else if (answer.isSelected && answer.text !== q.correct_answer) {
                      classChoice = "isWrong"
                    }
                    else {
                      classChoice = "isNeutral"
                    }
                  }
                  return (
                    <button
                      key={i}
                      disabled={isGameOver}
                      className={classChoice}
                      onClick={() => isChosen(q.questionId, answer.text)}>
                        {answer.text}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* check answers and play again buttons */}
      <div className="check-play-div">
        {isGameOver ? (
          <>
            <p
              className="score">
              You scored 
              {
                questions.filter(q => q.answers.some(ans => ans.isSelected && ans.text === q.correct_answer)).length
              } /
              {
                questions.length
              } correct answers
            </p>
            <button className="play-again-btn" onClick={() => gameReset()}>Play Again</button>
          </>
        ) : (
          <button className="check-answers-btn" onClick={() => gameEnd()}>Check Answers</button>
        )}
      </div>
    </div>
  )
}



// LOGIC 1❌
// use the chosen to store the clicked answers
// use the correct questions from the API fetch to create an array
// compare the two arrays and count the correct answers, then display the score at the end of the quiz
// use the API array to see if the chosen answer is included in API array
//if chosen answer is included in API array, then add a class to the button to show it as correct, otherwise add a class to show it as wrong
// if the user clicks on an answer, disable the other buttons for that question
// add a "check answers" button at the end of the quiz that will show the correct answers and the user's score, and a "play again" button that will reset the quiz


// LOGIC 2✅
// use the questions state to make the questions track  their own state
// use a click handler on the buttons to update state by passing it the question ID and the clicked answer
// toggle the isSelected state of the clicked answer to true and disable the other buttons to false
// use another state linked to "check answers" button to map over the questions using .filter()
// if isGameover is true then check answers and show results and give a reset button
// if not keep playing