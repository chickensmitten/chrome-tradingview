export interface LocalStorage {
  symbols?: string[]
  tempsymbols?: string[]
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredSymbols(symbols: string[]): Promise<void> {
  const vals: LocalStorage = {
    symbols,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredSymbols(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['symbols']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.symbols ?? [])
    })
  })
}

export function setTempStoredSymbols(tempsymbols: string[]): Promise<void> {
  const vals: LocalStorage = {
    tempsymbols,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getTempStoredSymbols(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['tempsymbols']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.tempsymbols ?? [])
    })
  })
}

