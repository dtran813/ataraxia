# Ataraxia Design System

This document outlines the design system for the Ataraxia web application, including UI components, style guidelines, and usage examples.

## Colors

Our color system is built using the OKLCH color space for better perceptual uniformity:

- **Primary**: Blue-based color used for primary actions and key UI elements
- **Secondary**: Purple-based color used for accent and supporting elements
- **Dark**: Neutral dark colors for dark mode backgrounds and UI elements
- **Light**: Neutral light colors for light mode backgrounds and UI elements

## Typography

We use the Inter font for general text and Roboto Mono for monospace/code text:

- Font sizes follow a clear hierarchy:
  - Text-xs: 0.75rem
  - Text-sm: 0.875rem
  - Text-base: 1rem
  - Text-lg: 1.125rem
  - Text-xl: 1.25rem
  - Text-2xl: 1.5rem
  - Text-3xl: 1.875rem
  - Text-4xl: 2.25rem
  - Text-5xl: 3rem

## UI Components

### Basic Elements

- **Button**: Various styles and sizes for different actions
- **Input**: Text input fields
- **Label**: Form field labels
- **Card**: Container for grouping related content
- **Select**: Dropdown selection component
- **Switch**: Toggle switch for boolean options

### Feedback Components

- **Toast**: Non-intrusive notifications
- **Modal**: Full-screen overlay for important content
- **Dialog**: Confirmation prompts and user decision points
- **FormError**: Error message display for form validations

### Layout Components

- **Header**: Main application header with navigation
- **Footer**: Application footer with links
- **MainLayout**: Main layout wrapper for pages

### Loading States

- **LoadingSpinner**: Animated spinner for loading states
- **Skeleton**: Placeholder UI for content loading

### Data Display

- **Tabs**: Content organization with tabbed interface

### Animations

- **FadeIn**: Simple fade-in animation
- **SlideIn**: Direction-based slide animation
- **AnimatedList**: Staggered animation for list items

## Usage Examples

See the [UI Demo](/ui-demo) page for interactive examples of all components.

## Best Practices

1. Use consistent spacing with the Tailwind spacing scale
2. Follow the color system for UI elements
3. Maintain proper contrast for accessibility
4. Use appropriate component variants for different contexts
5. Implement responsive designs using the Tailwind breakpoint system
