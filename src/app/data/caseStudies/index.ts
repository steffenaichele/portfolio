import { habitApp } from "./habit-app";
import { museumExhibit } from "./museum-exhibit";
import { nextmuseum } from "./nextmuseum";
import type { CaseStudy } from "./types";

export type { CaseStudy };

export const caseStudies: CaseStudy[] = [nextmuseum, museumExhibit, habitApp];
