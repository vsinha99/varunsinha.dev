const pipelineStages = [
  {
    type: "Input",
    title: "Config file",
    detail: "growth parameters",
  },
  {
    type: "Run",
    title: "Python script",
    detail: "NETMORPH engine",
  },
  {
    type: "Structure",
    title: "Reservoir",
    detail: "axons, dendrites, synapses",
  },
  {
    type: "Tune",
    title: "Analysis script",
    detail: "connection tuning",
  },
  {
    type: "Circuit",
    title: "XOR circuit",
    detail: "selected connectome",
  },
  {
    type: "Validate",
    title: "Test script",
    detail: "simulation engine",
  },
  {
    type: "Output",
    title: "Activity data",
    detail: "score + connectivity",
  },
];

export function NetmorphPipeline() {
  return (
    <figure className="cc-figure cc-pipeline-figure" aria-labelledby="pipeline-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="pipeline-title">NETMORPH optimization pipeline</h3>
        </div>
        <p>
          The three source diagrams are combined here as one continuous run. Each output becomes
          the next stage&apos;s input.
        </p>
      </figcaption>

      <div
        className="cc-pipeline-scroll"
        role="region"
        aria-label="NETMORPH pipeline. Scroll horizontally to inspect every stage."
        tabIndex={0}
      >
        <ol className="cc-pipeline">
          {pipelineStages.map((stage, index) => (
            <li className="cc-pipeline-stage" key={stage.title}>
              <div className="cc-pipeline-node" data-kind={stage.type.toLowerCase()}>
                <span>{stage.type}</span>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </div>
              {index < pipelineStages.length - 1 ? (
                <svg className="cc-pipeline-arrow" viewBox="0 0 72 24" aria-hidden="true">
                  <path d="M1 12h64M55 4l10 8-10 8" />
                </svg>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <p className="cc-scroll-note">The diagram scrolls horizontally on smaller screens.</p>
    </figure>
  );
}

const registerStages = Array.from({ length: 8 }, (_, index) => ({
  p: `P${index}`,
  q: `Q${index}`,
  x: 170 + index * 128,
}));

export function ShiftRegisterDiagram() {
  return (
    <figure className="cc-figure cc-register-figure" aria-labelledby="register-title">
      <figcaption className="cc-figure-heading">
        <div>
          <h3 id="register-title">The 8-bit spiking-neuron shift register</h3>
        </div>
        <p>
          A serial bit enters at Din. Each clock pulse advances the stored pattern one stage, and
          Q0 through Q7 expose the parallel readout.
        </p>
      </figcaption>

      <div
        className="cc-register-scroll"
        role="region"
        aria-label="Eight-bit shift register circuit. Scroll horizontally to inspect all stages."
        tabIndex={0}
      >
        <svg
          className="cc-register-svg"
          viewBox="0 0 1200 440"
          role="img"
          aria-labelledby="register-svg-title register-svg-desc"
        >
          <title id="register-svg-title">Eight-bit shift register circuit</title>
          <desc id="register-svg-desc">
            Clock and data inputs feed eight master stages labeled P0 through P7. Each master feeds
            a slave stage labeled Q0 through Q7 for parallel output.
          </desc>
          <defs>
            <marker
              id="cc-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 8 4 0 8Z" className="cc-register-arrowhead" />
            </marker>
          </defs>

          <text x="170" y="45" className="cc-register-kicker">
            ONE CLOCK PULSE DRIVES ALL 8 MASTER STAGES
          </text>
          <path d="M126 92H1120" className="cc-register-clock-line" markerEnd="url(#cc-arrow)" />

          <rect x="24" y="66" width="102" height="52" className="cc-register-input" />
          <text x="75" y="99" textAnchor="middle" className="cc-register-input-text">
            CLK
          </text>
          <rect x="24" y="164" width="102" height="52" className="cc-register-input" />
          <text x="75" y="197" textAnchor="middle" className="cc-register-input-text">
            Din
          </text>
          <text x="75" y="240" textAnchor="middle" className="cc-register-caption">
            SERIAL IN
          </text>
          <path d="M126 190H160" className="cc-register-data-line" markerEnd="url(#cc-arrow)" />

          {registerStages.map((stage, index) => (
            <g key={stage.p}>
              <path
                d={`M${stage.x + 39} 92V160`}
                className="cc-register-clock-drop"
                markerEnd="url(#cc-arrow)"
              />
              <rect x={stage.x} y="164" width="78" height="58" className="cc-register-master" />
              <text
                x={stage.x + 39}
                y="200"
                textAnchor="middle"
                className="cc-register-node-text cc-register-master-text"
              >
                {stage.p}
              </text>
              {index < registerStages.length - 1 ? (
                <path
                  d={`M${stage.x + 78} 193H${registerStages[index + 1].x - 10}`}
                  className="cc-register-data-line"
                  markerEnd="url(#cc-arrow)"
                />
              ) : null}
              <path
                d={`M${stage.x + 39} 222V292`}
                className="cc-register-clock-drop"
                markerEnd="url(#cc-arrow)"
              />
              <rect x={stage.x} y="298" width="78" height="58" className="cc-register-slave" />
              <text
                x={stage.x + 39}
                y="334"
                textAnchor="middle"
                className="cc-register-node-text"
              >
                {stage.q}
              </text>
              <path
                d={`M${stage.x + 39} 356V392`}
                className="cc-register-clock-drop"
                markerEnd="url(#cc-arrow)"
              />
            </g>
          ))}

          <text x="585" y="276" textAnchor="middle" className="cc-register-caption">
            EACH PULSE SHIFTS THE PATTERN ONE STAGE TO THE RIGHT
          </text>
          <text x="585" y="427" textAnchor="middle" className="cc-register-kicker">
            PARALLEL OUT / READ ALL 8 STORED BITS
          </text>
        </svg>
      </div>
      <p className="cc-scroll-note">The circuit scrolls horizontally on smaller screens.</p>
    </figure>
  );
}
