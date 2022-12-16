import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
    console.log('Constructor')
  }

  componentDidMount(){
    console.log('CompomentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users)=> 
    this.setState(()=>{
      return {monsters: users};
    },
    ()=> {
      console.log(this.state);
    }))
  }

  onSearchChange = (event)=>{
    console.log(event.target.value);
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(()=> {
      return { searchField };
    })

  }

  render() {
    console.log('Render')

    const { monsters, searchField,  } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input className='search-box' 
        type='search' 
        placeholder='search monsters' 
        onChange={onSearchChange}/>
        {
          filteredMonsters.map((monster) => {
            return <div key={monster.id}><h1 >{monster.name}</h1></div>
          })
        }
      </div>
    );
  }
}

export default App;
