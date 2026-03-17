import { useState, useEffect } from "react";
import type { ColorScheme } from "@coinbase/cds-common";
import { ThemeProvider } from "@coinbase/cds-web";
import { defaultTheme } from "@coinbase/cds-web/themes/defaultTheme";
import { HStack, VStack } from "@coinbase/cds-web/layout";
import { MediaQueryProvider } from "@coinbase/cds-web/system";
import { Button } from "@coinbase/cds-web/buttons";
import { Checkbox, SearchInput, TextInput } from "@coinbase/cds-web/controls";
import { Link, Text } from "@coinbase/cds-web/typography";
import { GamePage } from "./Game/GamePage";

const getHash = () => window.location.hash.slice(1) || "/";

export const App = () => {
  const [activeColorScheme, setActiveColorScheme] =
    useState<ColorScheme>("light");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [route, setRoute] = useState(getHash);

  useEffect(() => {
    const handler = () => setRoute(getHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const toggleColorScheme = () =>
    setActiveColorScheme((s) => (s === "light" ? "dark" : "light"));

  if (route === "/game") {
    return (
      <MediaQueryProvider>
        <ThemeProvider
          theme={defaultTheme}
          activeColorScheme={activeColorScheme}
        >
          <GamePage />
        </ThemeProvider>
      </MediaQueryProvider>
    );
  }

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme={activeColorScheme}>
        <VStack background="bg" minHeight="100vh" padding={4} gap={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text as="h1" font="headline">
              A11y Examples
            </Text>
            <HStack gap={2}>
              <Link href="#/game" font="body">
                Play GAAD Game
              </Link>
              <Button
                variant="secondary"
                compact
                onClick={toggleColorScheme}
                accessibilityLabel={`Switch to ${activeColorScheme === "light" ? "dark" : "light"} mode`}
              >
                {activeColorScheme === "light" ? "Dark" : "Light"} mode
              </Button>
            </HStack>
          </HStack>

          <Text as="p" color="fgMuted" display="block" font="body">
            Accessible form patterns using Coinbase Design System. All controls
            include proper labels, focus management, and keyboard support.
          </Text>

          <VStack gap={3} maxWidth={400}>
            <Text as="h2" display="block" font="headline">
              Form controls
            </Text>

            <SearchInput
              compact
              accessibilityLabel="Search"
              onChangeText={setSearch}
              placeholder="Search"
              value={search}
            />

            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              helperText="We'll never share your email"
            />

            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            >
              I agree to the terms
            </Checkbox>

            <Button
              variant="primary"
              disabled={!agreed}
              onClick={() => {}}
              accessibilityLabel="Submit form"
            >
              Submit
            </Button>
          </VStack>
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};
