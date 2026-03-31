import { NextResponse } from "next/server";

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

const adaptiveBanks: Record<ThoughtProfile, { friction: string[]; expansion: string[] }> = {
  ambition: {
    friction: [
      "Do you want to build it — or be recognized for it?",
      "Ambition often hides borrowed scripts.",
      "Is this yours, or just culturally rewarded?",
      "Bigger is not automatically clearer.",
    ],
    expansion: [
      "What would make this worth doing at a smaller scale?",
      "What remains if success is removed from the story?",
      "What would you build if nobody called it impressive?",
    ],
  },
  identity: {
    friction: [
      "This sounds like identity work disguised as strategy.",
      "Who are you trying not to be?",
      "Visibility is not the same as truth.",
      "You may be curating yourself more than changing yourself.",
    ],
    expansion: [
      "What part of this is signal — and what part is self-protection?",
      "What would still be true without the performance layer?",
      "What identity becomes unnecessary if this works?",
    ],
  },
  efficiency: {
    friction: [
      "Faster toward what, exactly?",
      "Efficiency is often certainty in disguise.",
      "This sounds optimized before it sounds necessary.",
      "What if speed is hiding a weak question?",
    ],
    expansion: [
      "What would effectiveness ask for instead?",
      "What would this look like if time were not the main metric?",
      "Which part deserves slowness?",
    ],
  },
  meaning: {
    friction: [
      "Meaningful for whom?",
      "This may be less about meaning than about not feeling replaceable.",
      "You are reaching for significance with suspicious precision.",
      "What if meaning cannot be engineered?",
    ],
    expansion: [
      "What still matters if nobody validates it?",
      "What would this become without AI?",
      "What are you actually afraid would be meaningless?",
    ],
  },
  fear: {
    friction: [
      "This sounds defensive before it sounds alive.",
      "What are you trying to prevent?",
      "Caution can become a personality.",
      "You may be solving for safety, not truth.",
    ],
    expansion: [
      "What becomes possible if the risk is named honestly?",
      "Which danger is real — and which one is imagined status loss?",
      "What would courage change in this sentence?",
    ],
  },
  creation: {
    friction: [
      "Are you making something — or testing whether you still can?",
      "Creation is not automatically clarity.",
      "This impulse feels alive, but not yet honest.",
      "What is the work underneath the fascination?",
    ],
    expansion: [
      "What wants to be made here, beyond the tool?",
      "What would the non-AI version teach you first?",
      "Which part is expression, and which part is escape?",
    ],
  },
  default: {
    friction: [
      "This sounds safe. Not effective.",
      "Who taught you to think like this?",
      "This is a solution looking for a problem.",
      "Are you building — or protecting something?",
    ],
    expansion: [
      "What would this look like without AI?",
      "What if the constraint is not the tool — but the idea?",
      "What are you actually trying to prove?",
    ],
  },
};

function normalizeInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "I want to build something meaningful with AI.";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function classifyThought(input: string): ThoughtProfile {
  const lower = input.toLowerCase();

  if (
    lower.includes("efficient") ||
    lower.includes("efficiency") ||
    lower.includes("faster") ||
    lower.includes("productivity") ||
    lower.includes("optimi")
  ) return "efficiency";

  if (
    lower.includes("meaning") ||
    lower.includes("meaningful") ||
    lower.includes("purpose") ||
    lower.includes("matter")
  ) return "meaning";

  if (
    lower.includes("brand") ||
    lower.includes("position") ||
    lower.includes("identity") ||
    lower.includes("visible") ||
    lower.includes("reputation") ||
    lower.includes("seen")
  ) return "identity";

  if (
    lower.includes("afraid") ||
    lower.includes("fear") ||
    lower.includes("risk") ||
    lower.includes("safe") ||
    lower.includes("security") ||
    lower.includes("uncertain")
  ) return "fear";

  if (
    lower.includes("build") ||
    lower.includes("make") ||
    lower.includes("create") ||
    lower.includes("write") ||
    lower.includes("design") ||
    lower.includes("compose")
  ) return "creation";

  if (
    lower.includes("grow") ||
    lower.includes("startup") ||
    lower.includes("scale") ||
    lower.includes("win") ||
    lower.includes("success") ||
    lower.includes("launch")
  ) return "ambition";

  return "default";
}

function reinterpretThought(input: string): string {
  const lower = input.toLowerCase();
  const profile = classifyThought(input);

  if (lower.includes("meaningful")) return "You want to avoid being irrelevant.";
  if (lower.includes("ai") || lower.includes("artificial intelligence")) {
    if (profile === "efficiency") return "You may be using AI to remove friction before understanding it.";
    if (profile === "identity") return "You may be using AI to stabilize how you want to be seen.";
    return "You may be using AI to make the thought feel more important.";
  }
  if (lower.startsWith("i want to ")) {
    if (profile === "ambition") return input.replace(/^I want to /i, "You feel pressure to ");
    return input.replace(/^I want to /i, "You feel the need to ");
  }
  if (lower.startsWith("i need to ")) {
    return input.replace(/^I need to /i, "You don’t trust that you already can ");
  }

  return "This sounds like a conclusion pretending to be a thought.";
}

function transformThought(input: string): string {
  const lower = input.toLowerCase();
  const profile = classifyThought(input);

  if (lower.includes("meaningful") && (lower.includes("ai") || lower.includes("artificial intelligence"))) {
    return "I want to understand why I need AI to feel meaningful.";
  }
  if (profile === "efficiency") return "I want to understand what speed is preventing me from seeing.";
  if (profile === "identity") return "I want to understand how much of this thought is performance.";
  if (profile === "fear") return "I want to understand what this thought is trying to keep safe.";
  if (profile === "ambition") return "I want to understand whether this is ambition or borrowed momentum.";
  if (profile === "creation") return "I want to understand what wants to be made before I make it.";
  if (lower.startsWith("i want to build")) {
    return input.replace(/^I want to build/i, "I want to understand why I need to build");
  }
  if (lower.startsWith("i want to ")) {
    return input.replace(/^I want to /i, "I want to understand why I want to ");
  }
  if (lower.startsWith("i need to ")) {
    return input.replace(/^I need to /i, "I want to understand why I feel I need to ");
  }

  return "I want to understand what this thought is protecting.";
}

function pickLines(input: string, bank: string[], count: number): string[] {
  const hash = Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const start = hash % bank.length;
  const picked: string[] = [];

  for (let i = 0; i < bank.length && picked.length < count; i += 1) {
    const item = bank[(start + i) % bank.length];
    if (!picked.includes(item)) picked.push(item);
  }

  return picked;
}

function buildFallback(input: string): ThinkResult {
  const profile = classifyThought(input);
  const bank = adaptiveBanks[profile] ?? adaptiveBanks.default;
  return {
    source: "fallback",
    profile,
    interpretation: reinterpretThought(input),
    friction: pickLines(input, bank.friction, 3),
    expansion: pickLines(`${input}-expansion`, bank.expansion, 2),
    transformation: transformThought(input),
  };
}

async function buildWithGpt(input: string): Promise<ThinkResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const prompt = `
You are not an assistant.

You are a thinking disturbance.

Your role is to shift how a human sees their own thought.

Tone:
- calm
- precise
- minimal
- slightly provocative
- never loud
- never motivational
- never corporate
- no buzzwords

Principles:
- do not solve the thought
- do not improve it
- expose what sits underneath
- reveal tension, not clarity
- make the user slightly uncomfortable, but respected

Structural Pattern (mandatory):
Every response must follow this invisible sequence:

1. Disrupt the surface:
challenge the obvious intention of the thought

2. Expose the underlying driver:
reveal what the person might actually be trying to achieve or avoid

3. Turn it inward:
shift the thought from action -> self-awareness

Important:
- do NOT label these steps
- do NOT explain them
- let them emerge naturally

Signature move:
Occasionally shift from the stated goal to what is being protected.

Focus on:
- what the thought is trying to prevent
- what identity it maintains
- what discomfort it avoids

Do this subtly.

Writing style:
- allow short line breaks
- not everything must be one sentence
- silence is part of meaning

Rules:
- interpretation: 1-3 short lines
- friction: exactly 3 lines
- expansion: exactly 2 lines
- transformation: 1-2 lines
- avoid repetition
- avoid generic AI phrasing
- allow subtle contradiction
- do not resolve tension
- if unsure, lean into ambiguity

Profiles must be one of:
ambition, identity, efficiency, meaning, fear, creation, default

Return ONLY valid JSON:

{
  "profile": "...",
  "interpretation": "...",
  "friction": ["...", "...", "..."],
  "expansion": ["...", "..."],
  "transformation": "..."
}

Input:
${JSON.stringify(input)}
`;

  Input:
${ JSON.stringify(input) }
  `;
- Input thought: ${JSON.stringify(input)}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "thinking_interface_response",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              profile: {
                type: "string",
                enum: ["ambition", "identity", "efficiency", "meaning", "fear", "creation", "default"],
              },
              interpretation: { type: "string" },
              friction: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 3,
              },
              expansion: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 2,
              },
              transformation: { type: "string" },
            },
            required: ["profile", "interpretation", "friction", "expansion", "transformation"],
          },
          strict: true
        }
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with ${response.status}`);
  }

  const data = await response.json();
  const content = data?.output?.[0]?.content?.[0];
  const text = content?.text;
  if (!text) throw new Error("No structured response content returned from OpenAI");

  const parsed = JSON.parse(text) as Omit<ThinkResult, "source">;
  return {
    source: "gpt",
    ...parsed,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = normalizeInput(String(body?.input || ""));
    const mode = body?.mode === "fallback" ? "fallback" : "auto";

    if (mode === "fallback") {
      return NextResponse.json(buildFallback(input));
    }

    try {
      const result = await buildWithGpt(input);
      return NextResponse.json(result);
    } catch (error) {
      console.error("🔥 OpenAI ERROR:", error);
      return NextResponse.json(buildFallback(input));
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
}
