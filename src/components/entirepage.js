import {SideMenu, MainContent} from './mainContent.js'
import {useState} from 'react'
import Model from '../model.js';

function EntirePage({model}) {
  const [searchValue, setSearchValue] = useState();
    
  return (
    <div>
      <MainHeader setSearchValue={setSearchValue}/>
      <MainBody searchValue={searchValue} setSearchValue={setSearchValue} model={model}/>      
    </div>
  );
}

function MainHeader({setSearchValue}){
  const [value, setValue] = useState();
  
  
  

  function handleEvent(){
    setSearchValue(value);
  }

  return(
    <div id="header" className="header">
  
      <nav> 
        <div id="emptybox"></div>
        <div id="appTitle"><span>Fake Stack Overflow</span></div>
        <div id="searchbar">  
          <input 
            id="typebox" 
            type ="text" 
            placeholder="Search . . ." 
            value = {value}
            onChange = {(e) => setValue(e.target.value)}
            onKeyDown = {(e) => {
              if (e.key === "Enter") handleEvent()}
            }
            />
        </div>
      </nav>
    </div>
  );
}
  
function MainBody({searchValue, setSearchValue, model}){
  const [pageName, setPageName] = useState('Questions');

  const handleQuestionClick = () => {
      setSearchValue(null);
      setPageName("Questions");
  }

  const handleTagsClick = () => {
      setSearchValue(null);
      setPageName("Tags");
  }

  return(
    <div id="main" className="main">
      <SideMenu onQuestionsClick={handleQuestionClick} onTagsClick={handleTagsClick} pageName={pageName}/>
      <MainContent pageName={pageName} pageChange={setPageName} searchValue={searchValue} setSearchValue={setSearchValue} model={model}/>
    </div>
  );
}

export {EntirePage, MainHeader, MainBody};