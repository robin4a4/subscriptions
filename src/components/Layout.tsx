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
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
			<body>
				{" "}
				<div className="container">
					<h1>🤑 Subscriptions</h1>
					{children}
				</div>
			</body>
		</html>
	);
}
