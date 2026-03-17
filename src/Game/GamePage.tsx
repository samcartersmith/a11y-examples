import { useState } from "react";
import { VStack, HStack } from "@coinbase/cds-web/layout";
import { Level1Keyboard } from "./Level1Keyboard";

type GameView = "intro" | "level1" | "level1Complete";

export const GamePage = () => {
  const [view, setView] = useState<GameView>("intro");

  return (
    <VStack background="bg" minHeight="100vh" padding={4} gap={4}>
      <header>
        <HStack justifyContent="space-between" alignItems="center">
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
            GAAD Accessibility Quest
          </h1>
          <a
            href="#/"
            style={{
              padding: "8px 16px",
              color: "var(--color-fg)",
              textDecoration: "none",
              border: "1px solid var(--color-bgLineHeavy)",
              borderRadius: "8px",
            }}
          >
            ← Back to examples
          </a>
        </HStack>
      </header>

      {view === "intro" && (
        <VStack
          gap={4}
          style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "1.125rem",
              color: "var(--color-fgMuted)",
            }}
          >
            Learn how to use assistive technology through a short, hands-on
            game. Each level introduces a different way people interact with the
            web.
          </p>

          <ol style={{ margin: 0, paddingLeft: "24px" }}>
            <li>
              <strong>Level 1: Keyboard</strong> — Navigate with Tab and Enter,
              and fix a broken focus indicator.
            </li>
            <li>
              <strong>Level 2: Screen reader</strong> — Find hidden content
              using a screen reader. (Coming soon)
            </li>
            <li>
              <strong>Level 3: Voice dictation</strong> — Complete actions with
              your voice. (Coming soon)
            </li>
          </ol>

          <button
            type="button"
            onClick={() => setView("level1")}
            style={{
              alignSelf: "flex-start",
              padding: "12px 24px",
              background: "var(--color-bgPrimary)",
              color: "var(--color-fgInverse)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Start Level 1
          </button>
        </VStack>
      )}

      {view === "level1" && (
        <Level1Keyboard onComplete={() => setView("level1Complete")} />
      )}

      {view === "level1Complete" && (
        <VStack
          gap={4}
          style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "24px",
              background: "var(--color-bgPositive)",
              border: "1px solid var(--color-fgPositive)",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.25rem" }}>
              Level 1 complete
            </h2>
            <p style={{ margin: 0, color: "var(--color-fg)" }}>
              You fixed the focus indicator and navigated with the keyboard.
              Levels 2 and 3 are coming soon.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView("intro")}
            style={{
              alignSelf: "flex-start",
              padding: "10px 20px",
              background: "var(--color-bgSecondary)",
              color: "var(--color-fg)",
              border: "1px solid var(--color-bgLineHeavy)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Back to intro
          </button>
        </VStack>
      )}
    </VStack>
  );
};
