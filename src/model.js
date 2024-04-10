export default class Model {
  constructor() {
    this.data = {
      questions: [
                  {
                    qid: 'q1',
                    title: 'Programmatically navigate using React router',
                    text: 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.',
                    tagIds: ['t1', 't2'],
                    askedBy : 'JoJi John',
                    askDate: new Date('December 17, 2020 03:24:00'),
                    ansIds: ['a1', 'a2'],
                    views: 10,
                  },
                  {
                    qid: 'q2',
                    title: 'android studio save string shared preference, start activity and load the saved string',
                    text: 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
                    tagIds: ['t3', 't4', 't2'],
                    askedBy : 'saltyPeter',
                    askDate: new Date('January 01, 2022 21:06:12'),
                    ansIds: ['a3', 'a4', 'a5'],
                    views: 121,
                  }
                ],
      tags: [
        {
          tid: 't1',
          name: 'react',
        },
        {
          tid: 't2',
          name: 'javascript',
        },
        {
          tid: 't3',
          name: 'android-studio',
        },
        {
          tid: 't4',
          name: 'shared-preferences',
        }
      ],

      answers: [
        {
          aid: 'a1',
          text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
          ansBy: 'hamkalo',
          ansDate: new Date('March 02, 2022 15:30:00'),
        },
        {
          aid: 'a2',
          text: 'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
          ansBy: 'azad',
          ansDate: new Date('January 31, 2022 15:30:00'),
        },
        {
          aid: 'a3',
          text: 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
          ansBy: 'abaya',
          ansDate: new Date('April 21, 2022 15:25:22'),
        },
        {
          aid: 'a4',
          text: 'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
          ansBy: 'alia',
          ansDate: new Date('December 02, 2022 02:20:59'),
        },
        {
          aid: 'a5',
          text: 'I just found all the above examples just too confusing, so I wrote my own. ',
          ansBy: 'sana',
          ansDate: new Date('December 31, 2022 20:20:59'),
        }
      ]
    };
  }
  // add methods to query, insert, and update the model here. E.g.,
  // getAllQstns() {
  //   return this.data.questions;
  // }
  addQuestion(title, text, tagArray, username){
    let qid = "q" + (this.data.questions.length + 1);
    //Compares the tags' names of this question and rest of tags to get their id
    let tidArr = [];
    for(const tag of tagArray){
      for(const allTag of this.getAllTags()){
        if(tag === allTag.name)
          tidArr.push(allTag.tid);
      }
    }
    const q = {
      qid: qid,
      title: title,
      text: text ,
      tagIds: tidArr,
      askedBy : username,
      askDate: new Date(),
      ansIds: [],
      views: 0,
    }
    this.data.questions.push(q);
  }

  addTag(name){
    let currentTags = [];
    for(const tag of this.data.tags){
      currentTags.push(tag.name);
    }
    //Checks if tag already exists, if not then add it to the list.
    if(!currentTags.includes(name) && (name !== '')){
      const t = {
        tid: "t" + (this.data.tags.length + 1),
        name: name,
      }
      this.data.tags.push(t);
    }
  }

  addAnswer(username, text ,questionNum){
    let aid = "a" + (this.data.answers.length + 1);
    const a = {
      aid: aid,
      text: text,
      ansBy: username ,
      ansDate: new Date(),
    }
    console.log(a);
    this.data.answers.push(a);
    this.getAllQuestions()[questionNum].ansIds.push(aid);
  }

  getAllQuestions(){
    let questions = this.data.questions.toReversed();
    return questions;
  }
  getAllTags(){
    return this.data.tags;
  }
  getAllAnswers(){
    return this.data.answers;
  }

  getTagNamesArray(questionNumber, reverse){
    let questions=this.data.questions;
    if (reverse)
      questions=this.data.questions.toReversed();
    let tags=this.data.tags;
    let tagNameArray=[]; 
    let taglist= questions[questionNumber].tagIds;
  
    for (let i =0; i<taglist.length;i++){
  
      for(let j=0; j<tags.length;j++){
      if(tags[j].tid===taglist[i]){
        tagNameArray.push(tags[j].name);
      }
      }
    }
    return tagNameArray;
  }

}
