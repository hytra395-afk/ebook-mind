import { Mail, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Liên hệ</h1>
      <p className="text-gray-500 mb-10">Bạn có câu hỏi? Hãy liên hệ với chúng tôi</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl p-8">
          <Mail className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600">support@ebookmind.com</p>
        </div>
        <div className="bg-white border rounded-xl p-8">
          <MessageSquare className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Hỗ trợ</h3>
          <p className="text-gray-600">Phản hồi trong vòng 24h</p>
        </div>
      </div>
    </div>
  )
}
