import { create } from 'zustand'

interface SearchBarState {
  productName: string | null
  makeName: string | null
  modelName: string | null
  modelYear: string | null
}

interface SearchBarActions {
  setProductName: (productName: string | null) => void
  setMakeName: (makeName: string | null) => void
  setModelName: (modelName: string | null) => void
  setModelYear: (modelYear: string | null) => void
}

export type SearchBarStore = SearchBarState & SearchBarActions

export const useSearchBarStore = create<SearchBarStore>((set) => ({
  productName: '',
  makeName: '',
  modelName: '',
  modelYear: '',

  setProductName: (productName) => set({ productName }),
  setMakeName: (makeName) => set({ makeName }),
  setModelName: (modelName) => set({ modelName }),
  setModelYear: (modelYear) => set({ modelYear }),
}))

// Individual selectors to avoid unnecessary re-renders
export const useProductName = () => useSearchBarStore((state) => state.productName)
export const useMakeName = () => useSearchBarStore((state) => state.makeName)
export const useModelName = () => useSearchBarStore((state) => state.modelName)
export const useModelYear = () => useSearchBarStore((state) => state.modelYear)

export const useSetProductName = () => useSearchBarStore((state) => state.setProductName)
export const useSetMakeName = () => useSearchBarStore((state) => state.setMakeName)
export const useSetModelName = () => useSearchBarStore((state) => state.setModelName)
export const useSetModelYear = () => useSearchBarStore((state) => state.setModelYear)
