// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import FakeStackOverflow from './components/fakestackoverflow.js'
import { EntirePage } from './components/entirepage.js';
import Model from './model.js';
let model= new Model()

function App() {
  return (
    <section className="fakeso">
      <EntirePage model={model}></EntirePage>
      {/*<FakeStackOverflow />*/}
    </section>
  );
}

export default App;
