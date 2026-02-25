import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { plants, categories } from "@/data/plants";
import PlantCard from "@/components/PlantCard";
import heroImage from "@/assets/hero-plants.jpg";

const Index = () => {
  const featured = plants.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Beautiful indoor plants collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              🌱 Fresh arrivals weekly
            </span>
            <h1 className="mt-5 text-5xl leading-tight text-primary-foreground md:text-6xl">
              Bring Nature Into Your Home
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Curated plants for every space, skill level, and lifestyle. Expert care advice included with every order.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:scale-105"
              >
                Shop All Plants <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop?difficulty=easy"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
              >
                Beginner Friendly
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center text-3xl text-foreground">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
              >
                <span className="text-4xl">{cat.icon}</span>
                <span className="font-medium text-foreground">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl text-foreground">Bestsellers</h2>
            <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: ShieldCheck, title: "30-Day Guarantee", desc: "Healthy plant or we replace it" },
            { icon: Leaf, title: "Expert Care Tips", desc: "Included with every plant" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
