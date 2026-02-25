import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-xl font-display">
            <Leaf className="h-5 w-5" />
            GreenMarket
          </div>
          <p className="mt-3 text-sm opacity-80">
            Bringing nature into every home. Quality plants, expert care advice, and a community of plant lovers.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/shop" className="opacity-80 transition-opacity hover:opacity-100">Shop All Plants</Link>
            <Link to="/shop?category=seeds" className="opacity-80 transition-opacity hover:opacity-100">Seeds & Kits</Link>
            <Link to="/cart" className="opacity-80 transition-opacity hover:opacity-100">Your Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Support</h4>
          <div className="flex flex-col gap-2 text-sm">
            <span className="opacity-80">care@greenmarket.com</span>
            <span className="opacity-80">Free shipping over $50</span>
            <span className="opacity-80">30-day plant guarantee</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © 2026 GreenMarket. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
