---
name: Eve Studio, light
description: A studio site drawn like a design file on a white artboard, selling one free call.
colors:
  ground: "#ffffff"
  ink: "#1a0b2e"
  muted: "#564a66"
  dim: "#75698a"
  line: "rgba(26, 11, 46, 0.1)"
  line-strong: "rgba(26, 11, 46, 0.2)"
  lilac: "#f3effa"
  lilac-2: "#e8e0f6"
  deep: "#1a0b2e"
  deep-2: "#261540"
  eve-purple: "#8800ff"
  eve-purple-hover: "#7400da"
  eve-purple-soft: "#c9a6ff"
  error: "#c4002f"
typography:
  hero:
    fontFamily: "Archivo (wdth 125), sans-serif"
    fontSize: "clamp(44px, 8.8vw, 160px)"
    fontWeight: 640
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo (wdth 125), sans-serif"
    fontSize: "clamp(36px, 8.4vw, 144px)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  title-md:
    fontFamily: "Archivo (wdth 125), sans-serif"
    fontSize: "clamp(36px, 5.2vw, 84px)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Archivo (wdth 100), sans-serif"
    fontSize: "clamp(30px, 4.5vw, 72px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "30px"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  card-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
  body-lg:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body-md:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "26px"
  ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "22px"
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
rounded:
  pill: "999px"
  panel: "32px"
  card: "28px"
  pic: "24px"
  panel-md: "20px"
  inner: "14px"
  small: "12px"
  badge: "4px"
  hair: "2px"
spacing:
  s-25: "2px"
  s-50: "4px"
  s-75: "8px"
  s-100: "12px"
  s-200: "16px"
  s-300: "24px"
  s-400: "32px"
  s-500: "40px"
  s-600: "48px"
  s-700: "64px"
  s-800: "80px"
  s-900: "96px"
  gutter: "12px"
components:
  button-primary:
    backgroundColor: "{colors.eve-purple}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.eve-purple-hover}"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
  panel-lilac:
    backgroundColor: "{colors.lilac}"
    rounded: "{rounded.panel}"
  panel-deep:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.ground}"
    rounded: "{rounded.panel}"
  panel-purple:
    backgroundColor: "{colors.eve-purple}"
    textColor: "{colors.ground}"
    rounded: "{rounded.panel}"
  tag:
    backgroundColor: "{colors.lilac-2}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    height: "22px"
---

# Design System: Eve Studio, light

## Overview

A studio site drawn like a design file. The page is a white artboard; display type is set huge in expanded caps; Eve purple draws construction lines, nodes and handles the way a design tool shows a selected layer. Sections sit on inset rounded panels that change ground as you read: white, lilac, white, deep aubergine, white, purple, white, deep aubergine. Simple yet sophisticated: one idea a section, lots of white, motion that draws rather than decorates.

Tokens live in `src/app/globals.css` under `:root`; this file describes them.

## Colors

### Primary

Eve purple `#8800FF` carries the main button, the purple words of the hero, the construction lines and nodes, step times, bullets and the purple panel of the launch planner.

### Secondary

Deep aubergine `#1A0B2E` is the one depth colour: all body ink, the services panel, the footer panel, the phone bezel and the ink button.

### Neutral

White ground, pale lilac `#F3EFFA` for artboard panels and picture wells, a second lilac for tags, two aubergine greys for secondary text, and aubergine hairlines at 10 and 20 percent.

### Named Rules

- **Purple draws, aubergine holds.** Purple is line, accent and action; aubergine is ink and the dark panels.
- **Grounds change by panel, never by gradient.**

## Typography

Archivo with its width axis at 125 for every display line, in caps set by CSS (the source stays sentence case). The statement uses Archivo at normal width, weight 500. Geist for everything people read in full: leads, body, lists, buttons. Numbers are tabular.

### Hierarchy

- Hero: three staggered lines at up to 160px, the second right aligned.
- Section titles at up to 144px; medium titles at up to 84px for process, questions and the footer call.
- Card titles (work, services) in expanded caps at 24 to 56px.
- Leads at 18 to 20px in muted aubergine, capped near 54ch.

## Layout

Content sits in `.wrap` (48, 28, 18px side padding). Panels inset by a 12px gutter (8px on phones) with 32px corners (24, 20). Sections breathe at 144px (104, 88). Work sits in two columns out of step by 160px. Services stack as sticky cards, each 14px lower than the last. The process section pins while the phone scrubs from sketch to launched app; below 900px its notes stack under the phone.

## Elevation & Depth

Depth comes from ground changes, not shadow stacks. The service cards cast one soft upward shadow so the stack reads. The phone and the notes carry a soft aubergine drop shadow. The primary button carries a faint purple glow.

## Shapes

Pills for buttons, tags, chips and nav links. Panels at 32px, service cards at 28px, work pictures at 24px. Construction nodes are 10px squares, white with a purple outline; handle ends are filled purple circles. Bullets are small outlined squares, echoing the nodes.

## Components

### Hero

The headline is measured after fonts load: horizontal guides run through each line's cap band, a vertical guide drops through the circle's centre, and a selection box with four corner handles and a size badge wraps "launch". On load the lines rise from their masks, the guides and circle draw, nodes pop in and the selection snaps on. The circle group leans toward the pointer. The intro and buttons sit on a white layer above the drawing, so no line ever runs through words; the size badge hangs from the box's left corner. Below 1100px the circle goes (the copy sits under the headline there), and phones also drop the badge.

### Statement

A lilac panel with a circle, guides and nodes drawn behind one large sentence that inks in word by word as you scroll. Beside it, a selected frame draws the sentence: Product, Brand and Campaign as three pills whose lines join into one purple "Launch day" pill. Below 1100px the frame sits under the sentence.

### Services

Deep panel, centred title, then one lilac card per service: name, intro, deliverables with node bullets, timeline and starting price (tagged Sample), a link to ask, and the sample deliverable drawn on canvas. Once the big title passes under the nav, a slim bar pins below it with "Services", the card on top (03 / 08, Web and product) and a progress line; it fades as the last card leaves. Cards tighten on screens under 860px tall so the last one ends above the fold. Below 900px wide the cards flow in a column instead of stacking, because each is taller than a phone screen.

### Fitting the screen

Every section where something happens (the sketch scene, the service stack, the team, the launch planner, the questions) keeps its heading in view while you use it. The sketch scene sits between the nav and the bottom edge at any height: the phone scales down with the screen height and, under 880px tall, only the current step opens. The team title and lead share a row and the figures scale with the height. On wide screens the planner's title sits beside its chips and field, so question, choices and answer share one screen. The questions heading stays pinned beside the list. The nav height is the `--nav-h` token (72px, 64px on phones), which every pinned offset uses.

### Launch planner

Purple panel. Example chips, a white pill input with the ink button, and four result cards: what we would build, a first look, how long, and where the price starts on aubergine with the main button.

### Footer

Deep panel. The call to book and three link columns, then "Eve Studio" in expanded caps drawn in a 1.5px lilac outline, fitted to the panel width (two lines on phones). Letters fill with purple as the pointer passes. The crew sits on measured cap tops: founder on E, technology on S, design on D, mobile on I, creative director on O; a small figure walks the baseline toward the pointer.

### Buttons and tags

Primary purple pill, ghost hairline pill, ink pill on purple grounds; all lift 2px on hover and press to 0.97. Every sample project and price carries a Sample tag; Eve carries Live.

## Do's and Don'ts

- Do keep the system cursor.
- Do tag every invented project, quote and price as a sample.
- Do hide a contact line until its real value exists; never print a placeholder or an `.example` address.
- Do give each section its own picture: the work grid and the service cards draw different samples (the last two services still share theirs with Tolumi and Quillbay until there are more pieces).
- Do keep "fixed quote" as the only phrase for the price promise.
- Don't sell the head count; the people appear as who you work with.
- Don't add gradients, glows behind type or a second accent hue.
- Don't name team members or mention locations; prices are in USD.
