// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ArchitectureDiagram } from './ArchitectureDiagram.jsx';

afterEach(cleanup);

describe('ArchitectureDiagram', () => {
  it('keeps all selected components readable at entry', () => {
    render(<ArchitectureDiagram progressOverride={0} />);
    expect(screen.getByText('Temporal')).toBeTruthy();
    expect(screen.getByText('PinchTab + KasmVNC')).toBeTruthy();
    expect(screen.getByText('OpenBao')).toBeTruthy();
    expect(screen.getByText('Authelia + Pomerium')).toBeTruthy();
  });
  it('renders completed and reduced-motion states with the same content', () => {
    const { rerender } = render(<ArchitectureDiagram progressOverride={1} />);
    rerender(<ArchitectureDiagram progressOverride={0.5} forceReducedMotion />);
    expect(screen.getAllByText('Integration planned')).toHaveLength(1);
  });
});
