export function Layout({
	children,
	manifest,
}: {
	children: React.ReactNode;
	manifest: string[];
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Subscriptions</title>
				{manifest.map((filename) => {
					if (filename.endsWith(".css")) {
						return (
							<link
								key={filename}
								rel="stylesheet"
								href={`/dist/${filename}`}
							/>
						);
					}
				})}
			</head>
			<body>{children}</body>
		</html>
	);
}
