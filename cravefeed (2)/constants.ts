
import { Restaurant, MenuItem, GroceryItem, DiningRestaurant, Coordinates } from './types';

// Reliable high-quality food images from Unsplash
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

const IMAGES: Record<string, string> = {
  // --- South Indian ---
  idli: "https://images.unsplash.com/photo-1589301760576-41f4739112d1?auto=format&fit=crop&w=800&q=80", 
  dosa: "https://images.unsplash.com/photo-1668236543090-d2f896911ded?auto=format&fit=crop&w=800&q=80",
  vada: "https://images.unsplash.com/photo-1668236543090-d2f896911ded?auto=format&fit=crop&w=800&q=80", 
  uttapam: "https://images.unsplash.com/photo-1589301760576-41f4739112d1?auto=format&fit=crop&w=800&q=80",
  sambar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  
  // --- Biryani & Rice ---
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  biryani_chicken: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  biryani_mutton: "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=800&q=80",
  fried_rice: "https://images.unsplash.com/photo-1603133872878-684f108fd110?auto=format&fit=crop&w=800&q=80",
  pulao: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",

  // --- North Indian ---
  butter_chicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  paneer_tikka: "https://images.unsplash.com/photo-1567188040754-583553d31171?auto=format&fit=crop&w=800&q=80",
  naan: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  thali: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  chole_bhature: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
  dal_makhani: "https://images.unsplash.com/photo-1546833999-b9f581602809?auto=format&fit=crop&w=800&q=80",
  
  // --- Street Food ---
  samosa: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  pani_puri: "https://images.unsplash.com/photo-1601050690180-87a389148d94?auto=format&fit=crop&w=800&q=80",
  pav_bhaji: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=800&q=80",
  vada_pav: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80",
  momos: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  
  // --- Fast Food & Italian ---
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  fries: "https://images.unsplash.com/photo-1573080496982-b9418e224d1c?auto=format&fit=crop&w=800&q=80",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",

  // --- Chinese & Asian ---
  noodles: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",
  manchurian: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  spring_rolls: "https://images.unsplash.com/photo-1544510802-9c2b48d28929?auto=format&fit=crop&w=800&q=80",

  // --- Desserts ---
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  ice_cream: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",
  gulab_jamun: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80",
  rasgulla: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80",
  donut: "https://images.unsplash.com/photo-1552024827-3538466b6c78?auto=format&fit=crop&w=800&q=80",

  // --- Grocery ---
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
  eggs: "https://images.unsplash.com/photo-1511688814392-118a85da5394?auto=format&fit=crop&w=800&q=80",
  bread: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80",
  butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80",
  paneer_raw: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
  onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
  banana: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80",
  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
  chips: "https://images.unsplash.com/photo-1566478919030-26144394344c?auto=format&fit=crop&w=800&q=80",
  coke: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
  chocolate: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
  oil: "https://images.unsplash.com/photo-1474979266404-7cadd259c366?auto=format&fit=crop&w=800&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  detergent: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
  flour: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80",
  salt: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=800&q=80",

  // Fallback
  default: FALLBACK_IMAGE
};

export const CUISINE_TYPES = [
  "All", "North Indian", "South Indian", "Biryani", "Chinese", "Street Food", "Desserts", "Healthy", "Pizza", "Seafood"
];

export const AVAILABLE_CITIES = [
  "New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Visakhapatnam", "Pune", "Ahmedabad", "Jaipur", "Chandigarh"
];

export const CITY_COORDINATES: Record<string, Coordinates> = {
  "New Delhi": { lat: 28.6139, lng: 77.2090 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Bangalore": { lat: 12.9716, lng: 77.5946 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Visakhapatnam": { lat: 17.6868, lng: 83.2185 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "Jaipur": { lat: 26.9124, lng: 75.7873 },
  "Chandigarh": { lat: 30.7333, lng: 76.7794 }
};

// Helper: Haversine Formula for distance
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
};

export const estimateDeliveryTime = (distanceKm: number): string => {
  const basePrepTime = 20; // mins
  const avgSpeed = 20; // km/h -> ~3 mins per km
  const travelTime = Math.ceil(distanceKm * 3);
  const total = basePrepTime + travelTime;
  return `${total}-${total + 10} min`;
};

// Generator for consistent random coordinates around a city
const generateCoords = (city: string): Coordinates => {
    const center = CITY_COORDINATES[city] || CITY_COORDINATES['New Delhi'];
    return {
        lat: center.lat + (Math.random() - 0.5) * 0.05,
        lng: center.lng + (Math.random() - 0.5) * 0.05
    };
};

// Data Generator Helpers
const RESTAURANT_NAMES = [
    "Spice Kitchen", "The Royal Bowl", "Tandoori Nights", "Green Leaf", "Ocean Blue", 
    "Urban Roti", "Curry Pot", "Golden Spoon", "Sizzle & Grill", "The Food Court",
    "Bakers Street", "Chai Point", "Dosa Plaza", "Biryani House", "Pizza Haven",
    "Wok & Roll", "Desi Tadka", "Fusion Beats", "Momo Mia", "Burger King Clone"
];

const VIZAG_SPECIALS = [
    "Dharani", "Kamat", "Sai Ram Parlour", "Alpha Hotel", "Mekong", 
    "Sea Inn", "Flying Spaghetti Monster", "Bakers Castle", "Barbeque Nation", 
    "Tycoon", "Ming Garden", "Sri Sairam", "Venkatadri Vantillu", "Real Deepak"
];

const generateMenu = (cuisines: string[]): MenuItem[] => {
    const items: MenuItem[] = [];
    
    if (cuisines.includes("Biryani")) {
        items.push({
            id: `gen-${Math.random()}-b1`,
            name: "Hyderabadi Chicken Dum Biryani",
            description: "Authentic spice-rich biryani cooked with tender chicken.",
            price: 380,
            image: IMAGES.biryani_chicken,
            category: "Biryani",
            isVegetarian: false,
            isBestSeller: true
        });
        items.push({
            id: `gen-${Math.random()}-b2`,
            name: "Paneer Biryani",
            description: "Fragrant rice cooked with marinated paneer cubes.",
            price: 320,
            image: IMAGES.biryani,
            category: "Biryani",
            isVegetarian: true
        });
    }

    if (cuisines.includes("South Indian")) {
        items.push({
            id: `gen-${Math.random()}-s1`,
            name: "Masala Dosa",
            description: "Crispy crepe filled with potato masala.",
            price: 140,
            image: IMAGES.dosa,
            category: "South Indian",
            isVegetarian: true,
            isBestSeller: true
        });
        items.push({
            id: `gen-${Math.random()}-s2`,
            name: "Idli Sambar (4 pcs)",
            description: "Steamed rice cakes served with spicy lentil soup.",
            price: 100,
            image: IMAGES.idli,
            category: "South Indian",
            isVegetarian: true
        });
    }

    if (cuisines.includes("North Indian")) {
        items.push({
            id: `gen-${Math.random()}-n1`,
            name: "Butter Chicken",
            description: "Creamy tomato gravy with tender chicken pieces.",
            price: 390,
            image: IMAGES.butter_chicken,
            category: "Main Course",
            isVegetarian: false,
            isBestSeller: true
        });
        items.push({
            id: `gen-${Math.random()}-n2`,
            name: "Paneer Butter Masala",
            description: "Rich and creamy paneer curry.",
            price: 340,
            image: IMAGES.paneer_tikka,
            category: "Main Course",
            isVegetarian: true
        });
         items.push({
            id: `gen-${Math.random()}-n3`,
            name: "Butter Naan",
            description: "Soft tandoori bread.",
            price: 60,
            image: IMAGES.naan,
            category: "Breads",
            isVegetarian: true
        });
    }

    if (cuisines.includes("Chinese")) {
         items.push({
            id: `gen-${Math.random()}-c1`,
            name: "Hakka Noodles",
            description: "Stir fried noodles with veggies.",
            price: 220,
            image: IMAGES.noodles,
            category: "Chinese",
            isVegetarian: true
        });
        items.push({
            id: `gen-${Math.random()}-c2`,
            name: "Veg Manchurian",
            description: "Vegetable balls in spicy soya sauce.",
            price: 240,
            image: IMAGES.manchurian,
            category: "Chinese",
            isVegetarian: true
        });
    }

    if (cuisines.includes("Street Food")) {
         items.push({
            id: `gen-${Math.random()}-st1`,
            name: "Pav Bhaji",
            description: "Buttery mashed vegetable curry with rolls.",
            price: 180,
            image: IMAGES.pav_bhaji,
            category: "Street Food",
            isVegetarian: true
        });
    }

    // Default fill if empty
    if (items.length === 0) {
        items.push({
             id: `gen-${Math.random()}-def`,
             name: "Special Thali",
             description: "Assorted platter of daily specials.",
             price: 250,
             image: IMAGES.thali,
             category: "Thali",
             isVegetarian: true
        });
    }

    return items;
};

// Generate a large list of restaurants
const generateMockRestaurants = (): Restaurant[] => {
    const allRestaurants: Restaurant[] = [];
    const cities = AVAILABLE_CITIES;

    cities.forEach(city => {
        // Decide how many restaurants per city
        const count = city === "Visakhapatnam" ? 20 : 10; 
        
        for(let i=0; i<count; i++) {
            let name = "";
            let image = IMAGES.default;
            let cuisines = [];

            if (city === "Visakhapatnam" && i < VIZAG_SPECIALS.length) {
                name = VIZAG_SPECIALS[i];
            } else {
                name = `${RESTAURANT_NAMES[i % RESTAURANT_NAMES.length]} ${city}`;
            }

            // Assign random cuisine types
            const rand = Math.random();
            if (rand < 0.2) { 
                cuisines = ["South Indian", "Healthy"]; 
                image = IMAGES.dosa;
            } else if (rand < 0.4) {
                cuisines = ["North Indian", "Biryani"];
                image = IMAGES.biryani;
            } else if (rand < 0.6) {
                cuisines = ["Chinese", "Asian"];
                image = IMAGES.noodles;
            } else if (rand < 0.8) {
                cuisines = ["Street Food", "Desserts"];
                image = IMAGES.pav_bhaji;
            } else {
                cuisines = ["Pizza", "Fast Food"];
                image = IMAGES.pizza;
            }

            allRestaurants.push({
                id: `${city.substring(0,3).toLowerCase()}-${i}`,
                name: name,
                rating: 3.8 + (Math.random() * 1.2), // 3.8 to 5.0
                reviewCount: Math.floor(Math.random() * 5000) + 100,
                cuisine: cuisines,
                deliveryTime: `${30 + Math.floor(Math.random()*30)} min`,
                priceRange: Math.random() > 0.7 ? "₹₹₹" : Math.random() > 0.3 ? "₹₹" : "₹",
                image: image,
                menu: generateMenu(cuisines),
                address: `${Math.floor(Math.random()*100)}, ${city} Main Road`,
                city: city,
                coordinates: generateCoords(city),
                hasOffer: Math.random() > 0.6,
                offerText: Math.random() > 0.6 ? "50% OFF" : "Free Delivery",
                isGoldPartner: Math.random() > 0.8
            });
        }
    });

    return allRestaurants;
};

export const MOCK_RESTAURANTS = generateMockRestaurants();

export const MOCK_DINING: DiningRestaurant[] = MOCK_RESTAURANTS.slice(0, 50).map(r => ({
  ...r,
  tableAvailable: Math.random() > 0.3,
  averageCostForTwo: r.priceRange === '₹' ? 500 : r.priceRange === '₹₹' ? 1200 : 2500
}));

export const MOCK_GROCERY: GroceryItem[] = [
  // Dairy & Bread
  { id: 'g1', name: 'Amul Butter (100g)', price: 56, image: IMAGES.butter, category: 'Dairy & Bread', weight: '100g' },
  { id: 'g2', name: 'Farm Fresh Eggs', price: 80, image: IMAGES.eggs, category: 'Dairy & Bread', weight: '6 pcs' },
  { id: 'g3', name: 'Modern Brown Bread', price: 45, image: IMAGES.bread, category: 'Dairy & Bread', weight: '400g' },
  { id: 'g4', name: 'Amul Taaza Milk', price: 32, image: IMAGES.milk, category: 'Dairy & Bread', weight: '500ml' },
  { id: 'g5', name: 'Paneer (200g)', price: 95, image: IMAGES.paneer_raw, category: 'Dairy & Bread', weight: '200g' },

  // Fruits & Veggies
  { id: 'g6', name: 'Fresh Tomatoes', price: 40, image: IMAGES.tomato, category: 'Fruits & Veggies', weight: '1kg' },
  { id: 'g7', name: 'Onions', price: 35, image: IMAGES.onion, category: 'Fruits & Veggies', weight: '1kg' },
  { id: 'g8', name: 'Potatoes', price: 30, image: IMAGES.potato, category: 'Fruits & Veggies', weight: '1kg' },
  { id: 'g9', name: 'Robusta Bananas', price: 50, image: IMAGES.banana, category: 'Fruits & Veggies', weight: '1 dozen' },
  { id: 'g10', name: 'Red Apples', price: 180, image: IMAGES.apple, category: 'Fruits & Veggies', weight: '1kg' },

  // Snacks & Drinks
  { id: 'g11', name: 'Lays Magic Masala', price: 20, image: IMAGES.chips, category: 'Snacks & Drinks', weight: '50g' },
  { id: 'g12', name: 'Coca Cola', price: 40, image: IMAGES.coke, category: 'Snacks & Drinks', weight: '750ml' },
  { id: 'g13', name: 'Maggi Noodles', price: 14, image: IMAGES.noodles, category: 'Snacks & Drinks', weight: '70g' },
  { id: 'g14', name: 'Dairy Milk Silk', price: 80, image: IMAGES.chocolate, category: 'Snacks & Drinks', weight: '60g' },

  // Staples
  { id: 'g15', name: 'Aashirvaad Atta', price: 250, image: IMAGES.flour, category: 'Staples', weight: '5kg' },
  { id: 'g16', name: 'Tata Salt', price: 25, image: IMAGES.salt, category: 'Staples', weight: '1kg' },
  { id: 'g17', name: 'Basmati Rice', price: 120, image: IMAGES.rice, category: 'Staples', weight: '1kg' },
  { id: 'g18', name: 'Sunflwer Oil', price: 180, image: IMAGES.oil, category: 'Staples', weight: '1L' },
  
  // Household
  { id: 'g19', name: 'Surf Excel Matic', price: 220, image: IMAGES.detergent, category: 'Household', weight: '1kg' },
];
