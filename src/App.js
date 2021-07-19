import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import DrinkDetail from './pages/DrinkDetail/DrinkDetail';
import SearchPage from './pages/SearchPage/SearchPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/favorites">
          <FavoritePage />
        </Route>
        <Route path="/drink/search">
          <SearchPage />
        </Route>
        <Route path="/drink/:id">
          <DrinkDetail />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
