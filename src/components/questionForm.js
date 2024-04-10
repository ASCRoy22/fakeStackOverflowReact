import { useState } from 'react';
import Model from '../model.js';


function QuestionForm({pageChange, setSearchValue, setQuestionWithTag,model}) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [username, setUserName] = useState('');
  
    const [titleError, setTitleError] = useState('');
    const [textError, setTextError] = useState('');
    const [tagsError, setTagsError] = useState('');
    const [usernameError, setUsernameError] = useState('');
  
    const handlePostQuestion = () => {
      setTitleError ('');
      setTextError ('');
      setTagsError('');
      setUsernameError ('');
      let errors = false;
      let tagsArray = tags.split(" ");
      if (title.length >= 100 || title.length === 0){
        setTitleError('Invalid Title');
        errors = true;
      }
      if (text.length === 0) {
        setTextError('Text should not be empty');
        errors = true;
      } 
      if (tagsArray.length > 5 || tags.length === 0){
        setTagsError("Invalid number of tags");
        errors = true;
      }
      if (username.length === 0) {
        setUsernameError('Username should not be empty');
        errors = true;
      }
      if(!errors){
        for(const tag of tagsArray)
          model.addTag(tag);
        model.addQuestion(title, text, tagsArray, username);
        setSearchValue();
        setQuestionWithTag();
        pageChange("Questions");
      }
    }
  
    return (
      <div id = "question_form_container" className = "container">
        <div id = "question_form" className = "form">
          <h2> Question Title* </h2>
          <p> Limit Title to 100 characters or less</p>
          <form id = "q_title_form">
            <input 
              type="text" 
              name = "q_title_input" 
              id ="q_title_input" 
              required
              value = {title}
              onChange = {(e) => setTitle(e.target.value)}
            />
          </form>
          <p id = "q_title_error" className = "error">{titleError}</p>
          <h2> Question Text* </h2>
          <p> Add details</p>
          <form id = "q_text_form">
            <textarea 
              type="text" 
              name = "q_text_input" 
              id ="q_text_input"
              value = {text}
              onChange = {(e) => setText(e.target.value)}
            />
          </form>
          <p id = "q_text_error" className = "error">{textError}</p>
          <h2> Tags* </h2>
          <p> Add keywords seperated by whitespace</p>
          <form id = "tags_form">
            <input 
              type="text" 
              name = "q_tags_input" 
              id ="q_tags_input" 
              value = {tags}
              onChange = {(e) => setTags(e.target.value.toLowerCase())}
              />
          </form>
          <p id = "q_tags_error" className = "error">{tagsError}</p>
          <h2> Username* </h2>
          <form id = "username_form">
            <input 
              type="text" 
              name = "q_username_input" 
              id ="q_username_input" 
              value = {username}
              onChange = {(e) => setUserName(e.target.value)}
              />
          </form>
          <p id = "q_username_error" className = "error">{usernameError}</p>
          <button 
            id = "post_question_button" 
            className = "ask-post_button" 
            onClick={handlePostQuestion}
            >Post Question</button>
          <p className = "mandatory">
            *indicates mandatory fields
          </p>
        </div>
      </div>
    );
  }
  export{QuestionForm};