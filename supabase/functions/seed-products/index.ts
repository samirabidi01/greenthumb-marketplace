import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Create a seed seller user
  const { data: userRes, error: userErr } = await supabase.auth.admin.createUser({
    email: "seller@greenmarket.com",
    password: "seedpassword123",
    email_confirm: true,
    user_metadata: { full_name: "GreenMarket Seller" },
  });

  if (userErr && !userErr.message.includes("already been registered")) {
    return new Response(JSON.stringify({ error: userErr.message }), { status: 400 });
  }

  // Get the seller user id
  const { data: users } = await supabase.auth.admin.listUsers();
  const seller = users?.users?.find((u) => u.email === "seller@greenmarket.com");
  if (!seller) {
    return new Response(JSON.stringify({ error: "Seller not found" }), { status: 400 });
  }

  // Add seller role
  await supabase.from("user_roles").upsert(
    { user_id: seller.id, role: "seller" },
    { onConflict: "user_id,role" }
  );

  const sellerId = seller.id;

  const products = [
    {
      seller_id: sellerId, name: "Monstera Deliciosa",
      description: "The iconic Swiss cheese plant with dramatic split leaves. A statement piece for any room that brings instant tropical vibes.",
      price: 45, category: "indoor", image_url: "/plant-monstera.jpg",
      light_needs: "medium", watering_frequency: "weekly", difficulty: "easy",
      height_range: "2-4 ft", pet_safe: false,
      care_tips: ["Wipe leaves monthly", "Rotate for even growth", "Support with moss pole"],
      rating: 4.8, review_count: 124, in_stock: true,
      tags: ["tropical", "statement", "air-purifying"],
    },
    {
      seller_id: sellerId, name: "Snake Plant",
      description: "Nearly indestructible and perfect for beginners. Purifies air while requiring minimal attention.",
      price: 28, category: "indoor", image_url: "/plant-snake.jpg",
      light_needs: "low", watering_frequency: "biweekly", difficulty: "easy",
      height_range: "1-3 ft", pet_safe: false,
      care_tips: ["Let soil dry completely", "Avoid overwatering", "Tolerates neglect"],
      rating: 4.9, review_count: 203, in_stock: true,
      tags: ["beginner", "air-purifying", "low-maintenance"],
    },
    {
      seller_id: sellerId, name: "Golden Pothos",
      description: "A trailing beauty that thrives in almost any condition. Perfect for shelves and hanging baskets.",
      price: 18, category: "indoor", image_url: "/plant-pothos.jpg",
      light_needs: "low", watering_frequency: "weekly", difficulty: "easy",
      height_range: "trailing 6-10 ft", pet_safe: false,
      care_tips: ["Trim to encourage bushiness", "Propagates easily in water", "Tolerates low light"],
      rating: 4.7, review_count: 167, in_stock: true,
      tags: ["trailing", "beginner", "versatile"],
    },
    {
      seller_id: sellerId, name: "Fiddle Leaf Fig",
      description: "The designer's favorite with large, sculptural leaves. A showstopper that demands attention.",
      price: 65, category: "indoor", image_url: "/plant-fiddle.jpg",
      light_needs: "high", watering_frequency: "weekly", difficulty: "hard",
      height_range: "3-6 ft", pet_safe: true,
      care_tips: ["Consistent watering schedule", "Bright indirect light", "Don't move frequently"],
      rating: 4.5, review_count: 89, in_stock: true,
      tags: ["statement", "designer", "large"],
    },
    {
      seller_id: sellerId, name: "Succulent Trio",
      description: "A curated collection of three hardy succulents in a charming terracotta arrangement.",
      price: 22, category: "indoor", image_url: "/plant-succulent.jpg",
      light_needs: "high", watering_frequency: "biweekly", difficulty: "easy",
      height_range: "3-6 in", pet_safe: true,
      care_tips: ["Full sun preferred", "Sandy well-draining soil", "Water sparingly"],
      rating: 4.6, review_count: 145, in_stock: true,
      tags: ["compact", "beginner", "gift"],
    },
    {
      seller_id: sellerId, name: "Peace Lily",
      description: "Elegant white blooms and lush foliage. One of the best air-purifying plants available.",
      price: 32, category: "indoor", image_url: "/plant-peace-lily.jpg",
      light_needs: "low", watering_frequency: "weekly", difficulty: "easy",
      height_range: "1-3 ft", pet_safe: false,
      care_tips: ["Droops when thirsty", "Mist leaves regularly", "Remove spent flowers"],
      rating: 4.7, review_count: 178, in_stock: true,
      tags: ["flowering", "air-purifying", "elegant"],
    },
    {
      seller_id: sellerId, name: "Rubber Plant",
      description: "Bold, glossy burgundy leaves that add drama to any space. Grows into a stunning indoor tree.",
      price: 38, category: "indoor", image_url: "/plant-rubber.jpg",
      light_needs: "medium", watering_frequency: "weekly", difficulty: "medium",
      height_range: "2-8 ft", pet_safe: false,
      care_tips: ["Wipe leaves for shine", "Prune for shape", "Moderate humidity"],
      rating: 4.6, review_count: 92, in_stock: true,
      tags: ["bold", "tree", "air-purifying"],
    },
    {
      seller_id: sellerId, name: "Herb Garden Seed Kit",
      description: "Everything you need to grow basil, cilantro, mint, and rosemary. Includes pots, soil, and seeds.",
      price: 35, category: "seeds", image_url: "/plant-succulent.jpg",
      light_needs: "high", watering_frequency: "daily", difficulty: "medium",
      height_range: "6-18 in", pet_safe: true,
      care_tips: ["Start indoors near window", "Harvest regularly", "Use well-draining soil"],
      rating: 4.4, review_count: 67, in_stock: true,
      tags: ["herbs", "edible", "kit"],
    },
  ];

  const { data, error } = await supabase.from("products").upsert(products, { onConflict: "id" });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true, count: products.length }), {
    headers: { "Content-Type": "application/json" },
  });
});
