import Model from '../model.js';
import { useState } from 'react';
import { IndividualQuestions } from './questionComponent.js';
import {AnswerPage } from './answerPage.js';
import { QuestionForm } from './questionForm.js';
import { Forum } from './forum.js';


function AnswerForm({pageChange,questionNumber,model}){
  console.log("quesitonnum"+questionNumber)
  const [text, setText] = useState('');
  const [username, setUserName] = useState('');

  const [textError, setTextError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handlePostAnswer = (e) => {
    setTextError ('');
    setUsernameError ('');
    let errors = false;
    if (text.length === 0) {
      setTextError('Text should not be empty');
      errors = true;
    } 
    if (username.length === 0) {
      setUsernameError('Username should not be empty');
      errors = true;
    }

    if(!errors){
      console.log({text}, {username});
      
      model.addAnswer(username,text,questionNumber);
      console.log("quesitonnum"+questionNumber)
   
      pageChange("Answer");
    };
  }
  

  return(
    <div id = "answer_form_container" className="container">
      <div id = "answer_form" className="form">
        <h2> Username* </h2>
        <form id = "a_username_form">
          <input 
            type="text" 
            name = "a_username_input" 
            id ="a_username_input" 
            value = {username}
            onChange = {(e) => setUserName(e.target.value)}
            />
        </form>
        <p id = "a_username_error" className="error">{usernameError}</p>
        <h2> Answer Text* </h2>
        <form id = "a_text_form">
          <textarea 
            type="text" 
            name = "a_text_input" 
            id ="a_text_input"
            value = {text}
            onChange = {(e) => setText(e.target.value)}
          />
        </form>
        <p id = "a_text_error" className="error">{textError}</p>
        <button id = "post_answer_button" className="ask-post_button" onClick={handlePostAnswer}>Post Answer</button>
        <p className="mandatory">
          *indicates mandatory fields
        </p>
      </div>
    </div>
  );
}



function SideMenu({onQuestionsClick, onTagsClick, pageName}){
  return(
    <div id="side_menu">
      <div id="questions" className={pageName==="Questions" ? "menu_option active" : "menu_option"} onClick={onQuestionsClick} >Questions</div>
      <div id="tags" className={pageName==="Tags" ? "menu_option active" : "menu_option"} onClick={onTagsClick}><a >Tags</a></div>
    </div>
  );
}


function MainContent({pageName, pageChange, searchValue, setSearchValue,model}){
  const [questionWithTag, setQuestionWithTag] = useState(null);

  const handleQuestionClick = () => {
    pageChange("Form");
  }
  


 const [questionNumber,setQuestionNumber]=useState();
console.log(questionNumber)
 
  
  return(
    <div id = "main_content">
      {pageName === "Questions" && 
        <Forum 
          onQuestionClick={handleQuestionClick} 
          questionWithTag={questionWithTag} 
          setQuestionWithTag={setQuestionWithTag}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onpageChange={pageChange} setQuestionNumber={setQuestionNumber}
          model={model}
          />}
      {pageName === "Tags" && 
        <AllTagsPage onQuestionClick={handleQuestionClick} setQuestionWithTag={setQuestionWithTag} pageChange={pageChange} setSearchValue={setSearchValue} model={model}/>
      }
      {pageName === "Form" && <QuestionForm pageChange={pageChange} setSearchValue={setSearchValue} setQuestionWithTag={setQuestionWithTag} model={model}/>}
      {pageName==="Answer" &&<AnswerPage questionIndex={questionNumber} onQuestionClick={handleQuestionClick} pageChange={pageChange} model={model}   />}
      {pageName==="AnswerForm" &&<AnswerForm questionNumber= {questionNumber} pageChange={pageChange}  model={model}></AnswerForm>}
      
    
      
    </div>
  );
}

function AllTagsPage({onQuestionClick, setQuestionWithTag, pageChange, setSearchValue,model}){
  const tags = model.getAllTags();
  return(
    <div id ="all_tags_page">
    <div id = "tags_header">
      <h1> <span id = "number_of_tags"></span>{tags.length} Tags</h1>
      <h1>All Tags</h1>
      <button id = "ask_question_2" className="ask-post_button" onClick={onQuestionClick}> Ask Question </button>
    </div>
    <div id = "tags_list" className="scroll">
      {tags.map((tag) => 
        <Tag key={tag.tid} name={tag.name} tid={tag.tid} click={setQuestionWithTag} pageChange={pageChange} setSearchValue={setSearchValue} model={model}/>
      )}
    </div>
  </div>
  );
}

function Tag({name, tid, click, pageChange, setSearchValue,model}){
  const questions = model.getAllQuestions();
  let numTags = 0;

  const handleClick = () => {
    click(tid);
    
    pageChange("Questions");
  }

  //Iterates all the questions to see how many questions includes the tag's id
  for(let j = 0; j < questions.length; j++){
    if (questions[j].tagIds.includes(tid))
      numTags++;
  }

  return(
    <div className='tags' onClick={handleClick}>
      <a href = "/#">{name}</a>
      <br/>
      {numTags} questions
    </div>
  );

}






function AllQuestions({questionType, questionWithTag, searchValue, setNumberOfQuestions, setQuestionWithTag,setQuestionNumber,pageChange,model}){  
  console.log("in ALl QUestionspageChange is"+ typeof(pageChange));
  console.log(pageChange);
  if(searchValue){
    setQuestionWithTag();
  }
  setNumberOfQuestions(0);
  console.log("questionWithTag"+!questionWithTag);
  console.log(questionType)
  return(
    <div id = "all_questions" className="scroll">


      {!questionWithTag && !searchValue && questionType === "Newest" && <QuestionsByNewest setNumberOfQuestions={setNumberOfQuestions} setQuestionNumber={setQuestionNumber} pageChange1={pageChange} model={model}/>}
      {!questionWithTag && !searchValue && questionType === "Unanswered" && <UnansweredQuestions setNumberOfQuestions={setNumberOfQuestions} setQuestionNumber={setQuestionNumber} pageChange={pageChange} model={model}/>}
      {questionWithTag && !searchValue && <QuestionWithTagAndText tagIds={questionWithTag} setNumberOfQuestions={setNumberOfQuestions} setQuestionNumber={setQuestionNumber} pageChange={pageChange} model={model}/> }
      {!questionWithTag && searchValue && <SearchQuestion searchValue={searchValue} setNumberOfQuestions={setNumberOfQuestions} setQuestionNumber={setQuestionNumber} pageChange={pageChange} model={model}/>}
    </div>
  );
}

function QuestionsByNewest({pageChange1, setQuestionNumber,setNumberOfQuestions, model}){
  console.log("pageChange type in questiobyNewest"+typeof(pageChange1));
  const questions = model.getAllQuestions();
  setNumberOfQuestions(questions.length);
  
  return(
    <>
    {questions.map((question, index) => (
      
      <IndividualQuestions
        key={"n" + question} 
        title= {question.title}
        /*tagNames={model.data.questions[0].tagIds}*/
        answersIdArr={question.ansIds}
        num_views={question.views}
        askedBy={question.askedBy}
        askDate={question.askDate}
        questionNumber={index}
        pageChange={pageChange1}
        setQuestionNumber={setQuestionNumber}
        model={model}/>

      ))
    }
    {(questions.length === 0) ? "No questions found" : null}
    
    </>
  );
}

function UnansweredQuestions({pageChange,setQuestionNumber,setNumberOfQuestions,model}){
  const questions = model.getAllQuestions();
  let numberOfQuestions = 0;
  questions.map((question) => (
    question.ansIds.length === 0 ? numberOfQuestions++ : null));
  setNumberOfQuestions(numberOfQuestions);

  return(
    <>
    {questions.map((question, index) => (
      question.ansIds.length === 0 ?
        <IndividualQuestions
          key={"u" + index} 
          title= {question.title}
          /*tagNames={model.data.questions[0].tagIds}*/
          answersIdArr={question.ansIds}
          num_views={question.views}
          askedBy={question.askedBy}
          askDate={question.askDate}
          questionNumber={index}
          pageChange={pageChange}
          setQuestionNumber={setQuestionNumber}
          model={model}/>
          : null
        ))
      }
      {(numberOfQuestions === 0) ? "No questions found" : null}
    </>
  );
}

function SearchQuestion({searchValue, setNumberOfQuestions,setQuestionNumber,pageChange,model}){
  let resultArr = searchValue.split(" ");
  let tagArr = [];
  let textArr = [];
  //Goes through all the strings in the result to check if they're a tag or a text
  for(const result of resultArr){
    //Checks if it is a tag
    let isTag = (/^[[]/.test(result) && result.endsWith("]"));
    if(isTag){
      //Get the tag and remove the brackets
      let noBracketsTag = result.slice(1,result.length-1).toLowerCase();
      tagArr.push(noBracketsTag);
    }
    else
      textArr.push(result.toLowerCase());
  }
  return(
    <QuestionWithTagAndText tags={tagArr} text={textArr} setNumberOfQuestions={setNumberOfQuestions} setQuestionNumber={setQuestionNumber} pageChange={pageChange} model={model}/>
  );
}

function QuestionWithTagAndText({tags, tagIds, text, setNumberOfQuestions,pageChange,setQuestionNumber,model}){
  const questions = model.getAllQuestions();
  let questionSet = new Set();
  console.log(text);
  //If we're searching for the questions instead of clicking the tag on the all tags page
  if(!tagIds){
    if(tags){
      for(const tag of tags){
        for(let i = questions.length-1; i >= 0; i--){
          if(model.getTagNamesArray(i,true).includes(tag)){
            questionSet.add(questions[i]);
          }
        }
      }
    }
    //Loop through all the text and add the questions with those text to a question set
    if(text){
      for(const t of text){
        for(let i = questions.length-1; i >= 0; i--){
          if(questions[i].title.toLowerCase().includes(t.toLowerCase()) || 
          questions[i].text.toLowerCase().includes(t.toLowerCase())){
            questionSet.add(questions[i]);
          }
        }
      }
    }
    
  }
  let arr = [];
  questionSet.forEach((question) => (
    arr.push(question))
  )
  let numberOfQuestions = arr.length;
  questions.map((question, index) => (
    question.tagIds.includes(tagIds) ? numberOfQuestions ++ : null));
  setNumberOfQuestions(numberOfQuestions);
  return(
    <>
    {tagIds ? questions.map((question, index) => (
      question.tagIds.includes(tagIds) ?
        <IndividualQuestions
          key={"t" + index} 
          title= {question.title}
          /*tagNames={model.data.questions[0].tagIds}*/
          answersIdArr={question.ansIds}
          num_views={question.views}
          askedBy={question.askedBy}
          askDate={question.askDate}
          questionNumber={index}
          pageChange={pageChange}
          setQuestionNumber={setQuestionNumber}
          model={model}
          />
          : null))
        : arr.map((question, index) => (
          <IndividualQuestions
          key={"a" + index} 
          title= {question.title}
          /*tagNames={model.data.questions[0].tagIds}*/
          answersIdArr={question.ansIds}
          num_views={question.views}
          askedBy={question.askedBy}
          askDate={question.askDate}
          questionNumber={question.qid.slice(1)-1}
          reverse={false}
          pageChange={pageChange}
          setQuestionNumber={setQuestionNumber}
          model={model}
          />
        ))
      }
      {(numberOfQuestions === 0) ? "No questions found" : null}
    </>
  );
}







export {MainContent, SideMenu,  AllTagsPage,AllQuestions};
