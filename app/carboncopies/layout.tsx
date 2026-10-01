import type { Metadata } from "next";

import "./carboncopies.css";

export const metadata: Metadata = {
  title: "Carboncopies Foundation | Neural Circuit Optimization",
  description:
    "A technical case study on NETMORPH parameter search, spiking-neuron circuit debugging, and robustness optimization with Optuna.",
  openGraph: {
    title: "Carboncopies Foundation Internship | Varun Sinha",
    description:
      "NETMORPH parameter search, spiking-neuron circuit debugging, and robustness optimization with Optuna.",
    type: "article",
  },
};

export default function CarboncopiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
