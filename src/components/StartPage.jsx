export default function StartPage(props) {
  return (
    <>
      <div className="intro-page">
        <h1>Quizzical</h1>
        <p>Test your knowledge with this fun quiz app!</p>
        <button className="start-btn" onClick={props.startQuiz}>
          Start quiz
        </button>
      </div>
    </>
  )
}