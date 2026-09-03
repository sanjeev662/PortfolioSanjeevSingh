/**
 * Icon registry — the ONE module in src/data/ allowed to import from lucide-react.
 *
 * Every other data module stores its icon as a plain STRING name so the data
 * stays serialisable and free of React/JSX. Components resolve those names here.
 * If you add an icon name to a data file, add it to ICON_MAP too.
 *
 *   import { getIcon } from "../../../data/icons";
 *   const Icon = getIcon(info.icon);
 *   <Icon className="w-4 h-4" aria-hidden="true" />
 */

import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  Code,
  Database,
  ExternalLink,
  Facebook,
  Github,
  GraduationCap,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Star,
  Target,
  Trophy,
  User,
  Wrench,
  Youtube,
} from "lucide-react";

export const ICON_MAP = {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  Code,
  Database,
  ExternalLink,
  Facebook,
  Github,
  GraduationCap,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Star,
  Target,
  Trophy,
  User,
  Wrench,
  Youtube,
};

/**
 * Resolve an icon name to a lucide component.
 * Unknown names fall back to HelpCircle instead of crashing the render.
 */
export function getIcon(name) {
  return ICON_MAP[name] ?? HelpCircle;
}
