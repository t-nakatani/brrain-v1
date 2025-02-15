const FollowUpQuestion = ({ followUp, onOptionSelect }) => {
  return (
    <div className="follow-up-question">
      <p className="question-text">{followUp.question}</p>
      <div className="options">
        {followUp.options.map((option) => (
          <button
            key={option.id}
            className="option-button"
            onClick={() => onOptionSelect(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FollowUpQuestion 