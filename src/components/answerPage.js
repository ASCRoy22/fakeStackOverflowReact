import Model from '../model.js';
import {Answer} from "./answerComponent"


function AnswerPage({questionIndex,onQuestionClick,pageChange,model}){

    const handleAnswer=()=>{
      pageChange("AnswerForm");
    }
    let question1=model.getAllQuestions();
    let question=question1[questionIndex];
    let ansList=question.ansIds;
    let allAnswersInModel=model.data.answers;
    let answerDict=[]
  
  
      console.log(ansList);
    for(let i=0; i<ansList.length;i++){
      for(let j=0; j<allAnswersInModel.length; j++){
        if(ansList[i]===allAnswersInModel[j].aid){
          answerDict.push(
            {
              ans:allAnswersInModel[j].text,
              answeredBy:allAnswersInModel[j].ansBy,
              answerDate:allAnswersInModel[j].ansDate.toDateString()
  
            });
          
  
          
            /*<Answer ans={allAnswersInModel[j].text} answeredBy={allAnswersInModel[j].ansBy} answerDate={allAnswersInModel[j].ansDate.toDateString}></Answer>*/
        }
      }
    }
    return(
     <div  style={{overflow:'scroll'}}>
      <AnswerHeader onQuestionClick={onQuestionClick}  title={question.title} answersIdArr={ansList} num_views={question.views} askedBy={question.askedBy} askDate={question.askDate.toDateString()} text={question.text} ></AnswerHeader>
      <div id="answers" className="scroll">
      {answerDict.map((ANS)=> <Answer ans={ANS.ans} answeredBy={ANS.answeredBy} answerDate={ANS.answerDate}></Answer>)}
     </div>
     <button id="ask_question_3 " onClick={handleAnswer} className="ask-post_button">Answer question</button>
      </div>
    );
  }
  
  
  function AnswerHeader({title,answersIdArr,num_views,askedBy,askDate,text,onQuestionClick}){
    return(
      <div id="answer_page"  className="scroll"> 
        <div id= "answer_page_header">
          <div id="answer_page_line1"> 
            <div><h1 id="num_answer" >{answersIdArr.length}  answers</h1></div>  
            <div ><h1 id="titleA">{title}</h1></div> 
            <button id="ask_question_3" className="ask-post_button" onClick={onQuestionClick}>Ask Question</button> 
          </div>
          <div id ="answer_page_line2">
            <div className="stats"><h2 id="num_view">{num_views} views</h2></div> 
            <div className="question_text"><h2 id="question_text">{text}</h2> </div>     
            <div className="metadata"><p className="username" id="user_0">{askedBy} <span> {' '} </span> </p><p className="time_asked" id="time_asked_0"> {askDate} </p></div> 
          </div>
        </div>
    
    </div>
    );
  }
  export{AnswerPage}