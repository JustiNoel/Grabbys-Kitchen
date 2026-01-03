export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'sides' | 'beverages' | 'desserts';
  ingredients: string[];
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  spiceLevel?: 1 | 2 | 3;
}

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 'samosa',
    name: 'Beef Samosas',
    description: 'Crispy triangular pastries filled with spiced minced beef and vegetables',
    price: 250,
    category: 'starters',
    ingredients: ['Minced beef', 'Onions', 'Coriander', 'Cumin', 'Pastry'],
    image: 'samosa',
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 'bhajia',
    name: 'Potato Bhajias',
    description: 'Thinly sliced potatoes coated in spiced gram flour batter and deep-fried',
    price: 200,
    category: 'starters',
    ingredients: ['Potatoes', 'Gram flour', 'Turmeric', 'Chili', 'Coriander'],
    image: 'bhajia',
    isVegetarian: true,
    spiceLevel: 1
  },
  {
    id: 'mandazi',
    name: 'Mandazi',
    description: 'Sweet fried dough, lightly spiced with cardamom and coconut',
    price: 150,
    category: 'starters',
    ingredients: ['Flour', 'Coconut milk', 'Cardamom', 'Sugar', 'Yeast'],
    image: 'mandazi',
    isVegetarian: true
  },
  // Mains
  {
    id: 'nyama-choma',
    name: 'Nyama Choma',
    description: 'Traditional grilled goat meat, served with kachumbari and ugali',
    price: 850,
    category: 'mains',
    ingredients: ['Goat meat', 'Salt', 'Lime', 'Kachumbari', 'Ugali'],
    image: 'nyama-choma',
    isPopular: true,
    spiceLevel: 1
  },
  {
    id: 'pilau',
    name: 'Beef Pilau',
    description: 'Fragrant spiced rice cooked with tender beef and aromatic spices',
    price: 550,
    category: 'mains',
    ingredients: ['Basmati rice', 'Beef', 'Pilau masala', 'Onions', 'Tomatoes', 'Garlic'],
    image: 'pilau',
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 'biryani',
    name: 'Chicken Biryani',
    description: 'Layered rice dish with marinated chicken, saffron, and fried onions',
    price: 650,
    category: 'mains',
    ingredients: ['Chicken', 'Basmati rice', 'Yogurt', 'Saffron', 'Biryani spices', 'Fried onions'],
    image: 'biryani',
    spiceLevel: 2
  },
  {
    id: 'tilapia',
    name: 'Fried Tilapia',
    description: 'Fresh tilapia fish, seasoned and fried to golden perfection',
    price: 750,
    category: 'mains',
    ingredients: ['Tilapia fish', 'Garlic', 'Ginger', 'Lemon', 'Spices'],
    image: 'tilapia',
    isPopular: true,
    spiceLevel: 1
  },
  {
    id: 'mukimo',
    name: 'Mukimo with Nyama',
    description: 'Mashed potatoes, peas, corn and greens served with stewed beef',
    price: 600,
    category: 'mains',
    ingredients: ['Potatoes', 'Green peas', 'Maize', 'Pumpkin leaves', 'Beef stew'],
    image: 'mukimo',
    spiceLevel: 1
  },
  {
    id: 'chapati-stew',
    name: 'Chapati & Beef Stew',
    description: 'Soft layered flatbread served with rich tomato-based beef stew',
    price: 450,
    category: 'mains',
    ingredients: ['Chapati', 'Beef', 'Tomatoes', 'Onions', 'Potatoes', 'Carrots'],
    image: 'chapati-stew',
    isPopular: true,
    spiceLevel: 1
  },
  {
    id: 'githeri',
    name: 'Githeri Special',
    description: 'Hearty mix of maize and beans with vegetables and spices',
    price: 350,
    category: 'mains',
    ingredients: ['Maize', 'Beans', 'Tomatoes', 'Onions', 'Carrots', 'Potatoes'],
    image: 'githeri',
    isVegetarian: true,
    spiceLevel: 1
  },
  // Sides
  {
    id: 'ugali',
    name: 'Ugali',
    description: 'Traditional cornmeal staple, perfect with any stew or grilled meat',
    price: 100,
    category: 'sides',
    ingredients: ['Maize flour', 'Water'],
    image: 'ugali',
    isVegetarian: true
  },
  {
    id: 'sukuma',
    name: 'Sukuma Wiki',
    description: 'Sautéed collard greens with onions and tomatoes',
    price: 150,
    category: 'sides',
    ingredients: ['Collard greens', 'Onions', 'Tomatoes', 'Oil'],
    image: 'sukuma',
    isVegetarian: true
  },
  {
    id: 'kachumbari',
    name: 'Kachumbari',
    description: 'Fresh tomato and onion salad with coriander and lime',
    price: 120,
    category: 'sides',
    ingredients: ['Tomatoes', 'Onions', 'Coriander', 'Lime', 'Chili'],
    image: 'kachumbari',
    isVegetarian: true,
    spiceLevel: 1
  },
  {
    id: 'chapati',
    name: 'Chapati (2 pcs)',
    description: 'Soft, flaky layered flatbread',
    price: 80,
    category: 'sides',
    ingredients: ['Flour', 'Water', 'Oil', 'Salt'],
    image: 'chapati',
    isVegetarian: true
  },
  // Beverages
  {
    id: 'chai',
    name: 'Kenyan Chai',
    description: 'Rich spiced tea with milk, cardamom, and ginger',
    price: 80,
    category: 'beverages',
    ingredients: ['Black tea', 'Milk', 'Cardamom', 'Ginger', 'Sugar'],
    image: 'chai',
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 'passion-juice',
    name: 'Fresh Passion Juice',
    description: 'Freshly squeezed passion fruit juice',
    price: 150,
    category: 'beverages',
    ingredients: ['Passion fruit', 'Sugar', 'Water'],
    image: 'passion',
    isVegetarian: true
  },
  {
    id: 'mango-juice',
    name: 'Mango Juice',
    description: 'Sweet and refreshing fresh mango juice',
    price: 150,
    category: 'beverages',
    ingredients: ['Mango', 'Sugar', 'Water'],
    image: 'mango',
    isVegetarian: true
  },
  {
    id: 'tangawizi',
    name: 'Tangawizi',
    description: 'Spicy ginger drink, served cold',
    price: 120,
    category: 'beverages',
    ingredients: ['Ginger', 'Lemon', 'Honey', 'Water'],
    image: 'tangawizi',
    isVegetarian: true,
    spiceLevel: 2
  },
  // Desserts
  {
    id: 'mahamri',
    name: 'Mahamri',
    description: 'Sweet fried bread flavored with coconut and cardamom',
    price: 180,
    category: 'desserts',
    ingredients: ['Flour', 'Coconut milk', 'Cardamom', 'Sugar', 'Yeast'],
    image: 'mahamri',
    isVegetarian: true
  },
  {
    id: 'kashata',
    name: 'Kashata',
    description: 'Sweet coconut and peanut brittle',
    price: 100,
    category: 'desserts',
    ingredients: ['Coconut', 'Peanuts', 'Sugar'],
    image: 'kashata',
    isVegetarian: true,
    isPopular: true
  }
];

export const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥟' },
  { id: 'mains', name: 'Main Dishes', icon: '🍖' },
  { id: 'sides', name: 'Sides', icon: '🥗' },
  { id: 'beverages', name: 'Beverages', icon: '🍹' },
  { id: 'desserts', name: 'Desserts', icon: '🍨' },
];
