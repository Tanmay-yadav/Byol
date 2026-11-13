import { useId } from "react";

type MasteryMapProps = {
  estimates?: readonly number[];
  concepts?: readonly string[];
  compact?: boolean;
};

const defaultConcepts = ["Cell biology", "Physiology", "Pharmacology", "Anatomy", "Biochemistry", "Pathology"];
const defaultEstimates = [0.84, 0.66, 0.35, 0.72, 0.48, 0.9];

function signal(estimate: number): "steady" | "building" | "developing" {
  if (estimate >= 0.75) return "steady";
  if (estimate >= 0.4) return "building";
  return "developing";
}

export function MasteryMap({
  estimates = defaultEstimates,
  concepts = defaultConcepts,
  compact = false,
}: MasteryMapProps) {
  const id = useId();
  const positions: readonly (readonly [number, number])[] = [
    [112, 75],
    [250, 52],
    [365, 128],
    [275, 245],
    [118, 232],
    [210, 150],
  ];
  const nodes = concepts.map((concept, index) => ({
    concept,
    estimate: estimates[index] ?? 0.2,
    point: positions[index] ?? [112 + (index % 3) * 115, 90 + Math.floor(index / 3) * 110] as const,
  }));

  return (
    <div className={`mastery-visual${compact ? " mastery-visual--compact" : ""}`}>
      <svg
        className="mastery-map"
        viewBox="0 0 440 300"
        role="img"
        aria-labelledby={`${id}-mastery-title ${id}-mastery-desc`}
      >
        <title id={`${id}-mastery-title`}>Illustrative learning map</title>
        <desc id={`${id}-mastery-desc`}>
          A sample map connects six concepts. Its colours indicate developing, building, or steady estimates.
        </desc>
        <g className="mastery-map__edges" aria-hidden="true">
          <path d="M112 75 250 52 365 128 275 245 118 232 112 75M112 75 210 150 365 128M250 52 210 150 118 232M210 150 275 245" />
        </g>
        {nodes.map(({ concept, estimate, point }, index) => {
          const [x, y] = point;
          const currentSignal = signal(estimate);
          const labelX = index === 1 ? x + 8 : x;
          const labelY = index === 3 || index === 4 ? y + 33 : y + 32;
          return (
            <g className={`mastery-node mastery-node--${currentSignal}`} key={concept}>
              <circle cx={x} cy={y} r={index === 5 ? 25 : 20} />
              <circle className="mastery-node__core" cx={x} cy={y} r="5" />
              <text x={labelX} y={labelY} textAnchor={index === 1 ? "start" : "middle"}>
                {concept}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mastery-legend" aria-hidden="true">
        <span><i className="legend-dot legend-dot--steady" />Steady</span>
        <span><i className="legend-dot legend-dot--building" />Building</span>
        <span><i className="legend-dot legend-dot--developing" />Developing</span>
      </div>
      {!compact && <p className="mastery-caption">Illustrative example · Sample learning map</p>}
      <table className="sr-only">
        <caption>Illustrative concept estimates</caption>
        <thead>
          <tr><th scope="col">Concept</th><th scope="col">Sample estimate</th><th scope="col">Signal</th></tr>
        </thead>
        <tbody>
          {nodes.map(({ concept, estimate }) => (
            <tr key={concept}>
              <th scope="row">{concept}</th>
              <td>{Math.round(estimate * 100)}%</td>
              <td>{signal(estimate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
