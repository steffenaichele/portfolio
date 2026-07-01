"use client";

import type { ReactNode } from "react";
import { useView } from "./ViewProvider";

// Rendert das aktive Panel. Welches sichtbar/animiert ist, steuert ViewProvider
// über body[data-phase]; der Panel-Swap passiert in der hold-Phase.
export default function MainView({
	home,
	work,
}: {
	home: ReactNode;
	work: ReactNode;
}) {
	const { view } = useView();
	return view === "work" ? work : home;
}
