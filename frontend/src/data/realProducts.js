import gradientGraphicTshirt from '../assets/gradientGraphicTshirt.png';
import poloWithTippingDetails from '../assets/poloWithTippingDetails.png';
import blackStrippedTshirt from '../assets/blackStrippedTshirt.png';
import skinnyFitJeans from '../assets/skinnyFitJeans.png';
import checkeredShirt from '../assets/checkeredShirt.png';
import sleeveStrippedTshirt from '../assets/sleeveStrippedTshirt.png';
import verticalStrippedShirt from '../assets/VerticalStrippedShirt.png';
import CourageGraphicTshirt from '../assets/CourageGraphicTshirt.png';
import looseFitBermudaShorts from '../assets/looseFitBermudaShorts.png';
import classicWhitePolo from '../assets/classicWhitePolo.avif';
import navyFormalShirt from '../assets/navyFormalShirt.jpg';
import strippedOrangeTee from '../assets/strippedOrangeTee.avif';

// daily essentials
import poojathali from "../assets/poojathali.png";
import temple from "../assets/temple.png";
import decor from "../assets/decor.jpg";
import urlis from "../assets/urlis.jpg";

// havenlyhaste
import spicedMint from "../assets/spicedMint.jpg"
import strawBerry from "../assets/strawberry.jpg"
import blueBerry from "../assets/blueberry.jpg"
import juiceLemon from "../assets/juiceLemon.jpg"

// popularProducts
import chandanImage from '../assets/chandan.jpg';
import agarbatti from '../assets/agarbatti.png';
import ajoovaSeedPowder from '../assets/ajoovaSeedPowder.jpg';
import dhoopbatti from '../assets/dhoopbatti.webp';

// categoryProducts
import lemonImg from '../assets/lemon.png';
import nutpackImg from '../assets/nutpack.png';
import watermelonImg from '../assets/watermelon.png';
import vegetablesImg from '../assets/vegetables.png';
import gingeraleImg from '../assets/gingerale.png';
import almondsImg from '../assets/almonds.png';
import brassDiyaImg from '../assets/brassDiya.jpg'
import poshakKrishnaImg from '../assets/poshakKrishna.webp'
import attarRoseImg from '../assets/attarsRose.jpg'
import tulsiMalaImg from '../assets/tulsiMala.jpg';
import havanSamgriImg from '../assets/havanSamgri.jpg';

export const products = {
  normal: [
    {
      id: 1,
      name: "Brass Pooja Thali Set",
      price: 599,
      originalPrice: 899,
      discount: 33,
      rating: 4.5,
      reviewsCount: 230,
      image: "https://m.media-amazon.com/images/I/51Hasi4XleL._UF894,1000_QL80_.jpg", // default image
      description: "Traditional brass pooja thali with diya, agarbatti holder, and kumkum box. Perfect for daily rituals and festive occasions.",
      shortDescription: "Complete brass pooja thali set",
      size: "Standard",
      category: "Pooja Item",
      color: "Golden",
      availableColors: ["golden", "silver"],
      dressStyle: "Traditional",
      brand: "Divine Essentials",
      material: "Pure Brass",
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Free delivery in 3-5 days",
      returnPolicy: "7-day easy returns",
      tags: ["pooja", "spiritual", "festival", "brass"],
      reviews: [
        {
          name: "Meera S.",
          message: "This pooja thali is beautifully crafted and has everything needed for daily rituals. Brass quality is excellent.",
          rating: 5,
          publishedAt: "02/08/2025"
        },
        {
          name: "Rajesh K.",
          message: "Perfect for Diwali and Navratri pooja. The shine and finish are amazing. Highly recommended!",
          rating: 5,
          publishedAt: "15/10/2024"
        },
        {
          name: "Sita P.",
          message: "It really brings a divine feel to our mandir at home. Worth the price!",
          rating: 4,
          publishedAt: "22/11/2024"
        }
      ],
      variants: {
        golden: {
          images: [
            "https://m.media-amazon.com/images/I/71h1fNggF9L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/51Hasi4XleL._UF894,1000_QL80_.jpg"
          ]
        },
        silver: {
          images: [
            "https://m.media-amazon.com/images/I/71YFuxvU44L._SX679_.jpg",
            "https://5.imimg.com/data5/SELLER/Default/2023/2/JQ/TO/HX/116685267/silver-pooja-thali-set.jpeg"
          ]
        }
      }
    },
    {
      id: 2,
      name: "Sandalwood Agarbatti Sticks",
      price: 185,
      originalPrice: 210,
      discount: 12,
      rating: 4.7,
      reviewsCount: 152,
      image: "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg",
      images: [
        "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg",
        "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg"
      ],
      description: "Premium natural sandalwood incense sticks for daily pooja and meditation. Creates a calming, spiritual atmosphere.",
      shortDescription: "Pure sandalwood incense sticks",
      color: "Brown",
      availableColors: ["brown", "white", "rose"],
      size: "Standard",
      category: "Pooja Item",
      dressStyle: "Traditional",
      brand: "Divine Fragrance",
      material: "Natural Sandalwood",
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Ships in 2-4 days",
      returnPolicy: "15-day return policy",
      tags: ["agarbatti", "pooja", "incense", "spiritual"],
      reviews: [
        {
          name: "Anjali M.",
          message: "The fragrance is divine, it fills my home with positivity.",
          rating: 5,
          publishedAt: "12/06/2024"
        },
        {
          name: "Harsh V.",
          message: "Burns for a long time and perfect for daily pooja.",
          rating: 4,
          publishedAt: "03/01/2025"
        }
      ],
      variants: {
        brown: {
          images: [
            "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg",
            "https://m.media-amazon.com/images/I/81puYfV4SZL.jpg"
          ]
        },
        white: {
          images: [
            "https://m.media-amazon.com/images/I/71HV4VhCtHL._SX679_.jpg",
            "https://5.imimg.com/data5/SELLER/Default/2022/6/JN/AT/FY/4156816/white-incense-sticks.jpg"
          ]
        },
        rose: {
          images: [
            "https://m.media-amazon.com/images/I/81xNPwM5iWL._SX679_.jpg",
            "https://rukminim2.flixcart.com/image/416/416/kqgyhe80/incense-stick/z/m/b/400-rose-incense-sticks-agarbatti-pack-of-4-100-sticks-each-original-imag4hkqeg9ssnqv.jpeg?q=70"
          ]
        }
      }
    },
    {
      id: 3,
      name: "Striped Cotton Pooja Shawl",
      price: 150,
      originalPrice: 180,
      discount: 17,
      rating: 5.0,
      reviewsCount: 220,
      image: "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg"
      ],
      description: "Pure cotton shawl with black and white stripes, ideal for spiritual rituals, meditation, and temple use.",
      shortDescription: "Cotton striped pooja shawl",
      color: "black",
      availableColors: ["black", "white"],
      size: "Standard",
      category: "Pooja Essentials",
      dressStyle: "Traditional",
      brand: "DivyaPooja",
      material: "100% Cotton",
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Free express delivery",
      returnPolicy: "7-day return",
      tags: ["shawl", "pooja", "spiritual", "cotton"],
      reviews: [
        {
          name: "Pandit Raghav",
          message:
            "बहुत अच्छी quality का cotton है। मंदिर में use करने के लिए perfect shawl है।",
          rating: 5,
          publishedAt: "04/05/2025"
        },
        {
          name: "Suman J.",
          message: "Soft, comfortable और पूजा में बहुत सुहावना लगता है।",
          rating: 5,
          publishedAt: "03/03/2024"
        }
      ],
      variants: {
        black: {
          images: [
            "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg",
            "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg",
            "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg"
          ]
        },
        white: {
          images: [
            "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg",
            "https://m.media-amazon.com/images/I/81SpvfUEySL._UY1100_.jpg"
          ]
        }
      }
    },
    {
      id: 4,
      name: "Traditional Cotton Dhoti",
      price: 240,
      originalPrice: 260,
      discount: 8,
      rating: 3.5,
      reviewsCount: 75,
      image: "https://images.jdmagicbox.com/quickquotes/images_main/men-s-traditional-pooja-cotton-dhoti-white-2217459304-af2ex4l9.jpg",
      images: [
        "https://images.jdmagicbox.com/quickquotes/images_main/men-s-traditional-pooja-cotton-dhoti-white-2217459304-af2ex4l9.jpg"
      ],
      description: "Pure cotton traditional dhoti designed for pooja, havan, and temple ceremonies. Soft, breathable, and easy to wear.",
      shortDescription: "Classic cotton pooja dhoti",
      color: "white",
      availableColors: ["white", "cream"],
      size: "Free Size",
      category: "Pooja Wear",
      dressStyle: "Traditional",
      brand: "DivyaVastra",
      material: "100% Cotton",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivery in 4-6 days",
      returnPolicy: "Return within 10 days",
      tags: ["dhoti", "pooja", "traditional", "cotton"],
      reviews: [
        {
          name: "Pandit Rajesh",
          message:
            "बहुत अच्छा कपड़ा है, पूजा और हवन के लिए perfect dhoti। कपड़ा हल्का और comfortable है।",
          rating: 5,
          publishedAt: "10/01/2024"
        }
      ],
      variants: {
        white: {
          images: [
            "https://images.jdmagicbox.com/quickquotes/images_main/men-s-traditional-pooja-cotton-dhoti-white-2217459304-af2ex4l9.jpg",
            "https://rukminim2.flixcart.com/image/850/1000/xif0q/ethnic-set/u/6/y/free-mens-dhoti-krishna-creation-original-imaghz3kxxhrty9j.jpeg?q=90",
            "https://images.jdmagicbox.com/quickquotes/images_main/men-s-traditional-pooja-cotton-dhoti-white-2217459304-af2ex4l9.jpg"
          ]
        },
        cream: {
          images: [
            "https://images.jdmagicbox.com/quickquotes/images_main/men-s-traditional-pooja-cotton-dhoti-white-2217459304-af2ex4l9.jpg",
            "https://www.jiomart.com/images/product/original/rvkkuqzrrq/vraj-cotton-men-s-traditional-dhoti-cream-product-images-rvkkuqzrrq-0-202310031626.jpg"
          ]
        }
      }
    },
    {
      id: 6,
      name: "Brass Pooja Thali Set",
      price: 750,
      originalPrice: 999,
      discount: 25,
      rating: 4.8,
      reviewsCount: 320,
      image: "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111",
      images: [
        "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111",
        "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111",
        "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111"
      ],
      description: "Traditional brass pooja thali set with diya, incense holder, bell, and kumkum box. Ideal for festivals, weddings, and daily rituals.",
      shortDescription: "Complete brass pooja thali set",
      color: "gold",
      availableColors: ["gold", "silver"],
      size: "Medium",
      category: "Pooja Items",
      dressStyle: "Traditional",
      brand: "Divya Pooja",
      material: "Pure Brass",
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Ships in 2 days",
      returnPolicy: "7-day return policy",
      tags: ["pooja", "brass", "thali", "festival"],
      reviews: [
        {
          name: "Neha R.",
          message: "The thali is very elegant and perfect for Diwali pooja. Great finishing.",
          rating: 5,
          publishedAt: "10/08/2024"
        },
        {
          name: "Ramesh K.",
          message: "Received on time and packaging was secure. Quality is excellent.",
          rating: 5,
          publishedAt: "02/09/2024"
        }
      ],
      variants: {
        gold: {
          images: [
            "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111",
            "https://shivshaktiarts.in/cdn/shop/products/1copy_a7d2291d-beaa-464b-8574-e9bc20743bf2.jpg?v=1614418111"
          ]
        },
        silver: {
          images: [
            "https://m.media-amazon.com/images/I/61Z9Zm31h+L._AC_UL480_FMwebp_QL65_.jpg",
            "https://m.media-amazon.com/images/I/71hwjKRaU+L._AC_UL480_FMwebp_QL65_.jpg"
          ]
        }
      }
    },
    {
      id: 7,
      name: "Designer Pooja Thali Set",
      price: 232,
      originalPrice: 290,
      discount: 20,
      rating: 5.0,
      reviewsCount: 64,
      image: "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg"
      ],
      description:
        "Beautifully crafted pooja thali set with diya, kumkum box, and bell. Ideal for daily rituals and festive occasions.",
      shortDescription: "Traditional pooja thali with accessories",
      color: "gold",
      availableColors: ["gold", "silver"],
      size: "Standard",
      category: "Pooja Items",
      dressStyle: "Traditional",
      brand: "ShubhAura",
      material: "Brass",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivered in 3-5 business days",
      returnPolicy: "20-day return",
      tags: ["pooja", "thali", "brass", "festival"],
      reviews: [
        {
          name: "Ravi K.",
          message:
            "This pooja thali looks divine and is exactly how it looked in the pictures. Loved it!",
          rating: 5,
          publishedAt: "12/12/2023"
        }
      ],
      variants: {
        gold: {
          images: [
            "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg",
            "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg",
            "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg",
            "https://m.media-amazon.com/images/I/71aYejWOSUL._AC_UL480_FMwebp_QL65_.jpg"
          ]
        },
        silver: {
          images: [
            "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg",
            "https://m.media-amazon.com/images/I/81DWyI7c4LL._AC_UL480_FMwebp_QL65_.jpg",
            "https://m.media-amazon.com/images/I/71zgf1dKoRL.jpg"
          ]
        }
      }
    },
    {
      id: 9,
      name: "Brass Agarbatti Stand",
      price: 80,
      originalPrice: 120,
      discount: 33,
      rating: 4.8,
      reviewsCount: 45,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvHirtKYOPsntB0NvMv3VkfbebyGdkCIW_w&s",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvHirtKYOPsntB0NvMv3VkfbebyGdkCIW_w&s"
      ],
      description:
        "Elegant brass agarbatti stand with multiple slots for incense sticks. Ideal for daily pooja rituals, temples, and festive occasions.",
      shortDescription: "Traditional brass incense holder",
      color: "gold",
      availableColors: ["gold"],
      size: "Standard",
      category: "Pooja Items",
      dressStyle: "Traditional",
      brand: "DivyaPooja",
      material: "Brass",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Standard delivery in 4-6 days",
      returnPolicy: "Returnable within 10 days",
      tags: ["agarbatti", "stand", "brass", "temple"],
      reviews: [
        {
          name: "Karan P.",
          message:
            "The packaging was so good and the brass quality is premium. Gives a divine touch to my pooja room.",
          rating: 5,
          publishedAt: "15/01/2025"
        }
      ],
      variants: {
        gold: {
          images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvHirtKYOPsntB0NvMv3VkfbebyGdkCIW_w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvHirtKYOPsntB0NvMv3VkfbebyGdkCIW_w&s",
            "https://m.media-amazon.com/images/I/81ywf6X2dFL._AC_UL480_FMwebp_QL65_.jpg"
          ]
        }
      }
    },
    {
      id: 10,
      name: "Sacred Brass Kalash",
      price: 170,
      originalPrice: 199,
      discount: 15,
      rating: 4.8,
      reviewsCount: 112,
      image: "https://m.media-amazon.com/images/I/51Duodo8ucL._UF894,1000_QL80_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/51Duodo8ucL._UF894,1000_QL80_.jpg"
      ],
      description:
        "Traditional brass kalash used for pooja rituals, havan, and auspicious ceremonies. Symbol of prosperity and purity.",
      shortDescription: "Brass Pooja Kalash",
      color: "gold",
      availableColors: ["gold"],
      size: "Standard",
      category: "Pooja Items",
      dressStyle: "Traditional",
      brand: "DivyaPooja",
      material: "Brass",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivery in 3-5 days",
      returnPolicy: "30 days no-questions-asked return",
      tags: ["kalash", "brass", "pooja", "auspicious"],
      variants: {
        gold: {
          images: [
            "https://m.media-amazon.com/images/I/71bVQmV5zIL._AC_UL480_FMwebp_QL65_.jpg",
            "https://m.media-amazon.com/images/I/81y6GQ0a0zL._AC_UL480_FMwebp_QL65_.jpg",
            "https://m.media-amazon.com/images/I/71uwWug4-2L._AC_UL480_FMwebp_QL65_.jpg"
          ]
        }
      }
    },
  ],

  dailyEssentials: [
    {
      id: 13,
      name: "Tulsi Dhoop Sticks",
      price: 200,
      originalPrice: 230,
      discount: 13,
      rating: 4.2,
      reviewsCount: 54,
      image: "https://m.media-amazon.com/images/I/51fH3QOpjRL.jpg",
      images: ["https://m.media-amazon.com/images/I/51fH3QOpjRL.jpg"],
      description: "Pure Tulsi dhoop sticks with natural fragrance. Ideal for daily pooja, meditation, and spiritual environment.",
      shortDescription: "Herbal Tulsi dhoop for pooja.",
      color: "Green",
      availableColors: ["Green", "Brown"],
      size: "Medium",
      category: "Pooja Essentials",
      brand: "PureAura",
      material: "Tulsi & Natural Herbs",
      inStock: true,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Delivered in 3-5 business days.",
      returnPolicy: "Return within 7 days of delivery.",
      tags: ["dhoop", "tulsi", "pooja", "fragrance"],
      reviews: [],
      variants: {}
    },
    {
      id: 14,
      name: "Kumkum Sindoor Box",
      price: 220,
      originalPrice: 250,
      discount: 12,
      rating: 4.5,
      reviewsCount: 36,
      image: "https://5.imimg.com/data5/SELLER/Default/2021/3/NY/CV/HT/23867016/stylish-metal-handmade-golden-color-kumkum-sindoor-box-decorative-sindoor-dani.jpg",
      images: ["https://5.imimg.com/data5/SELLER/Default/2021/3/NY/CV/HT/23867016/stylish-metal-handmade-golden-color-kumkum-sindoor-box-decorative-sindoor-dani.jpg"],
      description: "Traditional decorative sindoor and kumkum box. Perfect for festivals, rituals, and everyday pooja use.",
      shortDescription: "Decorative sindoor box.",
      color: "Red",
      availableColors: ["Red", "Golden"],
      size: "Small",
      category: "Pooja Accessories",
      brand: "BlissPooja",
      material: "Brass & Glass",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Standard delivery in 4-6 days.",
      returnPolicy: "Return within 10 days.",
      tags: ["sindoor", "kumkum", "pooja", "decor"],
      reviews: [],
      variants: {}
    },
    {
      id: 15,
      name: "Camphor Cones",
      price: 250,
      originalPrice: 280,
      discount: 10,
      rating: 4.3,
      reviewsCount: 41,
      image: "https://healthybuddha.in/image/cache/catalog/CamphorCone-500x515.png",
      images: ["https://healthybuddha.in/image/cache/catalog/CamphorCone-500x515.png"],
      description: "Natural camphor cones for pooja and meditation. Spreads positivity, removes negativity, and purifies the atmosphere.",
      shortDescription: "Camphor cones for positivity.",
      color: "White",
      availableColors: ["White"],
      size: "Medium",
      category: "Pooja Essentials",
      brand: "Fragrance World",
      material: "Pure Camphor",
      inStock: true,
      isNew: true,
      isTrending: false,
      deliveryInfo: "Delivery within 3-5 days.",
      returnPolicy: "7-day return policy.",
      tags: ["camphor", "pooja", "fragrance", "purity"],
      reviews: [],
      variants: {}
    },
    {
      id: 16,
      name: "Pure Ghee Diya Batti",
      price: 210,
      originalPrice: 240,
      discount: 12,
      rating: 4.1,
      reviewsCount: 29,
      image: "https://m.media-amazon.com/images/I/51XdyxlMaCL.jpg",
      images: ["https://m.media-amazon.com/images/I/51XdyxlMaCL.jpg"],
      description: "Ready-to-use ghee diya battis for daily pooja. Long-lasting, smokeless and made with pure cow ghee.",
      shortDescription: "Ghee diya battis for pooja.",
      color: "Yellow",
      availableColors: ["Yellow", "White"],
      size: "Medium",
      category: "Pooja Essentials",
      brand: "LemonGlow",
      material: "Cotton & Cow Ghee",
      inStock: true,
      isNew: true,
      isTrending: false,
      deliveryInfo: "Delivered within 5 days.",
      returnPolicy: "Eligible for return within 5 days.",
      tags: ["diya", "ghee", "pooja", "light"],
      reviews: [],
      variants: {}
    },
    {
      id: 17,
      name: "Pooja Thali Set",
      price: 205,
      originalPrice: 235,
      discount: 13,
      rating: 4.2,
      reviewsCount: 48,
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poojathali_z0gdfx.png',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poojathali_z0gdfx.png'],
      description: "Complete pooja thali set with traditional items. Perfect for daily rituals and special pooja occasions.",
      shortDescription: "Traditional pooja thali set.",
      color: "Dark Green",
      availableColors: ["Green", "Dark Green"],
      size: "Large",
      category: "Pooja Essentials",
      brand: "PureAura",
      material: "Herbal Infused Clay & Metal",
      inStock: true,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Delivered within 3-5 business days.",
      returnPolicy: "7-day return window.",
      tags: ["pooja", "thali", "ritual", "temple"],
      reviews: [],
      variants: {}
    },
    {
      id: 18,
      name: "Mini Temple Figurine",
      price: 215,
      originalPrice: 245,
      discount: 12,
      rating: 4.4,
      reviewsCount: 38,
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670867/temple_unnjto.png',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670867/temple_unnjto.png'],
      description: "Decorative mini temple figurine for home pooja setup. Enhances spiritual ambiance.",
      shortDescription: "Mini temple decor item.",
      color: "Pink",
      availableColors: ["Pink", "Red"],
      size: "Small",
      category: "Pooja Decor",
      brand: "BlissScents",
      material: "Fragrance Resin",
      inStock: true,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Ships in 3 days.",
      returnPolicy: "7-day return period.",
      tags: ["temple", "decor", "pooja", "fragrance"],
      reviews: [],
      variants: {}
    },
    {
      id: 19,
      name: "Strawberry Aroma Lamp",
      price: 215,
      originalPrice: 245,
      discount: 12,
      rating: 4.4,
      reviewsCount: 38,
      image: 'https://m.media-amazon.com/images/I/611iR-nUP8L._UF1000,1000_QL80_.jpg',
      images: ['https://m.media-amazon.com/images/I/611iR-nUP8L._UF1000,1000_QL80_.jpg'],
      description: "Aroma lamp with sweet strawberry fragrance. Perfect for pooja room or meditation space.",
      shortDescription: "Strawberry scented aroma lamp.",
      color: "Pink",
      availableColors: ["Pink", "Red"],
      size: "Small",
      category: "Pooja Decor",
      brand: "BlissScents",
      material: "Resin & Fragrance Oil",
      inStock: true,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Ships in 3 days.",
      returnPolicy: "7-day return period.",
      tags: ["pooja", "aroma", "decor", "strawberry"],
      reviews: [],
      variants: {}
    },
    {
      id: 20,
      name: "Gift Pooja Candle",
      price: 215,
      originalPrice: 245,
      discount: 12,
      rating: 4.4,
      reviewsCount: 38,
      image: 'https://www.jaipurcraftonline.com/cdn/shop/products/81kLTkDqOBL._SL1500.jpg',
      images: ['https://www.jaipurcraftonline.com/cdn/shop/products/81kLTkDqOBL._SL1500.jpg'],
      description: "Pooja candle with sweet strawberry aroma, comes in reusable decorative container. Ideal for gifting during festivals.",
      shortDescription: "Gift-friendly pooja candle.",
      color: "Pink",
      availableColors: ["Pink", "Red"],
      size: "Small",
      category: "Pooja Essentials",
      brand: "BlissScents",
      material: "Resin & Fragrance Beads",
      inStock: true,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Ships within 2-3 days.",
      returnPolicy: "7-day return period.",
      tags: ["pooja", "gift", "candle", "strawberry"],
      reviews: [],
      variants: {}
    },
    {
      id: 22,
      name: "Brass Diya with Cotton Wicks",
      price: 175,
      originalPrice: 220,
      discount: 20,
      rating: 4.7,
      reviewsCount: 52,
      image: "https://www.ecraftindia.com/cdn/shop/products/BDP504_main_w_dae02e55-8d8d-42cd-ae5c-3cf7ab1be7f6.jpg?v=1635334531",
      images: [
        "https://www.ecraftindia.com/cdn/shop/products/BDP504_main_w_dae02e55-8d8d-42cd-ae5c-3cf7ab1be7f6.jpg?v=1635334531"
      ],
      description: "Traditional brass diya with 50 free cotton wicks. Perfect for daily pooja, festivals, and gifting.",
      shortDescription: "Brass diya with free wicks.",
      color: "Golden",
      availableColors: ["Golden", "Copper"],
      size: "Medium",
      category: "Pooja Essentials",
      brand: "DivineAura",
      material: "Brass",
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivered within 2-4 days.",
      returnPolicy: "7-day return policy if unused.",
      tags: ["pooja", "diya", "brass", "festival"],
      reviews: [],
      variants: {}
    }

  ],

  popularProducts: [
    {
      id: 23,
      name: "Spiced Mint Aroma",
      price: 200,
      originalPrice: 230,
      discount: 13,
      rating: 4.3,
      reviewsCount: 65,
      image: 'https://kotanyi-en.imgix.net/wp-content/uploads/2019/06/Minze-gewuerzbild.jpg?auto=format,compress',
      images: ['https://kotanyi-en.imgix.net/wp-content/uploads/2019/06/Minze-gewuerzbild.jpg?auto=format,compress'],
      description: "Refreshing spiced mint aroma, ideal for pooja rooms, meditation corners, or calm home ambiance.",
      shortDescription: "Cool mint with warm spice notes.",
      color: "Green",
      availableColors: ["Green", "White"],
      size: "Medium",
      category: "Pooja Aroma",
      brand: "AromaVibe",
      material: "Herbal Wax",
      inStock: true,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivery in 3-5 business days.",
      returnPolicy: "Return within 7 days.",
      tags: ["pooja", "aroma", "mint", "spicy"],
      reviews: [],
      variants: {}
    },
    {
  id: 24,
  name: "Sandalwood Agarbatti Sticks",
  price: 150,
  originalPrice: 180,
  discount: 17,
  rating: 4.8,
  reviewsCount: 134,
  image: "https://tiimg.tistatic.com/fp/1/007/754/environment-friendly-indian-origin-aromatic-and-flavourful-fragrance-brown-agarbatti-stick-066.jpg",
  images: [
    "https://tiimg.tistatic.com/fp/1/007/754/environment-friendly-indian-origin-aromatic-and-flavourful-fragrance-brown-agarbatti-stick-066.jpg"
  ],
  description: "Premium sandalwood incense sticks for pooja rituals, meditation, and spiritual ambience. Comes with a free incense holder.",
  shortDescription: "Natural sandalwood fragrance.",
  color: "Brown",
  availableColors: ["Brown", "Beige"],
  size: "Standard Pack (100 Sticks)",
  category: "Pooja Essentials",
  brand: "DivineScents",
  material: "Natural Wood Powder & Essential Oils",
  inStock: true,
  isNew: true,
  isTrending: true,
  deliveryInfo: "Ships within 2-3 working days.",
  returnPolicy: "Return accepted within 7 days.",
  tags: ["pooja", "agarbatti", "sandalwood", "meditation"],
  reviews: [],
  variants: {}
},
  ],

  havenlyHaste: [
    {
      id: 27,
      label: "Sale",
      name: "Natural Chandan (100% pure) No additives",
      price: 238,
      originalPrice: 245,
      discount: 3,
      rating: "4.5",
      reviewsCount: "72",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670858/chandan_zidfxj.jpg',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670858/chandan_zidfxj.jpg'],
      description: "Experience the calming and pure aroma of Natural Chandan. This 100% pure sandalwood powder contains no additives and is ideal for religious rituals, skin care, and meditation.",
      shortDescription: "100% pure sandalwood (chandan) with no additives.",
      color: "Beige",
      availableColors: ["Beige"],
      size: "50g",
      category: "Pooja Samagri",
      dressStyle: "",
      brand: "Keva Original",
      material: "Pure Sandalwood",
      sold: 4,
      total: 20,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Delivered in 3-6 business days across India.",
      returnPolicy: "7-day return if unopened and unused.",
      tags: ["chandan", "sandalwood", "ritual", "natural", "pure"],
      reviews: [],
      variants: {}
    },
    {
      id: 28,
      label: "Best Sale",
      name: "Agarbatti (incense sticks) and dhoop",
      price: 200,
      originalPrice: 250,
      discount: 20,
      rating: "4.7",
      reviewsCount: "105",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/agarbatti_oldpns.png',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/agarbatti_oldpns.png'],
      description: "Fill your space with divine aroma using Mangaldeep’s Agarbatti and Dhoop combo. Made with natural herbs and essential oils, it’s perfect for daily prayers and relaxation.",
      shortDescription: "Combo pack of Agarbatti and Dhoop for daily use.",
      color: "Brown",
      availableColors: ["Brown", "Black"],
      size: "Pack of 50 sticks",
      category: "Fragrance & Spiritual",
      dressStyle: "",
      brand: "Mangaldeep",
      material: "Herbal Mix, Bamboo, Cowdung",
      sold: 14,
      total: 15,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Ships within 2-4 business days.",
      returnPolicy: "Return within 5 days if package is sealed.",
      tags: ["agarbatti", "dhoop", "fragrance", "prayer", "sale"],
      reviews: [],
      variants: {}
    },
    {
      id: 29,
      label: "Save",
      name: "Ajoova Seed Powder",
      price: 50,
      originalPrice: 60,
      discount: 15,
      rating: "4.2",
      reviewsCount: "33",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/ajoovaSeedPowder_lu5orz.jpg',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/ajoovaSeedPowder_lu5orz.jpg'],
      description: "Ajoova Seed Powder by Hari Om is 100% pure and natural. Traditionally used for its medicinal benefits, it supports digestive health and boosts immunity. No additives or preservatives included.",
      shortDescription: "Pure Ajoova Seed Powder for digestion and immunity.",
      color: "Brown",
      availableColors: ["Brown"],
      size: "100g",
      category: "Ayurvedic Herbs",
      dressStyle: "",
      brand: "Hari Om",
      material: "Ajoova Seed (Natural)",
      sold: 70,
      total: 70,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivery in 3-5 business days across India.",
      returnPolicy: "7-day return policy if unopened and in original packaging.",
      tags: ["herbal", "digestive", "natural", "powder"],
      reviews: [],
      variants: {}
    },
    {
      id: 30,
      label: "Save",
      name: "DhoopBatti Pure Cowdunk Natural",
      price: 50,
      originalPrice: 60,
      discount: 15,
      rating: "4.3",
      reviewsCount: "58",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670861/dhoopbatti_orsllo.webp',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670861/dhoopbatti_orsllo.webp'],
      description: "This natural DhoopBatti is made using pure cowdung, herbs, and traditional blends to create a calming spiritual environment. Ideal for daily rituals and spiritual practices.",
      shortDescription: "Pure cowdung-based natural dhoopbatti.",
      color: "Brown",
      availableColors: ["Brown"],
      size: "Pack of 10",
      category: "Pooja Samagri",
      dressStyle: "",
      brand: "Hari Om",
      material: "Cowdung & Herbal Mix",
      sold: 30,
      total: 32,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivered in 3-5 working days.",
      returnPolicy: "Return within 5 days if unused.",
      tags: ["dhoop", "cowdung", "natural", "pooja", "herbal"],
      reviews: [],
      variants: {}
    }
  ],

  categoryProducts: [
    {
      id: 31,
      label: "Hot",
      name: "Traditional Pooja Poshak",
      category: "Pooja Samagri",
      price: 450,
      originalPrice: 500,
      discount: 10,
      rating: 4.6,
      reviewsCount: "20",
      image: "https://m.media-amazon.com/images/I/61posR3YXnL.jpg",
      images: ["https://m.media-amazon.com/images/I/61posR3YXnL.jpg"],
      description: "Beautifully crafted traditional pooja poshak made with premium fabric and intricate embroidery, perfect for idols and deities.",
      shortDescription: "Elegant pooja poshak for deities.",
      color: "Red & Gold",
      availableColors: ["Red & Gold", "Yellow & Blue"],
      size: "Medium",
      brand: "DivineCraft",
      material: "Silk and Thread Work",
      sold: 10,
      total: 50,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivered in 3–5 business days across India.",
      returnPolicy: "7-day return if unopened and unused.",
      tags: ["pooja", "poshak", "traditional", "deity"],
      reviews: [],
      variants: {}
    },
    {
      id: 32,
      label: "Best Seller",
      name: "Tulsi Mala (Holy Necklace)",
      category: "Pooja Accessories",
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.8,
      reviewsCount: "55",
      image: "https://m.media-amazon.com/images/I/51wQVM6l+6L._UF894,1000_QL80_.jpg",
      images: ["https://m.media-amazon.com/images/I/51wQVM6l+6L._UF894,1000_QL80_.jpg"],
      description: "100% natural Tulsi beads mala ideal for chanting, meditation, and spiritual practices.",
      shortDescription: "Holy Tulsi beads mala.",
      color: "Brown",
      availableColors: ["Brown", "Dark Brown"],
      size: "24 inches",
      brand: "SpiritualGems",
      material: "Tulsi Beads",
      sold: 30,
      total: 50,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Ships within 2–4 business days.",
      returnPolicy: "Return within 5 days if unused.",
      tags: ["mala", "tulsi", "spiritual", "meditation"],
      reviews: [],
      variants: {}
    },
    {
      id: 33,
      label: "Sale",
      name: "Brass Pooja Thali Set",
      category: "Pooja Utensils",
      price: 350,
      originalPrice: 400,
      discount: 12,
      rating: 4.5,
      reviewsCount: "32",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSqkXBOTpYDvudRI6fdalMYnrKacqeZy1aQ&s",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSqkXBOTpYDvudRI6fdalMYnrKacqeZy1aQ&s"],
      description: "Premium brass pooja thali set including diya, bell, small bowls, perfect for daily rituals and festivals.",
      shortDescription: "Complete brass pooja thali set.",
      color: "Golden",
      availableColors: ["Golden"],
      size: "Standard",
      brand: "DivineCraft",
      material: "Brass",
      sold: 25,
      total: 50,
      isNew: false,
      isTrending: false,
      deliveryInfo: "Delivered in 3–5 business days.",
      returnPolicy: "7-day return if unopened and unused.",
      tags: ["pooja", "thali", "brass", "utensils"],
      reviews: [],
      variants: {}
    },
    {
      id: 34,
      label: "Hot",
      name: "Silver Diya Set",
      category: "Pooja Utensils",
      price: 800,
      originalPrice: 900,
      discount: 11,
      rating: 4.7,
      reviewsCount: "40",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYKLteTa7eM_LBWHyLKjgJlakk21oh5kEWpg&s",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYKLteTa7eM_LBWHyLKjgJlakk21oh5kEWpg&s"],
      description: "Set of 3 silver diyas, perfect for festivals and pooja rituals, made with high-quality silver polish for long-lasting shine.",
      shortDescription: "Elegant silver diya set for pooja.",
      color: "Silver",
      availableColors: ["Silver"],
      size: "3 pieces",
      brand: "ShubhPooja",
      material: "Silver Plated",
      sold: 15,
      total: 30,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Ships in 2–4 business days.",
      returnPolicy: "Return within 5 days if unused.",
      tags: ["diya", "silver", "pooja", "festival"],
      reviews: [],
      variants: {}
    },
    {
      id: 35,
      label: "New",
      name: "Rudraksha Mala",
      category: "Pooja Accessories",
      price: 220,
      originalPrice: 250,
      discount: 12,
      rating: 4.6,
      reviewsCount: "28",
      image: "https://m.media-amazon.com/images/I/815Ynn0E9wL.jpg",
      images: ["https://m.media-amazon.com/images/I/815Ynn0E9wL.jpg"],
      description: "Authentic Rudraksha beads mala for meditation and spiritual energy enhancement, handcrafted with care.",
      shortDescription: "Genuine Rudraksha mala.",
      color: "Brown",
      availableColors: ["Brown"],
      size: "28 inches",
      brand: "SpiritualGems",
      material: "Rudraksha Beads",
      sold: 20,
      total: 50,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivered in 3–5 business days.",
      returnPolicy: "Return within 5 days if unused.",
      tags: ["mala", "rudraksha", "spiritual", "meditation"],
      reviews: [],
      variants: {}
    },

    {
      id: 37,
      label: "New",
      name: "Brass Diya (Decorative Deepak) - 5 Inch",
      category: "Pooja Utensils",
      price: 129,
      originalPrice: 149,
      discount: 13,
      rating: 4.5,
      reviewsCount: "24",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670857/brassDiya_onxxyo.jpg',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670857/brassDiya_onxxyo.jpg'],
      description: "Beautifully crafted brass diya ideal for pooja rituals and home decor. Traditional look with long-lasting polish.",
      shortDescription: "Decorative brass diya for pooja and home.",
      color: "Gold",
      availableColors: ["Gold", "Antique"],
      size: "5 Inch",
      brand: "Shubhlabh",
      material: "Brass",
      sold: 12,
      total: 40,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivery in 3–5 days",
      returnPolicy: "7-day return",
      tags: ["Deepak", "Pooja", "Festive"],
      reviews: [
        { user: "Anita", comment: "Very beautiful and well-made diya. Perfect for pooja!", rating: 5 },
        { user: "Raj", comment: "Good size and looks premium.", rating: 4 }
      ],
      variants: {
        sizes: ["3 Inch", "5 Inch", "7 Inch"],
        finishes: ["Gold", "Antique"]
      }
    },
    {
      id: 38,
      label: "Hot",
      name: "Kanjivaram Style Silk Poshak for Laddu Gopal",
      category: "Poshaks",
      price: 299,
      originalPrice: 350,
      discount: 14,
      rating: 4.8,
      reviewsCount: "41",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poshakKrishna_y61e5c.webp',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poshakKrishna_y61e5c.webp'],
      description: "High-quality Kanjivaram silk poshak with intricate zari borders. Perfect for Laddu Gopal during festivals and daily pooja.",
      shortDescription: "Silk poshak with zari border for Laddu Gopal.",
      color: "Maroon",
      availableColors: ["Maroon", "Blue", "Yellow"],
      size: "Small",
      dressStyle: "Traditional",
      brand: "Divine Threads",
      material: "Silk",
      sold: 30,
      total: 50,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Free shipping",
      returnPolicy: "No return on religious items",
      tags: ["Poshak", "Laddu Gopal", "Traditional", "Pooja"],
      reviews: [
        { user: "Pooja", comment: "Loved the fabric and finish. Looks divine on my Laddu Gopal!", rating: 5 },
        { user: "Meera", comment: "Great quality, exactly as shown.", rating: 4.5 }
      ],
      variants: {
        colors: ["Maroon", "Blue", "Yellow"],
        sizes: ["Small", "Medium"]
      }
    },
    {
      id: 39,
      label: "Sale",
      name: "Natural Rose Attar - Alcohol-Free",
      category: "Pooja Fragrances",
      price: 189,
      originalPrice: 220,
      discount: 14,
      rating: 4.2,
      reviewsCount: "13",
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670855/attarsRose_qw8wmw.jpg',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670855/attarsRose_qw8wmw.jpg'],
      description: "100% natural and alcohol-free rose attar. Ideal for pooja rituals, meditation, and daily wear.",
      shortDescription: "Pure rose attar for pooja and meditation.",
      color: "",
      availableColors: [],
      size: "10ml",
      brand: "Sugandh Vatika",
      material: "Essential Oil",
      sold: 25,
      total: 30,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivery in 2–4 days",
      returnPolicy: "Return within 5 days",
      tags: ["Attar", "Natural", "Rose", "Pooja"],
      reviews: [
        { user: "Sameer", comment: "Wonderful scent, long lasting and fresh.", rating: 5 },
        { user: "Fariya", comment: "Very soothing and not overpowering.", rating: 4 }
      ],
      variants: {
        sizes: ["5ml", "10ml", "15ml"]
      }
    }
    ,
    {
      id: 40,
      label: "New",
      name: "Tulsi Mala(Holy Basil Beads)",
      price: 89,
      originalPrice: 120,
      discount: 25,
      rating: 4.8,
      reviewsCount: 52,
      image: 'https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670865/tulsiMala_osvv0x.jpg',
      images: ['https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670865/tulsiMala_osvv0x.jpg'],
      description: "Tulsi mala made from sacred basil wood beads, ideal for japa, meditation, and spiritual practices.Known to bring peace and clarity.",
      shortDescription: "108 bead Tulsi mala",
      color: "Brown",
      availableColors: ["Brown"],
      size: "Medium",
      category: "Maala",
      dressStyle: "",
      brand: "Divya Roots",
      material: "Tulsi Wood",
      sold: 23,
      total: 30,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivered in 3 - 5 days",
      returnPolicy: "7 - day return",
      tags: ["tulsi", "maala", "chanting"],
      reviews: [
        { user: "Vikas", comment: "Really calming and genuine tulsi wood beads.", rating: 5 },
        { user: "Neha", comment: "Good quality and strong string.", rating: 4.5 }
      ],
      variants: {
      }
    },
    {
      id: 41,
      label: "Save",
      name: "Havan Samagri Combo Pack",
      price: 299,
      originalPrice: 349,
      discount: 14,
      rating: 4.4,
      reviewsCount: 200,
      image: "https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/havanSamgri_se2haf.jpg",
      images: ["https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670853/havanSamgri_se2haf.jpg"],
      description: "A complete havan samagri kit that includes all necessary ingredients for performing puja rituals at home or temple.",
      shortDescription: "Complete Havan Kit",
      color: "Brown",
      availableColors: [],
      size: "",
      category: "Puja Samagri",
      dressStyle: "",
      brand: "Dharma Store",
      material: "Natural mix",
      sold: 50,
      total: 60,
      isNew: false,
      isTrending: true,
      deliveryInfo: "Delivered in 5 - 7 days",
      returnPolicy: "10-day return",
      tags: ["havan", "samagri", "combo"],
      reviews: [
        { user: "Aarti", comment: "Very convenient, has everything I needed.", rating: 4.5 },
        { user: "Ramesh", comment: "Fresh and nicely packed items.", rating: 4 }
      ],
      variants: {}
    },
    {
      id: 42,
      label: "Hot",
      name: "Sandalwood Dhoop Cone",
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.5,
      reviewsCount: 25,
      image: "https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670858/chandan_zidfxj.jpg",
      images: ["https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670858/chandan_zidfxj.jpg"],
      description: "Pure sandalwood dhoop cones for daily rituals. Long-lasting and calming fragrance.",
      shortDescription: "Natural sandalwood incense cones.",
      color: "Beige",
      availableColors: ["Beige"],
      size: "Pack of 30",
      category: "Puja Items",
      dressStyle: "",
      brand: "Divine Essence",
      material: "Sandalwood",
      sold: 8,
      total: 10,
      inStock: true,
      isNew: true,
      isTrending: true,
      deliveryInfo: "Delivery in 2–4 days",
      returnPolicy: "Return accepted within 5 days if unused.",
      tags: ["dhoop", "sandalwood", "natural"],
      reviews: [],
      variants: {}
    },
  ]

};
