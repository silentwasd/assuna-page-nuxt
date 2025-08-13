# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 SPA (Single Page Application) featuring a personal page for "Assuna," a 900-year-old fox character. The application is built with TypeScript and uses internationalization (i18n) to support English, Russian, and Japanese languages.

## Key Technologies & Architecture

- **Framework**: Nuxt 3 with SSR disabled (`ssr: false`)
- **Styling**: Tailwind CSS with custom Google Fonts (Amaranth, Caveat, Dela Gothic One, Oswald, Josefin Sans)
- **Internationalization**: @nuxtjs/i18n with 3 locales (en-US, ru-RU, ja-JP), default is ru-RU
- **Audio**: @davland7/rplayer for streaming radio functionality
- **Analytics**: Yandex Metrica integration

## Component Architecture

The application follows a structured component organization:

### Layout Structure
- **Background Components**: `Fixed.vue`, `VhsScanLines.vue` for visual effects
- **Decorator Components**: `OpacityBackground.vue`, `RgbBorder.vue` for layout styling
- **Block Components**: Main content sections (`Hello.vue`, `Radio.vue`, `Social.vue`, `Time.vue`, `SwitchLanguage.vue`)

### Component Naming Convention
Components are organized by type in folders: `background/`, `block/`, `button/`, `decorator/`, `element/`, `icon/`, `link/`, `scrollbar/`

### Audio Integration
- Uses `Player.client.vue` (client-only component) for streaming nightride.fm
- Features real-time audio visualization with Canvas API
- Connects to EventSource for live track metadata

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Configuration Details

### I18n Configuration
- Strategy: `no_prefix` (no URL prefixes for locales)
- Browser language detection disabled
- Default locale: ru-RU
- Configuration file: `i18n.config.ts`

### External Integrations
- **Radio Stream**: nightride.fm with real-time metadata
- **Analytics**: Yandex Metrica (ID: 97646333) via `/js/metrics.js`
- **Verification**: Yandex site verification file in public root

## File Structure Insights

- All Vue components use `<script setup lang="ts">` syntax
- Custom CSS classes are defined in `app.vue` for Google Fonts
- Client-only components use `.client.vue` suffix
- Public assets include background images and favicon
- TypeScript configuration extends Nuxt's generated config

## Internationalization Content

The application features extensive multilingual content describing the character "Assuna" across 5 main text blocks, with translations for radio controls, social sections, and time display. Content includes character backstory, interests in technology and Japanese culture, and personality traits.