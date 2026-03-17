import { useState, useEffect } from "react";
import type { ColorScheme } from "@coinbase/cds-common";
import { ThemeProvider } from "@coinbase/cds-web";
import { defaultTheme } from "@coinbase/cds-web/themes/defaultTheme";
import { HStack, VStack } from "@coinbase/cds-web/layout";
import { MediaQueryProvider } from "@coinbase/cds-web/system";
import { Checkbox, SearchInput, TextInput } from "@coinbase/cds-web/controls";
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
            <h1 style={{ margin: 0, fontSize: "1.5rem" }}>A11y Examples</h1>
            <HStack gap={2}>
              <a
                href="#/game"
                style={{
                  padding: "8px 16px",
                  color: "var(--color-fg)",
                  textDecoration: "none",
                  border: "1px solid var(--color-bgLineHeavy)",
                  borderRadius: "8px",
                }}
              >
                Play GAAD Game
              </a>
              <button
                type="button"
                onClick={toggleColorScheme}
                aria-label={`Switch to ${activeColorScheme === "light" ? "dark" : "light"} mode`}
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                {activeColorScheme === "light" ? "Dark" : "Light"} mode
              </button>
            </HStack>
          </HStack>

          <p style={{ margin: 0, color: "var(--color-fgMuted)" }}>
            Accessible form patterns using Coinbase Design System. All controls
            include proper labels, focus management, and keyboard support.
          </p>

          <VStack gap={3} maxWidth={400}>
            <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Form controls</h2>

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

            <button
              type="button"
              disabled={!agreed}
              aria-label="Submit form"
              style={{
                padding: "8px 16px",
                cursor: agreed ? "pointer" : "not-allowed",
              }}
            >
              Submit
            </button>
          </VStack>
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};
