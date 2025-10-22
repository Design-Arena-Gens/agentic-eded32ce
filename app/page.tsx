'use client'

import { useState } from 'react'

export default function Home() {
  const [userText, setUserText] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('text', userText)
      formData.append('email', email)
      if (photo) {
        formData.append('photo', photo)
      }

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          AI Photo Caption & Email Agent
        </h1>
        <p className="text-gray-600 mb-8">
          Upload a photo and add context. AI will generate a thumbnail, create the perfect caption, and email it to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Text/Context
            </label>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              rows={4}
              placeholder="Describe your photo or provide context..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? 'Processing...' : 'Generate Caption & Send Email'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">✓ Success!</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Generated Caption:</h3>
                <p className="text-gray-700 italic bg-white p-3 rounded border">
                  {result.caption}
                </p>
              </div>
              {result.thumbnail && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Thumbnail:</h3>
                  <img
                    src={result.thumbnail}
                    alt="Thumbnail"
                    className="rounded-lg shadow-md border"
                  />
                </div>
              )}
              <p className="text-green-700 font-medium">
                📧 Email sent successfully to {result.emailSent}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
