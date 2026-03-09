import { BookOpen, Target, Briefcase, Plane, Store, Coffee, RotateCcw, PenTool } from 'lucide-react'
import Link from 'next/link'

export default function UseCasesPage() {
  const USE_CASES = [
    {
      id: 'uc-1',
      icon: Briefcase,
      gradient: 'from-indigo-500 to-violet-500',
      title: 'Từ văn phòng ra kinh doanh',
      quote: '“Sau 4 tháng, công việc phụ bằng 70% lương nên tôi mới dám nghỉ việc”',
      character: 'Nam – Nhân viên văn phòng 7 năm',
      desc: 'Bắt đầu từ công việc phụ nhỏ, học và thử theo từng bước trước khi nghỉ việc.',
      content: [
        'Mình làm văn phòng được hơn 7 năm rồi, lương cũng ổn, nhưng cảm giác cứ dậm chân tại chỗ và biết rằng môi trường hiện nay đào thải rất nhanh khi ngày càng lớn tuổi.',
        'Muốn nghỉ ra làm riêng mà sợ không biết cái gì, chưa có một tí kiến thức nào. Sợ lỗ, sợ mất vốn, sợ không bán được hàng, nói chung là sợ đủ thứ. Cứ nghĩ đến cảnh thất nghiệp là mình lại chùn bước.',
        'Rồi mình biết tới web này, mày mò đọc ebook mà như được khai sáng. Thay vì đùng cái nghỉ việc ngay, mình bắt đầu dành thời gian đọc, nghiên cứu và làm thử theo từng bước. Song song với đó, mình xem thêm trên YouTube, nghe chia sẻ từ người đi trước để lấy động lực.',
        'Thế là cứ thế từng bước, mình học cách chọn ngách, định giá, marketing, tìm kênh bán phù hợp. Mình chọn ngách sản phẩm số: template báo cáo và checklist công việc cho dân văn phòng – tệp mình hiểu nhất. Test bán trong các group Facebook, đăng video TikTok, kiên trì tối ưu theo feedback.',
        'Kết quả không đến sau một đêm, nhưng sau 4 tháng, dòng tiền từ công việc phụ này đạt khoảng 70% lương. Khi ấy mình tự tin viết đơn xin nghỉ việc. Bài học lớn: Đừng nghỉ để đi tìm đường; hãy tìm được đường rồi hãy nghỉ.'
      ]
    },
    {
      id: 'uc-2',
      icon: Plane,
      gradient: 'from-violet-500 to-fuchsia-500',
      title: 'Bỏ phố về quê',
      quote: '“Mang hàng chuẩn Nhật về quê, mình sống khỏe mà vẫn gần gia đình”',
      character: 'Hương – Du học sinh Nhật trở về',
      desc: 'Tận dụng lợi thế hiểu hàng Nhật để mở ngách mẹ & bé chuẩn nội địa.',
      content: [
        '5 năm bên Nhật tích cóp được ít vốn. Ngày xách vali về quê, ai cũng hỏi “giờ làm gì?”. Kinh nghiệm không nhiều, cạnh tranh ở phố lớn thì khốc liệt – có lẽ về quê là lựa chọn hợp lý.',
        'Trong lúc tìm ý tưởng, mình thấy Ebook Mind, đọc dần về nghiên cứu thị trường ngách, cách làm từ vốn nhỏ, nhập hàng, quản lý tồn kho, marketing… Rồi mình nhận ra lợi thế của bản thân: hiểu đồ Nhật và thói quen dùng đồ Nhật.',
        'Thay vì mở tạp hoá chung chung cạnh tranh giá, mình chọn ngách hẹp: Hàng tiêu dùng Nhật chuẩn nội địa cho mẹ & bé. Mình chia sẻ kiến thức kiểu Nhật trên mạng xã hội, giải thích công dụng bằng tiếng Việt dễ hiểu, quay video hướng dẫn, tư vấn có tâm.',
        'Giờ mình sống khoẻ ở quê, thu nhập không thua gì đi làm bên kia mà còn ở gần gia đình. Kinh doanh ngách ở quê không cần quá đông khách, chỉ cần đúng tệp và phục vụ họ thật tốt – thêm kênh online là ổn.'
      ]
    },
    {
      id: 'uc-3',
      icon: Store,
      gradient: 'from-teal-400 to-cyan-400',
      title: 'Chủ shop online bấp bênh',
      quote: '“Từ may rủi sang đo lường – đơn đều nhờ tối ưu theo tuần”',
      character: 'Minh – Chủ shop online',
      desc: 'Ổn định đơn bằng cách tối ưu funnel, A/B test theo tuần, tập trung SKU chủ lực.',
      content: [
        'Bán online đã có đơn nhưng phập phù. Chạy ads tốn tiền, nội dung không ra đơn – không biết lỗi ở sản phẩm hay cách bán.',
        'Mình học lại funnel cơ bản: thu hút → tin tưởng → chốt → chăm sóc. Sửa theo thứ tự: ảnh/tiêu đề/giá trị khác biệt, bổ sung feedback xã hội, ưu đãi rõ ràng.',
        'Kỷ luật A/B test: mỗi tuần chỉ đổi 1 biến số, đo CTR, CR, AOV. Không “đổi 10 thứ cùng lúc”.',
        'Tập trung 1 dòng sản phẩm best-seller và vài biến thể, tránh ôm quá nhiều SKU. Tối ưu mô tả, ảnh thật và quy trình hậu mãi.',
        'Kết quả: tỷ lệ chuyển đổi tăng dần, doanh thu ổn định hơn vì biết đo lường và tối ưu, không còn phụ thuộc may rủi.'
      ]
    },
    {
      id: 'uc-4',
      icon: Coffee,
      gradient: 'from-rose-400 to-orange-500',
      title: 'Bứt phá cho tiệm cà phê',
      quote: '“Quyết tâm cải tiến quán mang màu sắc mới. Từ quán ế tới doanh thu ổn định”',
      character: 'Mai – Chủ quán cà phê',
      desc: 'Định vị lại quán thành “trạm sạc” cho freelancer, tối ưu không gian & dịch vụ.',
      content: [
        '41 tuổi, quán vận hành 2 năm, khách thưa dần mà chi phí vẫn đều: mặt bằng, nhân sự, điện nước…',
        'Học thêm về truyền thông, content, xây kênh. Rà lại vấn đề cốt lõi: quán “nhạt”, thiếu bản sắc, ít hiện diện trên mạng xã hội, mô hình chưa phù hợp tệp khu vực.',
        'Định vị lại: không gian yên tĩnh cho freelancer/remote worker. Nâng cấp wifi, ổ cắm, nhạc nhẹ, thêm đồ ăn healthy cho người ngồi lâu, thông điệp rõ ràng.',
        'Khách quay lại vì không gian giúp họ làm việc hiệu quả. Doanh thu ổn định nhờ nhóm khách trung thành. Bài học: có “chất” riêng và giải đúng nhu cầu.'
      ]
    },
    {
      id: 'uc-5',
      icon: Target,
      gradient: 'from-indigo-500 to-fuchsia-500',
      title: 'Mở tiệm bánh take‑away ngoài giờ',
      quote: '“Bán pre‑order theo ngày để kiểm soát tồn kho, quay vòng vốn nhanh”',
      character: 'Anh – Nhân viên hành chính',
      desc: 'Nguồn thu thứ hai buổi tối/cuối tuần theo mô hình micro‑business.',
      content: [
        'Đi làm hành chính giờ hành chính, buổi tối/cuối tuần muốn có nguồn thu thứ hai nhưng ngại chi phí mặt bằng.',
        'Mình học về mô hình micro‑business: bắt đầu nhỏ, quay vòng vốn nhanh, ưu tiên dòng tiền.',
        'Chọn 1–2 sản phẩm chủ lực, đóng gói combo. Bán pre‑order theo ngày để kiểm soát tồn kho và chất lượng.',
        'Tập trung tệp “bữa sáng nhanh” cho dân đi làm: đặt trước tối hôm trước, giao đúng khung giờ sáng.',
        'Sau vài tháng tối ưu quy trình và lịch giao, đơn đều và có lãi; đủ dữ kiện để mở rộng thay vì “hứng lên mở tiệm”.'
      ]
    },
    {
      id: 'uc-6',
      icon: RotateCcw,
      gradient: 'from-cyan-500 to-emerald-500',
      title: 'Bắt đầu lại từ đầu',
      quote: '“Làm lại từ những đơn nhỏ, lời ít cũng được, miễn tiền tươi để trả từng khoản nợ”',
      character: 'Bình – Chủ tiệm từng phá sản',
      desc: 'Kỷ luật tài chính, bán thiết yếu vòng quay vốn nhanh để trả nợ dần.',
      content: [
        'Sau lần sập tiệm, nợ lớn và tinh thần xuống dốc. Không thể vay thêm để làm lớn.',
        'Học về quản trị dòng tiền và kinh doanh ít vốn: bắt đầu lại từ món thiết yếu, vòng quay vốn nhanh, tiền thật.',
        'Kỷ luật: tách biệt tiền vốn – tiền tiêu; lãi trích trả nợ ngay một phần, phần còn lại quay vòng.',
        'Không mơ “giàu qua đêm”; đi chậm nhưng chắc. Nợ nhỏ vơi dần, tâm thế vững hơn. Bài học: kỷ luật tài chính quan trọng hơn ý tưởng lớn.'
      ]
    },
    {
      id: 'uc-7',
      icon: PenTool,
      gradient: 'from-purple-500 to-pink-500',
      title: 'Nâng cao giá trị để tăng thu nhập',
      quote: '“Đóng gói dịch vụ content, nâng cấp kỹ năng để hết cảnh bị ép giá”',
      character: 'Lâm – Freelancer nội dung',
      desc: 'Productized service trong ngách nội thất, định vị chuyên gia thay vì “thợ đụng”.',
      content: [
        'Làm freelance kiểu “ai thuê gì làm nấy”, thu nhập bấp bênh và hay bị ép giá.',
        'Học về productized service: đóng gói dịch vụ, định nghĩa kết quả – quy trình – báo giá theo gói.',
        'Chọn ngách nội thất, xây lại portfolio có số liệu. Chỉ nhận dự án phù hợp ngách.',
        'Kết quả: khách tôn trọng hơn, ít kỳ kèo; thu nhập ổn định và cao hơn nhờ định vị rõ ràng.'
      ]
    },
    {
      id: 'uc-8',
      icon: BookOpen,
      gradient: 'from-indigo-500 to-violet-500',
      title: 'Tuổi 29 tìm hướng đi mới',
      quote: '“Tìm được công việc mới, xây dựng định hướng và thoát cảm giác hoang mang”',
      character: 'Trang – 29 tuổi vừa mất việc',
      desc: 'Tự đánh giá thế mạnh, thử job nhỏ, học và thử kinh doanh dropshipping.',
      content: [
        '29 tuổi, vừa bị cắt giảm. Hai tuần đầu dành để đọc và nhìn lại bản thân, tìm sự đồng cảm từ cộng đồng.',
        'Nhận ra mình có thế mạnh tổ chức – thử trợ lý ảo/quản lý dự án freelance để lấy lại nhịp làm việc.',
        'Song song, học thêm về kinh doanh, chọn mô hình dropshipping để thử sức với rủi ro thấp.',
        'Giờ chưa giàu nhưng có ba nguồn thu nhỏ và lộ trình rõ ràng. Thất nghiệp không phải dấu chấm hết – là cơ hội sắp xếp lại cuộc đời.'
      ]
    }
  ] as const

  return (
    <div>
      {/* Hero Section */}
      <section id="top" className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Use Case <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">từ mọi người</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Một số chia sẻ thực tế từ người dùng. Hành trình từ hoang mang, mất định hướng → cho tới tìm được lối đi cho riêng mình.
          </p>
        </div>
      </section>

      {/* Use Cases Grid (Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {USE_CASES.map((c) => (
            <Link key={c.id} href={`#${c.id}`} className="group relative block focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-2xl">
              <div className={`absolute inset-0 bg-gradient-to-r ${c.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${c.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <c.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2 italic">{c.quote}</p>
                <p className="text-sm text-gray-500">{c.character}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-10">
          {USE_CASES.map((c, idx) => (
            <div key={c.id} id={c.id} className="relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex w-12 h-12 rounded-full bg-gradient-to-r ${c.gradient} items-center justify-center shadow-md`}>
                    <c.icon className="w-6 h-6 text-white" />
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{c.title}</h2>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/ebooks" className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 font-semibold shadow-sm">Chọn ebook phù hợp</Link>
                  <a href="#top" className="text-sm text-gray-500 hover:text-gray-700">Lên đầu trang</a>
                </div>
              </div>
              <p className="text-lg text-gray-700 italic mb-2">{c.quote}</p>
              <p className="text-sm text-purple-700 font-semibold mb-4">{c.character}</p>
              <div className="prose prose-gray max-w-none">
                {c.content.map((p: string, i: number) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Link href="/ebooks" className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold shadow hover:opacity-95">Chọn ebook phù hợp</Link>
                {idx < USE_CASES.length - 1 ? (
                  <a href={`#${USE_CASES[idx + 1].id}`} className="text-sm text-purple-600 hover:underline">Use case tiếp theo →</a>
                ) : (
                  <a href="#top" className="text-sm text-purple-600 hover:underline">Lên đầu trang ↑</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Khám phá hàng trăm ebook chất lượng cao với giá chỉ bằng một cốc trà sữa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ebooks"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Khám phá Ebook
            </Link>
            <Link
              href="/combos"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Xem Combo Ưu Đãi
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
