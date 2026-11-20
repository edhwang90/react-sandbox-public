import ProjectCard from './project-card';
import './project-cards.scss';
import type { Project } from '../../types/types';

const ProjectCards = ({ projects }: { projects: Project[] }) => (
  <ul className="project-cards">
    {projects.map((project) => <ProjectCard {...project} key={project.route} />)}
  </ul>
)

export default ProjectCards;
