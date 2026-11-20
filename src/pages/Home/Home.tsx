import Projects from '../../partials/projects/projects';
import './Home.scss';

const Home = () => (
  <div className="home-container">
    <header className="home-header">
      <h1 className="main-line">Welcome to my <span className="no-wrap">front-end</span> dev&nbsp;sandbox</h1>
      <p className="sub-line">by Edmond Hwang</p>
    </header>

    <Projects />
  </div>
)

export default Home;
