"use client";

import { useMemo, useState } from "react";

/* ---------- TYPES ---------- */

type Artifact = {
  id: string;
  initial: string;
  distortion: string;
  shift: string;
  result: string;
  href: string;
};

type ThoughtProfile =
  | "ambition"
  | "identity"
  | "efficiency"
  | "meaning"
  | "fear"
  | "creation"
  | "default";

type ThinkResult = {
  source: "gpt" | "fallback";
  profile: ThoughtProfile;
  interpretation: string;
  friction: string[];
  expansion: string[];
  transformation: string;
};

/* ---------- ARTIFACTS ---------- */

const artifacts: Artifact[] = [
  {
    id: "andreas-kolar",
    initial: "I should have a website that represents me.",
    distortion: "You want to look coherent.",
    shift: "Coherence is often just well-designed inconsistency.",
    result: "An early AI project.",
    href: "https://andreas.kolar.berlin",
  },
  {
    id: "art-kolar",
    initial: "Can AI create art?",
    distortion: "You’re asking if authorship still matters.",
    shift: "Art was never about who made it.",
    result: "AI art + text experiments.",
    href: "https://art.kolar.berlin",
  },
  {
    id: "sinfrey",
    initial: "What if I build a fashion brand?",
    distortion: "You want to test perception.",
    shift: "Perception creates value faster than production.",
    result: "A fictional fashion brand.",
    href: "https://sinfrey.com",
  },
  {
    id: "albums",
    initial: "Can AI generate music?",
    distortion: "You want to feel something through a machine.",
    shift: "The narrative matters more than the sound.",
    result: "Narrative-driven AI albums.",
    href: "#",
  },
];

/* ---------- COMPONENT ---------- */

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ThinkResult | null>(null);
  const [hoverArtifact, setHoverArtifact] = useState<string | null>(null);

  const profile = result?.profile ?? "default";

  const prioritizedArtifacts = useMemo(() => {
    const order: Record<string, string[]> = {
      identity: ["sinfrey", "andreas-kolar", "art-kolar", "albums"],
      creation: ["art-kolar", "albums", "sinfrey", "andreas-kolar"],
      ambition: ["andreas-kolar", "sinfrey", "albums", "art-kolar"],
      efficiency: ["andreas-kolar", "albums", "sinfrey", "art-kolar"],
      meaning: ["art-kolar", "albums", "andreas-kolar", "sinfrey"],
      fear: ["andreas-kolar", "art-kolar", "albums", "sinfrey"],
      default: ["andreas-kolar", "art-kolar", "sinfrey", "albums"],
    };

    return order[profile]
      .map((id) => artifacts.find((a) => a.id === id))
      .filter(Boolean) as Artifact[];
  }, [profile]);

  const transformed = useMemo(() => {
    if (!result) return "";

    const active = hoverArtifact ?? prioritizedArtifacts[0]?.id;

    let base = result.transformation;

    if (active === "sinfrey") base += "\n\nMaybe visibility matters more.";
    if (active === "art-kolar") base += "\n\nMaybe meaning is perception.";
    if (active === "albums") base += "\n\nMaybe structure is the point.";
    if (active === "andreas-kolar") base += "\n\nMaybe consistency is overrated.";

    return base;
  }, [result, hoverArtifact, prioritizedArtifacts]);

  async function run() {
    const r = await fetch("/api/think", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await r.json();
    setResult(data);
  }

  return (
    <main style={{ padding: 40, background: "black", color: "white" }}>
      {!result && (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="start with a thought"
            style={{ fontSize: 24, width: "100%" }}
          />
          <button onClick={run} style={{ marginTop: 20 }}>
            enter
          </button>
        </>
      )}

      {result && (
        <>
          <h2>{result.interpretation}</h2>
          <pre style={{ whiteSpace: "pre-line" }}>{transformed}</pre>

          {prioritizedArtifacts.map((a) => (
            <div
              key={a.id}
              onMouseEnter={() => setHoverArtifact(a.id)}
              onMouseLeave={() => setHoverArtifact(null)}
              style={{
                marginTop: 40,
                opacity: a.id === prioritizedArtifacts[0]?.id ? 1 : 0.5,
              }}
            >
              <p>{a.initial}</p>
              <p>{a.shift}</p>
              <p>
                {a.id === prioritizedArtifacts[0]?.id
                  ? "first resonance"
                  : "artifact"}
              </p>
            </div>
          ))}
        </>
      )}
    </main>
  );
}