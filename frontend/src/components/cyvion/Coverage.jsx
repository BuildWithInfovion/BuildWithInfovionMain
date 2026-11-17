// MITRE ATT&CK coverage, drawn from Cyvion's own rule pack. Columns are tactics in kill-chain order;
// each cell is a technique a rule detects, brighter where more rules cover it. Choosing a cell shows
// the technique and the rules behind it.
import React, { useState } from "react";
import { CYVION_COVERAGE, CYVION_RULE_COUNT } from "../../Data/cyvionCoverage";

const TACTIC = {
  reconnaissance: "Reconnaissance", initial_access: "Initial access", execution: "Execution", persistence: "Persistence",
  privilege_escalation: "Privilege escalation", defense_evasion: "Defence evasion", credential_access: "Credential access",
  discovery: "Discovery", lateral_movement: "Lateral movement", collection: "Collection", command_and_control: "Command and control",
  exfiltration: "Exfiltration", impact: "Impact",
};

export default function Coverage() {
  const first = CYVION_COVERAGE.find((c) => c.tactic === "credential_access") || CYVION_COVERAGE[0];
  const [sel, setSel] = useState({ tactic: first.tactic, cell: first.cells[0] });
  const techniques = new Set(CYVION_COVERAGE.flatMap((c) => c.cells.map((x) => x.id))).size;

  return (
    <div className="cy-cov">
      <p className="cy-cov-sum">{CYVION_RULE_COUNT} detection rules covering {techniques} techniques across {CYVION_COVERAGE.length} tactics. Choose a technique to see the rules behind it.</p>
      <div className="cy-cov-scroll">
        <div className="cy-cov-grid" style={{ gridTemplateColumns: `repeat(${CYVION_COVERAGE.length}, minmax(90px, 1fr))` }}>
          {CYVION_COVERAGE.map((col) => (
            <div key={col.tactic} className="cy-cov-col">
              <div className="cy-cov-tactic">{TACTIC[col.tactic] || col.tactic}</div>
              {col.cells.map((cell) => {
                const on = sel.cell.id === cell.id && sel.tactic === col.tactic;
                return (
                  <button key={cell.id} type="button" onClick={() => setSel({ tactic: col.tactic, cell })}
                    className={`cy-cov-cell w${Math.min(3, cell.rules.length)} ${on ? "on" : ""}`} aria-pressed={on}
                    title={`${cell.id} ${cell.name}`}>
                    <span className="id">{cell.id}</span>
                    <span className="nm">{cell.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="cy-cov-detail" aria-live="polite">
        <div>
          <span className="id">{sel.cell.id}</span>
          <h3>{sel.cell.name}</h3>
          <p>{TACTIC[sel.tactic]}</p>
        </div>
        <ul>{sel.cell.rules.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </div>
  );
}
