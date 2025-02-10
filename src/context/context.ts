import { createContext } from "react"
import {MenuContextType} from "../entities/entitites"

export const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  isChooseFoodPage: false,
  setIsChooseFoodPage: () => {}
})