import { BookOpen, Target, Briefcase, Plane, Store, Coffee, RotateCcw, PenTool } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Câu Chuyện Thành Công - Ebook Mind',
  description: 'Những câu chuyện thực tế từ người đọc Ebook Mind: Từ văn phòng ra kinh doanh, bỏ phố về quê, mở cửa hàng online, làm freelancer. Kiến thức thay đổi cuộc sống.',
  openGraph: {
    title: 'Câu Chuyện Thành Công - Ebook Mind',
    description: 'Những câu chuyện thực tế từ người đọc Ebook Mind',
    type: 'website',
  },
}

export default function UseCasesPage() {
  const USE_CASES = [
    {
      id: 'uc-1',
      icon: Briefcase,
      gradient: 'from-indigo-500 to-violet-500',
      title: 'Từ văn phòng ra kinh doanh',
      quote: '"Sau 4 tháng, công việc phụ bằng 70% lương nên tôi mới dám nghỉ việc"',
      character: 'Nam – Nhân viên văn phòng',
      desc: 'Bắt đầu từ công việc phụ nhỏ, học và thử theo từng bước trước khi nghỉ việc.',
      content: [
        'Mình làm văn phòng được hơn 7 năm rồi, lương cũng ổn, nhưng cảm giác cứ dậm chân tại chỗ và biết rằng môi trường hiện nay đào thải rất nhanh khi ngày càng lớn tuổi.',
        'Muốn nghỉ ra làm riêng mà sợ không biết cái gì, chưa có một tí kiến thức nào. Sợ lỗ, sợ mất vốn, sợ không bán được hàng, nói chung là sợ đủ thứ. Cứ nghĩ đến cảnh thất nghiệp là mình lại chùn bước.',
        'Rồi mình biết tới web này, mày mò đọc ebook mà như được khai sáng. Thay vì đùng cái nghỉ việc ngay, mình bắt đầu dành thời gian đọc, nghiên cứu và làm thử theo từng bước. Song song với đó, mình xem thêm trên youtube chỗ nào cần hiểu rõ, hay nghe chia sẻ thêm từ người đi trước để lấy động lực.',
        'Thế là cứ thế từng bước, mình học cách chọn ngạch, định giá, marketing, tìm kênh bán phù hợp,… Mình quyết định không đánh cược tất cả vào một ván bài lớn mà đi từng bước nhỏ. Mình chọn ngạch sản phẩm số: Bán template báo cáo và checklist công việc cho chính dân văn phòng - tệp khách mình hiểu nhất. Test bán thử trong các group Facebook, đăng video Tiktok. Ban đầu chỉ lác đác vài người hỏi, nhưng mình kiên trì điều chỉnh nội dung, cải thiện theo feedback từ mọi người.',
        'Kết quả không đến sau một đêm, nhưng sau 4 tháng, dòng tiền từ công việc phụ này bắt đầu tốt hơn, kiếm được cỡ 70% mức lương văn phòng hiện tại của mình. Khi ấy, mình muốn tập trung tối đa cho đam mê này nên tự tin viết đơn xin nghỉ việc. Bài học lớn mình rút ra: Đừng nghỉ việc để tìm được, hãy tìm đường xong rồi hẵng nghỉ.'
      ]
    },
    {
      id: 'uc-2',
      icon: Plane,
      gradient: 'from-violet-500 to-fuchsia-500',
      title: 'Bỏ phố về quê',
      quote: '"Mang hàng chuẩn Nhật về quê, mình sống khỏe mà vẫn gần gia đình"',
      character: 'Hương – Du học sinh về nước',
      desc: 'Tận dụng lợi thế hiểu hàng Nhật để mở ngách mẹ & bé chuẩn nội địa.',
      content: [
        '5 năm bên Nhật tích cóp được ít vốn. Ngày xách vali về quê, ai cũng hỏi \'giờ làm gì?\'. Kinh nghiệm thì không có, cũng không còn trẻ để có thể cạnh tranh với các em hiện nay, chẳng nhẽ đi làm công nhân.',
        'Mình thực sự không muốn quay lại cảnh đi làm công ăn lương, rất muốn tự chủ, mở cái gì đó nho nhỏ ở nhà cứ thế mà túc tắc sống. Nhưng ở quê thì biết buôn bán gì?',
        'Cũng rất vô tình thôi, mình thấy Ebook Mind trên Google trong lúc đang tìm kiếm ý tưởng, nghĩ đọc xem có gì hay ho, thêm kiếm thức cũng vẫn hơn. Sau đó mình hiểu hơn về nghiên cứu thị trường ngách, cách làm từ vốn nhỏ, nghiên cứu thị trường, nhập hàng, quản lý tồn kho, marketing,…. Quá nhiều khái niệm mới.',
        'Nó đã giúp mình nhận ra mình có lợi thế lớn: hiểu hàng Nhật và biết cách người Nhật dùng đồ Nhật, cũng như biết được người Việt mình đang chuộng hàng Nhật nào và bí mật nho nhỏ mà mình biết khi còn đang sống ở Nhật.',
        'Thay vì mở cửa hàng tạp hóa chung chung cạnh tranh về giá, mình chọn ngách hẹp: Hàng tiêu dùng Nhật chuẩn nội địa cho mẹ và bé. Cụ thể thế nào thì phải dựa vào kinh nghiệm bản thân, kiến thức và có rất nhiều điều bạn cần phải bắt tay vào làm mới biết. Ebook giúp mình khai sáng ra rất rất nhiều.',
        'Bật mí là mình không chỉ đăng bán thông thường, mình bán cả online và offline. Mình làm nội dung chuẩn chỉ kiên trì chia sẻ cách chăm con kiểu Nhật, giải thích công dụng sản phẩm bằng tiếng Việt dễ hiểu, quay video hướng dẫn,.. Khách hàng tin mình vì mình là \'người thật việc thật\', tư vấn có tâm.',
        'Tới giờ, mình vẫn sống khỏe ở quê, thu nhập không thua gì hồi đi làm bên kia mà lại được gần nhà, tự do thởi gian. Kinh doanh ngách ở quê không cần quá đông khách như phố lớn đâu, chỉ cần đúng tệp và phục vụ họ thật tốt là đủ sống bền. Thêm kênh online nữa là sống dư.'
      ]
    },
    {
      id: 'uc-3',
      icon: Store,
      gradient: 'from-teal-400 to-cyan-400',
      title: 'Chủ shop online bấp bênh',
      quote: '"Từ may rủi sang đo lường – đơn đều nhờ tối ưu theo tuần"',
      character: 'Minh – Chủ shop online',
      desc: 'Ổn định đơn bằng cách tối ưu funnel, A/B test theo tuần, tập trung SKU chủ lực.',
      content: [
        'Bán online được mấy tháng rồi, có đơn nhưng lên xuống thất thường. Chạy ads tốn tiền mà nội dung không ra đơn, không biết mình sai ở sản phẩm hay cách bán. Cứ mơ hồ là do cạnh tranh hay do khách hàng chưa hiểu giá trị sản phẩm.',
        'Mình quyết định học lại từ đầu. Đọc ebook về funnel cơ bản: thu hút → tin tưởng → chốt → chăm sóc. Nhận ra vấn đề không phải ở một chỗ, mà cả chuỗi cần tối ưu.',
        'Bắt tay sửa theo thứ tự: trước tiên là ảnh/tiêu đề/giá trị khác biệt (để thu hút đúng người), sau đó bổ sung feedback xã hội và review (để xây tin tưởng), cuối cùng là ưu đãi rõ ràng (để chốt).',
        'Mình áp dụng kỷ luật A/B test: mỗi tuần chỉ đổi 1 biến số, đo CTR, CR, AOV. Không "đổi 10 thứ cùng lúc" vì vậy không biết cái nào có hiệu quả.',
        'Đồng thởi, mình tập trung vào 1 dòng sản phẩm best-seller và vài biến thể, tránh ôm quá nhiều SKU. Tối ưu mô tả, ảnh thật, quy trình hậu mãi để khách hàng yên tâm.',
        'Kết quả bất ngờ: tỷ lệ chuyển đổi tăng dần theo từng tuần. Doanh thu ổn định hơn vì mình biết đo lường và tối ưu, không còn phụ thuộc may rủi. Giờ mình tự tin mở rộng vì biết công thức hoạt động.'
      ]
    },
    {
      id: 'uc-4',
      icon: Coffee,
      gradient: 'from-rose-400 to-orange-500',
      title: 'Bứt phá cho tiệm cà phê',
      quote: '"Quyết tâm cải tiến quán mang màu sắc mới. Từ quán ế tới doanh thu ổn định"',
      character: 'Chị Mai – Chủ quán cà phê',
      desc: 'Định vị lại quán thành "trạm sạc" cho freelancer, tối ưu không gian & dịch vụ.',
      content: [
        'Tôi năm nay cũng 41 tuổi rồi và đây là quán cà phê đầu tiên, vận hành cũng được cỡ 2 năm. Quán theo đánh giá của khách là đẹp, đồ uống ngon. Nhưng độ 6 tháng trở lại đây, khách cứ thưa thớt dần không hiểu sao.',
        'Tiền mặt bằng, tiền nhân viên, điện nước, vận hành,... vẫn phải trả đều đều. Mỗi ngày mở quán lại đau đầu suy nghĩ hôm nay làm sao có thêm khách. Ngồi nhìn quán vắng mà nóng ruột. Chẳng lẽ gu mình lỗi thởi so với giới trẻ? Cũng tìm hiểu các nguyên nhân nhưng vẫn chưa tìm được giải pháp tốt nhất.',
        'Tôi tranh thủ rảnh là lại tìm đọc sách, hiểu thêm về truyền thông, cách làm content, xây kênh sao cho thu hút giới trẻ và nhiều người biết tới.',
        'Rồi tôi cũng hiểu ra được một số nguyên nhân chính, trong đó có vấn đề về việc quán mình đang \'nhạt\', không có màu sắc riêng, không cập nhật/cải tiến đồ uống theo xu hướng, thiếu xuất hiện trên mạnh xã hội và một phần cũng hiện nay sức cạnh tranh cao nên mô hình của mình không còn phù hợp với tệp khách hàng ở khu này nữa.',
        'Tôi quyết định đổi hướng: biến quán thành \'trạm sạc\' yên tĩnh cho dân freelancer và người làm việc từ xa. Quyết tâm cải tiến quán với màu sắc mới, nâng cấp wifi mạnh hơn, bố trí thêm ổ cắm ở mọi bàn, chỉnh lại nhạc nhẹ nhàng không lời. Menu thêm mấy món ăn nhẹ healthy cho người ngồi lâu. Quán được định vị lại rõ ràng hơn, thay vì phục vụ khách rất chung chung như ngày xưa: đây là nơi để làm việc tập trung, không phải nơi check-in sống ảo ồn ào,..v.v.',
        'Khách bắt đầu quay lại và ngồi lại. Họ đến không chỉ vì đồ uống, mà vì không gian mình tạo ra giúp họ làm việc hiệu quả. Doanh thu ổn định dần nhờ lượng khách quen trung thành này. Ở tuổi này, mình hiểu làm kinh doanh là phải có \'chất\' riêng và giải quyết đúng nhu cầu.',
        'Còn rất nhiều điều hay ho khác mà tôi học được qua mấy ebook của Ebook Mind. Công nhận là phải không ngừng thay đổi, học thêm cái mới để không bị lỗi thởi, biết tận dụng thế mạnh làm đòn bảy thì mới có thể tồn tại ở xã hội ngày càng phát triển và cạnh tranh này.'
      ]
    },
    {
      id: 'uc-5',
      icon: Target,
      gradient: 'from-indigo-500 to-fuchsia-500',
      title: 'Mở tiệm bánh take‑away ngoài giờ',
      quote: '"Bán pre‑order theo ngày để kiểm soát tồn kho, quay vòng vốn nhanh"',
      character: 'Anh – Nhân viên hành chính',
      desc: 'Nguồn thu thứ hai buổi tối/cuối tuần theo mô hình micro‑business.',
      content: [
        'Tôi làm hành chính, giờ hành chính từ 8-5. Muốn có nguồn thu thứ hai nhưng chỉ rảnh buổi tối và cuối tuần. Sợ mở tiệm tốn chi phí mặt bằng, sợ không bán được vì cạnh tranh quá nhiều.',
        'Tôi quyết định tìm hiểu mô hình kinh doanh phù hợp với thởi gian hạn chế. Đọc ebook về "micro-business": bắt đầu nhỏ, quay vòng vốn nhanh, ưu tiên dòng tiền thay vì tham vọng lớn.',
        'Ý tưởng bắt đầu hình thành: bánh take-away cho bữa sáng nhanh. Tôi chọn 1–2 sản phẩm chủ lực (bánh mì, bánh bao, bánh croissant), đóng gói combo để tăng giá trị đơn hàng.',
        'Thay vì mở tiệm truyền thống, tôi áp dụng mô hình pre-order theo ngày: khách đặt trước tối hôm trước, tôi nướng vào sáng hôm sau, giao đúng khung giờ 6-7h sáng khi họ đi làm. Cách này giúp tôi kiểm soát tồn kho (không nướng quá), đảm bảo chất lượng (bánh tươi), và quay vòn vốn nhanh.',
        'Tôi bắt đầu từ bếp nhà, bán qua Facebook group và Zalo. Những tháng đầu khó khăn, phải tối ưu công thức, lịch giao, quy trình đóng gói. Nhưng tôi kiên trì.',
        'Sau vài tháng, đơn bắt đầu đều đặn. Lãi không nhiều nhưng đủ để tôi mở rộng: thuê bếp nhỏ, tuyển thêm người giúp việc. Giờ tôi có đủ dữ kiện để mở tiệm thực sự, chứ không phải "hứng lên mở tiệm" mà chắc chắn sẽ thua lỗ. Bài học: micro-business là bước đệm hoàn hảo để kiểm chứng ý tưởng trước khi đầu tư lớn.'
      ]
    },
    {
      id: 'uc-6',
      icon: RotateCcw,
      gradient: 'from-cyan-500 to-emerald-500',
      title: 'Bắt đầu lại từ đầu',
      quote: '"Làm lại từ những đơn nhỏ, lời ít cũng được, miễn tiền tươi để trả từng khoản nợ"',
      character: 'Bình – Chủ tiệm từng phá sản',
      desc: 'Kỷ luật tài chính, bán thiết yếu vòng quay vốn nhanh để trả nợ dần.',
      content: [
        'Phải nói là năm ngoái sập tiệm, mình gánh một khoản nợ không nhỏ. Áp lực kinh khủng, mất ngủ triền miên. Mình cần tiền trả nợ nhưng vốn không còn, niềm tin cũng lung lay. Không thể liều mạng vay thêm để làm lớn được nữa.',
        'Mình tìm đọc tài liệu về quản trị dòng tiền và kinh doanh ít vốn, xác định làm dần dần từ nhỏ được đồng nào hay đồng ấy. Gạt bỏ cái tôi \'ông chủ\' ngày xưa, bắt đầu lại từ việc bán những món đồ thiết yếu, vòng quay vốn nhanh. Lần này mình đặt mục tiêu: lời ít cũng được nhưng phải là tiền tươi thóc thật.',
        'Mình chọn kỷ luật sắt đá: tách biệt tiền vốn và tiền tiêu. Lãi được đồng nào là trích một phần trả nợ ngay, một phần quay vòng vốn. Không mơ mộng làm giàu nhanh sau một đêm nữa, :)) (có được kinh nghiệm thất bại nên bớt ngây thơ).',
        'Dần dần, những khoản nợ nhỏ vơi đi. Mình học được bài học xương máu: Kỷ luật tài chính quan trọng hơn ý tưởng triệu đô. Giờ mình vẫn đang cày, nhưng tâm thế vững vàng hơn nhiều, và mình biết mình sẽ vượt qua được.'
      ]
    },
    {
      id: 'uc-7',
      icon: PenTool,
      gradient: 'from-purple-500 to-pink-500',
      title: 'Nâng cao giá trị để tăng thu nhập',
      quote: '"Đóng gói dịch vụ content, nâng cấp kỹ năng để hết cảnh bị ép giá"',
      character: 'Lâm – Freelance tự do',
      desc: 'Productized service trong ngách nội thất, định vị chuyên gia thay vì "thợ đụng".',
      content: [
        'Mang tiếng freelancer tự do, nhưng thực ra mình là \'thợ đụng\' – đụng đâu làm đó, ai thuê gì làm nấy. Thu nhập tháng cao tháng thấp, khách thì hay ép giá vì họ thấy mình cũng bình thường như bao người khác.',
        'Mình quyết định phải thay đổi và tất nhiên, có kiến thức thì mới dễ xoay chuyển. Mình tìm tòi, học hỏi những anh chị freelancer khác. Đồng thởi đọc được về cách \'productized service\' (đóng gói dịch vụ) quá hay, đúng thứ đang cần.',
        'Rồi mình không nhận việc vặt nữa, mình tập trung vào một kỹ năng mũi nhọn: Viết content chuẩn SEO cho ngành nội thất – lĩnh vực mình thích nhất.',
        'Bắt tay và xây lại portfolio, không show hết mọi thứ, mình chỉ show những dự án liên quan đến ngách này, có số liệu chứng minh hiệu quả. Mình chào giá theo gói dịch vụ trọn gói chứ không tính theo bài lẻ tẻ. Tự định giá tìm được cách giúp bản thân trở nên có giá trị cao trong mắt khách hàng.',
        'Kết quả bất ngờ: Khách hàng tôn trọng mình hơn, ít kỳ kèo hơn vì họ thấy mình là chuyên gia trong ngách của họ. Thu nhập mình tăng lên và ổn định hơn hẳn. Hóa ra, chuyên sâu mới là con đường sống khỏe cho freelancer.'
      ]
    },
    {
      id: 'uc-8',
      icon: BookOpen,
      gradient: 'from-indigo-500 to-violet-500',
      title: 'Tuổi 29 tìm hướng đi mới',
      quote: '"Tìm được công việc mới, xây dựng định hướng và thoát cảm giác hoang mang"',
      character: 'Trang – 29 tuổi vừa mất việc',
      desc: 'Tự đánh giá thế mạnh, thử job nhỏ, học và thử kinh doanh dropshipping.',
      content: [
        'Tui năm nay cũng 29 tuổi rùi, lúc ấy vừa bị cho nghỉ việc vì công ty cắt giảm nhân sự. Cầm quyết định nghỉ việc trên tay mà lòng nặng trĩu, huhu. Giờ nghĩ lại vẫn sốc, nhưng giờ thấy cũng may vì cơ hội khác tới cho tui được thử sức với thứ mà tui chưa bao giờ dám làm.',
        'Bạn có hiểu cảm giác khi mà thấy bạn bè thì ổn định nhà xe, con cái, còn mình thì lại về vạch xuất phát. Cảm giác vừa thất bại, vừa lạc lõng. Không biết nên đi xin việc tiếp hay làm gì tiếp để có tiền đây.',
        'Mới đầu buồn dữ lắm, nghĩ chẳng lẽ bản thân kém cỏi vậy sao? Tui dành 2 tuần chỉ để đọc và nhìn lại bản thân. Đọc các case study về chuyển nghề, xem tiktok để lấy sự đồng cảm với những bạn giống mình.',
        'Rồi cũng nhận ra không thể như thế này mãi được. "Mình không vô dụng, chỉ là mình đang đặt sai chỗ thôi. Mình có kỹ năng tổ chức tốt, tại sao không thử làm trợ lý ảo hoặc quản lý dự án freelance?" - Tui đã nghĩ vậy đấy.',
        'Thế là tui bắt đầu tìm hiểu về việc làm thêm tại nhà, nhận những job nhỏ trên các nền tảng để lấy lại cảm giác làm việc và có chút thu nhập. Song song đó, học thêm về kinh doanh từ nhiều nguồn, trong đó Ebook Mind là ok nhất vì chính Ebook trên này là thứ giúp cho tui có thêm rất rất nhiều kiến thức mới, giúp tui hiểu hơn về khai thác thế mạnh bản thân và từng bước kinh doanh, khởi nghiệp ra sao, nhận job và làm việc với khách hàng thế nào,… Nhiều lắm kể không hết.',
        'Chính nhờ đọc ebook mà tôi đã chọn được ngách kinh doanh online - với mô hình dropshipping để thử sức mà không tốn vốn nhập hàng. Trộm vía cũng qua giai đoạn khó khăn rồi.',
        'Giờ tui chưa giàu, nhưng tui thấy khá tự do và đã tìm lại được sự tự tin. Tui có 3 nguồn thu nhập nhỏ và một lộ trình rõ ràng hơn. Thất nghiệp tuổi 29 không phải là dấu chấm hết, nó là cơ hội để chúng ta sắp xếp lại cuộc đời và đi đúng hướng hơn.'
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
                <span className="inline-block text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">{c.character}</span>
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
              <span className="inline-block text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-semibold border border-purple-100 mb-4">{c.character}</span>
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
            Kiến thức ngách thay đổi mindset
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
