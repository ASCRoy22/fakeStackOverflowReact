import { useState } from 'react';
import { AllQuestions } from './mainContent';
function ForumHeader({onQuestionClick, onNewestQClick, onUnansweredQClick, numberOfQuestions}){
    return(
      <div id= "forum_header">
      <div id="forum_header_line1"><h1>All Questions</h1> 
        <button id="ask_question_1" className="ask-post_button" onClick={onQuestionClick}>Ask Question</button> 
      </div>
      <div id ="forum_header_line2"><h2><span id = "number_of_questions"></span>{numberOfQuestions} questions</h2>
        <div id="buttonSetDiv">
          <button id = "newest" className="buttonSet" onClick={onNewestQClick}>Newest</button>
          <button id = "active" className="buttonSet">Active</button>
          <button id = "unanswered" className="buttonSet" onClick={onUnansweredQClick}>Unanswered</button>
        </div>
      </div>
    </div>
    );
  }

  
function Forum({onQuestionClick, questionWithTag, setQuestionWithTag, searchValue, setSearchValue,onpageChange,setQuestionNumber,model}){
    const [questionType, setQuestionType] = useState("Newest");
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  
    const handleNewestQClick = () => {
      setQuestionWithTag(null);
      setSearchValue();
      setQuestionType("Newest");
  
    }
  
    const handleUnansweredQClick = () => {
      setQuestionWithTag(null);
      setSearchValue();
      setQuestionType("Unanswered");
    }
  
  
  
    return(
      <div id="forum">
        <ForumHeader 
          onQuestionClick={onQuestionClick} 
          onNewestQClick={handleNewestQClick}
          onUnansweredQClick={handleUnansweredQClick}
          setSearchValue={setSearchValue}
          numberOfQuestions={numberOfQuestions}
        />
        <AllQuestions 
          questionType={questionType} 
          questionWithTag={questionWithTag}
          searchValue={searchValue}
          setQuestionWithTag={setQuestionWithTag}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          pageChange={onpageChange} 
          setQuestionNumber={setQuestionNumber}
          model={model}
           />
      </div>
    );
  }
  export{Forum}