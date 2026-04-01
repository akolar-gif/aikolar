"use client";

import { useMemo, useState } from "react";

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
  debug?: string;
};

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

function normalizeInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "I want to build something meaningful with AI.";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function WordMorph({ text }: { text: string }) {
  const blocks = text.split("\n");

  return (
    <div style={{ display: "grid", gap: "0.6rem" }}>
      {blocks.map((block, blockIndex) => {
        const words = block.split(" ");
        return (
          <p
            key={`${block}-${blockIndex}`}
            style={{
              maxWidth: "18ch",
              fontSize: "clamp(2rem, 4.2vw, 4.25rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: 0,
              fontWeight: blockIndex === 0 ? 560 : 420,
              color:
                blockIndex === 0 ? "#f5f1e3" : "rgba(245,241,227,0.72)",
            }}
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}-${blockIndex}`}
                style={{
                  display: "inline-block",
                  marginRight: "0.28em",
                }}
              >
                {word}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function ArtifactCard({
  artifact,
  isPrimary,
  onEnter,
  onLeave,
}: {
  artifact: Artifact;
  isPrimary: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      style={{
        position: "relative",
        margin: "0 auto",
        minHeight: "70vh",
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2rem",
        padding: "4rem 1.5rem",
        opacity: isPrimary ? 1 : 0.72,
        transform: isPrimary ? "scale(1)" : "scale(0.985)",
        transition:
          "opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1), border-color 700ms cubic-bezier(.22,1,.36,1), background 700ms cubic-bezier(.22,1,.36,1)",
        borderLeft: isPrimary
          ? "2px solid rgba(0,166,118,0.9)"
          : "2px solid transparent",
        paddingLeft: isPrimary ? "1.8rem" : "1.5rem",
        background: isPrimary ? "rgba(255,255,255,0.02)" : "transparent",
      }}
    >
      <div style={{ display: "grid", gap: "1.5rem", opacity: isPrimary ? 1 : 0.8 }}>
        <p
          style={{
            maxWidth: "17ch",
            fontSize: "clamp(1.8rem,3.5vw,4rem)",
            lineHeight: 1.16,
            margin: 0,
            color: isPrimary ? "#f5f1e3" : "rgba(245,241,227,0.72)",
          }}
        >
          {artifact.initial}
        </p>
        <p
          style={{
            maxWidth: "32ch",
            fontSize: "clamp(1rem,1.9vw,1.4rem)",
            color: isPrimary
              ? "rgba(245,241,227,0.42)"
              : "rgba(245,241,227,0.3)",
            margin: 0,
          }}
        >
          {artifact.distortion}
        </p>
        <p
          style={{
            maxWidth: "26ch",
            fontSize: "clamp(1.3rem,2.6vw,2.8rem)",
            color: isPrimary
              ? "rgba(245,241,227,0.92)"
              : "rgba(245,241,227,0.6)",
            lineHeight: 1.28,
            margin: 0,
          }}
        >
          {artifact.shift}
        </p>
      </div>

      <div style={{ paddingTop: "0.6rem", maxWidth: "35rem", opacity: isPrimary ? 1 : 0.72 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              fontSize: "0.72rem",
              color: isPrimary ? "#00A676" : "rgba(245,241,227,0.3)",
              margin: 0,
            }}
          >
            {isPrimary ? "first resonance" : "artifact"}
          </p>
          {isPrimary ? (
            <span
              style={{
                height: 1,
                width: 48,
                background: "rgba(0,166,118,0.65)",
                display: "block",
              }}
            />
          ) : null}
        </div>

        <p style={{ margin: 0, color: "rgba(245,241,227,0.76)", lineHeight: 1.7 }}>
          {artifact.result}
        </p>
        <a
          href={artifact.href}
          target={artifact.href.startsWith("http") ? "_blank" : undefined}
          rel={artifact.href.startsWith("http") ? "noreferrer" : undefined}
          style={{
            marginTop: "1.4rem",
            display: "inline-block",
            color: isPrimary
              ? "rgba(0,166,118,0.96)"
              : "rgba(0,166,118,0.68)",
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            fontSize: "0.76rem",
            textDecoration: "none",
          }}
        >
          {artifact.id === "albums"
            ? "music traces"
            : artifact.href.replace(/^https?:\/\//, "")}
        </a>
      </div>
    </article>
  );
}

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [committedThought, setCommittedThought] = useState("");
  const [result, setResult] = useState<ThinkResult | null>(null);
  const [hoverArtifact, setHoverArtifact] = useState<string | null>(null);

  const normalizedThought = useMemo(
    () => normalizeInput(committedThought),
    [committedThought],
  );

  const profile = result?.profile ?? "default";
  const source = result?.source ?? "fallback";

  const prioritizedArtifacts = useMemo(() => {
    const order: Record<ThoughtProfile, string[]> = {
      identity: ["sinfrey", "andreas-kolar", "art-kolar", "albums"],
      creation: ["art-kolar", "albums", "sinfrey", "andreas-kolar"],
      ambition: ["andreas-kolar", "sinfrey", "albums", "art-kolar"],
      efficiency: ["andreas-kolar", "albums", "sinfrey", "art-kolar"],
      meaning: ["art-kolar", "albums", "andreas-kolar", "sinfrey"],
      fear: ["andreas-kolar", "art-kolar", "albums", "sinfrey"],
      default: ["andreas-kolar", "art-kolar", "sinfrey", "albums"],
    };

    return order[profile]
      .map((id) => artifacts.find((artifact) => artifact.id === id))
      .filter((artifact): artifact is Artifact => Boolean(artifact));
  }, [profile]);

  const transformedThought = useMemo(() => {
    const transformedBase =
      result?.transformation ?? "I want to understand what this thought is protecting.";
    const activeArtifactId = hoverArtifact ?? prioritizedArtifacts[0]?.id;

    if (!activeArtifactId) return transformedBase;

    if (activeArtifactId === "sinfrey") {
      return `${transformedBase}\n\nMaybe visibility is doing more work here than truth.`;
    }
    if (activeArtifactId === "art-kolar") {
      return `${transformedBase}\n\nMaybe what you call meaning is really a way of being seen differently.`;
    }
    if (activeArtifactId === "albums") {
      return `${transformedBase}\n\nMaybe the structure matters more than the output.`;
    }
    if (activeArtifactId === "andreas-kolar") {
      return `${transformedBase}\n\nMaybe coherence is not the goal. Maybe trace is enough.`;
    }

    return transformedBase;
  }, [hoverArtifact, prioritizedArtifacts, result?.transformation]);

  async function run() {
    const nextThought = normalizeInput(inputValue);

    setCommittedThought(nextThought);

    // 👉 sofort visuelles Feedback (kein "nichts passiert" Moment)
    setResult({
      source: "fallback",
      profile: "default",
      interpretation: "This thought is still forming",
      friction: [],
      expansion: [],
      transformation: "Wait.",
    });

    try {
      const response = await fetch("/api/think", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: nextThought }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      // optional fallback
      setResult({
        source: "fallback",
        profile: "default",
        interpretation: "Something interrupted the thought.",
        friction: [],
        expansion: [],
        transformation: "Try again.",
      });
    }
  }

  return (
    <main
      style={{
        padding: "4rem 2rem",
        background: "black",
        color: "#f5f1e3",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {!result ? (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.34em",
              fontSize: "0.78rem",
              color: "rgba(245,241,227,0.42)",
              marginBottom: "2rem",
            }}
          >
            You don’t think alone anymore.
          </p>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (inputValue.trim()) {
                  run();
                }
              }
            }}
            placeholder="start with a thought"
            style={{
              width: "100%",
              border: 0,
              borderBottom: "1px solid rgba(245,241,227,0.12)",
              background: "transparent",
              color: "#f5f1e3",
              fontSize: "clamp(1.7rem, 4vw, 4rem)",
              padding: "1rem 0.25rem 1.2rem",
              outline: "none",
            }}
          />


          <button
            type="button"
            onClick={run}
            disabled={!inputValue.trim()}
            style={{
              marginTop: "1.5rem",
              background: "transparent",
              border: 0,
              color: inputValue.trim()
                ? "rgba(245,241,227,0.56)"
                : "rgba(245,241,227,0.22)",
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: "0.75rem",
              cursor: inputValue.trim() ? "pointer" : "default",
            }}
          >
            enter
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: "3rem" }}>
          <div style={{ display: "grid", gap: "1rem" }}>
            <WordMorph text={normalizedThought} />
            <p
              style={{
                color: "rgba(245,241,227,0.34)",
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: "0.72rem",
                margin: 0,
              }}
            >
              This is what you think.
            </p>
          </div>

          <div style={{ maxWidth: "32ch" }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(1.15rem,2.2vw,2.1rem)",
                color: "rgba(245,241,227,0.42)",
                lineHeight: 1.45,
                whiteSpace: "pre-line",
              }}
            >
              {result.interpretation}
            </p>
            <p
              style={{
                marginTop: "0.75rem",
                color: "rgba(245,241,227,0.28)",
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: "0.72rem",
              }}
            >
              This is already different.
            </p>
          </div>

          <div style={{ position: "relative", minHeight: 220 }}>
            {result.friction.map((line, index) => (
              <p
                key={line}
                style={{
                  position: "absolute",
                  color: "rgba(245,241,227,0.34)",
                  fontSize: "0.96rem",
                  letterSpacing: "0.08em",
                  lineHeight: 1.65,
                  left: index === 0 ? "4%" : index === 2 ? "20%" : "auto",
                  right: index === 1 ? "8%" : "auto",
                  top: index === 0 ? "0.25rem" : index === 1 ? "4.25rem" : "9.5rem",
                  maxWidth: index === 1 ? "18ch" : index === 2 ? "24ch" : undefined,
                  textAlign: index === 1 ? "right" : "left",
                  margin: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            {result.expansion.map((line) => (
              <p
                key={line}
                style={{
                  maxWidth: "30ch",
                  fontSize: "clamp(1.35rem,2.6vw,3rem)",
                  color: "rgba(245,241,227,0.8)",
                  margin: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div>
            <WordMorph text={transformedThought} />
          </div>

          <section
            style={{
              position: "relative",
              borderTop: "1px solid rgba(245,241,227,0.08)",
              paddingTop: "2rem",
            }}
          >
            <p
              style={{
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.34em",
                fontSize: "0.74rem",
                color: "rgba(245,241,227,0.34)",
              }}
            >
              These are not projects. They are consequences.
            </p>
            <p
              style={{
                marginTop: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.26em",
                fontSize: "0.7rem",
                color: "rgba(245,241,227,0.22)",
              }}
            >
              adaptive profile: {profile} · source: {source}
            </p>
            <p
              style={{
                marginTop: "0.55rem",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontSize: "0.68rem",
                color: "rgba(0,166,118,0.78)",
              }}
            >
              first resonance: {prioritizedArtifacts[0]?.id ?? "none"}
            </p>

            <div style={{ marginTop: "2rem" }}>
              <p style={{ color: "red" }}>
                ORDER: {prioritizedArtifacts.map((a) => a.id).join(" → ")}
              </p>
              {prioritizedArtifacts.map((artifact) => (
                <ArtifactCard
                  key={artifact.id}
                  artifact={artifact}
                  isPrimary={artifact.id === prioritizedArtifacts[0]?.id}
                  onEnter={() => setHoverArtifact(artifact.id)}
                  onLeave={() => setHoverArtifact(null)}
                />
              ))}
            </div>
          </section>

          <section
            style={{
              display: "grid",
              gap: "2rem",
              paddingTop: "2rem",
            }}
          >
            <p
              style={{
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.34em",
                fontSize: "0.74rem",
                color: "rgba(245,241,227,0.34)",
              }}
            >
              Different thought. Same pattern.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    fontSize: "0.72rem",
                    color: "rgba(245,241,227,0.28)",
                  }}
                >
                  Before
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.65rem,3vw,3.4rem)",
                    lineHeight: 1.15,
                    color: "rgba(245,241,227,0.78)",
                  }}
                >
                  {normalizedThought}
                </p>
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    fontSize: "0.72rem",
                    color: "rgba(0,166,118,0.92)",
                  }}
                >
                  After
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.65rem,3vw,3.4rem)",
                    lineHeight: 1.15,
                    whiteSpace: "pre-line",
                  }}
                >
                  {transformedThought}
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}