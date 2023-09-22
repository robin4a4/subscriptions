export function Layout({
  children,
  manifest,
}: {
  children: React.ReactNode;
  manifest: string[];
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Subscriptions</title>
        {manifest.map((filename) => {
          if (filename.endsWith(".css")) {
            return <link rel="stylesheet" href={`/dist/${filename}`}></link>;
          }
        })}
      </head>
      <body>{children}</body>
    </html>
  );
}
