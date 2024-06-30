export type User = {
  id: string;
  email: string;
  password: string;
  username?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  bio?: string;
  location?: string;
  posts: Post[];
  likes: Like[];
  dislikes: Dislike[];
  comments: Comment[];
  followers: Follows[];
  following: Follows[];
  userTags: UserTag[];
  topics: TopicSubs[];
  authorTopic: Topic[];
  category: CategorySubs[];
  notifications: Notification[];
  isAdmin: boolean;
  reportsSent: Report[];
};

export type Follows = {
  id: string;
  follower: User;
  followerId: string;
  following: User;
  followingId: string;
  notificationsSent: Notification[];
};

export type Tag = {
  id: string;
  name: string;
  postTags: PostTag[];
  userTags: UserTag[];
};

export type Post = {
  id: string;
  content: string;
  author: User;
  authorId: string;
  likes: Like[];
  dislikes: Dislike[];
  comments: Comment[];
  createdAt: Date;
  topic?: Topic;
  topicId?: string;
  category?: Category;
  categoryId?: string;
  postTags: PostTag[];
  notifications: Notification[];
  reports: Report[];
  _count: any;
  likedByUser: boolean;
  dislikedByUser: boolean;
};

export type PostMetaData = {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
};

export type Like = {
  id: string;
  user: User;
  userId: string;
  post?: Post;
  postId?: string;
  topic?: Topic;
  topicId?: string;
};

export type Topic = {
  id: string;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: string;
  topicSubs: TopicSubs[];
  posts: Post[];
  notifications: Notification[];
  likes: Like[];
  author: User;
  authorId: string;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  posts: Post[];
  topics: Topic[];
  categorySubs: CategorySubs[];
  avatarUrl?: string;
  _count: any
  followers:any
};

export type CategorySubs = {
  id: string;
  category: Category;
  categoryId: string;
  follower: User;
  followerId: string;
};

export type TopicSubs = {
  id: string;
  topic: Topic;
  topicId: string;
  follower: User;
  followerId: string;
};

export type Dislike = {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
  replyToComment?: Comment;
  replyToCommentId?: string;
  replies: Comment[];
  createdAt: Date;
};

export type PostTag = {
  id: string;
  post: Post;
  postId: string;
  tag: Tag;
  tagId: string;
};

export type UserTag = {
  id: string;
  user: User;
  userId: string;
  tag: Tag;
  tagId: string;
};

export type Notification = {
  id: string;
  userId: string;
  user: User;
  postId?: string;
  MENTION: any;
  topicId?: string;
  followsId?: string;
  follows?: Follows;
  objectType: string;
  post?: Post;
  topic?: Topic;
  timestamp: Date;
  isRead: boolean;
};

export type Report = {
  id: string;
  reportedBy: User;
  reportedById: string;
  post: Post;
  postId: string;
  reason: any;
  comment?: string;
  createdAt: Date;
  isProcessed: boolean;
  processedBy?: string;
  processedAt?: Date;
};
