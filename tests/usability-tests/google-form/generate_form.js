function createUsabilityForm() {
  var form = FormApp.create('Bảng hỏi Đánh giá Trải nghiệm Người dùng EShop (U-XYZ)');
  form.setDescription('Cảm ơn bạn đã dành thời gian tham gia thử nghiệm. Vui lòng hoàn thành bảng hỏi dưới đây dựa trên trải nghiệm thực tế vừa rồi của bạn.');
  
  // Nhập ID
  var pId = form.addTextItem();
  pId.setTitle('Participant ID')
     .setHelpText('Nhập mã ID do điều phối viên cung cấp (ví dụ: P01, P02...)')
     .setRequired(true);
  
  // Section 1: SUS
  form.addPageBreakItem().setTitle('Phần 1: Đánh giá nhanh hệ thống (Hệ thang đo SUS)');
  
  var susQuestions = [
    "Tôi nghĩ rằng tôi sẽ muốn sử dụng trang web này thường xuyên.",
    "Tôi thấy trang web này phức tạp một cách không cần thiết.",
    "Tôi thấy trang web này dễ sử dụng.",
    "Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của người có kỹ thuật để có thể sử dụng trang web này.",
    "Tôi thấy các chức năng trong trang web này được tích hợp tốt với nhau.",
    "Tôi thấy có quá nhiều sự không nhất quán trong trang web này.",
    "Tôi cho rằng hầu hết mọi người sẽ học cách sử dụng trang web này rất nhanh.",
    "Tôi thấy trang web này rất khó sử dụng.",
    "Tôi cảm thấy rất tự tin khi sử dụng trang web này.",
    "Tôi cần phải học nhiều thứ trước khi có thể sử dụng trang web này."
  ];
  
  for (var i = 0; i < susQuestions.length; i++) {
    var item = form.addScaleItem();
    item.setTitle('Câu ' + (i+1) + ': ' + susQuestions[i])
        .setBounds(1, 5)
        .setLabels('Hoàn toàn phản đối (1)', 'Hoàn toàn đồng ý (5)')
        .setRequired(true);
  }
  
  // Section 2: Open Questions
  form.addPageBreakItem().setTitle('Phần 2: Câu hỏi mở rộng');
  
  var openQuestions = [
    {
      title: "1. Sự rõ ràng và thông tin hiển thị (Clarity)",
      help: "Có phần nào trên trang web làm bạn cảm thấy mơ hồ hoặc không rõ nghĩa không? Cụ thể là gì và tại sao?"
    },
    {
      title: "2. Khả năng phục hồi lỗi (Error Recovery)",
      help: "Khi thao tác sai hoặc gặp lỗi, trang web có giúp bạn dễ dàng nhận biết và sửa lỗi để tiếp tục không?"
    },
    {
      title: "3. Tốc độ và hiệu năng (Speed)",
      help: "Bạn đánh giá thế nào về tốc độ tải trang phản hồi của hệ thống trong suốt quá trình thực hiện nhiệm vụ?"
    },
    {
      title: "4. Mức độ tin cậy và phản hồi (Trust)",
      help: "Có thời điểm nào bạn không chắc hệ thống đã ghi nhận đúng hành động hoặc đơn hàng của bạn không? Điều gì làm bạn chắc chắn hoặc không chắc chắn?"
    }
  ];
  
  for (var j = 0; j < openQuestions.length; j++) {
    var item = form.addParagraphTextItem();
    item.setTitle(openQuestions[j].title)
        .setHelpText(openQuestions[j].help)
        .setRequired(true);
  }
  
  Logger.log('Tạo Form thành công!');
  Logger.log('Đường dẫn chỉnh sửa Form: ' + form.getEditUrl());
  Logger.log('Đường dẫn gửi cho người dùng điền: ' + form.getPublishedUrl());
}
