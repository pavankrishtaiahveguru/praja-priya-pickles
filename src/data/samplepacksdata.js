// Sample Pack combo definitions.
// Each combo's product list is pulled live from `productCategories`
// (via `categoryId`) inside ComboModal, so this file never duplicates
// product names — if productsData.js changes, combos stay in sync.

export const samplePacks = [
  {
    id: "veg-sample-pack",
    comboType: "veg",
    categoryId: "veg-pickles",
    emoji: "🥭",
    title: "Veg Sample Pack",
    description: "Choose Any 5 Veg Pickles",
    modalTitle: "Choose Any 5 Veg Pickles",
    image: "/products/combos/veg-sample-pack.png",
    weight: "1kg",
    weightLabel: "1 Kg",
    price: 250,
    maxSelection: 5,
  },
  {
    id: "non-veg-sample-pack",
    comboType: "non-veg",
    categoryId: "non-veg-pickles",
    emoji: "🍗",
    title: "Non-Veg Sample Pack",
    description: "Choose Any 5 Non-Veg Pickles",
    modalTitle: "Choose Any 5 Non-Veg Pickles",
    image: "/products/combos/non-veg-sample-pack.png",
    weight: "1kg",
    weightLabel: "1 Kg",
    price: 1000,
    maxSelection: 5,
  },
  {
    id: "podi-sample-pack",
    comboType: "podi",
    categoryId: "traditional-podis",
    emoji: "🌶️",
    title: "Traditional Podi Pack",
    description: "Choose Any 5 Traditional Podi's",
    modalTitle: "Choose Any 5 Traditional Podi's",
    image: "/products/combos/podi-sample-pack.png",
    weight: "1kg",
    weightLabel: "1 Kg",
    price: 250,
    maxSelection: 5,
  },
];
