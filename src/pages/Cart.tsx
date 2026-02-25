import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 font-display text-2xl text-foreground">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">Time to find your new green companion!</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
        >
          Browse Plants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="text-4xl text-foreground">Your Cart</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.plant.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <Link to={`/plant/${item.plant.id}`} className="shrink-0">
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/plant/${item.plant.id}`} className="font-display text-lg text-foreground hover:text-primary">
                        {item.plant.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.plant.seller}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-secondary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-secondary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">${item.plant.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.plant.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-lg text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{totalPrice >= 50 ? "Free" : "$5.99"}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            {totalPrice < 50 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}
            <button className="mt-6 w-full rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full py-2 text-sm text-muted-foreground transition-colors hover:text-destructive"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
