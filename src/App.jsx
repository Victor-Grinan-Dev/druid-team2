
import './App.css';
import { Project } from './classes/project';
function App() {

  //read from database
  const database = [
    ['Worker Logger', 'Jenna Koski Oy'], 
    ["Poke App", "victor Grinan Oy"]
  ]

  const localRedux = [];
  //const workerLogger = new Project('Worker Logger', 'Jenna Koski Oy')

  //initialize data:
  database.forEach((project) => {
    localRedux.push(new Project(project[0], project[1]))
  })


  return (
    <div className="App">
      <header className="App-header">
    hello druid!


    {localRedux.map((project,index)=>(
      <p key={index}>{project.name}-{project.client}</p>
    ))
    }

      </header>
    </div>
  );
}

export default App;
