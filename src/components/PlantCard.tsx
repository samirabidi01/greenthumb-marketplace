import { Link } from "react-router-dom";
import { ShoppingCart, Star, Droplets, Sun, Leaf } from "lucide-react";
import type { Plant } from "@/data/plants";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const lightIcons = { low: "☁️", medium: "🌤️", high: "☀️" };
const difficultyColors = {
  easy: "bg-primary/10 text-primary",
  medium: "bg-accent/10 text-accent",
  hard: "bg-destructive/10 text-destructive",
};

const PlantCard = ({ plant, index = 0 }: { plant: Plant; index?: number }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <Link to={`/plant/${plant.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={plant.image}
            alt={plant.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {plant.petSafe && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              🐾 Pet Safe
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">{plant.rating}</span>
          <span>({plant.reviewCount})</span>
        </div>
        <Link to={`/plant/${plant.id}`}>
          <h3 className="font-display text-lg leading-tight text-foreground transition-colors group-hover:text-primary">
            {plant.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-xs">{lightIcons[plant.lightNeeds]} {plant.lightNeeds} light</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[plant.difficulty]}`}>
            {plant.difficulty}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">${plant.price}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(plant);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantCard;
