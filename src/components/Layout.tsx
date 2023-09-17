export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Subscriptions</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
