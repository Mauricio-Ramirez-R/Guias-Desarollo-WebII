import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  function initialCart() {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    console.log(itemIndex)
    if (itemIndex === -1) { //ese artículo no está en el carro
      guitar.quantity = 1
      setCart([...cart, guitar])
    }
    else {//si la guitarra ya se habia aniadido al carrito 
      const updatedGuitar = [...cart]//creando una copia de la variable de estado
      updatedGuitar[itemIndex].quantity++;
      setCart(updatedGuitar)
    }
  }

  function calculateTotal() {
    /*let total = 0;
    for (const guitar of cart) {
      total += guitar.price * guitar.quantity
    }*/
    let total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return total;
  }

  function increaseQuantity(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    if (itemIndex >= 0) {
      const updatedGuitar = [...cart]
      updatedGuitar[itemIndex].quantity++;
      setCart(updatedGuitar)
    }
  }

  function decreaseQuantity(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    if (itemIndex >= 0) {
      const updatedGuitar = [...cart]
      if (updatedGuitar[itemIndex].quantity > 1) {
        updatedGuitar[itemIndex].quantity--;
        setCart(updatedGuitar)
      }
    }
  }

  function removeProduct(guitar){
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    if (itemIndex !== -1) {
      const updatedGuitar = [...cart]
      updatedGuitar.splice(itemIndex, 1);
      setCart(updatedGuitar)
    }
  }

  function emptyCart() {
    setCart([])
  }
  


  return (
    <>
      <Header cart={cart} total={calculateTotal()} decreaseQuantity={decreaseQuantity} 
      increaseQuantity={increaseQuantity} removeProduct={removeProduct} emptyCart={emptyCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
