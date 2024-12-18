import { auth } from '@/auth'
import ProfileCard from './ProfileCard'
import { db } from '@/lib/db' // Adjust the import based on your project structure

const ProfilePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return <p>Loading...</p>
  }

  const totalPosts = await db.post.count({ where: { authorId: user.id } })
  const totalOrders = await db.order.count({ where: { customerId: user.id } })

  const totalReviews =
    (await db.productReview.count({ where: { customerId: user.id } })) +
    (await db.serviceReview.count({ where: { customerId: user.id } }))

  const totalProducts = await db.product.count({ where: { supplierId: user.id } })
  const totalServices = await db.service.count({ where: { providerId: user.id } })

  return (
    <div>
      <h1>Profile</h1>
      <ProfileCard
        user={user}
        totalPosts={totalPosts}
        totalOrders={totalOrders}
        totalReviews={totalReviews}
        totalProducts={totalProducts}
        totalServices={totalServices}
      />
    </div>
  )
}

export default ProfilePage
