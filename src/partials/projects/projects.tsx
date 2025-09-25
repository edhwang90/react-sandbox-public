import { useEffect } from "react";
import useTabHandler from "../../hooks/tabHandler";
import ProjectCards from "../project-cards/project-cards";
import type { Project } from "../../types/types";

const projectsJson: Project[] = [
  {
    title: 'Todo Application',
    tags: [
      'React & TypeScript',
      'Dashboard',
      'Figma AI + GitHub Copilot'
    ],
    route: '/todo',
    color: '#0873FF'
  }
]

const Projects = () => {
  const { 
    isOpen, 
    disableFocus,
    enableFocus  
  } = useTabHandler();

  useEffect(() => {
    if (isOpen) {
      disableFocus('input, select, textarea, button, a, object, area, img');
    }
    else {
      enableFocus('input, select, textarea, button, a, object, area, img');
    }
  }, [isOpen])

  return (
    <nav className="home-nav">
      <ProjectCards projects={projectsJson} />
    </nav>
  )
}

export default Projects;