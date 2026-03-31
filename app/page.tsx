"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const artifacts: Artifact[] = [
  {
    id: "andreas-kolar",
    initial: "I should have a website that represents me.",
    distortion: "You want to look coherent.",
    shift: "Coherence is often just well-designed inconsistency.",
    result:
      "An early AI project. Less a statement than a trace of conceptual thinking before clarity arrived.",
    href: "https://andreas.kolar.berlin",
  },
  {
    id: "art-kolar",
    initial: "Can AI create art?",
    distortion: "You’re asking if authorship still matters.",
    shift: "Art was never about who made it. It was about what it makes visible.",
    result:
      "AI-generated images paired with gallery-like texts. Not proof of art. A change in observation.",
    href: "https://art.kolar.berlin",
  },
  {
    id: "sinfrey",
    initial: "What if I build a fashion brand with AI?",
    distortion: "You want to see if reality is optional.",
    shift: "Perception creates value faster than production.",
    result:
      "A fictional high-end brand that feels real enough to expose how value is staged.",
    href: "https://sinfrey.com",
  },
  {
    id: "albums",
    initial: "Can AI generate music?",
    distortion: "You’re trying to feel something through a machine.",
    shift: "The music was never the point. The narrative was.",
    result:
      "Narrative-driven albums that behave more like emotional sequences than isolated tracks.",
    href: "#music-artifacts",
  },
];

function normalizeInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "I want to build something meaningful with AI.";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function useStageTimeline(active: boolean, paused: boolean) {
  const [stage, setStage] = useState<ExperienceStage>("idle");
  const [artifactIndex, setArtifactIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!active) {
      setStage("idle");
      setArtifactIndex(0);
      return;
    }

    if (paused) return;

    const schedule = (delay: number, cb: () => void) => {
      timeoutRef.current = window.setTimeout(cb, delay);
    };

    switch (stage) {
      case "idle":
        schedule(120, () => setStage("intention"));
        break;
      case "intention":
        schedule(1400, () => setStage("interpretation"));
        break;
      case "interpretation":
        schedule(1800, () => setStage("friction"));
        break;
      case "friction":
        schedule(2400, () => setStage("expansion"));
        break;
      case "expansion":
        schedule(2400, () => setStage("transformation"));
        break;
      case "transformation":
        schedule(2200, () => setStage("bridge"));
        break;
      case "bridge":
        schedule(1800, () => setStage("artifacts"));
        break;
      case "artifacts":
        if (artifactIndex < artifacts.length - 1) {
          schedule(3200, () => setArtifactIndex((value) => value + 1));
        } else {
          schedule(4200, () => setStage("mirror"));
        }
        break;
      case "mirror":
        schedule(3600, () => setStage("exit"));
        break;
      case "exit":
      default:
        break;
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [active, paused, stage, artifactIndex]);

  return { stage, artifactIndex, setStage, setArtifactIndex };
}

function WordMorph({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p style={{
      maxWidth: "16ch",
      fontSize: "clamp(2rem, 4.2vw, 4.25rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.03em",
      margin: 0,
      fontWeight: 560,
    }}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            opacity: 1,
            transform: "translateY(0)",
            transition: `all 500ms cubic-bezier(.22,1,.36,1) ${index * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

function ArtifactEcho({ artifact }: { artifact: Artifact }) {
  return (
    <article
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
      }}
    >
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <p style={{ maxWidth: "17ch", fontSize: "clamp(1.8rem,3.5vw,4rem)", lineHeight: 1.16, margin: 0 }}>{artifact.initial}</p>
        <p style={{ maxWidth: "32ch", fontSize: "clamp(1rem,1.9vw,1.4rem)", color: "rgba(245,241,227,0.42)", margin: 0 }}>{artifact.distortion}</p>
        <p style={{ maxWidth: "26ch", fontSize: "clamp(1.3rem,2.6vw,2.8rem)", color: "rgba(245,241,227,0.86)", lineHeight: 1.28, margin: 0 }}>{artifact.shift}</p>
      </div>

      <div style={{ paddingTop: "0.6rem", maxWidth: "35rem" }}>
        <p style={{ color: "rgba(245,241,227,0.3)", textTransform: "uppercase", letterSpacing: "0.24em", fontSize: "0.75rem", margin: "0 0 1rem" }}>artifact</p>
        <p style={{ margin: 0, color: "rgba(245,241,227,0.76)", lineHeight: 1.7 }}>{artifact.result}</p>
        <a
          href={artifact.href}
          target={artifact.href.startsWith("http") ? "_blank" : undefined}
          rel={artifact.href.startsWith("http") ? "noreferrer" : undefined}
          style={{
            marginTop: "1.4rem",
            display: "inline-block",
            color: "rgba(0,166,118,0.96)",
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            fontSize: "0.76rem",
            textDecoration: "none",
          }}
        >
          {artifact.id === "albums" ? "music traces" : artifact.href.replace(/^https?:\/\//, "")}
        </a>
      </div>
    </article>
  );
}

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [committedThought, setCommittedThought] = useState("");
  const [experienceStarted, setExperienceStarted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [hoverArtifact, setHoverArtifact] = useState<string | null>(null);
  const [thinkResult, setThinkResult] = useState<ThinkResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedThought = useMemo(() => normalizeInput(committedThought), [committedThought]);
  const interpretedThought = thinkResult?.interpretation ?? "You may be using AI to make the thought feel more important.";
  const transformedThoughtBase = thinkResult?.transformation ?? "I want to understand what this thought is protecting.";
  const frictionLines = thinkResult?.friction ?? [];
  const expansionLines = thinkResult?.expansion ?? [];
  const profile = thinkResult?.profile ?? "default";
  const source = thinkResult?.source ?? "fallback";

  const transformedThought = useMemo(() => {
    if (!hoverArtifact) return transformedThoughtBase;
    if (hoverArtifact === "sinfrey") return transformedThoughtBase.replace("meaningful", "visible");
    if (hoverArtifact === "art-kolar") return transformedThoughtBase.replace("understand", "question");
    if (hoverArtifact === "albums") return transformedThoughtBase.replace("AI", "a machine");
    return transformedThoughtBase;
  }, [hoverArtifact, transformedThoughtBase]);

  const { stage, artifactIndex, setStage, setArtifactIndex } = useStageTimeline(
    experienceStarted && !!thinkResult,
    isHolding,
  );

  const hasActiveExperience = experienceStarted && stage !== "idle";

  const submitThought = async () => {
    const nextThought = normalizeInput(inputValue);
    setCommittedThought(nextThought);
    setExperienceStarted(true);
    setStage("idle");
    setArtifactIndex(0);
    setHoverArtifact(null);
    setThinkResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/think", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: nextThought }),
      });
      const data = await response.json();
      setThinkResult(data);
    } catch {
      setThinkResult({
        source: "fallback",
        profile: "default",
        interpretation: "You may be using AI to make the thought feel more important.",
        friction: [
          "This sounds safe. Not effective.",
          "Who taught you to think like this?",
          "Are you building — or protecting something?",
        ],
        expansion: [
          "What would this look like without AI?",
          "What are you actually trying to prove?",
        ],
        transformation: "I want to understand what this thought is protecting.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetExperience = () => {
    setInputValue("");
    setCommittedThought("");
    setExperienceStarted(false);
    setStage("idle");
    setArtifactIndex(0);
    setHoverArtifact(null);
    setIsHolding(false);
    setThinkResult(null);
    setIsLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "#f5f1e3",
        fontFamily: "Inter, system-ui, sans-serif",
        position: "relative",
      }}
    >
      <div style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background:
          hasActiveExperience
            ? "radial-gradient(circle at center, rgba(16,185,129,0.14), transparent 34%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 30%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.03), transparent 25%)"
            : "radial-gradient(circle at center, rgba(16,185,129,0.06), transparent 34%)",
      }} />

      {!experienceStarted ? (
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ width: "100%", maxWidth: "860px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>
            <p style={{ textTransform: "uppercase", letterSpacing: "0.34em", fontSize: "0.8rem", color: "rgba(245,241,227,0.42)", margin: 0 }}>
              You don’t think alone anymore.
            </p>

            <div style={{ width: "100%" }}>
              <label htmlFor="thought" style={{ position: "absolute", left: "-9999px" }}>Start with a thought</label>
              <input
                id="thought"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !isLoading && inputValue.trim()) void submitThought();
                }}
                placeholder="start with a thought"
                style={{
                  width: "100%",
                  border: 0,
                  borderBottom: "1px solid rgba(245,241,227,0.12)",
                  background: "transparent",
                  padding: "1.25rem 0.25rem",
                  textAlign: "center",
                  fontSize: "clamp(1.7rem, 4vw, 4rem)",
                  letterSpacing: "-0.03em",
                  color: "#f5f1e3",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => void submitThought()}
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: "transparent",
                border: 0,
                color: inputValue.trim() ? "rgba(245,241,227,0.56)" : "rgba(245,241,227,0.22)",
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                fontSize: "0.75rem",
                cursor: inputValue.trim() && !isLoading ? "pointer" : "default",
              }}
            >
              {isLoading ? "thinking" : "enter"}
            </button>
          </div>
        </section>
      ) : (
        <div
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
        >
          <section style={{ position: "relative", margin: "0 auto", minHeight: "100vh", maxWidth: "1100px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", padding: "6rem 1.5rem" }}>
            <div style={{ display: "grid", gap: "2rem" }}>
              {(stage === "intention" ||
                stage === "interpretation" ||
                stage === "friction" ||
                stage === "expansion" ||
                stage === "transformation" ||
                stage === "bridge" ||
                stage === "artifacts" ||
                stage === "mirror" ||
                stage === "exit") && (
                <div style={{ display: "grid", gap: "1rem" }}>
                  <WordMorph text={normalizedThought} />
                  <p style={{ color: "rgba(245,241,227,0.34)", textTransform: "uppercase", letterSpacing: "0.32em", fontSize: "0.72rem", margin: 0 }}>
                    This is what you think.
                  </p>
                </div>
              )}

              {(stage === "interpretation" ||
                stage === "friction" ||
                stage === "expansion" ||
                stage === "transformation" ||
                stage === "bridge" ||
                stage === "artifacts" ||
                stage === "mirror" ||
                stage === "exit") && (
                <div style={{ maxWidth: "32ch", paddingTop: "0.5rem" }}>
                  <p style={{ margin: 0, fontSize: "clamp(1.15rem,2.2vw,2.1rem)", color: "rgba(245,241,227,0.42)", lineHeight: 1.45 }}>{interpretedThought}</p>
                  <p style={{ marginTop: "0.75rem", color: "rgba(245,241,227,0.28)", textTransform: "uppercase", letterSpacing: "0.32em", fontSize: "0.72rem" }}>
                    This is already different.
                  </p>
                </div>
              )}

              {(stage === "friction" ||
                stage === "expansion" ||
                stage === "transformation" ||
                stage === "bridge" ||
                stage === "artifacts" ||
                stage === "mirror" ||
                stage === "exit") && (
                <div style={{ position: "relative", minHeight: "220px", paddingTop: "1rem" }}>
                  {frictionLines.map((line, index) => (
                    <p
                      key={line}
                      style={{
                        position: "absolute",
                        color: isHolding ? "rgba(245,241,227,0.18)" : "rgba(245,241,227,0.34)",
                        fontSize: "0.96rem",
                        letterSpacing: "0.08em",
                        lineHeight: 1.65,
                        left: index === 0 ? "4%" : index === 2 ? "20%" : "auto",
                        right: index === 1 ? "8%" : "auto",
                        top: index === 0 ? "0.25rem" : index === 1 ? "4.25rem" : "9.5rem",
                        maxWidth: index === 1 ? "18ch" : index === 2 ? "24ch" : undefined,
                        textAlign: index === 1 ? "right" : "left",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {(stage === "expansion" ||
                stage === "transformation" ||
                stage === "bridge" ||
                stage === "artifacts" ||
                stage === "mirror" ||
                stage === "exit") && (
                <div style={{ display: "grid", gap: "1rem", paddingTop: "0.5rem" }}>
                  {expansionLines.map((line) => (
                    <p key={line} style={{ maxWidth: "30ch", fontSize: "clamp(1.35rem,2.6vw,3rem)", color: "rgba(245,241,227,0.8)", margin: 0 }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {(stage === "transformation" ||
                stage === "bridge" ||
                stage === "artifacts" ||
                stage === "mirror" ||
                stage === "exit") && (
                <div style={{ paddingTop: "0.75rem" }}>
                  <WordMorph text={transformedThought} />
                </div>
              )}

              {stage === "bridge" && (
                <p style={{ color: "rgba(245,241,227,0.32)", textTransform: "uppercase", letterSpacing: "0.32em", fontSize: "0.76rem", paddingTop: "0.75rem", margin: 0 }}>
                  This is not new.
                </p>
              )}
            </div>

            <div style={{ paddingTop: "0.5rem", color: "rgba(245,241,227,0.28)", textTransform: "uppercase", letterSpacing: "0.28em", fontSize: "0.74rem" }}>
              {isHolding ? "You’re holding on." : "Hold to resist."}
            </div>
          </section>

          {(stage === "artifacts" || stage === "mirror" || stage === "exit") && (
            <section style={{ position: "relative", borderTop: "1px solid rgba(245,241,227,0.08)", paddingTop: "2rem" }}>
              <div style={{ margin: "0 auto", maxWidth: "1100px", padding: "0 1.5rem" }}>
                <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.34em", fontSize: "0.74rem", color: "rgba(245,241,227,0.34)" }}>
                  These are not projects. They are consequences.
                </p>
                <p style={{ marginTop: "0.75rem", textTransform: "uppercase", letterSpacing: "0.26em", fontSize: "0.7rem", color: "rgba(245,241,227,0.22)" }}>
                  adaptive profile: {profile} · source: {source}
                </p>
              </div>

              <div style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
                <div style={{ position: "sticky", top: 0, minHeight: "100vh", display: "flex", alignItems: "center", maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
                  <p style={{ maxWidth: "26ch", fontSize: "clamp(2.4rem,4.2vw,5rem)", color: "rgba(245,241,227,0.09)", lineHeight: 1.08, letterSpacing: "-0.04em", filter: "blur(1px)" }}>
                    {transformedThought}
                  </p>
                </div>
              </div>

              <div style={{ position: "relative", zIndex: 2 }}>
                {artifacts.slice(0, artifactIndex + 1).map((artifact) => (
                  <div
                    key={artifact.id}
                    onMouseEnter={() => setHoverArtifact(artifact.id)}
                    onMouseLeave={() => setHoverArtifact(null)}
                    onFocus={() => setHoverArtifact(artifact.id)}
                    onBlur={() => setHoverArtifact(null)}
                  >
                    <ArtifactEcho artifact={artifact} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {(stage === "mirror" || stage === "exit") && (
            <section style={{ position: "relative", margin: "0 auto", minHeight: "80vh", maxWidth: "1100px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", padding: "6rem 1.5rem" }}>
              <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.34em", fontSize: "0.74rem", color: "rgba(245,241,227,0.34)" }}>
                Different thought. Same pattern.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                <div>
                  <p style={{ margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.72rem", color: "rgba(245,241,227,0.28)" }}>
                    Before
                  </p>
                  <p style={{ margin: 0, fontSize: "clamp(1.65rem,3vw,3.4rem)", lineHeight: 1.15, color: "rgba(245,241,227,0.78)" }}>
                    {normalizedThought}
                  </p>
                </div>
                <div>
                  <p style={{ margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.72rem", color: "rgba(0,166,118,0.92)" }}>
                    After
                  </p>
                  <p style={{ margin: 0, fontSize: "clamp(1.65rem,3vw,3.4rem)", lineHeight: 1.15 }}>
                    {transformedThought}
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, maxWidth: "28ch", color: "rgba(245,241,227,0.68)", fontSize: "clamp(1.1rem,1.8vw,2rem)" }}>
                You did the same thing.
              </p>
            </section>
          )}

          {stage === "exit" && (
            <section style={{ position: "relative", margin: "0 auto", minHeight: "70vh", maxWidth: "1100px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem", padding: "6rem 1.5rem" }}>
              <p style={{ margin: 0, maxWidth: "18ch", fontSize: "clamp(1.65rem,3vw,3.4rem)", lineHeight: 1.15 }}>
                You can use AI to move faster.
              </p>
              <p style={{ margin: 0, maxWidth: "18ch", fontSize: "clamp(1.65rem,3vw,3.4rem)", lineHeight: 1.15, color: "rgba(245,241,227,0.72)" }}>
                Or to see differently.
              </p>
              <p style={{ marginTop: "1rem", textTransform: "uppercase", letterSpacing: "0.34em", fontSize: "0.74rem", color: "rgba(245,241,227,0.34)" }}>
                You’ve already chosen.
              </p>

              <div style={{ paddingTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={resetExperience}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: "rgba(245,241,227,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.34em",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  Try another.
                </button>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
