# Somewhere — v2 (Ambient Video Background)

A cozy, late-night emotional AI app. Warm cinematic palette, editorial serif typography, floating glass header, breathing card, and a soft ambient video background that drifts behind everything like a train window at dusk.

## Concept
- Cozy, calm, cinematic, late-night internet energy
- Warm, approachable, slightly playful, premium restraint
- Reference: https://ryan-sullivan-template.framer.website/
- New: ambient looping background video for a living, dreamy atmosphere

## Background Video
- Source: `https://res.cloudinary.com/dh5m7qvue/video/upload/v1778313228/Train_window_animated_background__202605091151_zkvnrg.mp4`
- Component: `src/components/AmbientVideo.tsx`
- Behavior: `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`
- Layering: `fixed inset-0 z-0`, `pointer-events-none`, sits behind `main` (`z-10`)
- Coverage: `object-cover`, centered with translate trick to fully fill viewport
- Mix blend: `multiply` so it tints into the warm cream palette instead of overpowering it
- Filter: `saturate(0.85) contrast(0.95)` softens the footage
- Breathing: `video-breathe 9s ease-in-out infinite` gently shifts opacity (1 → 0.78) and scale (1 → 1.03)
- Warm overlay: radial gradient fades video toward edges into background cream so the floating card stays legible

### Responsive opacity (mobile-first)
- Mobile (default): `opacity: 0.10`
- Small (`sm:`): `opacity: 0.14`
- Medium+ (`md:`): `opacity: 0.18`

This keeps the video subtle on small screens (where it competes more with the card) and a touch more present on tablet/desktop.

## Palette (softer)
- Background: `oklch(0.965 0.016 92)` soft warm cream
- Foreground: `oklch(0.31 0.022 58)` gentle warm brown, less harsh than near-black
- Muted text: `oklch(0.48 0.025 62 / 0.78)`
- Glow: `oklch(0.86 0.08 68 / 0.38)` soft honey glow
- Accent warm: `oklch(0.82 0.075 55)` muted peach-gold
- Glass: `oklch(0.99 0.01 90 / 0.56)`, hairline `oklch(0.42 0.025 60 / 0.10)`
- Button gradient: soft apricot -> dusty rose -> pale amber
- Avoid harsh black, neon orange, saturated purple, or heavy contrast

## Typography
- Display pixel font: Pixelify Sans for the wordmark, placeholders, and button
- Supporting UI sans: Inter for smaller labels and readable interface text
- Optional stronger pixel alternatives: Press Start 2P for arcade styling, Silkscreen for cleaner pixel display text
- Recommended direction: Pixelify Sans + Inter so the app feels cozy, nostalgic, and emotional rather than arcade-aggressive
- Avoid pure black text; use warm muted brown tones instead
- Letter spacing: `0`
- Font weight: `400-600` depending on readability
- Loaded via Google Fonts in `src/routes/__root.tsx`

## Visual Direction Update
- Make the interface feel softer, warmer, and less contrast-heavy
- Reduce saturation in accent colors
- Keep the cinematic warmth, but make it more pastel and hazy
- Pixelated typography should feel cozy and emotional, not sharp or cyberpunk
- Use softer glass opacity and lighter borders
- Button should feel like a gentle glowing object rather than a high-contrast CTA

## Layout
- Floating glass header: glowing pulsing dot + italic "Somewhere" wordmark + rotating ambient phrases (`wandering mode`, `rerouting…`)
- `FeelingCard`: breathing halo, drifting orbs, rotating placeholders (`i feel weird lately`, `everything feels repetitive`, `i miss someone`, `i feel stuck`), blinking caret, gradient "Generate detour" button
- Centered in `100dvh`, generous whitespace

## Atmosphere stack (back-to-front)
1. `body::after` warm radial gradient wash (drift 24s)
2. `<AmbientVideo />` looping train-window footage (breathing 9s, multiply)
3. `body::before` subtle film grain overlay
4. `<main>` content (`z-10`)

## Animations
- `drift` 24s — body gradient wash
- `video-breathe` 9s — background video opacity + scale
- `glow-pulse` 3.4s — header dot
- `card-float` — feeling card
- `breathe` 6s — card halo
- `soft-in`, `placeholder-in`, `ambient-fade`

## Interactions
- Hover scale 1.01–1.03, active 0.98, ~500ms ease
- All decorative layers `pointer-events-none`

## Responsiveness
- Mobile-first throughout
- Card width: `min(92vw, 520px)`; header width: `min(92vw, 560px)`
- Video uses `object-cover` with translate centering — no letterboxing on any aspect ratio
- Lower video opacity on mobile to preserve card legibility

## Files
- `src/components/AmbientVideo.tsx` (new)
- `src/components/SomewhereHeader.tsx`
- `src/components/FeelingCard.tsx`
- `src/routes/index.tsx` (mounts `<AmbientVideo />`)
- `src/routes/__root.tsx` (Google Fonts)
- `src/styles.css` (palette, grain, gradient wash, `video-breathe` keyframe)
