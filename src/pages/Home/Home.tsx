import Projects from '../../partials/projects/projects';
import './Home.scss';

const Home = () => {

  return (
    <div className="home-container">
      <div className="home-header">
        <span className="main-line">
          Welcome to my front-end dev&nbsp;sandbox

          <span className="sub-line">by Edmond Hwang</span>
        </span>  
        
      </div>

      <Projects />
    </div>
  )
}

export default Home;