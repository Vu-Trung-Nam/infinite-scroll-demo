import { ReactQueryProvider } from "./react-query";

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>{children}</ReactQueryProvider>
);
