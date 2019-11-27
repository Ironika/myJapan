import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Scans from './pages/Scans/Scans';

import * as ROUTES from './routes';

const App = () => (
  <Router>
    <React.Fragment>
      <Header />

      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.NEWS} component={News} />
      <Route path={ROUTES.SCANS} component={Scans} />

      <Footer/>
    </React.Fragment>
  </Router>
);

export default App;