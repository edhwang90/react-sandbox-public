import type { CSSProperties } from 'react';
import { ArrowRightIcon } from "@phosphor-icons/react";

import type { Project } from '../../types/types';
import './project-cards.scss';

const ProjectCard = ({ title, tags, isExternal, route, color }: Project) => {
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <li className="project-card" style={{ '--accent': color } as CSSProperties}>
      {/* The title link is stretched over the whole row, so the arrow is decorative */}
      <a className="project-card-link" href={route} {...externalProps}>
        {title}
        {isExternal && <span className="disclaimer">(external link/new tab)</span>}
      </a>

      <ul className="project-card-tags">
        {tags.map((tag) => <li className="project-card-tag" key={tag}>{tag}</li>)}
      </ul>

      <ArrowRightIcon className="project-card-arrow" aria-hidden="true" />
    </li>
  )
}

export default ProjectCard;
