<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Hound & Heath
description: A premium, architectural one-page site for a luxury dog walking company in Kent.
---

# Design System: Hound & Heath

## 1. Overview

**Creative North Star: "The Private Estate"**

Hound & Heath reads like the brochure for a private members' estate, not a pet-care app. The brand's confidence comes from scale and restraint: massive editorial type, deliberate asymmetry, and a near-monochrome palette broken by exactly one warm accent. This system explicitly rejects the Rover/Wag gig-app aesthetic: no bright primary colors, no cute paw-print iconography, no pastel illustration, no centered hero over a soft gradient, no three-equal-card feature rows, no Inter/Roboto.

**Key Characteristics:**
- Massive, expressive display type used as the primary visual element, not decoration around it.
- Asymmetric, editorial grid; whitespace is structural, not leftover.
- Near-monochrome palette (off-black, off-white, warm tan) - one accent, used with intent, not scattered.
- Motion is choreographed and scroll-driven, but always motivated (hierarchy or storytelling), never ambient decoration.

## 2. Colors

Color strategy: **Committed**, not Restrained - the near-black carries 40-60% of most sections, with warm tan as the singular accent. No beige/cream/brass/oxblood (the premium-consumer AI default); this palette commits to contrast instead. `[exact hex values to be resolved during implementation]`

### Primary
- **Heath Tan** (warm camel/tan, mid-saturation): the single accent. Used for the booking CTA, hover states, and one underline/rule treatment per section. Never more than one accent on screen at once.

### Neutral
- **Estate Black** (off-black, not pure `#000`): primary background for high-impact sections (hero, footer); primary text color on light sections.
- **Chalk White** (off-white, not pure `#fff`): primary background for editorial/content sections; primary text on dark sections.
- **Stone** (mid-gray, warm-neutral lean): secondary text, dividers, form helper text.

### Named Rules
**The One Accent Rule.** Heath Tan appears in exactly one role per section (a CTA, an underline, or a hover state) and never as a background wash. Its rarity is what makes it read as premium.

## 3. Typography

**Display Font:** Syne (expressive, bold geometric display face; self-hosted via Fontsource).
**Body Font:** Outfit (clean, razor-sharp geometric sans; self-hosted via Fontsource) - never Inter or Roboto.

**Character:** Syne carries the brand's architectural confidence - wide, assertive, slightly unconventional letterforms at massive scale. Outfit underneath reads as precise and operational, the clean voice of a well-run service.

### Hierarchy
- **Display** (light/regular weight, `clamp(3rem, 9vw, 8.5rem)`, leading-none to 1.05): hero headline and section openers; the primary visual element of the page.
- **Headline** (regular weight, `clamp(2rem, 5vw, 3.5rem)`): section titles (About, Services, Booking).
- **Body** (regular weight, `1rem-1.125rem`, 1.6 line-height, max 65-75ch): all paragraph copy.
- **Label** (medium weight, `0.75rem`, uppercase, `0.08em` tracking, used sparingly per the eyebrow-restraint rule): form field labels and rate units only, not section eyebrows.

### Named Rules
**The Scale-Earns-Authority Rule.** Display type is the page's primary structural element; it is allowed to wrap dynamically and overlap adjacent elements deliberately, but every instance must use `clamp()` so it never clips or overflows on mobile.

## 4. Elevation

Flat by default. No drop shadows, no glassmorphism, no card elevation. Depth is conveyed through scale contrast, layering of the video container against type, and z-index during scroll transitions, not through shadow.

### Named Rules
**The Flat Estate Rule.** Surfaces are flat at rest. The only "elevation" in the system is the hero video container scaling and overlapping the typography during scroll, an intentional choreographed moment, not an ambient card-hover effect.

## 5. Components

### Buttons
- **Shape:** sharp corners, 0px radius (architectural, not soft).
- **Primary:** Estate Black background, Chalk White text at rest; inverts to Heath Tan background with Estate Black text on hover, with a deliberate scale/spring transition (no linear easing).
- **Hover / Focus:** spring-eased scale and color invert; visible focus ring in Heath Tan, 2px offset, for keyboard users.

### Inputs / Fields
- **Style:** no rounded corners, bottom-border-only (1px Stone, transitioning to Estate Black or Heath Tan on focus), transparent background.
- **Focus:** border color shifts to Heath Tan; label and helper text maintain WCAG AA contrast at all times.
- **Error:** inline text below the field, not a color-only signal.

### Navigation
- Minimal, single-line at desktop, height under 80px. Wordmark left, single contact/booking link right. No mega-menu.

## 6. Do's and Don'ts

### Do:
- **Do** use `clamp()` for every display-scale heading so massive type stays responsive and never clips on mobile.
- **Do** keep Heath Tan to one role per section (The One Accent Rule).
- **Do** use asymmetric, editorial grids with generous whitespace instead of centered layouts or equal-width card rows.
- **Do** motivate every scroll-triggered animation with a clear hierarchy or storytelling reason.

### Don't:
- **Don't** use Inter, Roboto, or any standard default sans-serif.
- **Don't** build a centered hero over a soft gradient.
- **Don't** use three equal feature cards with icons, the generic SaaS/pet-app pattern.
- **Don't** use pastel "cute pet startup" colors, paw-print iconography, or stock photo grids of dogs.
- **Don't** use AI-purple glow buttons or unmotivated infinite-loop micro-animations.
- **Don't** let any animation run without a `prefers-reduced-motion` fallback.
