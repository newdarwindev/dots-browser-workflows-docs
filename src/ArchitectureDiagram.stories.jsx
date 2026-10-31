import { ArchitectureDiagram } from './ArchitectureDiagram.jsx';
export default { title: 'Architecture/Scroll diagram', component: ArchitectureDiagram,
  parameters: { layout: 'fullscreen' } };
export const Entry = { args: { progressOverride: 0 } };
export const MidScroll = { args: { progressOverride: 0.5 } };
export const Completed = { args: { progressOverride: 1 } };
export const ReducedMotion = { args: { progressOverride: 0.5, forceReducedMotion: true } };
export const Mobile = { args: { progressOverride: 0.7 }, parameters: { viewport: { defaultViewport: 'mobile1' } } };
