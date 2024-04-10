function Answer({ans,answeredBy,answerDate}){
    return (
      <div className="answerz">
      <div className="answer_text">{ans}</div>         
      <div className="metadata">
      <p className="username">{answeredBy} </p>
      <p className="time_asked" > {answerDate}</p>
      </div>
      </div>
    )
  }

  export{Answer}