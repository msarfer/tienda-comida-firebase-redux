import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../App'
import menuItems from '../data/menuItems'


describe('Suite de tests para la app', async () => {
  afterEach(() => {
    cleanup()
  })

  it('Debe renderizar la página correctamente', async () => {
    render(<App/>)

    const h1 = await screen.queryByText('Comida Rápida Online')

    expect(h1).not.toBeNull()
  })

  it('Debe renderizar los productos en el menú', async () => {
    render(<App/>)
    const articles = await screen.getAllByRole('article')

    menuItems.forEach(async (item) => {
      expect(await screen.getByText(item.name)).not.toBeNull();
      expect(await screen.getByText(`#${item.quantity}`)).not.toBeNull();
    });

    expect(articles).toHaveLength(4)
  })

  it('Debe renderizar los productos en Pedir comida', async () => {

    render(<App/>)
    const button = await screen.queryByText('Pedir Comida') as HTMLButtonElement
    expect(button).not.toBeNull()
    
    fireEvent.click(button)
    
    const productImages = await screen.findAllByRole("img")
    menuItems.forEach(async (item) => {
        expect(await screen.getAllByAltText(item.name)).not.toBeNull()
    })

    expect(productImages).toHaveLength(4)
  })

  it("Debe actualizar el correctamente el stock del producto", async () => {
    render(<App/>)

    const toggleBtn = await screen.queryByText('Pedir Comida') as HTMLButtonElement
    expect(toggleBtn).not.toBeNull()
    
    fireEvent.click(toggleBtn)
    
    const articles = await screen.findAllByRole("article")
    const first = articles[0]
    const initialQuantity = menuItems[0].quantity
    fireEvent.click(first)

    const ct = await screen.findByText("Cantidad")

    expect(ct).not.toBeNull()
    menuItems.forEach(async (item) => {
        expect(await screen.getAllByAltText(item.name)).not.toBeNull()
    })

    const sendBtn = await screen.queryByText('Enviar producto') as HTMLButtonElement

    fireEvent.click(sendBtn)
    fireEvent.click(toggleBtn)

    const quantity = initialQuantity - 1
    const updatedQuantity = await screen.findByText(`#${quantity}`)
    expect(updatedQuantity).not.toBeNull()

    expect(articles).toHaveLength(4)
  })
})
