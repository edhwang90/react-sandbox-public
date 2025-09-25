import './App.scss';

import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ListIcon, XIcon } from "@phosphor-icons/react";
import useMenuHandler from './hooks/useMenuHandler';

import Home from './pages/Home/Home';
import Todo from './projects/Todo/Todo';
import ReactStorybook from './projects/ReactStorybook/ReactStorybook';
import NotFound from './pages/404';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { disableFocus, showSideMenu } = useMenuHandler();

  useEffect(() => {
    // cleans up tab experience
    disableFocus('.side-menu-action');
  }, [disableFocus])

  const showMenu = (visible: boolean) => {
    setIsMenuOpen(visible);
    showSideMenu(visible);
  }

  return (
    <>
      <nav className="nav-bar">
        <button className={`menu-button status-${isMenuOpen}`} onClick={() => showMenu(true)}><ListIcon className="icon menu-icon" /><span>Menu</span></button>

        <div className="nav-right-links">
          <a
            title="GitHub"
            href="https://github.com/edhwang90"
            rel="noopener noreferrer"
            target="_blank">
              GitHub
          </a>
          <a
            title="Resume"
            href="https://drive.google.com/file/d/12HREhXkfXXBlZdbBTZWuId3ab8WiKxSs/view?usp=sharing"
            rel="noopener noreferrer"
            target="_blank">
              Resume
          </a>
          
          <a
            className="bold"
            title="E.H Website"
            target="_blank"
            rel="noopener noreferrer" 
            href="https://edyhwang.com">
              Link to my website
          </a>

        </div>
      </nav>

      <div className="side-menu">
        <div className="side-menu-top">
          <button className={`close-button side-menu-action status-${isMenuOpen}`} onClick={() => showMenu(false)}><XIcon className="icon x-icon" /><span>Close</span></button>
        </div>

        <div className="side-menu-main">
          <ul>
            <li><a className="side-menu-action bold" href="/" title="to Home" onClick={()=> showMenu(false)}>Home</a></li>
            <li><a className="side-menu-action" href="/todo" title="to Todo App" onClick={()=> showMenu(false)}>Todo</a></li>
          </ul>
        </div>
    
        <div className="side-menu-other">
          <ul>
            <li>
              <a
                className="side-menu-action"
                title="GitHub"
                href="https://github.com/edhwang90"
                rel="noopener noreferrer"
                target="_blank">
                  GitHub
              </a>
            </li>
            <li>
              <a
                className="side-menu-action"
                title="Resume"
                href="https://drive.google.com/file/d/12HREhXkfXXBlZdbBTZWuId3ab8WiKxSs/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank">
                  Resume
              </a>
            </li>
            <li>
              <a
                className="side-menu-action bold"
                title="E.H Website"
                target="_blank"
                rel="noopener noreferrer" 
                href="https://edyhwang.com">
                  Link to my website
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="projects-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/storybook" element={<ReactStorybook />} />
          {/* Handle 404 Not Found pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </>
  )
}

export default App
