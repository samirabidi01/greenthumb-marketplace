import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const lightLabels: Record<string, string> = { low: "☁️ Low Light", medium: "🌤️ Medium Light", high: "☀️ Bright Light" };
const waterLabels: Record<string, string> = { daily: "💧 Daily", weekly: "💧 Weekly", biweekly: "💧 Every 2 weeks" };
const difficultyColors: Record<string, string> = {
  easy: "bg-primary/10 text-primary",
  medium: "bg-accent/10 text-accent",
  hard: "bg-destructive/10 text-destructive",
};

const PlantDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: plant, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="text-5xl">🪴</span>
        <h2 className="mt-4 font-display text-2xl text-foreground">Plant not found</h2>
        <Link to="/shop" className="mt-4 text-sm font-medium text-primary hover:underline">
          ← Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-2xl bg-secondary"
          >
            <img src={plant.image_url || "/placeholder.svg"} alt={plant.name} className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium text-foreground">{plant.rating}</span>
              <span>({plant.review_count} reviews)</span>
            </div>

            <h1 className="mt-2 text-4xl text-foreground">{plant.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{plant.description}</p>

            <div className="mt-6 text-3xl font-bold text-foreground">${plant.price}</div>

            <button
              onClick={() => addToCart(plant)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </button>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Light", value: lightLabels[plant.light_needs || "medium"] },
                { label: "Watering", value: waterLabels[plant.watering_frequency || "weekly"] },
                { label: "Height", value: `📏 ${plant.height_range || "N/A"}` },
                { label: "Difficulty", value: (plant.difficulty || "easy").charAt(0).toUpperCase() + (plant.difficulty || "easy").slice(1), extra: difficultyColors[plant.difficulty || "easy"] },
              ].map((attr) => (
                <div key={attr.label} className="rounded-lg border border-border bg-card p-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{attr.label}</span>
                  <div className={`mt-1 text-sm font-medium ${attr.extra || "text-foreground"}`}>{attr.value}</div>
                </div>
              ))}
            </div>

            {plant.pet_safe && (
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
                🐾 This plant is safe for pets
              </div>
            )}

            {plant.care_tips && plant.care_tips.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-lg text-foreground">Care Tips</h3>
                <ul className="mt-3 space-y-2">
                  {plant.care_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-primary">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plant.tags && plant.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {plant.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
