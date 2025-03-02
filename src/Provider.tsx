import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider>{children}</ThemeProvider>
    </ChakraProvider>
  );
};

export default Provider;
