import { useState, useCallback, useEffect } from "react";
import { Box, HStack, VStack } from "@coinbase/cds-web/layout";
import { Button } from "@coinbase/cds-web/buttons";
import { Text } from "@coinbase/cds-web/typography";
import { Accordion, AccordionItem } from "@coinbase/cds-web/accordion";

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
    color: "#3578e5",
    offset: "2px",
    label: "Clear and visible",
  },
};

type Level1KeyboardProps = {
  onComplete: () => void;
};

export const Level1Keyboard = ({ onComplete }: Level1KeyboardProps) => {
  const [focusStyle, setFocusStyle] = useState<FocusStyleOption>("broken");
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
    <Box
      className="game-container"
      padding={4}
      maxWidth={640}
      width="100%"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <style>{`
        /* Override CDS focus styles so demo focus styles apply correctly */
        .game-container button:focus,
        .game-container [role="button"]:focus,
        .game-container .cds-Interactable:focus,
        .game-container .cds-Pressable:focus {
          outline: var(--game-focus-width, 0) var(--game-focus-style, none) var(--game-focus-color, transparent) !important;
          outline-offset: var(--game-focus-offset, 0) !important;
        }
        .game-container button:focus:not(:focus-visible),
        .game-container [role="button"]:focus:not(:focus-visible),
        .game-container .cds-Interactable:focus:not(:focus-visible),
        .game-container .cds-Pressable:focus:not(:focus-visible) {
          outline: none !important;
        }
        .game-container button:focus-visible,
        .game-container [role="button"]:focus-visible,
        .game-container .cds-Interactable:focus-visible,
        .game-container .cds-Pressable:focus-visible {
          outline: var(--game-focus-width, 0) var(--game-focus-style, none) var(--game-focus-color, transparent) !important;
          outline-offset: var(--game-focus-offset, 0) !important;
        }
      `}</style>

      <VStack gap={6}>
        <Text as="h2" display="block" font="headline">
          Level 1: Keyboard navigation
        </Text>

        <Accordion defaultActiveKey="guidance">
          <AccordionItem itemKey="guidance" title="How to use the keyboard">
            <VStack gap={2} paddingTop={2}>
              <Box
                as="ul"
                display="block"
                paddingStart={4}
                style={{ listStylePosition: "outside" }}
              >
                <li style={{ marginBottom: "var(--space-2)" }}>
                  <Text as="span" font="body">
                    <strong>Tab</strong> — move to the next focusable element
                  </Text>
                </li>
                <li style={{ marginBottom: "var(--space-2)" }}>
                  <Text as="span" font="body">
                    <strong>Shift + Tab</strong> — move to the previous element
                  </Text>
                </li>
                <li style={{ marginBottom: "var(--space-2)" }}>
                  <Text as="span" font="body">
                    <strong>Enter</strong> — activate buttons and links
                  </Text>
                </li>
                <li>
                  <Text as="span" font="body">
                    <strong>Escape</strong> — close modals or cancel
                  </Text>
                </li>
              </Box>
              <Text as="p" color="fgMuted" display="block" font="body">
                Try it: Use Tab to move through this page. Look for the focus
                indicator (outline) around the element you're on.
              </Text>
            </VStack>
          </AccordionItem>
        </Accordion>

        <Box
          as="section"
          aria-labelledby="experience-heading"
          paddingY={5}
          borderedBottom
          borderColor="bgLineHeavy"
        >
          <Text
            as="h3"
            id="experience-heading"
            display="block"
            font="headline"
            paddingBottom={2}
          >
            Step 1: Experience broken focus
          </Text>
          <Text
            as="p"
            color="fgMuted"
            display="block"
            font="body"
            paddingBottom={3}
          >
            Tab through the buttons below. Notice how hard it is to see where
            you are? Many sites hide or weaken focus indicators, which makes
            keyboard navigation frustrating.
          </Text>
          <HStack gap={2} flexWrap="wrap">
            {["Button A", "Button B", "Button C", "Button D"].map((label) => (
              <Button
                key={label}
                variant="secondary"
                onClick={() => {}}
                accessibilityLabel={label}
              >
                {label}
              </Button>
            ))}
          </HStack>
        </Box>

        <Box
          as="section"
          aria-labelledby="fix-heading"
          paddingY={5}
          borderedBottom
          borderColor="bgLineHeavy"
        >
          <Text
            as="h3"
            id="fix-heading"
            display="block"
            font="headline"
            paddingBottom={2}
          >
            Step 2: Fix the focus indicator
          </Text>
          <Text
            as="p"
            color="fgMuted"
            display="block"
            font="body"
            paddingBottom={3}
          >
            Choose a focus style below. The outline will update live. Pick the
            one that makes keyboard navigation easy to follow.
          </Text>
          <HStack gap={2} flexWrap="wrap" alignItems="center">
            {(Object.keys(FOCUS_STYLES) as FocusStyleOption[]).map((option) => (
              <Button
                key={option}
                variant={focusStyle === option ? "primary" : "secondary"}
                onClick={() => setFocusStyle(option)}
                aria-pressed={focusStyle === option}
                accessibilityLabel={`Focus style: ${FOCUS_STYLES[option].label}`}
              >
                {FOCUS_STYLES[option].label}
              </Button>
            ))}
          </HStack>
        </Box>

        <Box as="section" aria-labelledby="complete-heading" paddingY={5}>
          <Text
            as="h3"
            id="complete-heading"
            display="block"
            font="headline"
            paddingBottom={2}
          >
            Step 3: Complete the level
          </Text>
          <Text
            as="p"
            color="fgMuted"
            display="block"
            font="body"
            paddingBottom={3}
          >
            {hasFixedFocus
              ? "Tab to the button below and press Enter to continue."
              : "First pick a clear focus style above, then tab to the button and press Enter."}
          </Text>
          <VStack gap={1}>
            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={focusStyle !== "good"}
              accessibilityLabel="Continue to next level"
              aria-describedby={
                focusStyle !== "good" ? "complete-hint" : undefined
              }
            >
              Continue to next level
            </Button>
            {focusStyle !== "good" && (
              <Text
                id="complete-hint"
                as="p"
                color="fgMuted"
                display="block"
                font="body"
              >
                Tip: Select &quot;Clear and visible&quot; to enable this button.
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};
