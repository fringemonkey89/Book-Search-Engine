import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
//import { Outlet } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' component={SearchBooks} />
        <Route exact path='/saved' component={SavedBooks} />
        <Route render={() => <h1 className='display-2'> Wrong Page! </h1>} />
      </Routes>
    </>
   
    </ApolloProvider>
  );
}

export default App;
