import { getFeeds } from '@/app/actions/feed'
import { FeedPost } from '@/components/custom/feed/FeedPost'
import { CreatePost } from '@/components/custom/feed/CreatePost'

export default async function NewsFeed() {
  const feeds = await getFeeds()

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold p-4'>News Feed</h1>
      <CreatePost />
      <div className='divide-y divide-gray-200'>
        {feeds.map(feed => (
          <FeedPost key={feed.feedId} feed={feed} />
        ))}
      </div>
    </div>
  )
}
