export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  light_needs: string | null;
  watering_frequency: string | null;
  difficulty: string | null;
  height_range: string | null;
  pet_safe: boolean;
  care_tips: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  tags: string[];
  seller_id: string;
  created_at: string;
  updated_at: string;
}

export const categories = [
  { id: "indoor", label: "Indoor Plants", icon: "🌿" },
  { id: "outdoor", label: "Outdoor Plants", icon: "🌳" },
  { id: "seeds", label: "Seeds & Kits", icon: "🌱" },
  { id: "tools", label: "Garden Tools", icon: "🧰" },
];
