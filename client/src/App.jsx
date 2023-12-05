import './App.css';
import { ApolloProvider, ApolloClient, inMemoryCache, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new inMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
    <>
      <Navbar />
      <Outlet />
    </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
