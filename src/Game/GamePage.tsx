import { useState } from "react";
import { Box, HStack, VStack } from "@coinbase/cds-web/layout";
import { Button } from "@coinbase/cds-web/buttons";
import { Link } from "@coinbase/cds-web/typography";
import { Text } from "@coinbase/cds-web/typography";
import { Level1Keyboard } from "./Level1Keyboard";

type GameView = "intro" | "level1" | "level1Complete";

export const GamePage = () => {
  const [view, setView] = useState<GameView>("intro");

  return (
    <VStack background="bg" minHeight="100vh" padding={4} gap={4}>
      <header>
        <HStack justifyContent="space-between" alignItems="center">
          <Text as="h1" font="headline">
            GAAD Accessibility Quest
          </Text>
          <Link href="#/" font="body">
            ← Back to examples
          </Link>
        </HStack>
      </header>

      {view === "intro" && (
        <VStack
          gap={4}
          style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
        >
          <Text as="p" color="fgMuted" display="block" font="body">
            Learn how to use assistive technology through a short, hands-on
            game. Each level introduces a different way people interact with the
            web.
          </Text>

          <Box as="ol" paddingStart={4}>
            <li>
              <Text as="span" font="body">
                <strong>Level 1: Keyboard</strong> — Navigate with Tab and
                Enter, and fix a broken focus indicator.
              </Text>
            </li>
            <li>
              <Text as="span" font="body">
                <strong>Level 2: Screen reader</strong> — Find hidden content
                using a screen reader. (Coming soon)
              </Text>
            </li>
            <li>
              <Text as="span" font="body">
                <strong>Level 3: Voice dictation</strong> — Complete actions
                with your voice. (Coming soon)
              </Text>
            </li>
          </Box>

          <Button
            variant="primary"
            onClick={() => setView("level1")}
            accessibilityLabel="Start Level 1"
          >
            Start Level 1
          </Button>
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
          <Box
            role="status"
            aria-live="polite"
            padding={4}
            background="bgPositive"
            borderColor="fgPositive"
            bordered
            borderRadius={800}
          >
            <Text as="h2" display="block" font="headline" paddingBottom={1}>
              Level 1 complete
            </Text>
            <Text as="p" color="fg" display="block" font="body">
              You fixed the focus indicator and navigated with the keyboard.
              Levels 2 and 3 are coming soon.
            </Text>
          </Box>
          <Button
            variant="secondary"
            onClick={() => setView("intro")}
            accessibilityLabel="Back to intro"
          >
            Back to intro
          </Button>
        </VStack>
      )}
    </VStack>
  );
};
