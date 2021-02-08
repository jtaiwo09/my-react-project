import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './assets/style.css';
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from 'react-router-dom';
import routes from './utils/protectedRoutes/index';
import Header from './components/Header';
import firebase from './config/firebase';
import AppContext from './store/AppContext';
import AuthRoute from './utils/protectedRoutes/AuthRoute';
import GuestRoute from './utils/protectedRoutes/GuestRoute';
import Loading from './components/Loading';
import NotFound from './pages/404';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedRoute from './utils/protectedRoutes/AnimatedRoute';

export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            setisLoggedIn(true);
            setisLoading(true);
            setuser(user);
            setisLoading(false);
        } else {
          setisLoggedIn(false);
          setuser({});
          setisLoading(false);
        }
    })
}, []);

  return (
      <AppContext.Provider value={[isLoggedIn, user]}>
      <Header />
      <AnimatePresence exitBeforeEnter initial={false}>
      <Switch key={location.pathname} location={location}>
            {
              routes.map((route, index)=> {

                if(route.protected === 'guest'){
                  return (
                    <GuestRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component />
                    </GuestRoute>
                  )
                }
                if(route.protected === 'auth'){
                  return (
                    <AuthRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.component/>
                    </AuthRoute>
                  )
                }

                    return (
                      <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                    >
                      <AnimatedRoute>
                        <route.component/>
                      </AnimatedRoute>
                    </Route>
                    );
                  
                })//map ends
            }
      </Switch>
      </AnimatePresence>
      </AppContext.Provider>
  )
}
