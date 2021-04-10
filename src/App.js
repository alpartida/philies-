import { AppBar, Toolbar } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Loading } from './Loading';
import { SalaryComponent } from './salaryComponent';

function App() {

  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(true);
  const getSalary = async () => {
    setLoading(true)
    await axios.get('http://localhost:3030').then(res => { setSalary(res.data.qualifyingOffer); setLoading(false) })
  }

  useEffect(() => {
    return getSalary()
  }, [])

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <img class="plogo" alt="Phillies Logo" src="https://seekvectorlogo.net/wp-content/uploads/2018/08/philadelphia-phillies-vector-logo.png" />
        </Toolbar>
      </AppBar>
      {loading ? <Loading></Loading> : <SalaryComponent getSalary={getSalary} salary={salary}></SalaryComponent>}
    </div>
  );
}

export default App;
