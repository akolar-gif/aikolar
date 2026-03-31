"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- TYPES ---------- */

type Artifact = {
  id: string;
  initial: string;
  distortion: string;
  shift: string;
  result: string;
  href: string;
};

type ExperienceStage =
  | "idle"
  | "intention"
  | "interpretation"
  | "friction"
  | "expansion"
  | "transformation"
  | "bridge"
  | "artifacts"
  | "mirror"
  | "exit";

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
    result:
      "An early AI project. Less a statement than a trace of conceptual thinking.",
    href: "https://andreas.kolar.berlin",
  },
  {
    id: "art-kolar",
    initial: "Can AI create art?",
    distortion: "You’re asking if authorship still matters.",
    shift:
      "Art was never about who made it. It was about what it makes visible.",
    result:
      "AI-generated images paired with gallery-like texts. A change in observation.",
    href: "https://art.kolar.berlin",
  },
  {
    id: "sinfrey",
    initial: "What if I build a fashion brand with AI?",
    distortion: "You want to see if reality is optional.",
    shift: "Perception creates value faster than production.",
    result:
      "A fictional brand that feels real enough to expose how value is staged.",
    href: "https://sinfrey.com",
  },
  {
    id: "albums",
    initial: "Can AI generate music?",
    distortion: "You’re trying to feel something through a machine.",
    shift: "The music was never the point. The narrative was.",
    result:
      "Narrative-driven albums that behave more like emotional sequences.",
    href: "#",
  },
];

/* ---------- HELPERS ---------- */

function normalizeInput(value: string) {
  const t = value.trim();
  if (!t) return "I want to build something meaningful with AI.";
  return /[.!?]$/.test(t) ? t : t + ".";
}

/* ---------- WORD MORPH ---------- */

function WordMorph({ text }: { text: string }) {
  const blocks = text.split("\n");

  return (
    <div style={{ display: "grid", gap: "0.6rem" }}>
      {blocks.map((block, i) => (
        <p key={i} style={{ fontSize: "clamp(2rem,4vw,4rem)", margin: 0 }}>
          {block}
        </p>
      ))}
    </div>
  );
}

/* ---------- ARTIFACT CARD ---------- */

function ArtifactCard({
  artifact,
  isPrimary,
  onEnter,
  onLeave,
}: any) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        opacity: isPrimary ? 1 : 0.6,
        transform: isPrimary ? "scale(1)" : "scale(0.97)",
        transition: "all 0.6s ease",
        padding: "3rem 0",
      }}
    >
      <p>{artifact.initial}</p>
      <p>{artifact.distortion}</p>
      <p>{artifact.shift}</p>

      <p style={{ marginTop: "1rem" }}>
        {isPrimary ? "first resonance" : "artifact"}
      </p>

      <p>{artifact.result}</p>
    </div>
  );
}

/* ---------- MAIN ---------- */

export default function Page() {
  const [input, setInput] = useState("");
  const [thought, setThought] = useState("");
  const [result, setResult] = useState<ThinkResult | null>(null);
  const [artifactIndex, setArtifactIndex] = useState(0);
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

    return base;
  }, [result, hoverArtifact, prioritizedArtifacts]);

  async function run() {
    const t = normalizeInput(input);
    setThought(t);

    const r = await fetch("/api/think", {
      method: "POST",
      body: JSON.stringify({ input: t }),
    });

    const data = await r.json();
    setResult(data);
  }

  return (
    <main style={{ padding: "4rem" }}>
      {!result && (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="start with a thought"
          />
          <button onClick={run}>enter</button>
        </>
      )}

      {result && (
        <>
          <WordMorph text={thought} />
          <WordMorph text={result.interpretation} />
          <WordMorph text={transformed} />

          {prioritizedArtifacts
            .slice(0, artifactIndex + 1)
            .map((a) => (
              <ArtifactCard
                key={a.id}
                artifact={a}
                isPrimary={a.id === prioritizedArtifacts[0]?.id}
                onEnter={() => setHoverArtifact(a.id)}
                onLeave={() => setHoverArtifact(null)}
              />
            ))}
        </>
      )}
    </main>
  );
}