import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Simple expense tracker",
	description: "Simple expense tracker",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

