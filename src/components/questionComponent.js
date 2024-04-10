import Model from '../model.js';

function IndividualQuestions({title,answersIdArr,num_views,askedBy,askDate,questionNumber,reverse=true ,pageChange ,setQuestionNumber,model}) {
    console.log("questionNum"+questionNumber+num_views)
    const handleTitleClick = () => {
      console.log(pageChange);
      console.log( model.data.questions[model.data.questions.length-questionNumber-1].views)
      model.data.questions[questionNumber].views++;
      console.log( model.data.questions[model.data.questions.length-questionNumber-1].views)
      setQuestionNumber(questionNumber);
      pageChange("Answer");
      
  
  
    }
  
    console.log(reverse);
    let tagNames=model.getTagNamesArray(questionNumber,reverse);
  
    let askedTime = askDate.getTime();
    let currentTime = new Date().getTime();
    let differenceTime = currentTime - askedTime;
    let askedDate = "";
    //If difference time is less than 60 seconds
    if(differenceTime < 60000){
      askedDate = Math.floor(differenceTime/1000) + " seconds ago";
    }
    //If difference time is less than 60 minutes
    else if(differenceTime < (60000*60)){
      askedDate = Math.floor(differenceTime/(1000*60)) + " minutes ago";
    }
    //If difference time is less than 24 hours
    else if(differenceTime < (60000*60*24)){
      askedDate = Math.floor(differenceTime/(1000*60*60)) + " hours ago";
    }
    else{
      askedDate = "on " + askDate;
    }
  
    return(
      <div id="template_question"  className="questions">
        <div className="answer_view"><p>{answersIdArr.length} answers</p><p>{num_views} views</p></div>
  
        <div className="title_tag">
          <button className="title" onClick={handleTitleClick}>
            {title}
          </button>
  
  
          <div id="tagList">
  
            {tagNames.map( (item )=>
            (   <div className="tag1" key={item} >{item}</div> )
  
            )}
          </div>
  
        </div>
  
        <div className="metadata">
          <p className="username">{askedBy} </p>
          <p className="time_asked" > ask {askedDate}</p>
        </div>
      </div>
    );
  }
  
    export{IndividualQuestions};