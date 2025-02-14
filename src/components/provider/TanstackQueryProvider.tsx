"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ClientProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient();

export default function TanstackQueryProvider({
  children,
}: ClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
