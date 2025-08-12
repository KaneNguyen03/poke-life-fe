import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe } from 'react-icons/fa'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'dropdown' | 'buttons'
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  variant = 'dropdown' 
}) => {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <FaGlobe className="text-gray-600" />
        <div className="flex space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                i18n.language === lang.code
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={`Switch to ${lang.name}`}
            >
              {lang.flag} {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="language-select" className="sr-only">
        {t('common.language')}
      </label>
      <div className="flex items-center">
        <FaGlobe className="text-gray-600 mr-2" />
        <select
          id="language-select"
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-label={t('common.language')}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
