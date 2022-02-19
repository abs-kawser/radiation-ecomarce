import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';

import Cart from './Component/Cart/Cart';

function App() {
  return (
          <BrowserRouter> 

           <Header/>
                <div>
                  <Route path="/" exact>
                          <Home/>
                  </Route>

                  <Route path="/cart" exact>
                       <Cart/>
                  </Route>
                </div>
                
           </BrowserRouter>
  );
}

export default App;
