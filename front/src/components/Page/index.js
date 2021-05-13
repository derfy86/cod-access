import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';
import Home from 'src/components/Home';
import SignUp from 'src/containers/SignUp';
import Profile from 'src/containers/Profile';
import ExercisesPage from 'src/containers/ExercisesPage';
import Exercise from 'src/containers/Exercise';
import Dashboard from 'src/components/Dashboard';
import About from 'src/components/About';
import Error from 'src/components/Error';
import Contact from 'src/containers/Contact';
import LegalNotice from 'src/components/LegalNotice';
import PasswordResetRequest from 'src/containers/PasswordResetRequest';
import PasswordReset from 'src/containers/PasswordReset';
import Settings from 'src/containers/Settings';
import Sitemap from 'src/components/Sitemap';
import PrivateUserRoute from 'src/components/PrivatesRoutes/PrivateUserRoute';
import PrivateAdminRoute from 'src/components/PrivatesRoutes/PrivateAdminRoute';

const Page = ({
  isLogged,
  role,
  connectionMenuVisibility,
  mobileMenuVisibility,
  closeConnectionMenu,
  closeMobileMenu,
}) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (connectionMenuVisibility) {
      closeConnectionMenu();
    }
    if (mobileMenuVisibility) {
      closeMobileMenu();
    }
  }, [location]);

  return (
    <main id="main-content" role="main" tabIndex="-1" className="main-content">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/inscription">
          <SignUp />
        </Route>

        <PrivateUserRoute path="/profil" component={Profile} isLogged={isLogged} />

        <PrivateUserRoute path="/profil-edit" component={Settings} isLogged={isLogged} />

        <Route exact path="/challenges">
          <ExercisesPage />
        </Route>

        <Route exact path="/challenges/:exerciseId">
          <Exercise />
        </Route>

        <PrivateAdminRoute path="/admin" component={Dashboard} isLogged={isLogged} role={role} />

        <Route exact path="/oubli-mot-de-passe">
          <PasswordResetRequest />
        </Route>

        <Route exact path="/changement-mot-de-passe/:token">
          <PasswordReset />
        </Route>

        <Route exact path="/a-propos">
          <About />
        </Route>

        <Route exact path="/contact">
          <Contact />
        </Route>

        <Route exact path="/mentions-legales">
          <LegalNotice />
        </Route>

        <Route exact path="/plan-du-site">
          <Sitemap />
        </Route>

        <Error />
      </Switch>
    </main>
  );
};

Page.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  closeConnectionMenu: PropTypes.func.isRequired,
  connectionMenuVisibility: PropTypes.bool.isRequired,
  mobileMenuVisibility: PropTypes.bool.isRequired,
  closeMobileMenu: PropTypes.func.isRequired,
};

export default Page;
