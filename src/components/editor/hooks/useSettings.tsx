import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type Settings = {
  spellCheck: boolean
  showGrid: boolean
}

type SettingsContextType = [Settings, Dispatch<SetStateAction<Settings>>]

const defaultSettings: SettingsContextType = [
  { spellCheck: false, showGrid: false },
  () => null,
]

const SettingsConext = createContext(defaultSettings)

type ProviderProps = {
  value?: Settings
  children: React.ReactNode | JSX.Element
}
export const SettingsProvider = ({
  value = defaultSettings[0],
  children,
}: ProviderProps) => {
  const setings = useState(value)
  return (
    <SettingsConext.Provider value={setings}>
      {children}
    </SettingsConext.Provider>
  )
}

export const useSettings = () => useContext(SettingsConext)
