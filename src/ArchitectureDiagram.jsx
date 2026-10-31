import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import './architecture.css';

const nodes = [
  { name: 'Portal & broker', role: 'Identity, account choice, lease epochs', status: 'Prototype tested', kind: 'implemented' },
  { name: 'Temporal', role: 'Durable task and approval flow', status: 'Synthetic test passed', kind: 'implemented' },
  { name: 'PinchTab + KasmVNC', role: 'API and visible headed Chromium', status: 'Synthetic attach passed with local patch', kind: 'implemented' },
  { name: 'OpenBao', role: 'KV v2, workload identity, Transit', status: 'KV v2 synthetic test; rest planned', kind: 'planned' },
  { name: 'Authelia + Pomerium', role: 'OIDC/MFA and route policy', status: 'Integration planned', kind: 'planned' },
];

function DiagramNode({ node, index, progress, reduced }) {
  const start = index * 0.12;
  const opacity = useTransform(progress, [start, Math.min(start + 0.32, 1)], [0.55, 1]);
  const y = useTransform(progress, [start, Math.min(start + 0.32, 1)], [18, 0]);
  return <motion.li className={`arch-node ${node.kind}`} style={reduced ? undefined : { opacity, y }}>
    <span className="arch-index" aria-hidden="true">0{index + 1}</span>
    <div><h3>{node.name}</h3><p>{node.role}</p><small>{node.status}</small></div>
  </motion.li>;
}

export function ArchitectureDiagram({ progressOverride = null, forceReducedMotion = false }) {
  const ref = useRef(null);
  const reducedPreference = useReducedMotion();
  const reduced = forceReducedMotion || reducedPreference;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const override = useMotionValue(progressOverride ?? 0);
  useEffect(() => { override.set(progressOverride ?? 0); }, [override, progressOverride]);
  const progress = progressOverride === null ? scrollYProgress : override;
  return <section className="architecture-diagram" ref={ref} aria-labelledby="architecture-diagram-title">
    <div className="arch-heading"><div><p className="eyebrow">System map</p><h2 id="architecture-diagram-title">One accountable path through the stack.</h2></div>
      <p>Scroll to trace the synthetic workflow. Solid cards have narrow local evidence; outlined cards remain integration work.</p></div>
    <div className="arch-track" role="img" aria-label="Architecture path from portal and broker through Temporal, PinchTab and KasmVNC, OpenBao, and Authelia with Pomerium">
      <motion.div className="arch-progress" style={reduced ? { scaleY: 1 } : { scaleY: progress }} aria-hidden="true" />
      <ol>{nodes.map((node, index) => <DiagramNode key={node.name} node={node} index={index} progress={progress} reduced={reduced} />)}</ol>
    </div>
    <p className="arch-note">Caddy is an optional outer TLS/ingress adapter. Browser leases, proxy sessions and website cookies remain separate.</p>
  </section>;
}
