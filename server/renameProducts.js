const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const luxuryNaming = {
    'Fashion': [
        { name: "Aurora Gold Link", desc: "A contemporary masterpiece featuring hand-polished gold links for the modern fashionista." },
        { name: "Seraphina Velvet Choker", desc: "Exquisite velvet paired with a central sapphire, defining timeless elegance." },
        { name: "Midnight Bangle Set", desc: "Dusk-inspired dark chrome bangles with subtle diamond encrustations." },
        { name: "Azure Coast Signet", desc: "Inspired by the Mediterranean, this ring features a deep turquoise stone." }
    ],
    'Daily Wear': [
        { name: "Lumina Gold Studs", desc: "Understated brilliance for everyday wear. Perfectly balanced and lightweight." },
        { name: "Petite Infinity Band", desc: "A delicate symbol of forever, crafted in 18k rose gold." },
        { name: "Classic Solstice Chain", desc: "The foundation of every jewelry collection. A sleek, versatile gold chain." },
        { name: "Minimalist Pearl Drop", desc: "A single freshwater pearl suspended from a fine silver wire." }
    ],
    'Fine Jewelry': [
        { name: "Celestial Diamond Halo", desc: "A breathtaking center stone surrounded by a constellation of brilliant diamonds." },
        { name: "Royal Emerald Pendant", desc: "A majestic pear-cut emerald set in a vintage-inspired platinum frame." },
        { name: "Astrid Sapphire Band", desc: "Deep blue sapphires alternated with diamonds in a modern channel setting." },
        { name: "Legacy Heirloom Locket", desc: "Hand-engraved gold locket designed to hold your most precious memories." }
    ],
    'Earrings': [
        { name: "Cascade Crystal Drops", desc: "Light-catching crystals that move with you, creating a shimmering waterfall effect." },
        { name: "Orion Starburst Studs", desc: "Inspired by the night sky, these studs feature a brilliant central diamond." },
        { name: "Radiance Ear Jackets", desc: "Versatile design that adds a modern edge to the classic diamond stud." },
        { name: "Infinite Loop Hoops", desc: "Seamless gold hoops that represent the beauty of continuity." }
    ],
    'Wedding': [
        { name: "Eternal Vow Platinum Band", desc: "Symbolize your commitment with this timeless, high-polish platinum band." },
        { name: "Graceful Solitaire Ring", desc: "The ultimate expression of love, featuring a hand-selected brilliant cut diamond." },
        { name: "Amour Diamond Set", desc: "A perfectly matched set of earrings and pendant for your special day." },
        { name: "Infinity Knot Wedding Band", desc: "Woven gold bands representing two lives becoming one." }
    ],
    'Exclusive Release': [
        { name: "Supernova Galactic Cuff", desc: "A bold statement piece featuring rare cosmic-hued gemstones." },
        { name: "Nebula Aura Necklace", desc: "Iridescent opals set in a fluid, sculptural gold frame." },
        { name: "The Farout Sovereign", desc: "Our signature piece. A masterpiece of craftsmanship and rare materials." },
        { name: "Eclipse Obsidian Signet", desc: "Carved volcanic glass set in brushed gunmetal for a striking look." }
    ]
};

const runMigration = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const products = await Product.find();
        let updatedCount = 0;

        for (const product of products) {
            // Check if name is generic (starts with "Product", "Item", "Lux Piece", etc.)
            const isGeneric = /^Product|^Item|^Lux|^Test/i.test(product.name) || product.name.includes("Piece");
            
            if (isGeneric) {
                const categoryPool = luxuryNaming[product.category] || luxuryNaming['Fashion'];
                const randomIndex = Math.floor(Math.random() * categoryPool.length);
                const newNameObj = categoryPool[randomIndex];

                console.log(`Renaming: "${product.name}" -> "${newNameObj.name}"`);
                
                product.name = newNameObj.name;
                product.description = newNameObj.desc;
                await product.save();
                updatedCount++;
            }
        }

        console.log(`Successfully updated ${updatedCount} products.`);
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

runMigration();
