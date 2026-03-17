import { useState, useCallback, useEffect } from "react";
import { VStack, HStack } from "@coinbase/cds-web/layout";

type FocusStyleOption = "broken" | "barely" | "good";

const FOCUS_STYLES: Record<
  FocusStyleOption,
  { width: string; style: string; color: string; offset: string; label: string }
> = {
  broken: {
    width: "0",
    style: "none",
    color: "transparent",
    offset: "0",
    label: "None (invisible)",
  },
  barely: {
    width: "1px",
    style: "solid",
    color: "#ccc",
    offset: "0",
    label: "Barely visible",
  },
  good: {
    width: "2px",
    style: "solid",
    color: "#0066cc",
    offset: "2px",
    label: "Clear and visible",
  },
};

type Level1KeyboardProps = {
  onComplete: () => void;
};

export const Level1Keyboard = ({ onComplete }: Level1KeyboardProps) => {
  const [focusStyle, setFocusStyle] = useState<FocusStyleOption>("broken");
  const [guidanceOpen, setGuidanceOpen] = useState(true);
  const [hasFixedFocus, setHasFixedFocus] = useState(false);

  const applyFocusStyle = useCallback((option: FocusStyleOption) => {
    const style = FOCUS_STYLES[option];
    const root = document.documentElement;
    root.style.setProperty("--game-focus-width", style.width);
    root.style.setProperty("--game-focus-style", style.style);
    root.style.setProperty("--game-focus-color", style.color);
    root.style.setProperty("--game-focus-offset", style.offset);
  }, []);

  useEffect(() => {
    applyFocusStyle(focusStyle);
    if (focusStyle === "good") {
      setHasFixedFocus(true);
    }
    return () => {
      document.documentElement.style.removeProperty("--game-focus-width");
      document.documentElement.style.removeProperty("--game-focus-style");
      document.documentElement.style.removeProperty("--game-focus-color");
      document.documentElement.style.removeProperty("--game-focus-offset");
    };
  }, [focusStyle, applyFocusStyle]);

  const handleContinue = () => {
    if (focusStyle === "good") {
      onComplete();
    }
  };

  return (
    <VStack
      gap={4}
      padding={4}
      style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
    >
      <style>{`
        .game-focusable:focus {
          outline: var(--game-focus-width, 0) var(--game-focus-style, none) var(--game-focus-color, transparent);
          outline-offset: var(--game-focus-offset, 0);
        }
        .game-focusable:focus:not(:focus-visible) {
          outline: none;
        }
        .game-focusable:focus-visible {
          outline: var(--game-focus-width, 0) var(--game-focus-style, none) var(--game-focus-color, transparent);
          outline-offset: var(--game-focus-offset, 0);
        }
      `}</style>

      <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
        Level 1: Keyboard navigation
      </h2>

      <section aria-labelledby="guidance-heading">
        <button
          type="button"
          id="guidance-heading"
          className="game-focusable"
          onClick={() => setGuidanceOpen(!guidanceOpen)}
          aria-expanded={guidanceOpen}
          aria-controls="guidance-content"
          style={{
            width: "100%",
            padding: "12px 16px",
            textAlign: "left",
            background: "var(--color-bgSecondary)",
            border: "1px solid var(--color-bgLineHeavy)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {guidanceOpen ? "▼" : "▶"} How to use the keyboard
        </button>
        {guidanceOpen && (
          <div
            id="guidance-content"
            role="region"
            aria-labelledby="guidance-heading"
            style={{
              padding: "16px",
              marginTop: "8px",
              background: "var(--color-bgSecondary)",
              border: "1px solid var(--color-bgLineHeavy)",
              borderRadius: "8px",
            }}
          >
            <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px" }}>
              <li>
                <strong>Tab</strong> — move to the next focusable element
              </li>
              <li>
                <strong>Shift + Tab</strong> — move to the previous element
              </li>
              <li>
                <strong>Enter</strong> — activate buttons and links
              </li>
              <li>
                <strong>Escape</strong> — close modals or cancel
              </li>
            </ul>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--color-fgMuted)",
              }}
            >
              Try it: Use Tab to move through this page. Look for the focus
              indicator (outline) around the element you’re on.
            </p>
          </div>
        )}
      </section>

      <section aria-labelledby="experience-heading">
        <h3
          id="experience-heading"
          style={{ margin: "0 0 8px 0", fontSize: "1.125rem" }}
        >
          Step 1: Experience broken focus
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "var(--color-fgMuted)" }}>
          Tab through the buttons below. Notice how hard it is to see where you
          are? Many sites hide or weaken focus indicators, which makes keyboard
          navigation frustrating.
        </p>
        <HStack gap={2} flexWrap="wrap">
          {["Button A", "Button B", "Button C", "Button D"].map((label) => (
            <button
              key={label}
              type="button"
              className="game-focusable"
              style={{
                padding: "10px 20px",
                background: "var(--color-bgSecondary)",
                border: "1px solid var(--color-bgLineHeavy)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {label}
            </button>
          ))}
        </HStack>
      </section>

      <section aria-labelledby="fix-heading">
        <h3
          id="fix-heading"
          style={{ margin: "0 0 8px 0", fontSize: "1.125rem" }}
        >
          Step 2: Fix the focus indicator
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "var(--color-fgMuted)" }}>
          Choose a focus style below. The outline will update live. Pick the one
          that makes keyboard navigation easy to follow.
        </p>
        <HStack gap={2} flexWrap="wrap" alignItems="center">
          {(Object.keys(FOCUS_STYLES) as FocusStyleOption[]).map((option) => (
            <button
              key={option}
              type="button"
              className="game-focusable"
              onClick={() => setFocusStyle(option)}
              aria-pressed={focusStyle === option}
              aria-label={`Focus style: ${FOCUS_STYLES[option].label}`}
              style={{
                padding: "10px 16px",
                background:
                  focusStyle === option
                    ? "var(--color-bgPrimary)"
                    : "var(--color-bgSecondary)",
                color:
                  focusStyle === option
                    ? "var(--color-fgInverse)"
                    : "var(--color-fg)",
                border: "1px solid var(--color-bgLineHeavy)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {FOCUS_STYLES[option].label}
            </button>
          ))}
        </HStack>
      </section>

      <section aria-labelledby="complete-heading">
        <h3
          id="complete-heading"
          style={{ margin: "0 0 8px 0", fontSize: "1.125rem" }}
        >
          Step 3: Complete the level
        </h3>
        <p style={{ margin: "0 0 16px 0", color: "var(--color-fgMuted)" }}>
          {hasFixedFocus
            ? "Tab to the button below and press Enter to continue."
            : "First pick a clear focus style above, then tab to the button and press Enter."}
        </p>
        <button
          type="button"
          className="game-focusable"
          onClick={handleContinue}
          disabled={focusStyle !== "good"}
          aria-describedby={focusStyle !== "good" ? "complete-hint" : undefined}
          style={{
            padding: "12px 24px",
            background:
              focusStyle === "good"
                ? "var(--color-bgPrimary)"
                : "var(--color-bgSecondary)",
            color:
              focusStyle === "good"
                ? "var(--color-fgInverse)"
                : "var(--color-fgMuted)",
            border: "1px solid var(--color-bgLineHeavy)",
            borderRadius: "8px",
            cursor: focusStyle === "good" ? "pointer" : "not-allowed",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Continue to next level
        </button>
        {focusStyle !== "good" && (
          <p
            id="complete-hint"
            style={{
              margin: "8px 0 0 0",
              fontSize: "0.875rem",
              color: "var(--color-fgMuted)",
            }}
          >
            Tip: Select &quot;Clear and visible&quot; to enable this button.
          </p>
        )}
      </section>
    </VStack>
  );
};
