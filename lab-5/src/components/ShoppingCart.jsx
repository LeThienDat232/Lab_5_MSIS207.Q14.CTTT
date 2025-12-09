import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearCart, removeItem, selectCartItems, selectCartTotal } from '../store/cartSlice'
import { selectCartSummary, selectCartTax } from '../store/cartSelectors'

const products = [
  { id: 'react', name: 'React Fundamentals Course', price: 120 },
  { id: 'redux', name: 'Redux Toolkit Workshop', price: 180 },
  { id: 'testing', name: 'Testing React Apps', price: 90 },
]

export function ShoppingCart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotal)
  const tax = useSelector(selectCartTax)
  const summary = useSelector(selectCartSummary)

  return (
    <section className="panel">
      <header>
        <h2>Exercise 1.2: Redux Toolkit Shopping Cart</h2>
        <p className="muted">configureStore + createSlice + memoized selectors</p>
      </header>
      <div className="panel-content cart">
        <div className="cart-products">
          <h3>Catalog</h3>
          {products.map((product) => (
            <div className="product" key={product.id}>
              <div>
                <p>{product.name}</p>
                <p className="muted">${product.price.toFixed(2)}</p>
              </div>
              <button onClick={() => dispatch(addItem(product))}>Add to cart</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Cart</h3>
          {items.length === 0 ? (
            <p className="muted">No items yet.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <span>{item.name}</span>
                    <span className="muted">x{item.quantity}</span>
                  </div>
                  <div className="cart-actions">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                    <button onClick={() => dispatch(addItem(item))}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="totals">
            <p>Total: ${totalAmount.toFixed(2)}</p>
            <p>Tax (10%): ${tax.toFixed(2)}</p>
            <p>
              <strong>Grand Total: ${summary.grandTotal.toFixed(2)}</strong>
            </p>
          </div>
          <button className="ghost" onClick={() => dispatch(clearCart())} disabled={!items.length}>
            Clear cart
          </button>
        </div>
      </div>
    </section>
  )
}
