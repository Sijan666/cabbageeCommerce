import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../Container"; 
import Flex from "../Flex";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

const BlogDetails = () => {
    const { id } = useParams();

    const blogPosts = [
        {
        id: 1,
        title: "10 Reasons to Switch to Organic Vegetables Today",
        category: "Health & Nutrition",
        date: "August 12, 2026",
        author: "Admin",
        image: "https://loremflickr.com/1200/600/vegetables,organic?lock=1",
        content: `
            Switching to organic vegetables is more than just a trend—it's a commitment to a healthier lifestyle and a sustainable planet. In this article, we explore the top 10 reasons why you should make the switch today.
            Firstly, organic farming strictly prohibits the use of synthetic pesticides and fertilizers. This means the food you put on your table is free from harmful chemicals that can build up in the body over time. 
            Moreover, organic vegetables often contain higher levels of antioxidants and certain micronutrients compared to conventionally grown ones. They taste better too! When crops are allowed to grow naturally, they develop richer, more authentic flavors.
            Support local farmers and protect the environment by choosing organic. Every purchase is a vote for a greener earth.
        `,
        },
        {
        id: 2,
        title: "How to Store Fresh Fruits to Make Them Last Longer",
        category: "Tips & Tricks",
        date: "August 05, 2026",
        author: "Sarah Jane",
        image: "https://loremflickr.com/1200/600/fruits,fresh?lock=2",
        content: `
            Tired of your fresh produce going bad too quickly? You are not alone. Food waste is a major issue, but with a few simple storage hacks, you can keep your fruits fresh for weeks.
            Rule number one: Do not wash your fruits until you are ready to eat them. Moisture encourages mold growth. 
            Secondly, understand which fruits emit ethylene gas (like apples and bananas) and keep them away from ethylene-sensitive fruits (like berries and leafy greens) to prevent premature ripening.
            By organizing your fridge and utilizing proper containers, you can save money and enjoy fresh fruits longer.
        `,
        },
        {
        id: 3,
        title: "The Ultimate Guide to a Healthy Green Salad",
        category: "Recipes",
        date: "July 28, 2026",
        author: "Chef Mike",
        image: "https://loremflickr.com/1200/600/salad,healthy?lock=3",
        content: `
            A healthy green salad doesn't have to be boring. By mixing different textures and flavors, you can create a masterpiece that is both delicious and nutritious.
            Start with a strong base: mix spinach, arugula, and kale. Then, add a crunch—think roasted almonds, pumpkin seeds, or croutons. Next, throw in some color with cherry tomatoes, carrots, and bell peppers.
            Finally, the dressing is the soul of the salad. We recommend a homemade vinaigrette using extra virgin olive oil, fresh lemon juice, a dash of honey, and Dijon mustard.
        `,
        },
        {
        id: 4,
        title: "Why Farm-to-Table is Changing the Food Industry",
        category: "Lifestyle",
        date: "July 20, 2026",
        author: "Admin",
        image: "https://loremflickr.com/1200/600/farm,food?lock=4",
        content: `
            The farm-to-table movement is revolutionizing how we eat, focusing on producing food locally and delivering it straight to consumers. 
            This practice ensures that the food on your plate is as fresh as possible, retaining maximum nutritional value. It also significantly cuts down on the carbon footprint associated with transporting food across long distances.
            By supporting farm-to-table initiatives, we empower local economies and build stronger, more resilient communities. 
        `,
        },
        {
        id: 5,
        title: "Top 5 Superfoods You Need in Your Daily Diet",
        category: "Health & Nutrition",
        date: "July 15, 2026",
        author: "Dr. Emily",
        image: "https://loremflickr.com/1200/600/superfood,diet?lock=5",
        content: `
            Superfoods are nutrient powerhouses packed with large doses of antioxidants, polyphenols, vitamins, and minerals. 
            Start your day with Chia Seeds; they are loaded with omega-3 fatty acids and fiber. Next, incorporate Blueberries, known as the king of antioxidant foods. 
            Don't forget Spinach for iron, Quinoa for a complete plant-based protein, and Almonds for heart-healthy fats. Adding these 5 foods to your daily routine can dramatically improve your overall health and energy levels.
        `,
        },
        {
        id: 6,
        title: "A Beginner's Guide to Vegan Cooking at Home",
        category: "Recipes",
        date: "July 02, 2026",
        author: "Sarah Jane",
        image: "https://loremflickr.com/1200/600/vegan,cooking?lock=6",
        content: `
            Transitioning to a vegan diet can seem daunting, but cooking plant-based meals at home is actually incredibly simple and affordable.
            The secret lies in stocking up your pantry with essentials: canned beans, lentils, whole grains, and a variety of spices. Nutritional yeast is a game-changer for adding a cheesy flavor to dairy-free dishes.
            Start with familiar recipes. Make a hearty lentil bolognese, a rich coconut milk curry, or simple roasted vegetable wraps. Plant-based cooking is all about creativity!
        `,
        },
        {
        id: 7,
        title: "The Benefits of a Gluten-Free Diet Uncovered",
        category: "Health & Nutrition",
        date: "June 25, 2026",
        author: "Dr. Emily",
        image: "https://loremflickr.com/1200/600/glutenfree,food?lock=7",
        content: `
            While essential for those with Celiac disease, many people without the condition are finding incredible health benefits by adopting a gluten-free lifestyle.
            A gluten-free diet often leads to increased energy levels, reduced bloating, and better digestion. It also naturally encourages people to eat more whole foods, like fruits, vegetables, and lean proteins, rather than highly processed snacks.
            However, it is important to replace gluten-containing grains with healthy alternatives like quinoa, brown rice, and buckwheat to maintain a balanced diet.
        `,
        },
        {
        id: 8,
        title: "5 Easy Ways to Reduce Food Waste at Home",
        category: "Sustainability",
        date: "June 18, 2026",
        author: "Admin",
        image: "https://loremflickr.com/1200/600/kitchen,vegetables?lock=8",
        content: `
            Did you know that nearly one-third of all food produced in the world goes to waste? You can help change this right from your own kitchen.
            First, plan your meals and shop with a list. Second, understand expiration dates—many foods are still perfectly safe to eat past their 'best before' date. 
            Third, freeze your leftovers or ingredients you can't finish in time. Fourth, get creative with scraps; vegetable peels make excellent homemade broth. Finally, start a small compost bin for any unavoidable waste.
        `,
        },
        {
        id: 9,
        title: "Exploring the World of Exotic Tropical Fruits",
        category: "Lifestyle",
        date: "June 10, 2026",
        author: "Chef Mike",
        image: "https://loremflickr.com/1200/600/tropical,fruits?lock=9",
        content: `
            Beyond apples and bananas lies a vibrant world of tropical fruits waiting to be tasted. These exotic fruits offer unique flavor profiles and extraordinary health benefits.
            Take the Dragon Fruit, for instance—its stunning pink skin and speckled flesh are rich in magnesium and vitamin C. Rambutan, with its hairy exterior, reveals a sweet, juicy center that tastes like a lychee.
            Next time you visit our store, don't be afraid to pick up something unfamiliar. Your taste buds will thank you!
        `,
        },
        {
        id: 10,
        title: "The Secret to the Perfect Homemade Pasta",
        category: "Recipes",
        date: "June 03, 2026",
        author: "Sarah Jane",
        image: "https://loremflickr.com/1200/600/pasta,homemade?lock=10",
        content: `
            Making pasta from scratch is an art form, but it is much easier than you might think. All you need is high-quality flour, fresh organic eggs, and a pinch of salt.
            The real secret is in the kneading. You must work the dough until it is perfectly smooth and elastic. Then, let it rest. This resting period allows the gluten to relax, making it much easier to roll out.
            Serve your fresh pasta with a simple sauce of roasted tomatoes, garlic, and basil. Sometimes, the simplest ingredients make the best meals.
        `,
        },
        {
        id: 11,
        title: "Why Hydration is the Key to Glowing Skin",
        category: "Tips & Tricks",
        date: "May 28, 2026",
        author: "Admin",
        image: "https://loremflickr.com/1200/600/water,fresh?lock=11",
        content: `
            We spend fortunes on skincare products, often forgetting that the most effective beauty treatment comes from the tap. Hydration is the absolute foundation of glowing, healthy skin.
            Water helps to flush out toxins, reducing the likelihood of acne and breakouts. It also maintains skin elasticity, delaying the appearance of wrinkles.
            If you struggle to drink enough water, try "eating" your water by consuming hydrating fruits and vegetables like watermelon, cucumber, and strawberries.
        `,
        },
        {
        id: 12,
        title: "Understanding Food Labels: What to Look For",
        category: "Health & Nutrition",
        date: "May 20, 2026",
        author: "Dr. Emily",
        image: "https://loremflickr.com/1200/600/grocery,healthy?lock=12",
        content: `
            Supermarket aisles can be overwhelming, and misleading packaging doesn't help. Learning to read food labels is a crucial skill for maintaining a healthy diet.
            Always check the serving size first—the calories and nutrients listed are per serving, not necessarily the whole package. Next, read the ingredients list. Ingredients are ordered by weight, so whatever is listed first makes up the majority of the product.
            Watch out for hidden sugars disguised under names like high-fructose corn syrup, dextrose, or maltodextrin.
        `,
        }
    ];

    const post = blogPosts.find((p) => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F7F9F2]">
            <h2 className="text-3xl font-black font-int mb-4 text-[#232323]">Blog Not Found!</h2>
            <Link to="/blogs" className="text-[#80B500] font-bold hover:underline">Go back to Blogs Page</Link>
        </div>
        );
    }

    return (
        <div className="bg-[#F7F9F2] min-h-screen pb-20 font-nuni">
        {/* Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
            <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            {/* Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pt-20">
            <Container className="px-4 lg:px-0 text-center">
                <span className="inline-block bg-[#80B500] text-white text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 shadow-lg">
                {post.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-int text-white leading-tight max-w-4xl mx-auto drop-shadow-lg">
                {post.title}
                </h1>
            </Container>
            </div>
        </div>
        {/* Main Content Area */}
        <Container className="px-4 lg:px-0 -mt-20 relative z-10 flex justify-center">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
            {/* Meta Information */}
            <Flex className="items-center justify-center md:justify-start gap-6 text-sm font-bold text-gray-500 uppercase tracking-wider mb-10 pb-10 border-b border-gray-100 flex-wrap">
                <Flex className="items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500]">
                    <User className="w-4.5 h-4.5" />
                </div>
                <span className="text-[#232323]">By {post.author}</span>
                </Flex>
                <Flex className="items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500]">
                    <Calendar className="w-4.5 h-4.5" />
                </div>
                <span>{post.date}</span>
                </Flex>
                <Flex className="items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#80B500]/10 flex items-center justify-center text-[#80B500]">
                    <Tag className="w-4.5 h-4.5" />
                </div>
                <span>{post.category}</span>
                </Flex>
            </Flex>
            {/* Article Text */}
            <div className="text-lg text-[#546375] leading-loose space-y-6">
                {post.content.trim().split("\n\n").map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-xl font-medium text-[#232323] leading-relaxed" : ""}>
                    {paragraph}
                </p>
                ))}
            </div>
            {/* Tags & Share */}
            <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-3">
                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-[#80B500] hover:text-white transition-colors cursor-pointer">Organic</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-[#80B500] hover:text-white transition-colors cursor-pointer">Healthy</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-[#80B500] hover:text-white transition-colors cursor-pointer">Lifestyle</span>
                </div>
            </div>
            {/* Back to Blog Button */}
            <div className="mt-12 text-center">
                <Link to="/blogs">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[#232323] text-[#232323] font-bold font-nuni tracking-widest uppercase hover:bg-[#232323] hover:text-white transition-all duration-300">
                    <ArrowLeft className="w-4.5 h-4.5" />
                    Back to All Blogs
                </button>
                </Link>
            </div>
            </div>
        </Container>
        </div>
    );
};

export default BlogDetails;