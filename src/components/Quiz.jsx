import { useState } from "react"
// import { decode } from 'html-entities'
import { structuredMockQuestions } from "../mockdata"

export default function Quiz() {
  const [questions, setQuestions] = useState(structuredMockQuestions)
  
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
  console.log(questions)

  function isChosen(questionId, answerText) {
    console.log("Chosen answer:", answerText, "for question ID:", questionId)

  }
  
  return (
    <div className="quiz-div">
      {questions.map((q, index) => {
        return (
          <div className="question" key={index}>
            <p>{q.question}</p>
            <div className="answer-buttons">
              {q.answers.map((answer, i) => (
                <button key={i} onClick={() => isChosen(q.questionId, answer.text)}>{answer.text}</button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}




// LOGIC 1
// use the chosen to store the clicked answers
// use the correct questions from the API fetch to create an array
// compare the two arrays and count the correct answers, then display the score at the end of the quiz
// use the API array to see if the chosen answer is included in API array
//if chosen answer is included in API array, then add a class to the button to show it as correct, otherwise add a class to show it as wrong
// if the user clicks on an answer, disable the other buttons for that question
// add a "check answers" button at the end of the quiz that will show the correct answers and the user's score, and a "play again" button that will reset the quiz


// LOGIC 2
// use the questions state to make the questions track  their own state
// use a click handler on the buttons to update state by passing it the question ID and the clicked answer
// toggle the isSelected state of the clicked answer to true and disable the other buttons to false
// use another state linked to "check answers" button to map over the questions using .filter()
// if isGameover is true then check answers and show results and give a reset button
// if not keep playing