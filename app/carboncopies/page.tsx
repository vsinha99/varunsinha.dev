import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";

import {
  ImportanceShiftChart,
  OptimizationHistoryChart,
  ParameterBoundaryMap,
  ParetoFrontChart,
  ScoreProgressionChart,
} from "./charts";
import { NetmorphPipeline, ShiftRegisterDiagram } from "./diagrams";

const directionKey = "pinned:user-brief:carboncopies-v2";

function PartHeader({
  part,
  period,
  id,
  title,
  children,
}: {
  part: string;
  period: string;
  id: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="cc-part-header">
      <div className="cc-part-meta">
        <p>{part}</p>
        <p>{period}</p>
      </div>
      <div className="cc-part-intro">
        <h2 id={id}>{title}</h2>
        {children ? <div className="cc-prose cc-part-summary">{children}</div> : null}
      </div>
    </header>
  );
}

export default function CarboncopiesCaseStudy() {
  return (
    <main id="top" className="cc-page" data-direction-key={directionKey} tabIndex={-1}>
      <header className="cc-case-header">
        <div className="cc-shell cc-case-header-inner">
          <p>Carboncopies Foundation</p>
          <nav aria-label="Case study navigation">
            <a href="#manual">Manual tuning</a>
            <a href="#scaling">Scaling</a>
            <a href="#robustness">Robustness</a>
          </nav>
          <Link href="/">Portfolio</Link>
        </div>
      </header>
      <header className="cc-shell cc-hero">
        <div className="cc-hero-identity">
          <figure className="cc-hero-logo">
            <Image
              src="/logos/carboncopies_logo.png"
              alt="Carboncopies Foundation"
              width={220}
              height={220}
              priority
            />
          </figure>
          <div>
            <p>Carboncopies Foundation</p>
            <p>Machine Learning Engineering Intern</p>
            <p>August 2025 to present</p>
          </div>
        </div>

        <div className="cc-hero-copy">
          <h1>Optimizing biologically grown neural circuits.</h1>
          <p>
            I turned slow, hand-edited neural simulations into repeatable Optuna studies. The
            work started with a 3-parameter XOR circuit, expanded to a 15-dimensional NETMORPH
            search, and moved into spiking circuits where an objective that would not move became
            a useful debugging signal.
          </p>
        </div>

        <dl className="cc-hero-metrics">
          <div>
            <dd>0.316 → 0.484</dd>
            <dt>usable-connections score</dt>
          </div>
          <div>
            <dd>15</dd>
            <dt>parameters in the largest search</dt>
          </div>
          <div>
            <dd>3</dd>
            <dt>circuit families optimized</dt>
          </div>
        </dl>
      </header>

      <section id="netmorph" className="cc-shell cc-context-section" aria-labelledby="netmorph-title">
        <div className="cc-context-heading">
          <h2 id="netmorph-title">NETMORPH and morphology-driven connectivity</h2>
        </div>
        <div className="cc-prose cc-context-copy">
          <p>
            NETMORPH grows neural networks the way real neurons grow. Axons and dendrites extend
            from growth cones, branch, turn, and form synapses when their paths get close enough.
            Connectivity is an outcome of morphology rather than a wiring diagram written by
            hand.
          </p>
          <p>
            That makes it useful when real brain connectivity data is scarce. Researchers can
            generate synthetic networks, change the growth rules, and measure how neuron shape
            changes the resulting connectome. The original framework is described in{" "}
            <Link
              href="https://pubmed.ncbi.nlm.nih.gov/19672726/"
              target="_blank"
              rel="noreferrer"
            >
              Koene et al.&apos;s NETMORPH paper
              <ArrowUpRight aria-hidden="true" />
            </Link>
            .
          </p>
          <p className="cc-context-note">
            The first obstacle was practical: legacy Linux-era software did not compile cleanly
            on ARM64 macOS. I moved the runs to the existing BrainGenix-NES server and kept the
            optimization work focused on the experiments.
          </p>
        </div>
      </section>

      <div className="cc-shell cc-visual-break">
        <NetmorphPipeline />
      </div>

      <section id="manual" className="cc-shell cc-part" aria-labelledby="manual-title">
        <PartHeader
          part="Part 1"
          period="Fall 2025"
          id="manual-title"
          title="Manual parameter tuning"
        >
          <p>
            Before automation, I edited NETMORPH&apos;s config values by hand and reran roughly
            10-minute simulations to see what changed on a baseline XOR circuit. It began with
            262 total connections and 5 of 10 neurons receiving convergent input. A working
            circuit needs all 10 neurons to receive convergent input, so each sweep had a clear
            target beyond raw connection count.
          </p>
        </PartHeader>

        <div className="cc-findings">
          <article className="cc-finding">
            <div className="cc-finding-key">
              <code>growth_nu0</code>
              <span>axon elongation rate</span>
            </div>
            <div className="cc-prose">
              <h3>Axon elongation rate</h3>
              <p>
                This was the standout finding. A 42% drop from baseline collapsed the network to
                116 connections and zero convergent neurons. A 54% increase produced the opposite
                extreme, 324 connections and all 10 neurons convergent. There was little gradual
                middle ground: too little elongation starved the network of growth time, while too
                much flooded it. The useful band was narrow enough to make hand tuning slow and
                easy to misread.
              </p>
            </div>
            <div className="cc-finding-data">
              <p>
                <span>−42%</span>
                <strong>0 / 10</strong>
              </p>
              <p>
                <span>+54%</span>
                <strong>10 / 10</strong>
              </p>
            </div>
          </article>

          <article className="cc-finding">
            <div className="cc-finding-key">
              <code>turn_separation</code>
              <span>distance between turns</span>
            </div>
            <div className="cc-prose">
              <h3>Turn separation</h3>
              <p>
                The intuitive guess was that direct paths would connect better. At{" "}
                <code>turn_separation=10.0</code>, the circuit produced 201 connections and 7
                convergent neurons. At <code>2.5</code>, more frequent turns produced 306
                connections and 8 convergent neurons. Wandering paths created more chances to run
                into useful partners. The more efficient-looking setting was the worse one because
                a straighter axon had fewer opportunities to encounter a convergent connection.
              </p>
            </div>
            <div className="cc-finding-data">
              <p>
                <span>straight</span>
                <strong>201</strong>
              </p>
              <p>
                <span>wandering</span>
                <strong>306</strong>
              </p>
            </div>
          </article>

          <article className="cc-finding">
            <div className="cc-finding-key">
              <code>E</code>
              <span>branch competition</span>
            </div>
            <div className="cc-prose">
              <h3>Branch competition</h3>
              <p>
                This parameter had a clearer relationship. Setting <code>E=0.2</code> let more
                branches survive and produced 296 connections with 9 convergent neurons, the best
                result in the sweep. Raising competition to <code>0.5</code> pruned harder and
                reduced both connection count and convergence. Together, these sweeps became the
                parameter boundary map used to avoid rediscovering the same failed ranges.
              </p>
            </div>
            <div className="cc-finding-data">
              <p>
                <span>E=0.2</span>
                <strong>9 / 10</strong>
              </p>
            </div>
          </article>
        </div>

        <div className="cc-manual-body">
          <section className="cc-manual-section">
            <h3>Setup and methodology</h3>
            <div className="cc-prose">
              <p>Before any automated search was introduced, NETMORPH&apos;s growth parameters were adjusted by hand, one at a time, against a fixed target circuit: an XOR reservoir intended to produce convergent input from both the PyrIn and Int neuron populations at all 10 pyramidal neurons. Each simulation took approximately 10 minutes to run, which made exhaustive or combinatorial testing impractical at this stage and motivated a single-variable-at-a-time approach — one parameter changed per run, all others held at their baseline configuration, so that any change in outcome could be attributed to the parameter under test rather than to an interaction effect.</p>
              <p>The baseline configuration produced 262 total synaptic connections, with 5 of the 10 pyramidal neurons receiving convergent input. A working circuit, by the standard used throughout this project, required all 10 neurons to reach convergence. The four parameters tested in this phase were B_inf (the average number of branching events per axon), growth_nu0 (the mean elongation rate of axon growth cones), turn_separation (the distance an axon travels before it is permitted to change direction), and E (a competition parameter that governs how strongly co-located branches from the same arbor compete for growth resources). These four were chosen because NETMORPH&apos;s documentation and the underlying van Pelt branching model identify them as the parameters most directly responsible for shaping connectivity, as distinct from parameters that mainly affect timing or computational cost.</p>
            </div>
          </section>
          <section className="cc-manual-section">
            <h3>B_inf — axon branching events</h3>
            <div className="cc-prose"><p>At baseline (B_inf = 13.22), the circuit produced 262 connections and 5 convergent neurons. Increasing B_inf to 15.0, a 13.5% increase, produced a marginal gain in total connections (267, +1.9%) with no change in convergent neuron count. A larger increase to 18.0 (+36%) produced a more substantial change: 271 total connections and 8 convergent neurons, a 60% increase over baseline. A separate test at a lower value, 10.0 (-24% from baseline), produced 9 convergent neurons on 256 total connections — a result that does not fit a simple monotonic relationship between B_inf and convergence. Both a moderately reduced and a substantially increased branching rate outperformed the baseline and the intermediate test point, which suggests that branching&apos;s effect on convergence is not linear across this range and that the baseline value may sit in a locally unfavorable region rather than near an optimum.</p></div>
          </section>
          <section className="cc-manual-section">
            <h3>growth_nu0 — axon elongation rate</h3>
            <div className="cc-prose"><p>Elongation rate produced the most severe response of any parameter tested. At baseline (approximately 0.00052 µm/min), the circuit reached its standard 262 connections and 5 convergent neurons. Reducing elongation rate by 42% (to 0.0003) did not produce a proportionally smaller network — it produced a near-total collapse, with total connections falling to 116 and convergent neurons falling to zero. Growth cones extending too slowly simply did not have enough simulated time to reach and form synapses with their targets before the simulation ended. Increasing elongation rate by 54% (to 0.0008) produced the opposite extreme: 324 total connections, and all 10 pyramidal neurons reaching convergence. Between these two endpoints there is no gradual transition visible in the tested values — the parameter behaves as a threshold rather than a dial, and a run configured even moderately below the effective growth rate will fail outright rather than underperform. This is the parameter most likely to silently break a NETMORPH configuration if adjusted without reference to a known-working baseline.</p></div>
          </section>
          <section className="cc-manual-section">
            <h3>turn_separation — axon path turning frequency</h3>
            <div className="cc-prose"><p>This parameter controls how far an axon extends before it is allowed to change direction, and produced a result that ran contrary to the initial hypothesis. The expectation going in was that straighter, more direct growth paths would connect more efficiently, since a growth cone traveling in a straight line covers more net distance per unit of simulated time. The data did not support this. At turn_separation = 10.0 (paths turn less frequently, i.e. straighter), the circuit produced only 201 total connections and 7 convergent neurons — fewer than baseline. At turn_separation = 2.5 (paths turn more frequently, i.e. more exploratory), the circuit produced 306 total connections and 8 convergent neurons, the best result of the three tested values on both metrics. The baseline value of 5.0 sat between these two, at 262 connections and 5 convergent neurons — the worst convergence result of the three despite being the intermediate value. The likely explanation is that a wandering growth path samples a larger effective volume of the surrounding tissue, increasing the probability that a given axon comes within synapse-forming range of a viable target, even though the same path is less direct in absolute distance traveled. Efficient-looking growth, in this model, is not the same as effective growth.</p></div>
          </section>
          <section className="cc-manual-section">
            <h3>E — branch competition for resources</h3>
            <div className="cc-prose"><p>E governs how strongly branches originating from the same arbor compete with one another for growth resources, with higher values corresponding to stronger competition and, correspondingly, more pruning of weaker branches. At baseline (E = 0.319), the circuit produced 262 connections and 5 convergent neurons. Reducing competition to 0.2 (-37% from baseline) allowed more branches to survive and produced both more total connections (296) and more convergent neurons (9) — the best convergence result across the parameter&apos;s tested range. Increasing competition to 0.5 (+57%) had the opposite effect on connection count, as expected: total connections fell to 234. Convergent neuron count under high competition was 7, higher than baseline despite fewer total connections, which suggests that the pruning induced by higher competition may be removing redundant or non-productive branches rather than the ones actually contributing to convergence — a distinction that total connection count alone does not capture, and one worth flagging as a limit of using connection count as a single proxy metric.</p></div>
          </section>
          <section className="cc-manual-section cc-manual-summary">
            <h3>Summary and implications for the automated phase that followed</h3>
            <div className="cc-prose"><p>Across all four parameters, none behaved in a way that would have been predictable from its description alone. B_inf&apos;s effect was non-monotonic. growth_nu0 behaved as a sharp threshold rather than a smooth gradient. turn_separation&apos;s effect ran opposite to the intuitive prediction. E&apos;s effect on convergence did not track its effect on raw connection count. Taken together, these results were the direct motivation for moving to an automated, multi-parameter search in the following phase: manual single-variable testing had already demonstrated that these parameters interact in ways that are not visible when varied in isolation, and that the &quot;obvious&quot; direction to move a parameter is not reliably the correct one.</p></div>
          </section>
        </div>

        <ParameterBoundaryMap />
      </section>

      <section id="scaling" className="cc-shell cc-part" aria-labelledby="scaling-title">
        <PartHeader
          part="Part 2"
          period="Spring 2026"
          id="scaling-title"
          title="Scaling to fifteen parameters"
        >
          <p>
            Manual, single-variable tuning does not scale past a handful of parameters. This phase
            expanded the space from 3 to 6, 10, and eventually 15 parameters while selecting an
            optimizer that could afford expensive simulations. Bayesian optimization found the same
            result in roughly 30 tests that a grid search needed 240 to reach. I used TPE as the
            dimensionality grew and ruled out genetic algorithms because the simulation budget was
            too small for them.
          </p>
          <p>
            The larger search changed the interpretation of parameter importance. In a 3-parameter
            study, <code>B_inf</code> accounted for 80% importance. Once the space reached 10 to
            15 parameters, <code>turn_separation</code> rose to 50% while <code>B_inf</code>
            dropped to 17%. Parameters that looked decisive in isolation were sharing control with
            parameters that had not yet been tested.
          </p>
        </PartHeader>

        <ImportanceShiftChart />

        <div className="cc-subsection cc-shift-story">
          <div className="cc-subsection-heading">
            <h3 id="shift-register-title">Shift-register debugging</h3>
          </div>
          <div className="cc-prose cc-subsection-copy">
            <p>
              The next target was an 8-bit shift register built from leaky integrate-and-fire
              neurons and optimized with Optuna. A 20-trial sweep sat near 50% accuracy no matter
              which weights it tried, and every trial failed in the same way. That flat objective
              was the clue that weights were not the underlying problem.
            </p>
          </div>
        </div>

        <ShiftRegisterDiagram />

        <div className="cc-prose cc-after-fix-copy">
          <p>
            The circuit had two problems. First, the clock signal alone pushed every stage over
            threshold, so the register shifted activity even when no bit was present at Din.
            Second, the readout slice partly captured an echo from the previous pulse instead of
            the stored pattern the objective was meant to score. Weight tuning could not repair
            either issue. Tracing membrane potentials exposed both, and fixing the gating and
            readout logic changed the objective immediately. The optimizer was not only tuning
            the circuit here; its flat score pointed directly at what was broken in the circuit code.
          </p>
          <p>
            A new 50-trial study tuned clock weight, data weight, and inter-stage delay. Twenty
            trials reached perfect accuracy, up from 4 of 20 in the initial sanity check. Optuna
            converged on a delay near 498 ms, almost exactly the original hand-tuned 495 ms. That
            convergence was a useful check that the study had found structure in the circuit rather
            than a one-off noisy configuration.
          </p>
        </div>

        <OptimizationHistoryChart />
      </section>

      <section id="robustness" className="cc-shell cc-part" aria-labelledby="robustness-title">
        <PartHeader
          part="Part 3"
          period="Summer 2026 to present"
          id="robustness-title"
          title="Robustness under clock drift"
        >
          <p>
            Once many shift-register trials landed at 1.000, nominal accuracy could no longer
            distinguish a reliable configuration from one that only worked at exactly 500 ms. I
            added robustness under clock drift as a second objective and reran the study. Six
            trials reached perfect nominal accuracy, but only three remained perfect under ±2%
            clock drift. The second objective separated configurations that were genuinely stable
            from ones that only worked at the exact nominal timing.
          </p>
        </PartHeader>

        <ParetoFrontChart />

        <div className="cc-subsection cc-memory-story">
          <div className="cc-subsection-heading">
            <h3>Autoassociative memory threshold</h3>
          </div>
          <div className="cc-prose cc-subsection-copy">
            <p>
              I applied the same pipeline to an 8-neuron autoassociative, Hopfield-style memory
              network. Its job was to reconstruct a corrupted input back to a trained pattern. The
              shipped defaults recalled nothing. Pattern completion appeared only after tuning
              spike-timing dependent plasticity, and even then it was unstable.
            </p>
            <p>
              Across 105 trials, recall was sharply bimodal, near a shared ceiling or zero with
              little in between. One synapse-count parameter had to equal 5. At 4, recall never
              got started. This was a hard boundary in the search space, not a gradual tradeoff.
            </p>
          </div>
        </div>

        <div className="cc-subsection cc-current-story">
          <div className="cc-subsection-heading">
            <h3>Usable-connections optimization</h3>
          </div>
          <div className="cc-prose cc-subsection-copy">
            <p>
              The lab has tracked a usable-connections metric through manual experiments. I moved
              that objective into the same Optuna pipeline and resumed one TPE study across two
              follow-up runs rather than starting cold each time. The best score rose from 0.316 to
              0.441, then to 0.484. Resuming the study lets each run build on what the sampler had
              already learned about the search space.
            </p>
            <p>
              The historical sheet lists claimed bests of 0.340 and 0.449. Those numbers did not
              fully reproduce in verification runs, so I treat the sheet as directional rather
              than exact. The automated study is still finding configurations beyond the manual
              sweep, and the usable-connections work remains active.
            </p>
          </div>
        </div>

        <ScoreProgressionChart />
      </section>

      <section id="next" className="cc-shell cc-next" aria-labelledby="next-title">
        <div className="cc-next-heading">
          <h2 id="next-title">Current and next work</h2>
        </div>
        <div className="cc-next-list">
          <article>
            <h3>Widen the pyramidal-neuron range.</h3>
            <p>
              The current best trials and the historical data both cluster near the lower search
              boundary. The next run should test whether the useful region continues below it.
            </p>
          </article>
          <article>
            <h3>Keep the usable-connections study warm.</h3>
            <p>
              Follow-up runs will resume the same TPE state so new trials build on what the sampler
              already learned.
            </p>
          </article>
          <article>
            <h3>Write up the full-adder validation.</h3>
            <p>
              The circuit validation is complete. Its detailed findings are not yet part of this
              case study, so I have left them out rather than filling the gap with a guess.
            </p>
          </article>
        </div>
      </section>

      <footer className="cc-shell cc-footer">
        <div className="cc-footer-author">
          <Image
            src="/logos/headshot.png"
            alt="Varun Sinha"
            width={96}
            height={96}
            sizes="64px"
          />
          <div>
            <p>Research and implementation by Varun Sinha</p>
            <p>Carboncopies Foundation / August 2025 to present</p>
          </div>
        </div>
        <div className="cc-footer-links">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to portfolio
          </Link>
          <Link href="mailto:vsinha@ucsd.edu">
            <Mail aria-hidden="true" />
            Email Varun
          </Link>
        </div>
      </footer>
    </main>
  );
}
