import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Generiertes OG-Image (ersetzt das fehlende statische /og-image.png).
// Next.js registriert diese Datei automatisch als og:image der Seite.
export const alt = "Steffen Aichele – UX/UI Designer und Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
	// TTF-Variante nur fürs OG-Image: satori (next/og) kann kein woff2 lesen.
	const fontMedium = await readFile(
		join(process.cwd(), "src/fonts/PPNeueMontreal-Medium.ttf"),
	);

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "96px",
					backgroundColor: "#f5f5f5",
					fontFamily: "PP Neue Montreal",
				}}>
				<div style={{ fontSize: 88, color: "#0a0a0a" }}>
					Steffen Aichele
				</div>
				<div style={{ fontSize: 40, color: "#737373", marginTop: 24 }}>
					UX/UI Designer &amp; Full Stack Developer
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "PP Neue Montreal",
					data: fontMedium,
					weight: 500,
					style: "normal",
				},
			],
		},
	);
}
