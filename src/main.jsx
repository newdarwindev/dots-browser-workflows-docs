import { createRoot } from 'react-dom/client';
import { ArchitectureDiagram } from './ArchitectureDiagram.jsx';
const root = document.getElementById('architecture-island');
if (root) createRoot(root).render(<ArchitectureDiagram />);
