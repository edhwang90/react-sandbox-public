import Projects from "../partials/projects/projects";

const NotFound = () => {

  return (
    <div className="home-container">
      <div className="home-header">
        <span className="main-line">
          404 - Page not found
        </span>  
        
      </div>

      <Projects />
    </div>
  )
}

export default NotFound;