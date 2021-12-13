/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import './App.scss';
import { Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import { DataSourceProvider } from './context/DataSourceContext';
import { ReactElement } from 'react';
import { formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

ReactGA.initialize(process.env.REACT_APP_GA_TOKEN);
const history = createBrowserHistory();
history.listen((location, action) => {
  ReactGA.pageview(window.location.pathname);
});
ReactGA.pageview(window.location.pathname);

const onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void = (
  e
) => {
  const target = e.currentTarget;
  if (target.pathname === window.location.pathname) {
    e.preventDefault();
  }
};

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <Navbar
      css={css`
        margin-bottom: 10px;
      `}
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand
        css={css`
          margin-left: 1rem;
        `}
        as={Link}
        to="/"
        onClick={onNavLinkClick}
      >
        <img
          css={css`
            margin-right: 8px;
          `}
          alt=""
          src="./assets/pb-logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        MapleStory Music
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/" onClick={onNavLinkClick}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/stats" onClick={onNavLinkClick}>
            Stats
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/about" onClick={onNavLinkClick}>
            About
          </Nav.Link>
          <NavDropdown title={'Language'}>
            <NavDropdown.Item
              active={i18n.language.startsWith('en')}
              onClick={() => i18n.changeLanguage('en')}
            >
              English
            </NavDropdown.Item>
            <NavDropdown.Item
              active={i18n.language.startsWith('ko')}
              onClick={() => i18n.changeLanguage('ko')}
            >
              Korean
            </NavDropdown.Item>
            <NavDropdown.Item
              active={i18n.language.startsWith('ja')}
              onClick={() => i18n.changeLanguage('ja')}
            >
              Japanese
            </NavDropdown.Item>
            <NavDropdown.Item
              active={i18n.language === 'zh-CN'}
              onClick={() => i18n.changeLanguage('zh-CN')}
            >
              Chinese (Simplified)
            </NavDropdown.Item>
            <NavDropdown.Item
              active={i18n.language === 'zh-TW'}
              onClick={() => i18n.changeLanguage('zh-TW')}
            >
              Chinese (Traditional)
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Footer = (): ReactElement => {
  const buildHash = process.env.REACT_APP_BUILD_HASH ?? 'Dev';
  const buildDate =
    process.env.REACT_APP_BUILD_DATE ??
    formatISO(new Date(), { representation: 'date' });
  return (
    <div
      css={css`
        text-align: center;
        margin-bottom: 10px;
      `}
      className="footer"
    >
      <span>{`Build: ${buildHash} (${buildDate})`}</span>
    </div>
  );
};

const Main = (): ReactElement => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/stats" component={Stats} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

const Home = (): ReactElement => (
  <div className="App">
    <HomePage />
  </div>
);

const About = (): ReactElement => (
  <div
    css={css`
      margin: 2% 3% 3% 3%;
    `}
    className="About"
  >
    <AboutPage />
  </div>
);

const Stats = (): ReactElement => (
  <div
    css={css`
      margin: 2% 3% 3% 3%;
    `}
    className="Stats"
  >
    <StatsPage />
  </div>
);

const App = (): ReactElement => (
  <DataSourceProvider>
    <Router history={history}>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  </DataSourceProvider>
);

export default App;
