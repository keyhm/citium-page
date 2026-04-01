'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    // Ensuring the QueryClient is only created once per user session
    // when using SSR with Next.js App Router
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // General sensible defaults
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false,
                        retry: 1
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
