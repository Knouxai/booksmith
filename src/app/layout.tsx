import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Knoux BookSmith Ultra™</title>
        <meta
          name="description"
          content="The ultimate digital book creation experience"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-sans min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
