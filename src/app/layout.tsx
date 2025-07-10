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
        <meta name="description" content="The ultimate digital book creation experience" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black font-sans min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
