"use client";
import { OverlayProvider } from "@toss/use-overlay";

import "./globals.css";
import { UserColorProvider } from "@/store/userColorContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextWrapper from "@/components/common/GlobalContextWrapper";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="h-full">
        <head>
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />

          <title>개짱이</title>
          <script
            defer
            src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
          ></script>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <OverlayProvider>
          <GlobalContextWrapper>
            <UserColorProvider>
              <body className="w-full h-full flex flex-col h-full items-center justify-center bg-[#403e3e]">
                <div className="max-w-[500px] w-full h-full bg-white">
                  {children}
                </div>
              </body>
            </UserColorProvider>
          </GlobalContextWrapper>
        </OverlayProvider>
      </html>
    </QueryClientProvider>
  );
}
