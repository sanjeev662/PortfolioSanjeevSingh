import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => null,
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
      return localStorage.getItem(storageKey) || defaultTheme
    }
    return defaultTheme
  })

  const handleSetTheme = useCallback((newTheme) => {
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove('light', 'dark')
    
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
  }), [theme, handleSetTheme])

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
