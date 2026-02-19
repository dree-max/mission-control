'use client'

import { useState } from 'react'
import { Send, CheckCircle, XCircle, Loader2, Linkedin } from 'lucide-react'

type Post = {
  id: string
  content: string
  status: 'draft' | 'posting' | 'posted' | 'error'
  postedAt?: string
  error?: string
}

export default function LinkedInPage() {
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null)

  const handlePost = async () =>content.trim()) return {
    if (!
    
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      status: 'posting',
    }
    
    setPosts([newPost, ...posts])
    setContent('')
    setIsPosting(true)
    setResult(null)

    // Simulate posting - in real app, this would call the API
    // For now, we'll show what would be sent
    setTimeout(() => {
      setPosts(prev => prev.map(p => 
        p.id === newPost.id 
          ? { ...p, status: 'posted', postedAt: new Date().toISOString() }
          : p
      ))
      setIsPosting(false)
      setResult({
        success: true,
        message: 'Post would be sent to LinkedIn company page 110355782'
      })
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Linkedin className="w-8 h-8 mr-3 text-[#0077b5]" />
          LinkedIn Posting
        </h1>
        <p className="text-gray-400">Post to your company page (MoonlightAI)</p>
      </div>

      {/* Connection Status */}
      <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Connection Status</h3>
            <p className="text-sm text-gray-400">Company: MoonlightAI (ID: 110355782)</p>
          </div>
          <div className="flex items-center text-green-400">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Compose Post */}
      <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
        <h3 className="font-medium mb-3">Create Post</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to share?"
          className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
          rows={4}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">{content.length}/3000 characters</span>
          <button
            onClick={handlePost}
            disabled={!content.trim() || isPosting}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              content.trim() && !isPosting
                ? 'bg-[#0077b5] hover:bg-[#005885] text-white'
                : 'bg-[#2a2a2a] text-gray-500 cursor-not-allowed'
            }`}
          >
            {isPosting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post to LinkedIn
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Message */}
      {result && (
        <div className={`mb-6 p-4 rounded-lg border ${
          result.success 
            ? 'bg-green-900/20 border-green-800 text-green-400'
            : 'bg-red-900/20 border-red-800 text-red-400'
        }`}>
          {result.success ? (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {result.message}
            </div>
          ) : (
            <div className="flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              {result.message}
            </div>
          )}
        </div>
      )}

      {/* Post History */}
      <div>
        <h3 className="font-medium mb-3">Post History</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm">No posts yet</p>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                <p className="text-sm mb-2">{post.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {post.postedAt ? new Date(post.postedAt).toLocaleString() : ''}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.status === 'posted' ? 'bg-green-900 text-green-200' :
                    post.status === 'posting' ? 'bg-yellow-900 text-yellow-200' :
                    post.status === 'error' ? 'bg-red-900 text-red-200' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-400">
          <strong>Note:</strong> To enable actual posting, add your LinkedIn access token to the environment variables 
          or update the API configuration in the backend.
        </p>
      </div>
    </div>
  )
}
