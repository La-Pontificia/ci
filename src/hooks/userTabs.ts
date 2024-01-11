import { useState } from 'react'

type UseTabsResult<T extends string> = {
  tab: T
  changeTab: (tab: T) => void
}

export const useTabs = <T extends string>(
  defaultTab: T,
  options: T[]
): UseTabsResult<T> => {
  const [tab, setTab] = useState<T>(defaultTab)

  const changeTab = (newTab: T) => {
    setTab(newTab)
  }

  return { tab, changeTab }
}
