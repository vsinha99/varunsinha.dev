const importanceBefore = [
  { parameter: "B_inf", value: 0.8 },
  { parameter: "growth_nu0", value: 0.63 },
  { parameter: "turn_separation", value: 0.05 },
];

const importanceAfter = [
  { parameter: "turn_separation", value: 0.5 },
  { parameter: "B_inf", value: 0.17 },
  { parameter: "E", value: 0.16 },
];

function ImportanceGroup({
  label,
  summary,
  values,
}: {
  label: string;
  summary: string;
  values: { parameter: string; value: number }[];
}) {
  return (
    <section className="cc-importance-group">
      <div className="cc-importance-group-heading">
        <p>{label}</p>
        <strong>{summary}</strong>
      </div>
      <ol>
        {values.map((item) => (
          <li key={item.parameter}>
            <div className="cc-bar-label">
              <code>{item.parameter}</code>
              <span>{Math.round(item.value * 100)}%</span>
            </div>
            <div className="cc-bar-track" aria-hidden="true">
              <span style={{ width: `${item.value * 100}%` }} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ImportanceShiftChart() {
  return (
    <figure className="cc-figure cc-chart" aria-labelledby="importance-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="importance-title">Importance changed when the search space grew</h3>
        </div>
        <p>
          <span className="cc-provenance">Exact study values.</span>
          A parameter&apos;s apparent importance depends on which other parameters are allowed to
          move beside it.
        </p>
      </figcaption>
      <div className="cc-importance-grid">
        <ImportanceGroup
          label="3-parameter study"
          summary="B_inf looked dominant"
          values={importanceBefore}
        />
        <div className="cc-importance-transfer" aria-hidden="true">
          <svg viewBox="0 0 72 24">
            <path d="M1 12h64M55 4l10 8-10 8" />
          </svg>
          <span>search expands</span>
        </div>
        <ImportanceGroup
          label="10 to 15 parameters"
          summary="turn_separation took over"
          values={importanceAfter}
        />
      </div>
      <p className="cc-chart-note">
        Values are shown as recorded in the source studies. The two panels summarize different
        search spaces, so the bars should be compared by rank and shift, not added together.
      </p>
    </figure>
  );
}

type BoundaryMarker = {
  position: number;
  value: string;
  result: string;
  state: "safe" | "marginal" | "failed";
  note?: string;
};

type BoundaryRow = {
  parameter: string;
  domain: string;
  safeBand?: { start: number; width: number; label: string };
  markers: BoundaryMarker[];
  recommendation: string;
};

const boundaryRows: BoundaryRow[] = [
  {
    parameter: "B_inf",
    domain: "tested 5 to 20",
    safeBand: { start: 33.33, width: 53.34, label: "safe 10 to 18" },
    markers: [],
    recommendation: "10 to 18",
  },
  {
    parameter: "growth_nu0",
    domain: "0.0003 to 0.0008",
    markers: [
      { position: 0, value: "0.0003", result: "0%", state: "failed" },
      { position: 44, value: "0.00052", result: "50%", state: "marginal", note: "baseline" },
      { position: 100, value: "0.0008", result: "100%", state: "safe", note: "recommended" },
    ],
    recommendation: "0.0008",
  },
  {
    parameter: "turn_separation",
    domain: "2.5 to 10.0",
    markers: [
      { position: 0, value: "2.5", result: "80%", state: "safe", note: "recommended" },
      { position: 33.33, value: "5.0", result: "50%", state: "marginal", note: "baseline" },
      { position: 100, value: "10.0", result: "70%", state: "safe" },
    ],
    recommendation: "2.5",
  },
  {
    parameter: "E",
    domain: "0.2 to 0.5",
    markers: [
      { position: 0, value: "0.2", result: "90%", state: "safe", note: "recommended" },
      { position: 40, value: "0.32", result: "50%", state: "marginal", note: "baseline" },
      { position: 100, value: "0.5", result: "70%", state: "safe" },
    ],
    recommendation: "0.2",
  },
];

export function ParameterBoundaryMap() {
  return (
    <figure className="cc-figure cc-boundary-figure" aria-labelledby="boundary-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="boundary-title">A boundary map for the next person running NETMORPH</h3>
        </div>
        <p>
          <span className="cc-provenance">Exact sweep results.</span>
          The map keeps tested values, observed success rates, baselines, and recommendations in
          one place. It does not fill untested gaps with invented thresholds.
        </p>
      </figcaption>

      <div className="cc-boundary-legend" aria-label="Boundary map legend">
        <span data-state="safe">Safe</span>
        <span data-state="marginal">Marginal</span>
        <span data-state="failed">Failed</span>
      </div>

      <p className="cc-chart-mobile-outcome">
        <span>Full map</span>
        <strong>Scroll or use arrow keys to inspect every tested value.</strong>
      </p>
      <div
        className="cc-boundary-map"
        role="region"
        aria-label="Parameter boundary map. Scroll horizontally to inspect every tested value."
        tabIndex={0}
      >
        {boundaryRows.map((row) => (
          <section className="cc-boundary-row" key={row.parameter}>
            <div className="cc-boundary-label">
              <code>{row.parameter}</code>
              <span>{row.domain}</span>
            </div>
            <div className="cc-boundary-track-wrap">
              <div className="cc-boundary-track" aria-hidden="true">
                {row.safeBand ? (
                  <span
                    className="cc-safe-band"
                    style={{ left: `${row.safeBand.start}%`, width: `${row.safeBand.width}%` }}
                  >
                    <span>{row.safeBand.label}</span>
                  </span>
                ) : null}
                {row.markers.map((marker) => (
                  <span
                    className="cc-boundary-marker"
                    data-state={marker.state}
                    key={`${marker.value}-${marker.result}`}
                    style={{ left: `${marker.position}%` }}
                  >
                    <i />
                    <strong>{marker.result}</strong>
                    <small>{marker.value}</small>
                  </span>
                ))}
              </div>
            </div>
            <p className="cc-boundary-recommendation">
              <span>Recommended</span>
              <code>{row.recommendation}</code>
            </p>
          </section>
        ))}
      </div>
    </figure>
  );
}

const optimizationScores = [
  0.46, 0.33, 0.52, 0.63, 0.41, 0.58, 0.91, 0.74, 0.88, 1, 0.82, 1, 0.67, 1,
  0.93, 1, 0.71, 0.89, 1, 0.77, 1, 0.85, 1, 0.96, 1, 0.73, 1, 0.92, 0.81, 1,
  0.87, 1, 0.95, 1, 0.78, 1, 0.9, 1, 0.84, 1, 0.97, 1, 0.88, 0.94, 1, 0.91, 1,
  0.86, 1, 1,
];

const optimizationBest = optimizationScores.reduce<number[]>((values, score, index) => {
  values.push(index === 0 ? score : Math.max(values[index - 1], score));
  return values;
}, []);

const historyPlot = { left: 64, right: 780, top: 44, bottom: 340 };
const historyX = (index: number) =>
  historyPlot.left + (index / (optimizationScores.length - 1)) * (historyPlot.right - historyPlot.left);
const historyY = (value: number) =>
  historyPlot.bottom - ((value - 0.25) / 0.75) * (historyPlot.bottom - historyPlot.top);
const bestPath = optimizationBest
  .map((value, index) => `${index === 0 ? "M" : "L"}${historyX(index)} ${historyY(value)}`)
  .join(" ");

export function OptimizationHistoryChart() {
  return (
    <figure className="cc-figure cc-chart" aria-labelledby="history-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="history-title">After the fixes, the study reaches 1.000 early</h3>
        </div>
        <p>
          <span className="cc-provenance">Representative reconstruction.</span>
          The line shows the documented best-so-far shape. Individual points recreate the
          distribution visible in the Optuna dashboard and are not per-trial source records.
        </p>
      </figcaption>
      <p className="cc-chart-mobile-outcome">
        <span>Key result</span>
        <strong>Best accuracy reaches 1.000 around trial 10.</strong>
        <small>Scroll horizontally for the full run.</small>
      </p>
      <div
        className="cc-svg-chart-wrap"
        role="region"
        aria-label="Optimization history. Scroll horizontally or use arrow keys to inspect the full chart."
        tabIndex={0}
      >
        <svg
          className="cc-svg-chart"
          viewBox="0 0 840 410"
          role="img"
          aria-labelledby="history-svg-title history-svg-desc"
        >
          <title id="history-svg-title">Shift register optimization history</title>
          <desc id="history-svg-desc">
            Representative scatter for fifty trials. The best-so-far line starts near 0.46,
            reaches 1.0 around the tenth trial, and remains there.
          </desc>
          {[0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={tick}>
              <line
                x1={historyPlot.left}
                x2={historyPlot.right}
                y1={historyY(tick)}
                y2={historyY(tick)}
                className="cc-chart-gridline"
              />
              <text x="50" y={historyY(tick) + 4} textAnchor="end" className="cc-chart-axis-text">
                {tick.toFixed(2)}
              </text>
            </g>
          ))}
          <line
            x1={historyPlot.left}
            x2={historyPlot.right}
            y1={historyPlot.bottom}
            y2={historyPlot.bottom}
            className="cc-chart-axis"
          />
          {optimizationScores.map((score, index) => (
            <circle
              cx={historyX(index)}
              cy={historyY(score)}
              r="3.5"
              className="cc-history-point"
              key={`${index}-${score}`}
            />
          ))}
          <path d={bestPath} className="cc-history-best" />
          <circle cx={historyX(9)} cy={historyY(1)} r="6" className="cc-history-hit" />
          <path
            d={`M${historyX(9)} ${historyY(1) + 12}v30h54`}
            className="cc-chart-annotation-line"
          />
          <text x={historyX(9) + 62} y={historyY(1) + 47} className="cc-chart-annotation">
            best reaches 1.000 around trial 10
          </text>
          <text x={historyPlot.left} y="378" textAnchor="start" className="cc-chart-axis-text">
            start
          </text>
          <text x={historyX(9)} y="378" textAnchor="middle" className="cc-chart-axis-text">
            ~10
          </text>
          <text x={historyPlot.right} y="378" textAnchor="end" className="cc-chart-axis-text">
            50 trials
          </text>
          <text x="420" y="404" textAnchor="middle" className="cc-chart-axis-label">
            OPTIMIZATION RUN
          </text>
        </svg>
      </div>
      <div className="cc-chart-facts">
        <p>
          <strong>20 / 50</strong>
          <span>trials reached perfect accuracy</span>
        </p>
        <p>
          <strong>498 ms</strong>
          <span>delay found by Optuna</span>
        </p>
        <p>
          <strong>495 ms</strong>
          <span>original hand-tuned delay</span>
        </p>
      </div>
    </figure>
  );
}

const representativeNoise = (index: number, offset: number) => {
  const value = Math.sin((index + 1) * 12.9898 + offset) * 43758.5453;
  return value - Math.floor(value);
};

const backgroundParetoPoints = Array.from({ length: 44 }, (_, index) => {
  const nominal = 0.4 + representativeNoise(index, 0.7) * 0.5;
  const variation = (representativeNoise(index, 8.2) - 0.5) * 0.32;
  const robustness = Math.min(0.9, Math.max(0.27, 0.3 + (nominal - 0.4) * 0.82 + variation));
  return { nominal, robustness };
});

const paretoPlot = { left: 72, right: 770, top: 42, bottom: 350 };
const paretoX = (value: number) =>
  paretoPlot.left + ((value - 0.35) / 0.65) * (paretoPlot.right - paretoPlot.left);
const paretoY = (value: number) =>
  paretoPlot.bottom - ((value - 0.25) / 0.75) * (paretoPlot.bottom - paretoPlot.top);

export function ParetoFrontChart() {
  const fragilePoints = [0.875, 0.7, 0.5];

  return (
    <figure className="cc-figure cc-chart" aria-labelledby="pareto-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="pareto-title">Perfect once is different from perfect under drift</h3>
        </div>
        <p>
          <span className="cc-provenance">Representative reconstruction.</span>
          Six candidates reached 1.000 nominal accuracy. A second objective kept the three that
          also held at 1.000 when clock timing moved by ±2%.
        </p>
      </figcaption>
      <p className="cc-chart-mobile-outcome">
        <span>Key result</span>
        <strong>6 nominal-perfect candidates → 3 drift-stable candidates.</strong>
        <small>Scroll horizontally for the full trial field.</small>
      </p>
      <div
        className="cc-svg-chart-wrap"
        role="region"
        aria-label="Robustness Pareto chart. Scroll horizontally or use arrow keys to inspect the full chart."
        tabIndex={0}
      >
        <svg
          className="cc-svg-chart"
          viewBox="0 0 840 440"
          role="img"
          aria-labelledby="pareto-svg-title pareto-svg-desc"
        >
          <title id="pareto-svg-title">Nominal accuracy and clock-drift robustness</title>
          <desc id="pareto-svg-desc">
            Representative scatter of fifty trials. Six candidates have perfect nominal accuracy.
            Three remain perfect under plus or minus two percent clock drift, while three fall to
            lower robustness scores.
          </desc>
          {[0.4, 0.6, 0.8, 1].map((tick) => (
            <g key={`x-${tick}`}>
              <line
                x1={paretoX(tick)}
                x2={paretoX(tick)}
                y1={paretoPlot.top}
                y2={paretoPlot.bottom}
                className="cc-chart-gridline"
              />
              <text x={paretoX(tick)} y="376" textAnchor="middle" className="cc-chart-axis-text">
                {tick.toFixed(1)}
              </text>
            </g>
          ))}
          {[0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={`y-${tick}`}>
              <line
                x1={paretoPlot.left}
                x2={paretoPlot.right}
                y1={paretoY(tick)}
                y2={paretoY(tick)}
                className="cc-chart-gridline"
              />
              <text x="58" y={paretoY(tick) + 4} textAnchor="end" className="cc-chart-axis-text">
                {tick.toFixed(2)}
              </text>
            </g>
          ))}
          {backgroundParetoPoints.map((point, index) => (
            <circle
              cx={paretoX(point.nominal)}
              cy={paretoY(point.robustness)}
              r="3.5"
              className="cc-pareto-background"
              key={index}
            />
          ))}
          {fragilePoints.map((robustness) => (
            <circle
              cx={paretoX(1)}
              cy={paretoY(robustness)}
              r="7"
              className="cc-pareto-fragile"
              key={robustness}
            />
          ))}
          <circle cx={paretoX(1)} cy={paretoY(1)} r="12" className="cc-pareto-survivor" />
          <text
            x={paretoX(1)}
            y={paretoY(1) + 4}
            textAnchor="middle"
            className="cc-pareto-count"
          >
            3
          </text>
          <path
            d={`M${paretoX(1) - 12} ${paretoY(1) + 18}l-76 44`}
            className="cc-chart-annotation-line"
          />
          <text
            x={paretoX(1) - 94}
            y={paretoY(1) + 68}
            textAnchor="end"
            className="cc-chart-annotation"
          >
            three survive drift
          </text>
          <text x="420" y="418" textAnchor="middle" className="cc-chart-axis-label">
            NOMINAL ACCURACY
          </text>
          <text
            x="18"
            y="200"
            textAnchor="middle"
            transform="rotate(-90 18 200)"
            className="cc-chart-axis-label"
          >
            ROBUSTNESS UNDER ±2% CLOCK DRIFT
          </text>
        </svg>
      </div>
      <div className="cc-chart-legend">
        <span data-kind="field">Representative trial field</span>
        <span data-kind="fragile">Perfect nominal, fragile timing</span>
        <span data-kind="survivor">Perfect on both objectives</span>
      </div>
      <p className="cc-chart-note">
        The distribution is reconstructed from the dashboard screenshot. The six right-edge
        outcomes and the three survivors are documented; background point positions are
        illustrative.
      </p>
    </figure>
  );
}

const progressionRuns = [
  { label: "First run", score: 0.316 },
  { label: "First follow-up", score: 0.441 },
  { label: "Second follow-up", score: 0.484 },
];

const progressionPlot = { left: 90, right: 650, top: 52, bottom: 338 };
const progressionX = (index: number) => progressionPlot.left + index * 280;
const progressionY = (value: number) =>
  progressionPlot.bottom - ((value - 0.25) / 0.27) * (progressionPlot.bottom - progressionPlot.top);
const progressionPath = progressionRuns
  .map((run, index) => `${index === 0 ? "M" : "L"}${progressionX(index)} ${progressionY(run.score)}`)
  .join(" ");

export function ScoreProgressionChart() {
  const references = [
    { label: "Historical claimed best A", score: 0.34 },
    { label: "Historical claimed best B", score: 0.449 },
  ];

  return (
    <figure className="cc-figure cc-chart cc-progression-chart" aria-labelledby="progression-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="progression-title">The best score kept moving when the same study resumed</h3>
        </div>
        <p>
          <span className="cc-provenance">Exact resumed-study results.</span>
          Each follow-up continued the existing TPE study. It did not throw away the sampler&apos;s
          history and start cold.
        </p>
      </figcaption>
      <p className="cc-chart-mobile-outcome">
        <span>Key result</span>
        <strong>0.316 → 0.441 → 0.484 across resumed runs.</strong>
        <small>Scroll horizontally for all three runs.</small>
      </p>
      <div
        className="cc-svg-chart-wrap"
        role="region"
        aria-label="Usable-connections score progression. Scroll horizontally or use arrow keys to inspect the full chart."
        tabIndex={0}
      >
        <svg
          className="cc-svg-chart"
          viewBox="0 0 840 430"
          role="img"
          aria-labelledby="progression-svg-title progression-svg-desc"
        >
          <title id="progression-svg-title">Usable-connections score progression</title>
          <desc id="progression-svg-desc">
            The best score rises from 0.316 to 0.441 to 0.484 across three resumed Optuna runs.
            Historical claimed bests are 0.340 and 0.449.
          </desc>
          {[0.3, 0.4, 0.5].map((tick) => (
            <g key={tick}>
              <line
                x1={progressionPlot.left}
                x2={progressionPlot.right}
                y1={progressionY(tick)}
                y2={progressionY(tick)}
                className="cc-chart-gridline"
              />
              <text x="72" y={progressionY(tick) + 4} textAnchor="end" className="cc-chart-axis-text">
                {tick.toFixed(2)}
              </text>
            </g>
          ))}
          {references.map((reference) => (
            <g key={reference.score}>
              <line
                x1={progressionPlot.left}
                x2={progressionPlot.right}
                y1={progressionY(reference.score)}
                y2={progressionY(reference.score)}
                className="cc-progression-reference"
              />
              <text
                x="668"
                y={progressionY(reference.score) + 4}
                className="cc-progression-reference-label"
              >
                {reference.score.toFixed(3)} claimed
              </text>
            </g>
          ))}
          <path d={progressionPath} className="cc-progression-line" />
          {progressionRuns.map((run, index) => (
            <g key={run.label}>
              <circle
                cx={progressionX(index)}
                cy={progressionY(run.score)}
                r="8"
                className="cc-progression-point"
              />
              <text
                x={progressionX(index)}
                y={progressionY(run.score) - 18}
                textAnchor="middle"
                className="cc-progression-value"
              >
                {run.score.toFixed(3)}
              </text>
              <text
                x={progressionX(index)}
                y="382"
                textAnchor="middle"
                className="cc-chart-axis-text"
              >
                {index === 2 ? "current run" : run.label.toLowerCase()}
              </text>
            </g>
          ))}
          <text x="370" y="418" textAnchor="middle" className="cc-chart-axis-label">
            RESUMED OPTUNA STUDY
          </text>
        </svg>
      </div>
      <div className="cc-current-config">
        <span>Current best configuration</span>
        <code>
          days=24 · pyramidal=16 · interneuron=24 · minneuronseparation=15 · shape.radius=100 ·
          shape.thickness=20 · dm.weight=0.8
        </code>
      </div>
      <p className="cc-chart-note">
        The historical sheet is directional context. Two verification attempts for its best point
        scored between 0.277 and 0.383, so neither reproduced the claimed value exactly.
      </p>
    </figure>
  );
}
