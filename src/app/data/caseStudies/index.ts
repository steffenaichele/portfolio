import { habitApp } from "./habit-app";
import { upnext } from "./upnext";
import { nextmuseum } from "./nextmuseum";
import type { CaseStudy } from "./types";

export type { CaseStudy };

export const caseStudies: CaseStudy[] = [nextmuseum, upnext, habitApp];
