import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import PlantCard from "@/components/PlantCard";
import { motion, AnimatePresence } from "framer-motion";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { data: products = [], isLoading } = useProducts();

  const activeCategory = searchParams.get("category") || "";
  const activeDifficulty = searchParams.get("difficulty") || "";
  const activeLight = searchParams.get("light") || "";
  const activePetSafe = searchParams.get("petSafe") || "";

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearch("");
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.tags?.some(t => t.includes(search.toLowerCase()))) return false;
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeDifficulty && p.difficulty !== activeDifficulty) return false;
      if (activeLight && p.light_needs !== activeLight) return false;
      if (activePetSafe === "true" && !p.pet_safe) return false;
      return true;
    });
  }, [products, search, activeCategory, activeDifficulty, activeLight, activePetSafe]);

  const hasActiveFilters = activeCategory || activeDifficulty || activeLight || activePetSafe || search;

  const FilterButton = ({ label, value, filterKey, currentValue }: { label: string; value: string; filterKey: string; currentValue: string }) => (
    <button
      onClick={() => setFilter(filterKey, currentValue === value ? "" : value)}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        currentValue === value
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl text-foreground">Shop Plants</h1>
          <p className="mt-2 text-muted-foreground">
            {isLoading ? "Loading..." : `${filtered.length} plant${filtered.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        {/* Search + filter toggle */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors ${
              showFilters ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground hover:bg-secondary"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden rounded-xl border border-border bg-card p-5"
            >
              <div className="space-y-4">
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</span>
                  <div className="flex flex-wrap gap-2">
                    {["indoor", "outdoor", "seeds", "tools"].map((c) => (
                      <FilterButton key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} value={c} filterKey="category" currentValue={activeCategory} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</span>
                  <div className="flex flex-wrap gap-2">
                    {["easy", "medium", "hard"].map((d) => (
                      <FilterButton key={d} label={d.charAt(0).toUpperCase() + d.slice(1)} value={d} filterKey="difficulty" currentValue={activeDifficulty} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Light Needs</span>
                  <div className="flex flex-wrap gap-2">
                    {["low", "medium", "high"].map((l) => (
                      <FilterButton key={l} label={l.charAt(0).toUpperCase() + l.slice(1)} value={l} filterKey="light" currentValue={activeLight} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pet Safe</span>
                  <div className="flex gap-2">
                    <FilterButton label="🐾 Pet Safe Only" value="true" filterKey="petSafe" currentValue={activePetSafe} />
                  </div>
                </div>
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="mt-4 flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  <X className="h-3 w-3" /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl">🌵</span>
            <h3 className="mt-4 font-display text-xl text-foreground">No plants found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="mt-4 text-sm font-medium text-primary hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
