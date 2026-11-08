import type { Figure } from "@/art/voxel";

export type Person = { id: string; role: string; does: string; action: "wave" | "spin" | "tool"; figure: Figure };

/* The real five. Names are not shown; add a `name` field here when you want them on the site.
   Clothes are recoloured to the site's palette: white, Eve purple and its lilacs. */
export const team: Person[] = [
  {
    id: "founder", role: "Founder and PM", action: "wave",
    does: "Runs the first call, writes the scope and owns the plan until launch.",
    figure: { skin: "#7b4a2d", hair: "#17110d", hairStyle: "fade", top: "#1a0b2e", legs: "#2a2a2e", shoe: "#8800ff", tool: "clipboard", accent: "#8800ff" },
  },
  {
    id: "technology", role: "Technology", action: "tool",
    does: "Decides how it gets built, then builds the web products and AI features.",
    figure: { skin: "#6b3f26", hair: "#120c09", hairStyle: "short", glasses: true, top: "#8800ff", legs: "#26262b", shoe: "#f4f0fb", tool: "laptop", accent: "#b980ff" },
  },
  {
    id: "mobile", role: "Mobile Engineer", action: "spin",
    does: "Ships iOS and Android apps that stay fast on the phones people actually own.",
    figure: { skin: "#8a5433", hair: "#17110d", hairStyle: "cap", top: "#b980ff", legs: "#2a2a2e", shoe: "#f4f0fb", tool: "laptop", accent: "#8800ff" },
  },
  {
    id: "design", role: "Design", action: "tool",
    does: "Designs the product and the brand together, so they read as one thing.",
    figure: { skin: "#70452a", hair: "#120c09", hairStyle: "puffs", top: "#d6b8ff", legs: "#3b1a66", shoe: "#f4f0fb", tool: "pen", accent: "#8800ff" },
  },
  {
    id: "creative", role: "Creative Director", action: "wave",
    does: "Sets the idea, directs the film and video, and signs off everything you see.",
    figure: { skin: "#b57a4f", hair: "#1a1210", hairStyle: "long", top: "#6a00cc", legs: "#1a0b2e", shoe: "#8800ff", tool: "camera", accent: "#b980ff" },
  },
];
