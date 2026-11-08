/* Deterministic, self-contained technical schematics for project cards.
   No external images, no fake photographs — abstract infrastructure line art. */

const ACCENT = '#38bdf8';
const LINE = 'rgba(148,178,215,0.30)';
const FILL = 'rgba(56,189,248,0.07)';

function Rack({ x, units = 6, w = 46, accent = false }) {
  const h = units * 13 + 12;
  return (
    <g>
      <rect x={x} y={34} width={w} height={h} rx={4} fill="rgba(13,22,38,0.9)" stroke={accent ? ACCENT : LINE} strokeWidth="1.2" />
      {Array.from({ length: units }).map((_, i) => (
        <g key={i}>
          <rect x={x + 5} y={40 + i * 13} width={w - 10} height={8} rx={1.5}
            fill={i === 1 && accent ? FILL : 'rgba(148,178,215,0.10)'}
            stroke={i === 1 && accent ? ACCENT : 'none'} strokeWidth="0.8" />
          <circle cx={x + w - 9} cy={44 + i * 13} r={1.4} fill={i === 1 && accent ? ACCENT : 'rgba(148,178,215,0.4)'} />
        </g>
      ))}
    </g>
  );
}

function ServerRack({ accent }) {
  return (
    <svg viewBox="0 0 320 150" className="project-visual" role="img" aria-label="Server rack schematic">
      <defs>
        <pattern id="pv-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(148,178,215,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#pv-grid)" />
      <Rack x={40} units={5} accent={accent} />
      <Rack x={108} units={7} accent={!accent} />
      <g stroke={LINE} strokeWidth="1" strokeDasharray="3 4">
        <path d="M86 60 H108" /><path d="M86 100 H108" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(148,178,215,0.55)">
        <text x={40} y={24}>PROLIANT</text>
        <text x={108} y={24}>GEN12</text>
        <text x={196} y={62}>iLO · SPP</text>
        <text x={196} y={76}>AHS / IML</text>
        <text x={196} y={90}>firmware</text>
      </g>
      <g stroke={ACCENT} strokeWidth="1.1" fill="none" opacity="0.7">
        <path d="M172 60 H188" /><path d="M172 132 H188" />
        <circle cx="190" cy="60" r="2" fill={ACCENT} stroke="none" />
        <circle cx="190" cy="132" r="2" fill={ACCENT} stroke="none" />
      </g>
    </svg>
  );
}

function StorageArray({ accent }) {
  return (
    <svg viewBox="0 0 320 150" className="project-visual" role="img" aria-label="Storage array schematic">
      <defs>
        <pattern id="pv-grid2" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(148,178,215,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#pv-grid2)" />
      <rect x="34" y="42" width="112" height="66" rx="5" fill="rgba(13,22,38,0.9)" stroke={LINE} strokeWidth="1.2" />
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={42 + c * 17} y={50 + r * 14} width={12} height={9} rx={1.5}
            fill={r === 1 && c === 3 && accent ? FILL : 'rgba(148,178,215,0.10)'}
            stroke={r === 1 && c === 3 && accent ? ACCENT : 'none'} strokeWidth="0.8" />
        ))
      )}
      <rect x="196" y="52" width="86" height="46" rx="4" fill="rgba(13,22,38,0.9)" stroke={ACCENT} strokeWidth="1.2" />
      {Array.from({ length: 3 }).map((_, i) => (
        <g key={i}>
          <rect x={204 + i * 26} y={62} width={20} height={26} rx={2} fill="none" stroke={LINE} strokeWidth="1" />
          <rect x={211 + i * 26} y={70} width={6} height={10} rx={1} fill={ACCENT} opacity="0.35" />
        </g>
      ))}
      <path d="M146 60 H196" stroke={ACCENT} strokeWidth="1.1" strokeDasharray="4 3" fill="none" opacity="0.75" />
      <path d="M146 90 H196" stroke={LINE} strokeWidth="1" strokeDasharray="4 3" fill="none" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(148,178,215,0.55)">
        <text x={34} y={34}>ALLETRA / MSA</text>
        <text x={196} y={42}>FC SAN</text>
        <text x={34} y={126}>LUN · VMFS · MULTIPATH</text>
      </g>
    </svg>
  );
}

function VirtualStack({ accent }) {
  return (
    <svg viewBox="0 0 320 150" className="project-visual" role="img" aria-label="Virtualization stack schematic">
      <defs>
        <pattern id="pv-grid3" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(148,178,215,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#pv-grid3)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={46 + i * 78} y={36} width={66} height={30} rx={3}
          fill={i === 1 && accent ? FILL : 'rgba(13,22,38,0.9)'}
          stroke={i === 1 && accent ? ACCENT : LINE} strokeWidth="1.1" />
      ))}
      <rect x="34" y="76" width="252" height="16" rx="3" fill="rgba(13,22,38,0.9)" stroke={LINE} strokeWidth="1.1" />
      <rect x="34" y="98" width="252" height="16" rx="3" fill="rgba(13,22,38,0.9)" stroke={ACCENT} strokeWidth="1.1" opacity="0.9" />
      <g stroke={LINE} strokeWidth="1" strokeDasharray="3 3">
        <path d="M79 66 V76" /><path d="M157 66 V76" /><path d="M235 66 V76" />
        <path d="M79 92 V98" /><path d="M157 92 V98" /><path d="M235 92 V98" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(148,178,215,0.6)">
        <text x={52} y={30}>VM</text><text x={130} y={30}>VM</text><text x={208} y={30}>VM</text>
        <text x={40} y={88}>vCENTER · HA · DRS · vMOTION</text>
        <text x={40} y={110}>ESXi HYPERVISOR</text>
        <text x={40} y={132}>HPE SYNERGY / SUPERDOME</text>
      </g>
    </svg>
  );
}

function DatacenterMove({ accent }) {
  return (
    <svg viewBox="0 0 320 150" className="project-visual" role="img" aria-label="Datacenter relocation schematic">
      <defs>
        <pattern id="pv-grid4" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(148,178,215,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#pv-grid4)" />
      <Rack x={30} units={4} accent={false} />
      <Rack x={236} units={4} accent={accent} />
      <path d="M104 70 C 140 40, 180 100, 222 70" stroke={ACCENT} strokeWidth="1.3" fill="none" strokeDasharray="5 4" opacity="0.8" />
      <path d="M214 66 L222 70 L214 74" stroke={ACCENT} strokeWidth="1.3" fill="none" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(148,178,215,0.6)">
        <text x={30} y={26}>SOURCE DC</text>
        <text x={236} y={26}>TARGET DC</text>
        <text x={120} y={128}>RELOCATION · INTEGRITY</text>
      </g>
    </svg>
  );
}

function NetworkTopology({ accent }) {
  return (
    <svg viewBox="0 0 320 150" className="project-visual" role="img" aria-label="Enterprise network schematic">
      <defs>
        <pattern id="pv-grid5" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(148,178,215,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#pv-grid5)" />
      <circle cx="160" cy="52" r="15" fill="rgba(13,22,38,0.95)" stroke={ACCENT} strokeWidth="1.3" />
      {[[70, 104], [160, 112], [250, 104]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 18} y={y - 12} width={36} height={24} rx={3} fill="rgba(13,22,38,0.95)" stroke={LINE} strokeWidth="1.1" />
          <path d={`M160 67 L${x} ${y - 12}`} stroke={LINE} strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(148,178,215,0.6)">
        <text x={122} y={30}>ENTERPRISE CORE</text>
        <text x={52} y={132}>SERVER</text>
        <text x={142} y={140}>STORAGE</text>
        <text x={232} y={132}>BACKUP</text>
      </g>
    </svg>
  );
}

const BY_CATEGORY = {
  'Backup & Storage Infrastructure': StorageArray,
  Virtualization: VirtualStack,
  'Server Infrastructure': ServerRack,
  'Datacenter Operations': DatacenterMove,
  'Enterprise Infrastructure': NetworkTopology,
};

export default function ProjectVisual({ category, index = 0 }) {
  const Cmp = BY_CATEGORY[category] || ServerRack;
  return (
    <div className="project-card__visual" aria-hidden="false">
      <Cmp accent={index % 2 === 0} />
    </div>
  );
}
