import React from 'react';

import ProjectCard from './project-card';
import './project-cards.scss';
import type { Project } from '../../types/types';

const ProjectCards = ({ projects } : { projects: Project[] }) => {

  return (
    <React.Fragment>
      <div className="project-cards">
        {
          projects.map((project: Project, index: number) => {
            const { title, tags, isExternal, route, color } = project;

            return (
              <ProjectCard title={title} isExternal={isExternal} tags={tags} route={route} color={color} key={index} />
            )
          })
        }
      </div>
    </React.Fragment>
  )
}

export default ProjectCards;