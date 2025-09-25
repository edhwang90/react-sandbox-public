import React from 'react';

import { ArrowRightIcon } from "@phosphor-icons/react";

import './project-cards.scss';

const ProjectCard = ({ title, tags, route, color } : { title: string, tags: string[], route: string, color: string }) => {
  const dynamicStyles = {
    backgroundColor: color
  };

  return (
    <React.Fragment>
      <div className="project-card">
        <div className="highlight-color" style={dynamicStyles}></div>
        <div className="row">
          <div className="col-10">
            <a title={`to ${title}`} href={route}>{title}</a>
            <ul className="tags">
              {
                tags.map((tag: string, index: number) => {
                  return (
                    <li className="tag" key={index}>{tag}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="col-2">
            <a className="to-project-btn" title={`to ${title}`} href={route}>
              <ArrowRightIcon className="card-arrow" />
            </a>
          </div>
        </div>  
      </div>
    </React.Fragment>
  )
}

export default ProjectCard;