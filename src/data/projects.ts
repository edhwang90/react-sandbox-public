import type { Project } from "../types/types";

const projectsJson: Project[] = [
  {
    title: 'Todo Application',
    tags: [
      'React & TypeScript',
      'Dashboard',
      'Figma AI + GitHub Copilot'
    ],
    isExternal: false,
    route: '/todo',
    color: '#0873FF'
  },
  {
    title: 'Legacy Storybook.js',
    tags: [
      'Storybook.js',
      'Pattern Library',
      'Accessibility',
      'Validation Hook'
    ],
    isExternal: true,
    route: 'https://my-storybook-5566d.firebaseapp.com/',
    color: '#FB7AEA'
  }
]

export default projectsJson;
