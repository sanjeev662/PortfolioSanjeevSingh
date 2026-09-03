import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

// Available themes for the portfolio.
// `swatch` is the theme's primary colour, used for the colour dots in the
// Navbar theme picker.
export const THEMES = {
  light: { name: 'Light', icon: 'Sun', swatch: '#2563eb' },
  dark: { name: 'Dark', icon: 'Moon', swatch: '#3b82f6' },
  midnight: { name: 'Midnight', icon: 'Moon', swatch: '#427cf0' },
  obsidian: { name: 'Obsidian', icon: 'Zap', swatch: '#a65af2' },
  dawn: { name: 'Dawn', icon: 'Sunrise', swatch: '#ee7c2b' },
  arctic: { name: 'Arctic', icon: 'Snowflake', swatch: '#13b6ec' },
}

// Which native colour scheme each theme belongs to. Drives
// `documentElement.style.colorScheme` so scrollbars, form controls and the
// browser UI match, and lets the Navbar group themes into Light / Dark.
export const THEME_SCHEME = {
  light: 'light',
  dawn: 'light',
  arctic: 'light',
  dark: 'dark',
  midnight: 'dark',
  obsidian: 'dark',
}

export const THEME_ORDER = ['light', 'dark', 'midnight', 'obsidian', 'dawn', 'arctic']

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => null,
  cycleTheme: () => null,
  availableThemes: THEMES,
  themeOrder: THEME_ORDER,
  scheme: 'dark',
})

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

const readStoredTheme = (storageKey) => {
  try {
    const savedTheme = window.localStorage.getItem(storageKey)
    return savedTheme && THEMES[savedTheme] ? savedTheme : null
  } catch (error) {
    // localStorage can throw in private mode / when cookies are blocked.
    return null
  }
}

const resolveInitialTheme = (storageKey, defaultTheme) => {
  if (typeof window === 'undefined') return defaultTheme

  const savedTheme = readStoredTheme(storageKey)
  if (savedTheme) return savedTheme

  // Nothing stored: the inline anti-FOUC script in index.html has already
  // painted a theme class onto <html>. Adopt it rather than fighting it,
  // otherwise the very first paint would flash and then change.
  const root = window.document.documentElement
  const paintedTheme = THEME_ORDER.find((name) => root.classList.contains(name))
  if (paintedTheme) return paintedTheme

  // No script and no stored preference: follow the OS.
  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return defaultTheme
}

export const ThemeProvider = ({ children, defaultTheme = 'dark', storageKey = 'portfolio-theme', ...props }) => {
  const [theme, setThemeState] = useState(() => resolveInitialTheme(storageKey, defaultTheme))

  const handleSetTheme = useCallback((newTheme) => {
    if (!THEMES[newTheme]) return

    try {
      window.localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      // Persisting is best-effort; the theme still applies for this session.
    }
    setThemeState(newTheme)
  }, [storageKey])

  const cycleTheme = useCallback(() => {
    const currentIndex = THEME_ORDER.indexOf(theme)
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length
    const nextTheme = THEME_ORDER[nextIndex]
    handleSetTheme(nextTheme)
  }, [theme, handleSetTheme])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove(...THEME_ORDER)
    root.classList.add(theme)

    // Keep native UI (scrollbars, date pickers, autofill) in step.
    root.style.colorScheme = THEME_SCHEME[theme] || 'light'
  }, [theme])

  // Keep every open tab on the same theme.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== storageKey) return
      if (event.newValue && THEMES[event.newValue]) {
        setThemeState(event.newValue)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storageKey])

  const value = useMemo(() => ({
    theme,
    setTheme: handleSetTheme,
    cycleTheme,
    availableThemes: THEMES,
    themeOrder: THEME_ORDER,
    scheme: THEME_SCHEME[theme] || 'light',
  }), [theme, handleSetTheme, cycleTheme])

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
