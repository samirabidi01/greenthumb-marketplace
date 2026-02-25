import plantMonstera from "@/assets/plant-monstera.jpg";
import plantSnake from "@/assets/plant-snake.jpg";
import plantPothos from "@/assets/plant-pothos.jpg";
import plantFiddle from "@/assets/plant-fiddle.jpg";
import plantSucculent from "@/assets/plant-succulent.jpg";
import plantPeaceLily from "@/assets/plant-peace-lily.jpg";
import plantRubber from "@/assets/plant-rubber.jpg";

export interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "indoor" | "outdoor" | "seeds" | "tools";
  image: string;
  lightNeeds: "low" | "medium" | "high";
  wateringFrequency: "daily" | "weekly" | "biweekly";
  difficulty: "easy" | "medium" | "hard";
  heightRange: string;
  petSafe: boolean;
  careTips: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  seller: string;
  tags: string[];
}

export const plants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    description: "The iconic Swiss cheese plant with dramatic split leaves. A statement piece for any room that brings instant tropical vibes.",
    price: 45,
    category: "indoor",
    image: plantMonstera,
    lightNeeds: "medium",
    wateringFrequency: "weekly",
    difficulty: "easy",
    heightRange: "2-4 ft",
    petSafe: false,
    careTips: ["Wipe leaves monthly", "Rotate for even growth", "Support with moss pole"],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    seller: "Tropical Gardens Co.",
    tags: ["tropical", "statement", "air-purifying"],
  },
  {
    id: "2",
    name: "Snake Plant",
    description: "Nearly indestructible and perfect for beginners. Purifies air while requiring minimal attention.",
    price: 28,
    category: "indoor",
    image: plantSnake,
    lightNeeds: "low",
    wateringFrequency: "biweekly",
    difficulty: "easy",
    heightRange: "1-3 ft",
    petSafe: false,
    careTips: ["Let soil dry completely", "Avoid overwatering", "Tolerates neglect"],
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    seller: "Urban Jungle",
    tags: ["beginner", "air-purifying", "low-maintenance"],
  },
  {
    id: "3",
    name: "Golden Pothos",
    description: "A trailing beauty that thrives in almost any condition. Perfect for shelves and hanging baskets.",
    price: 18,
    category: "indoor",
    image: plantPothos,
    lightNeeds: "low",
    wateringFrequency: "weekly",
    difficulty: "easy",
    heightRange: "trailing 6-10 ft",
    petSafe: false,
    careTips: ["Trim to encourage bushiness", "Propagates easily in water", "Tolerates low light"],
    rating: 4.7,
    reviewCount: 167,
    inStock: true,
    seller: "Green Thumb Nursery",
    tags: ["trailing", "beginner", "versatile"],
  },
  {
    id: "4",
    name: "Fiddle Leaf Fig",
    description: "The designer's favorite with large, sculptural leaves. A showstopper that demands attention.",
    price: 65,
    category: "indoor",
    image: plantFiddle,
    lightNeeds: "high",
    wateringFrequency: "weekly",
    difficulty: "hard",
    heightRange: "3-6 ft",
    petSafe: true,
    careTips: ["Consistent watering schedule", "Bright indirect light", "Don't move frequently"],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    seller: "Botanical Elite",
    tags: ["statement", "designer", "large"],
  },
  {
    id: "5",
    name: "Succulent Trio",
    description: "A curated collection of three hardy succulents in a charming terracotta arrangement.",
    price: 22,
    category: "indoor",
    image: plantSucculent,
    lightNeeds: "high",
    wateringFrequency: "biweekly",
    difficulty: "easy",
    heightRange: "3-6 in",
    petSafe: true,
    careTips: ["Full sun preferred", "Sandy well-draining soil", "Water sparingly"],
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
    seller: "Desert Bloom",
    tags: ["compact", "beginner", "gift"],
  },
  {
    id: "6",
    name: "Peace Lily",
    description: "Elegant white blooms and lush foliage. One of the best air-purifying plants available.",
    price: 32,
    category: "indoor",
    image: plantPeaceLily,
    lightNeeds: "low",
    wateringFrequency: "weekly",
    difficulty: "easy",
    heightRange: "1-3 ft",
    petSafe: false,
    careTips: ["Droops when thirsty", "Mist leaves regularly", "Remove spent flowers"],
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    seller: "Serene Gardens",
    tags: ["flowering", "air-purifying", "elegant"],
  },
  {
    id: "7",
    name: "Rubber Plant",
    description: "Bold, glossy burgundy leaves that add drama to any space. Grows into a stunning indoor tree.",
    price: 38,
    category: "indoor",
    image: plantRubber,
    lightNeeds: "medium",
    wateringFrequency: "weekly",
    difficulty: "medium",
    heightRange: "2-8 ft",
    petSafe: false,
    careTips: ["Wipe leaves for shine", "Prune for shape", "Moderate humidity"],
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
    seller: "Tropical Gardens Co.",
    tags: ["bold", "tree", "air-purifying"],
  },
  {
    id: "8",
    name: "Herb Garden Seed Kit",
    description: "Everything you need to grow basil, cilantro, mint, and rosemary. Includes pots, soil, and seeds.",
    price: 35,
    category: "seeds",
    image: plantSucculent,
    lightNeeds: "high",
    wateringFrequency: "daily",
    difficulty: "medium",
    heightRange: "6-18 in",
    petSafe: true,
    careTips: ["Start indoors near window", "Harvest regularly", "Use well-draining soil"],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    seller: "Seed & Sprout",
    tags: ["herbs", "edible", "kit"],
  },
];

export const categories = [
  { id: "indoor", label: "Indoor Plants", icon: "🌿" },
  { id: "outdoor", label: "Outdoor Plants", icon: "🌳" },
  { id: "seeds", label: "Seeds & Kits", icon: "🌱" },
  { id: "tools", label: "Garden Tools", icon: "🧰" },
];
