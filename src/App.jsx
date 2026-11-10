import { useState } from 'react'

const SHOES = [
  { id: 1, name: "Campus Men's Sneakers", price: 50, image: 'shoes/shoe1.svg' },
  { id: 2, name: "Campus Men's OG-03 Sneakers", price: 75, image: 'shoes/shoe2.svg' },
  { id: 3, name: 'Urban Runner', price: 60, image: 'shoes/shoe3.svg' },
  { id: 4, name: 'Classic Canvas Low', price: 45, image: 'shoes/shoe4.svg' },
  { id: 5, name: 'Trail Master', price: 90, image: 'shoes/shoe5.svg' },
  { id: 6, name: 'Street Hi-Top', price: 80, image: 'shoes/shoe6.svg' },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (shoe) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === shoe.id)
      if (found) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...shoe, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <nav className="navbar">
        <div className="logo">👟</div>
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">About Us</a>
      </nav>

      <main className="layout">
        <section className="shoes">
          {SHOES.map((shoe) => (
            <div className="shoe-card" key={shoe.id}>
              <h3>{shoe.name}</h3>
              <p>${shoe.price}</p>
              <button onClick={() => addToCart(shoe)}>Add to Cart</button>
              <img src={shoe.image} alt={shoe.name} />
            </div>
          ))}
        </section>

        <aside className="cart">
          <h2>Cart</h2>
          {cart.length === 0 && <p className="empty">Your cart is empty.</p>}
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <div>${item.price} × {item.quantity}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3 className="total">Total: ${total.toFixed(2)}</h3>
        </aside>
      </main>
    </>
  )
}

export default App
