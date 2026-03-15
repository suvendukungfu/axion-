# IDR - Figma UI Layout & Component Strategy

## Overview
This document serves as the Figma design reference for the Institute of Digital Risk (IDR) Premium Website. The design language is inspired by top-tier tech institutes and companies (OpenAI, Stripe, MIT Tech Review) focusing on a minimalist, highly functional, and dark-themed "cybersecurity" aesthetic.

## 1. Frame Hierarchy

### 1.1 Desktop (1440px width)
- **Top padding**: 120px for major sections.
- **Grid Layout**: 12-column grid, 24px gutters. Max container width: 1200px.
- **Typography base**: 16px.

### 1.2 Tablet (768px width)
- **Grid Layout**: 8-column grid, 16px gutters.
- **Adjustments**: Hero text scales down, service cards convert to 2x2 or 1-column stack depending on content length.

### 1.3 Mobile (375px width)
- **Grid Layout**: 4-column grid, 16px gutters.
- **Adjustments**: Hamburger navigation, 1-column stacks for all cards, Timeline transforms from horizontal to vertical.

## 2. Design Tokens

### 2.1 Color Palette
- **Primary / Accent**: Premium Orange `#FF6A00`
- **Backgrounds**: 
  - Pure Black `#000000` (Hero, Footer)
  - Super Dark Gray `#0A0A0A` (Body)
  - Surface Gray `#111111` (Cards)
- **Text**:
  - Primary: Pure White `#FFFFFF`
  - Secondary: Soft Gray `#888888`
- **Borders & Dividers**: `rgba(255, 255, 255, 0.1)`

### 2.2 Typography (Inter / Poppins)
- **Display (Hero)**: Poppins 700, 72px (Desktop), -4% tracking.
- **H2 (Section Titles)**: Poppins 600, 48px, -2% tracking.
- **H3 (Card Titles)**: Inter 600, 24px.
- **Body**: Inter 400, 18px, 160% line height.

## 3. Component Structure

### 3.1 Sticky Navigation
- **State**: Transparent background to start. On scroll (`>50px`), morphs to an ultra-thin line with a heavy `backdrop-filter: blur(20px)` and bottom border.
- **Interaction**: Links have a subtle opacity fade on hover.

### 3.2 Premium Cards (Service Model & Pipeline)
- **Surface**: `linear-gradient(145deg, #1A1A1A 0%, #111111 100%)`
- **Border**: 1px solid `rgba(255, 107, 0, 0.15)`
- **Hover State**: 
  - `transform: translateY(-8px)`
  - `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5)`
  - Border transitions to `rgba(255, 107, 0, 0.5)`

### 3.3 Buttons
- **Primary Glow**: 
  - Background: `#FF6A00`
  - Hover: Background lightens to `#FF8A33`, casts a soft optical glow: `box-shadow: 0 0 20px rgba(255, 106, 0, 0.4)`.

## 4. Animation Strategy
1. **Hero Fade-In**: Staggered upward translation (`Y: 20px` to `0`) and opacity fade for Headline, Subhead, and Buttons.
2. **Timeline Progression**: The "Train → Hire → Innovate → Deploy" pipeline will use a CSS animated progressive line that "fills" moving left to right natively in CSS.
