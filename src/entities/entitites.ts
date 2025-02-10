export interface MenuItem {
  id: string,
  name: string,
  quantity: number,
  desc: string,
  price: number,
  image: string
}

export interface MenuContextType {
  menuItems: MenuItem[],
  isChooseFoodPage: boolean,
  setIsChooseFoodPage: (value: boolean) => void
}

export interface Order {
  name: string,
  phone: string,
  article: string,
  quantity: number,
  price: number
}