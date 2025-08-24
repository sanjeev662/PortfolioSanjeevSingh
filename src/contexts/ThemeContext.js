import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

// Available themes for the portfolio
export const THEMES = {
  light: { name: 'Light', icon: 'Sun' },
  dark: { name: 'Dark', icon: 'Moon' },
  midnight: { name: 'Midnight', icon: 'Moon' },
  obsidian: { name: 'Obsidian', icon: 'Zap' },
  dawn: { name: 'Dawn', icon: 'Sunrise' },
  arctic: { name: 'Arctic', icon: 'Snowflake' },
}

const THEME_ORDER = ['light', 'dark', 'midnight', 'obsidian', 'dawn', 'arctic']

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => null,
  cycleTheme: () => null,
  availableThemes: THEMES,
})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  
  return context
}

export const ThemeProvider = ({ children, defaultTheme = 'dark', storageKey = 'portfolio-theme', ...props }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey)
      return savedTheme && THEMES[savedTheme] ? savedTheme : defaultTheme
    }
    return defaultTheme
  })

  const handleSetTheme = useCallback((newTheme) => {
    if (THEMES[newTheme]) {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
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
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    setTheme: handleSetTheme,
    cycleTheme,
    availableThemes: THEMES,
  }), [theme, handleSetTheme, cycleTheme])

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
