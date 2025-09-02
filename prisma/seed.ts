import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'customer@example.com' },
      update: {},
      create: {
        email: 'customer@example.com',
        name: 'John Doe',
        password: hashedPassword,
        role: 'CUSTOMER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: hashedPassword,
        role: 'CUSTOMER',
        emailVerified: new Date(),
      },
    }),
  ])

  console.log('✅ Created users:', users.length)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 't-shirts' },
      update: {},
      create: {
        name: 'T-Shirts',
        slug: 't-shirts',
        description: 'Comfortable and stylish t-shirts for every occasion',
        image: '/images/images/c-tshirts.jpg',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'jeans' },
      update: {},
      create: {
        name: 'Jeans',
        slug: 'jeans',
        description: 'Classic and modern jeans for all styles',
        image: '/images/images/c-jeans.jpg',
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        name: 'Shoes',
        slug: 'shoes',
        description: 'Comfortable and fashionable footwear',
        image: '/images/images/c-shoes.jpg',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Created categories:', categories.length)

  // Create products for T-Shirts category
  const tshirtProducts = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'classic-cotton-tshirt' },
      update: {},
      create: {
        name: 'Classic Cotton T-Shirt',
        slug: 'classic-cotton-tshirt',
        description: 'A comfortable and breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
        price: 24.99,
        comparePrice: 29.99,
        sku: 'TSH-001',
        stock: 50,
        images: ['/images/images/p11-1.jpg', '/images/images/p11-2.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 0.2,
        dimensions: 'S: 18" x 28", M: 20" x 29", L: 22" x 30", XL: 24" x 31"',
        tags: ['cotton', 'casual', 'comfortable', 'organic'],
        categoryId: categories[0].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'vintage-graphic-tshirt' },
      update: {},
      create: {
        name: 'Vintage Graphic T-Shirt',
        slug: 'vintage-graphic-tshirt',
        description: 'Retro-inspired graphic t-shirt with vintage design. Soft cotton blend with a comfortable fit and eye-catching graphics.',
        price: 32.99,
        comparePrice: 39.99,
        sku: 'TSH-002',
        stock: 30,
        images: ['/images/images/p12-1.jpg', '/images/images/p12-2.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 0.25,
        dimensions: 'S: 18" x 28", M: 20" x 29", L: 22" x 30", XL: 24" x 31"',
        tags: ['vintage', 'graphic', 'retro', 'cotton'],
        categoryId: categories[0].id,
      },
    }),
  ])

  // Create products for Jeans category
  const jeansProducts = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'slim-fit-jeans' },
      update: {},
      create: {
        name: 'Slim Fit Jeans',
        slug: 'slim-fit-jeans',
        description: 'Modern slim-fit jeans made from premium denim. Perfect for a contemporary look with excellent comfort and durability.',
        price: 89.99,
        comparePrice: 119.99,
        sku: 'JEA-001',
        stock: 25,
        images: ['/images/images/p21-1.jpg', '/images/images/p21-2.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 0.8,
        dimensions: '30": 30" waist x 32" length, 32": 32" waist x 32" length, 34": 34" waist x 32" length',
        tags: ['slim-fit', 'denim', 'premium', 'modern'],
        categoryId: categories[1].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'relaxed-fit-jeans' },
      update: {},
      create: {
        name: 'Relaxed Fit Jeans',
        slug: 'relaxed-fit-jeans',
        description: 'Comfortable relaxed-fit jeans for everyday wear. Made from soft denim with a classic cut that never goes out of style.',
        price: 79.99,
        comparePrice: 99.99,
        sku: 'JEA-002',
        stock: 35,
        images: ['/images/images/p22-1.jpg', '/images/images/p22-2.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 0.9,
        dimensions: '30": 30" waist x 32" length, 32": 32" waist x 32" length, 34": 34" waist x 32" length',
        tags: ['relaxed-fit', 'comfortable', 'classic', 'denim'],
        categoryId: categories[1].id,
      },
    }),
  ])

  // Create products for Shoes category
  const shoesProducts = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'canvas-sneakers' },
      update: {},
      create: {
        name: 'Canvas Sneakers',
        slug: 'canvas-sneakers',
        description: 'Classic canvas sneakers with rubber sole. Lightweight and comfortable for all-day wear. Perfect for casual outings.',
        price: 59.99,
        comparePrice: 79.99,
        sku: 'SHO-001',
        stock: 40,
        images: ['/images/images/p31-1.jpg', '/images/images/p31-2.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 0.6,
        dimensions: 'US 7-12 available',
        tags: ['canvas', 'sneakers', 'casual', 'lightweight'],
        categoryId: categories[2].id,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'leather-loafers' },
      update: {},
      create: {
        name: 'Leather Loafers',
        slug: 'leather-loafers',
        description: 'Premium leather loafers with classic design. Handcrafted for comfort and style. Perfect for business casual or smart casual occasions.',
        price: 149.99,
        comparePrice: 199.99,
        sku: 'SHO-002',
        stock: 20,
        images: ['/images/images/p32-1.jpg', '/images/images/p32-2.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 0.8,
        dimensions: 'US 7-12 available',
        tags: ['leather', 'loafers', 'premium', 'handcrafted'],
        categoryId: categories[2].id,
      },
    }),
  ])

  console.log('✅ Created products:', tshirtProducts.length + jeansProducts.length + shoesProducts.length)

  // Create some sample reviews
  const reviews = await Promise.all([
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[1].id,
          productId: tshirtProducts[0].id
        }
      },
      update: {},
      create: {
        userId: users[1].id,
        productId: tshirtProducts[0].id,
        rating: 5,
        title: 'Great quality!',
        comment: 'Love this t-shirt! Very comfortable and fits perfectly.',
        isVerified: true,
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[2].id,
          productId: jeansProducts[0].id
        }
      },
      update: {},
      create: {
        userId: users[2].id,
        productId: jeansProducts[0].id,
        rating: 4,
        title: 'Nice fit',
        comment: 'Good quality jeans, fits well. Would recommend!',
        isVerified: true,
      },
    }),
    prisma.review.upsert({
      where: { 
        userId_productId: {
          userId: users[1].id,
          productId: shoesProducts[0].id
        }
      },
      update: {},
      create: {
        userId: users[1].id,
        productId: shoesProducts[0].id,
        rating: 5,
        title: 'Comfortable sneakers',
        comment: 'Very comfortable and stylish. Perfect for daily wear.',
        isVerified: true,
      },
    }),
  ])

  console.log('✅ Created reviews:', reviews.length)

  console.log('🎉 Database seeding completed successfully!')
  console.log(`
📊 Summary:
- Users: ${users.length}
- Categories: ${categories.length}
- Products: ${tshirtProducts.length + jeansProducts.length + shoesProducts.length}
- Reviews: ${reviews.length}

🔑 Test Accounts:
- Admin: admin@example.com / password123
- Customer: customer@example.com / password123
- Customer: jane@example.com / password123
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
