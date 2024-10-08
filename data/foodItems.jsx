const items = {
  drinks: [
    { id: 1, name: 'Coke', price: '1.50', calories: '150 kcal', description: 'Classic cola with a refreshing, fizzy taste.', subsectionId: 1 },
    { id: 2, name: 'Pepsi', price: '1.50', calories: '150 kcal', description: 'Popular cola with a slightly sweeter flavor than other brands.', subsectionId: 1 },
    { id: 3, name: 'Lemonade Lemonade Lemonade Lemonade Lemonade', price: '2.00', calories: '120 kcal', description: 'Tangy and sweet lemonade made with real lemons.', subsectionId: 2 },
    { id: 4, name: 'Iced Tea', price: '2.00', calories: '80 kcal', description: 'Chilled tea with a hint of lemon, served over ice.', subsectionId: 3 },
    { id: 5, name: 'Orange Juice', price: '2.50', calories: '110 kcal', description: 'Freshly squeezed orange juice with a sweet, citrus flavor.', subsectionId: 2 },
    { id: 6, name: 'Apple Juice', price: '2.50', calories: '120 kcal', description: 'Sweet and crisp apple juice made from premium apples.', subsectionId: 2 },
    { id: 7, name: 'Milkshake', price: '3.00', calories: '300 kcal', description: 'Rich and creamy milkshake available in various flavors.', subsectionId: 5 },
    { id: 8, name: 'Smoothie', price: '3.50', calories: '250 kcal', description: 'Blended fruit smoothie with a smooth texture and vibrant flavor.', subsectionId: 6 },
    { id: 9, name: 'Water', price: '1.00', calories: '0 kcal', description: 'Pure, refreshing water to quench your thirst.', subsectionId: 7 },
    { id: 10, name: 'Sparkling Water', price: '1.50', calories: '0 kcal', description: 'Effervescent sparkling water with a bubbly sensation.', subsectionId: 7 },
    { id: 11, name: 'Energy Drink', price: '2.50', calories: '200 kcal', description: 'Boost of energy with a stimulating flavor and added caffeine.', subsectionId: 8 },
    { id: 12, name: 'Coffee', price: '2.00', calories: '5 kcal', description: 'Hot brewed coffee with a robust, aromatic flavor.', subsectionId: 4 },
    { id: 13, name: 'Latte', price: '3.00', calories: '150 kcal', description: 'Smooth coffee with steamed milk and a touch of foam.', subsectionId: 4 },
    { id: 14, name: 'Cappuccino', price: '3.00', calories: '120 kcal', description: 'Espresso topped with steamed milk and a thick layer of foam.', subsectionId: 4 },
    { id: 15, name: 'Espresso', price: '2.50', calories: '5 kcal', description: 'Concentrated coffee with a strong flavor and rich crema.', subsectionId: 4 },
    { id: 16, name: 'Hot Chocolate', price: '2.50', calories: '200 kcal', description: 'Warm, velvety hot chocolate topped with whipped cream.', subsectionId: 9 },
    { id: 17, name: 'Tea', price: '1.50', calories: '2 kcal', description: 'Simple and soothing hot tea with a delicate flavor.', subsectionId: 3 },
    { id: 18, name: 'Green Tea', price: '1.50', calories: '2 kcal', description: 'Light and refreshing green tea with a subtle taste.', subsectionId: 3 },
    { id: 19, name: 'Herbal Tea', price: '1.50', calories: '2 kcal', description: 'Caffeine-free herbal tea with various soothing flavors.', subsectionId: 3 },
    { id: 20, name: 'Cola Zero', price: '1.50', calories: '0 kcal', description: 'Zero-calorie cola with the classic cola taste.', subsectionId: 1 },
    { id: 21, name: 'Diet Pepsi', price: '1.50', calories: '0 kcal', description: 'Diet version of Pepsi with no calories and a similar taste.', subsectionId: 1 },
    { id: 22, name: 'Ginger Ale', price: '2.00', calories: '140 kcal', description: 'Spicy and sweet ginger-flavored soda.', subsectionId: 10 },
    { id: 23, name: 'Root Beer', price: '2.00', calories: '160 kcal', description: 'Frothy and flavorful root beer with hints of vanilla and spices.', subsectionId: 10 },
    { id: 24, name: 'Lime Soda', price: '2.00', calories: '130 kcal', description: 'Zesty lime-flavored soda with a refreshing bite.', subsectionId: 10 },
    { id: 25, name: 'Cherry Cola', price: '2.00', calories: '150 kcal', description: 'Cola with a fruity cherry twist.', subsectionId: 1 },
    { id: 26, name: 'Milk', price: '1.50', calories: '100 kcal', description: 'Creamy and nutritious milk, perfect for any time of day.', subsectionId: 5 },
    { id: 27, name: 'Soy Milk', price: '2.00', calories: '90 kcal', description: 'Plant-based milk with a smooth texture and mild flavor.', subsectionId: 5 },
    { id: 28, name: 'Almond Milk', price: '2.00', calories: '60 kcal', description: 'Nutty and slightly sweet almond milk for a lighter option.', subsectionId: 5 },
    { id: 29, name: 'Coconut Water', price: '2.50', calories: '45 kcal', description: 'Hydrating coconut water with a subtle tropical flavor.', subsectionId: 6 },
    { id: 30, name: 'Protein Shake', price: '3.50', calories: '250 kcal', description: 'High-protein shake to fuel your workout and recovery.', subsectionId: 6 },
  ],
  burritos: [
    { id: 31, name: 'Beef Burrito', price: '8.00', calories: '500 kcal', description: 'Savory beef wrapped in a warm tortilla with traditional Mexican spices.', subsectionId: 11 },
    { id: 32, name: 'Chicken Burrito', price: '7.50', calories: '450 kcal', description: 'Tender chicken seasoned and rolled into a soft tortilla with fresh vegetables.', subsectionId: 11 },
    { id: 33, name: 'Vegetarian Burrito', price: '7.00', calories: '400 kcal', description: 'A hearty mix of beans, rice, and vegetables for a satisfying meat-free option.', subsectionId: 12 },
    { id: 34, name: 'Pork Burrito', price: '8.50', calories: '520 kcal', description: 'Flavorful pork combined with beans, rice, and cheese in a flour tortilla.', subsectionId: 11 },
    { id: 35, name: 'Fish Burrito', price: '9.00', calories: '480 kcal', description: 'Grilled fish fillets with a zesty sauce and fresh ingredients, wrapped in a tortilla.', subsectionId: 15 },
    { id: 36, name: 'Shrimp Burrito', price: '9.50', calories: '460 kcal', description: 'Juicy shrimp sautéed with spices and wrapped in a warm tortilla with crunchy vegetables.', subsectionId: 15 },
    { id: 37, name: 'Steak Burrito', price: '9.00', calories: '550 kcal', description: 'Grilled steak with savory seasonings, beans, and rice, all wrapped up in a flour tortilla.', subsectionId: 11 },
    { id: 38, name: 'Breakfast Burrito', price: '7.50', calories: '400 kcal', description: 'Packed with scrambled eggs, sausage, and cheese for a hearty breakfast treat.', subsectionId: 16 },
    { id: 39, name: 'Black Bean Burrito', price: '7.00', calories: '380 kcal', description: 'Delicious black beans with rice and spices, wrapped in a warm tortilla.', subsectionId: 12 },
    { id: 40, name: 'Tofu Burrito', price: '7.50', calories: '350 kcal', description: 'Crispy tofu with vegetables and rice, offering a satisfying vegetarian option.', subsectionId: 12 },
    { id: 41, name: 'Cheese Burrito', price: '6.50', calories: '330 kcal', description: 'Melted cheese with rice and beans, wrapped in a tortilla for a simple yet delicious meal.', subsectionId: 12 },
    { id: 42, name: 'Spicy Beef Burrito', price: '8.50', calories: '510 kcal', description: 'Beef burrito with a spicy kick, featuring bold seasonings and a touch of heat.', subsectionId: 13 },
    { id: 43, name: 'Spicy Chicken Burrito', price: '8.00', calories: '460 kcal', description: 'Chicken burrito with a spicy twist, perfect for those who like a little extra heat.', subsectionId: 13 },
    { id: 44, name: 'Spicy Vegetarian Burrito', price: '7.50', calories: '420 kcal', description: 'Vegetarian burrito with a spicy kick, featuring seasoned beans and fresh veggies.', subsectionId: 13 },
    { id: 45, name: 'Spicy Pork Burrito', price: '9.00', calories: '530 kcal', description: 'Tender pork with a spicy blend of seasonings, wrapped in a tortilla with rice and beans.', subsectionId: 13 },
    { id: 46, name: 'Spicy Fish Burrito', price: '9.50', calories: '490 kcal', description: 'Grilled fish with a spicy sauce, combined with fresh ingredients in a warm tortilla.', subsectionId: 13 },
    { id: 47, name: 'Spicy Shrimp Burrito', price: '10.00', calories: '470 kcal', description: 'Spicy shrimp with a zesty sauce and crisp vegetables, wrapped in a soft tortilla.', subsectionId: 13 },
    { id: 48, name: 'Spicy Steak Burrito', price: '9.50', calories: '560 kcal', description: 'Grilled steak with a spicy seasoning blend, wrapped in a tortilla with beans and rice.', subsectionId: 13 },
    { id: 49, name: 'Spicy Breakfast Burrito', price: '8.00', calories: '410 kcal', description: 'Breakfast burrito with scrambled eggs, sausage, and a spicy kick for added flavor.', subsectionId: 16 },
    { id: 50, name: 'Spicy Black Bean Burrito', price: '7.50', calories: '390 kcal', description: 'Black beans with a spicy seasoning, combined with rice and wrapped in a tortilla.', subsectionId: 13 },
    { id: 51, name: 'Spicy Tofu Burrito', price: '8.00', calories: '360 kcal', description: 'Crispy tofu with a spicy sauce, mixed with vegetables and rice in a warm tortilla.', subsectionId: 13 },
    { id: 52, name: 'Spicy Cheese Burrito', price: '7.00', calories: '340 kcal', description: 'Cheese burrito with a spicy seasoning, perfect for those who enjoy a bit of heat.', subsectionId: 13 },
    { id: 53, name: 'Barbecue Beef Burrito', price: '9.00', calories: '520 kcal', description: 'Beef with a tangy barbecue sauce, wrapped in a tortilla with rice and beans.', subsectionId: 14 },
    { id: 54, name: 'Barbecue Chicken Burrito', price: '8.50', calories: '470 kcal', description: 'Tender chicken in a sweet and smoky barbecue sauce, wrapped in a tortilla with veggies.', subsectionId: 14 },
    { id: 55, name: 'Barbecue Pork Burrito', price: '9.50', calories: '540 kcal', description: 'Pork with a rich barbecue flavor, combined with beans and rice in a warm tortilla.', subsectionId: 14 },
    { id: 56, name: 'Barbecue Fish Burrito', price: '10.00', calories: '500 kcal', description: 'Grilled fish with a smoky barbecue sauce, wrapped with fresh ingredients in a tortilla.', subsectionId: 14 },
    { id: 57, name: 'Barbecue Shrimp Burrito', price: '10.50', calories: '480 kcal', description: 'Shrimp with a sweet and tangy barbecue sauce, wrapped in a tortilla with crisp veggies.', subsectionId: 14 },
    { id: 58, name: 'Barbecue Steak Burrito', price: '10.00', calories: '570 kcal', description: 'Steak with a rich barbecue sauce, combined with beans and rice in a soft tortilla.', subsectionId: 14 },
    { id: 59, name: 'Barbecue Breakfast Burrito', price: '8.50', calories: '420 kcal', description: 'Breakfast burrito with scrambled eggs and sausage, flavored with barbecue sauce.', subsectionId: 16 },
    { id: 60, name: 'Barbecue Black Bean Burrito', price: '8.00', calories: '400 kcal', description: 'Black beans with a smoky barbecue sauce, wrapped in a tortilla with rice and veggies.', subsectionId: 14 }
  ],
  tacos: [
    { id: 61, name: 'Beef Taco', price: '3.00', calories: '200 kcal', description: 'Classic beef taco with seasoned ground beef, crisp lettuce, and cheese in a soft tortilla.', subsectionId: 17 },
    { id: 62, name: 'Chicken Taco', price: '2.80', calories: '180 kcal', description: 'Tender chicken with a mild seasoning, topped with fresh vegetables and wrapped in a tortilla.', subsectionId: 17 },
    { id: 63, name: 'Fish Taco', price: '3.50', calories: '220 kcal', description: 'Lightly battered fish fillets with a zesty sauce, served with crunchy slaw in a soft tortilla.', subsectionId: 21 },
    { id: 64, name: 'Pork Taco', price: '3.20', calories: '210 kcal', description: 'Flavorful pulled pork with smoky spices, topped with onions and cilantro in a warm tortilla.', subsectionId: 17 },
    { id: 65, name: 'Shrimp Taco', price: '3.80', calories: '230 kcal', description: 'Juicy shrimp sautéed with spices, paired with fresh vegetables and a creamy sauce in a tortilla.', subsectionId: 21 },
    { id: 66, name: 'Steak Taco', price: '3.50', calories: '240 kcal', description: 'Grilled steak strips with a savory marinade, served with fresh toppings in a soft tortilla.', subsectionId: 17 },
    { id: 67, name: 'Vegetarian Taco', price: '2.50', calories: '160 kcal', description: 'A mix of grilled vegetables and beans, topped with fresh salsa and wrapped in a tortilla.', subsectionId: 18 },
    { id: 68, name: 'Black Bean Taco', price: '2.50', calories: '170 kcal', description: 'Hearty black beans seasoned with spices, topped with fresh ingredients and served in a tortilla.', subsectionId: 18 },
    { id: 69, name: 'Tofu Taco', price: '2.80', calories: '150 kcal', description: 'Crispy tofu cubes with a savory sauce, accompanied by fresh vegetables in a soft tortilla.', subsectionId: 18 },
    { id: 70, name: 'Cheese Taco', price: '2.50', calories: '140 kcal', description: 'Melted cheese with a sprinkle of seasoning, wrapped in a warm tortilla for a simple delight.', subsectionId: 18 },
    { id: 71, name: 'Spicy Beef Taco', price: '3.50', calories: '210 kcal', description: 'Spicy seasoned beef with a kick, topped with lettuce and cheese in a tortilla.', subsectionId: 19 },
    { id: 72, name: 'Spicy Chicken Taco', price: '3.30', calories: '190 kcal', description: 'Tender chicken with a spicy seasoning, served with fresh vegetables and a spicy sauce in a tortilla.', subsectionId: 19 },
    { id: 73, name: 'Spicy Fish Taco', price: '3.80', calories: '230 kcal', description: 'Fish fillets with a spicy coating, paired with a zesty slaw and wrapped in a tortilla.', subsectionId: 19 },
    { id: 74, name: 'Spicy Pork Taco', price: '3.50', calories: '220 kcal', description: 'Spicy pulled pork with bold flavors, topped with onions and cilantro in a warm tortilla.', subsectionId: 19 },
    { id: 75, name: 'Spicy Shrimp Taco', price: '4.00', calories: '240 kcal', description: 'Shrimp with a spicy kick, served with fresh veggies and a creamy sauce in a tortilla.', subsectionId: 19 },
    { id: 76, name: 'Spicy Steak Taco', price: '3.80', calories: '250 kcal', description: 'Grilled steak with a spicy seasoning, wrapped with fresh toppings in a tortilla.', subsectionId: 19 },
    { id: 77, name: 'Spicy Vegetarian Taco', price: '2.80', calories: '170 kcal', description: 'Vegetarian taco with a spicy kick, featuring seasoned vegetables and beans in a tortilla.', subsectionId: 19 },
    { id: 78, name: 'Spicy Black Bean Taco', price: '2.80', calories: '180 kcal', description: 'Black beans with a spicy seasoning, combined with fresh ingredients and served in a tortilla.', subsectionId: 19 },
    { id: 79, name: 'Spicy Tofu Taco', price: '3.00', calories: '160 kcal', description: 'Crispy tofu with a spicy sauce, paired with vegetables and wrapped in a warm tortilla.', subsectionId: 19 },
    { id: 80, name: 'Spicy Cheese Taco', price: '2.80', calories: '150 kcal', description: 'Cheese taco with a spicy twist, featuring melted cheese and a kick of heat in a tortilla.', subsectionId: 19 },
    { id: 81, name: 'Barbecue Beef Taco', price: '3.80', calories: '220 kcal', description: 'Beef with a smoky barbecue sauce, topped with fresh vegetables in a tortilla.', subsectionId: 20 },
    { id: 82, name: 'Barbecue Chicken Taco', price: '3.60', calories: '200 kcal', description: 'Tender chicken with a tangy barbecue sauce, wrapped in a tortilla with fresh toppings.', subsectionId: 20 },
    { id: 83, name: 'Barbecue Pork Taco', price: '3.80', calories: '230 kcal', description: 'Pulled pork with a rich barbecue flavor, served with crisp vegetables in a tortilla.', subsectionId: 20 },
    { id: 84, name: 'Barbecue Fish Taco', price: '4.00', calories: '240 kcal', description: 'Fish fillets with a smoky barbecue sauce, paired with crunchy slaw in a warm tortilla.', subsectionId: 20 },
    { id: 85, name: 'Barbecue Shrimp Taco', price: '4.20', calories: '250 kcal', description: 'Shrimp with a sweet and smoky barbecue sauce, served with fresh ingredients in a tortilla.', subsectionId: 20 },
    { id: 86, name: 'Barbecue Steak Taco', price: '4.00', calories: '260 kcal', description: 'Grilled steak with a tangy barbecue sauce, wrapped with fresh vegetables in a tortilla.', subsectionId: 20 },
    { id: 87, name: 'Barbecue Vegetarian Taco', price: '3.00', calories: '180 kcal', description: 'Vegetarian taco with a barbecue twist, featuring seasoned vegetables and beans in a tortilla.', subsectionId: 20 },
    { id: 88, name: 'Barbecue Black Bean Taco', price: '3.00', calories: '190 kcal', description: 'Black beans with a smoky barbecue flavor, served with fresh toppings in a warm tortilla.', subsectionId: 20 },
    { id: 89, name: 'Barbecue Tofu Taco', price: '3.20', calories: '170 kcal', description: 'Tofu with a smoky barbecue sauce, combined with vegetables and wrapped in a tortilla.', subsectionId: 20 },
    { id: 90, name: 'Barbecue Cheese Taco', price: '3.00', calories: '160 kcal', description: 'Cheese taco with a barbecue twist, featuring melted cheese and a hint of smoky flavor.', subsectionId: 20 }
  ],
  desserts: [
    { id: 91, name: 'Chocolate Cake', price: '4.00', calories: '350 kcal', description: 'Rich and moist chocolate cake topped with a creamy chocolate frosting.', subsectionId: 22 },
    { id: 92, name: 'Ice Cream', price: '3.00', calories: '250 kcal', description: 'Classic vanilla ice cream, creamy and smooth with a hint of sweetness.', subsectionId: 25 },
    { id: 93, name: 'Apple Pie', price: '3.50', calories: '300 kcal', description: 'Traditional apple pie with a buttery crust and spiced apple filling.', subsectionId: 23 },
    { id: 94, name: 'Cheesecake', price: '4.50', calories: '400 kcal', description: 'Creamy cheesecake with a graham cracker crust and rich, smooth filling.', subsectionId: 22 },
    { id: 95, name: 'Brownie', price: '3.50', calories: '320 kcal', description: 'Decadent chocolate brownie with a fudgy texture and rich chocolate flavor.', subsectionId: 24 },
    { id: 96, name: 'Cupcake', price: '2.50', calories: '200 kcal', description: 'Light and fluffy cupcake with a sweet frosting and sprinkles.', subsectionId: 22 },
    { id: 97, name: 'Donut', price: '2.00', calories: '250 kcal', description: 'Soft and sweet donut, glazed or powdered, perfect for a quick treat.', subsectionId: 26 },
    { id: 98, name: 'Fruit Tart', price: '3.50', calories: '280 kcal', description: 'Delicate tart filled with fresh fruit and a creamy custard base.', subsectionId: 26 },
    { id: 99, name: 'Pudding', price: '2.50', calories: '180 kcal', description: 'Smooth and creamy pudding, available in various flavors like vanilla or chocolate.', subsectionId: 27 },
    { id: 100, name: 'Tiramisu', price: '4.50', calories: '350 kcal', description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.', subsectionId: 22 },
    { id: 101, name: 'Lemon Meringue Pie', price: '3.50', calories: '320 kcal', description: 'Tangy lemon filling with a light, fluffy meringue topping on a buttery crust.', subsectionId: 23 },
    { id: 102, name: 'Pecan Pie', price: '4.00', calories: '380 kcal', description: 'Sweet pie filled with a rich, gooey pecan mixture and a flaky crust.', subsectionId: 23 },
    { id: 103, name: 'Carrot Cake', price: '4.00', calories: '300 kcal', description: 'Spiced carrot cake with nuts and a creamy cream cheese frosting.', subsectionId: 22 },
    { id: 104, name: 'Pumpkin Pie', price: '3.50', calories: '280 kcal', description: 'Smooth pumpkin filling with a blend of spices, nestled in a flaky crust.', subsectionId: 23 },
    { id: 105, name: 'Red Velvet Cake', price: '4.50', calories: '350 kcal', description: 'Luxurious red velvet cake with a hint of cocoa and a creamy cream cheese frosting.', subsectionId: 22 },
    { id: 106, name: 'Chocolate Chip Cookies', price: '3.00', calories: '240 kcal', description: 'Chewy cookies packed with chocolate chips and a touch of vanilla.', subsectionId: 24 },
    { id: 107, name: 'Banana Bread', price: '3.00', calories: '220 kcal', description: 'Moist banana bread with ripe bananas and a hint of spice.', subsectionId: 22 },
    { id: 108, name: 'Key Lime Pie', price: '3.50', calories: '280 kcal', description: 'Tart and creamy key lime filling in a graham cracker crust, topped with whipped cream.', subsectionId: 23 },
    { id: 109, name: 'Rice Pudding', price: '2.50', calories: '180 kcal', description: 'Creamy rice pudding flavored with vanilla and a sprinkle of cinnamon.', subsectionId: 27 },
    { id: 110, name: 'Strawberry Shortcake', price: '4.50', calories: '320 kcal', description: 'Fluffy shortcake layered with sweet strawberries and whipped cream.', subsectionId: 22 },
    { id: 111, name: 'Blueberry Muffin', price: '2.50', calories: '200 kcal', description: 'Moist muffin bursting with fresh blueberries and a hint of vanilla.', subsectionId: 26 },
    { id: 112, name: 'Lava Cake', price: '4.00', calories: '350 kcal', description: 'Decadent chocolate cake with a gooey molten center, served warm.', subsectionId: 22 },
    { id: 113, name: 'Coconut Macaroons', price: '3.00', calories: '250 kcal', description: 'Chewy coconut macaroons with a sweet and toasty flavor.', subsectionId: 26 },
    { id: 114, name: 'Eclair', price: '3.50', calories: '300 kcal', description: 'Light and airy eclair filled with vanilla cream and topped with chocolate glaze.', subsectionId: 26 },
    { id: 115, name: 'Gelato', price: '3.50', calories: '280 kcal', description: 'Italian-style ice cream with a creamy texture and intense flavor, available in various options.', subsectionId: 25 },
    { id: 116, name: 'Mousse', price: '3.00', calories: '200 kcal', description: 'Light and fluffy mousse with a rich chocolate or fruit flavor.', subsectionId: 27 },
    { id: 117, name: 'Parfait', price: '3.50', calories: '260 kcal', description: 'Layered dessert with yogurt, fruit, and granola for a refreshing treat.', subsectionId: 25 },
    { id: 118, name: 'Baklava', price: '4.00', calories: '350 kcal', description: 'Sweet pastry made with layers of filo dough, nuts, and honey.', subsectionId: 26 },
    { id: 119, name: 'Cannoli', price: '3.50', calories: '300 kcal', description: 'Crispy pastry shells filled with a sweet ricotta cream and a touch of chocolate.', subsectionId: 26 },
    { id: 120, name: 'Froyo', price: '2.50', calories: '180 kcal', description: 'Frozen yogurt with a tangy flavor, available in various toppings and flavors.', subsectionId: 25 }
  ]
};

export default items