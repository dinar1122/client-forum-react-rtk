export type User = {
    id: string
    email: string
    password: string
    username?: string
    avatarUrl?: string
    dateOfBirth?: Date
    createdAt: Date
    updatedAt: Date
    bio?: string
    location?: string
    posts: Post[]
    userTags: Tag[]
    following: Follows[]
    followers: Follows[]
    likes: Like[]
    comments: Comment[]
    isFollowing?: boolean
  }
  
  export type Follows = {
    id: string
    follower: User
    followerId: string
    following: User
    followingId: string
  }

  export type Tag = {
    id: string
    name: string
    postTags: any
    userTag:any
  }
  
  export type Post = {
    id: string
    content: string
    author: User
    authorId: string
    likes: Like[]
    dislikes: Dislike[]
    comments: Comment[]
    likedByUser: boolean
    dislikedByUser: boolean
    createdAt: Date
    updatedAt: Date
    topic: Topic[]
    category: Category 
    postTags: any
  }
  
  export type PostMetaData = {
    posts: Post[],
    totalPosts: number,
    totalPages: number,
    currentPage: number
  }

  export type Like = {
    id: string
    user: User
    userId: string
    post: Post
    postId: string
  }
  export type Topic = {
    id: string
    description: string
    name: string
  }
  export type Category = {
    id: string
    name: string
    posts: Post[]
    topics: Topic[]

  }
  export type Dislike = {
    id: string
    user: User
    userId: string
    post: Post
    postId: string
  }
  
  export type Comment = {
    id: string
    content: string
    user: User
    userId: string
    post: Post
    postId: string
    replies: Comment[]
    replyToCommentId: string
    createdAt: Date
  }