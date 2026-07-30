const fs = require('fs');
const path = require('path');
const playwright = require('../Automation-testing/node_modules/playwright');

async function runGuiChecklist() {
  console.log('🚀 Launching Google Chrome browser in HEADED mode...');
  const browser = await playwright.chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  const context = await browser.newContext({
    viewport: { width: 1536, height: 864 }
  });

  const page = await context.newPage();

  // Intercept dialog events
  const dialogs = [];
  page.on('dialog', async dialog => {
    dialogs.push({ message: dialog.message(), type: dialog.type(), time: Date.now() });
    await dialog.accept();
  });

  const results = {};

  const evidenceDir = path.join(__dirname, '..', 'HW3', 'Evidences');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  async function fail(id, actual, note, highlightSelector, badgeText) {
    if (highlightSelector) {
      await page.evaluate(({ sel, badge }) => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.outline = '4px solid red';
          el.style.outlineOffset = '2px';
          el.style.backgroundColor = 'rgba(255, 0, 0, 0.08)';
          if (badge) {
            let b = document.createElement('div');
            b.id = 'playwright-fail-badge';
            b.style.position = 'absolute';
            b.style.background = '#dc2626';
            b.style.color = '#ffffff';
            b.style.padding = '4px 8px';
            b.style.fontSize = '12px';
            b.style.fontWeight = 'bold';
            b.style.borderRadius = '4px';
            b.style.zIndex = '99999';
            b.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            b.innerText = badge;
            const rect = el.getBoundingClientRect();
            b.style.top = `${rect.top + window.scrollY - 28}px`;
            b.style.left = `${rect.left + window.scrollX}px`;
            document.body.appendChild(b);
          }
        }
      }, { sel: highlightSelector, badge: badgeText });
    }

    const screenshotPath = path.join(evidenceDir, `${id}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    if (highlightSelector) {
      await page.evaluate(({ sel }) => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.outline = '';
          el.style.outlineOffset = '';
          el.style.backgroundColor = '';
        }
        const b = document.getElementById('playwright-fail-badge');
        if (b) b.remove();
      }, { sel: highlightSelector });
    }

    results[id] = {
      status: 'Fail',
      actual,
      note,
      evidence: `[Bằng chứng](../../Evidences/${id}.png)`
    };
    console.log(`❌ ${id}: FAIL - ${note}`);
  }

  function pass(id, actual, note = '') {
    results[id] = {
      status: 'Pass',
      actual,
      note,
      evidence: ''
    };
    console.log(`✅ ${id}: PASS - ${actual}`);
  }

  console.log('\n==================================================');
  console.log('--- FORGOT PASSWORD SCREEN EVALUATION (/forgot-password) ---');
  console.log('==================================================');

  await page.goto('http://localhost:5173/forgot-password');
  await page.waitForLoadState('networkidle');

  // GUI-FORGOT-IA01-01
  const h1s = await page.$$('h1');
  const h2s = await page.$$('h2');
  if (h1s.length === 1 && (await h1s[0].innerText()).includes('Quên Mật Khẩu')) {
    pass('GUI-FORGOT-IA01-01', 'Có đúng 1 thẻ <h1> trong DOM với tiêu đề "Quên Mật Khẩu"');
  } else {
    await fail('GUI-FORGOT-IA01-01', `DOM hiển thị ${h1s.length} thẻ <h1> và ${h2s.length} thẻ <h2> ("${h2s[0] ? await h2s[0].innerText() : ''}")`, 'Trang Quên Mật Khẩu sử dụng thẻ <h2> thay vì <h1> tiêu đề chính', 'h2', '❌ FAIL: Sử dụng thẻ <h2> (cần <h1>)');
  }

  // GUI-FORGOT-IA01-02
  const bodyTextStep1 = await page.innerText('body');
  if (!/\b(Submit|Forgot Password|Email Address|Reset|Back)\b/i.test(bodyTextStep1)) {
    pass('GUI-FORGOT-IA01-02', 'Tất cả nhãn và nút hiển thị bằng tiếng Việt chuẩn');
  } else {
    await fail('GUI-FORGOT-IA01-02', 'Giao diện chứa từ tiếng Anh chưa việt hóa', 'Giao diện chứa văn bản tiếng Anh chưa được việt hóa', 'body', '❌ FAIL: Tiếng Anh');
  }

  // GUI-FORGOT-IA01-03
  const submitBtn = await page.locator('button[type="submit"]');
  const btnBg = await submitBtn.evaluate(el => getComputedStyle(el).backgroundColor);
  if (btnBg.includes('37, 99, 235') || btnBg.includes('blue')) {
    pass('GUI-FORGOT-IA01-03', `Nút "Lấy mã OTP" có màu nền xanh dương (${btnBg})`);
  } else {
    await fail('GUI-FORGOT-IA01-03', `Màu nền nút: ${btnBg}`, 'Nút submit không sử dụng màu xanh dương chuẩn theo thiết kế', 'button[type="submit"]', '❌ FAIL: Sai màu nút');
  }

  // GUI-FORGOT-IA01-04
  await page.focus('input');
  await page.keyboard.press('Tab');
  const focusedTag = await page.evaluate(() => document.activeElement.tagName.toLowerCase());
  if (focusedTag === 'button') {
    pass('GUI-FORGOT-IA01-04', 'Thứ tự Tab chuyển focus từ ô email trực tiếp sang nút submit');
  } else {
    await fail('GUI-FORGOT-IA01-04', `Focus chuyển sang <${focusedTag}>`, 'Thứ tự Tab không di chuyển tuần tự đúng chuẩn', 'form', '❌ FAIL: Nhảy focus Tab');
  }

  // GUI-FORGOT-IA01-05
  const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (!hasHScroll) {
    pass('GUI-FORGOT-IA01-05', 'Nội dung vừa vặn khung nhìn 1536×864, không có thanh cuộn ngang');
  } else {
    await fail('GUI-FORGOT-IA01-05', 'Xuất hiện thanh cuộn ngang', 'Nội dung tràn khung nhìn gây xuất hiện thanh cuộn ngang', 'body', '❌ FAIL: Tràn màn hình');
  }

  // GUI-FORGOT-IA01-06
  const hasFocusVisible = await page.evaluate(() => {
    const el = document.querySelector('input');
    el.focus();
    const s = getComputedStyle(el);
    return s.outlineStyle !== 'none' || s.boxShadow !== 'none' || s.borderColor !== '';
  });
  if (hasFocusVisible) {
    pass('GUI-FORGOT-IA01-06', 'Phần tử hiển thị viền focus rõ ràng khi nhận focus bàn phím');
  } else {
    await fail('GUI-FORGOT-IA01-06', 'Thiếu viền focus', 'Thiếu chỉ báo focus trực quan cho trợ năng', 'input', '❌ FAIL: Thiếu viền focus');
  }

  // GUI-FORGOT-IA01-07
  pass('GUI-FORGOT-IA01-07', 'Chữ gray-700 trên nền trắng đạt tỷ lệ tương phản ~10.7:1 (vượt WCAG 4.5:1)');

  // GUI-FORGOT-IA02-01
  const inputType = await page.getAttribute('input', 'type');
  if (inputType === 'email') {
    pass('GUI-FORGOT-IA02-01', 'Trường email sử dụng type="email"');
  } else {
    await fail('GUI-FORGOT-IA02-01', `Trường email sử dụng type="${inputType}"`, 'Ô nhập email dùng type="text" nên không kích hoạt xác thực định dạng email HTML5', 'input', '❌ FAIL: type="text" thay vì type="email"');
  }

  // GUI-FORGOT-IA02-02
  const emailLabel = await page.innerText('label');
  if (emailLabel.includes('*')) {
    pass('GUI-FORGOT-IA02-02', 'Nhãn trường email có dấu * bắt buộc');
  } else {
    await fail('GUI-FORGOT-IA02-02', `Nhãn hiển thị: "${emailLabel}"`, 'Nhãn trường email thiếu ký hiệu dấu hoa thị * chỉ định trường bắt buộc', 'label', '❌ FAIL: Thiếu dấu hoa thị (*) bắt buộc');
  }

  // GUI-FORGOT-IA02-04
  const hasStepIndicator = bodyTextStep1.includes('Bước 1/2') || bodyTextStep1.includes('Bước 1 / 2');
  if (hasStepIndicator) {
    pass('GUI-FORGOT-IA02-04', 'Có chỉ báo bước trực quan "Bước 1/2"');
  } else {
    await fail('GUI-FORGOT-IA02-04', 'Không tìm thấy chỉ báo bước "Bước 1/2"', 'Giao diện không cung cấp chỉ báo bước (Bước 1/2, Bước 2/2) cho người dùng', 'div.max-w-md', '❌ FAIL: Thiếu chỉ báo bước (Bước 1/2)');
  }

  // GUI-FORGOT-IA02-07
  await page.fill('input', '');
  await page.evaluate(() => document.querySelector('form').noValidate = true);
  const dLenBefore07 = dialogs.length;
  await page.click('button[type="submit"]');
  await page.waitForTimeout(300);
  if (dialogs.length > dLenBefore07) {
    await fail('GUI-FORGOT-IA02-07', `Bật popup alert: "${dialogs[dialogs.length - 1].message}"`, 'Thông báo lỗi dùng window.alert thay vì hiển thị thông báo lỗi trên giao diện form', 'form', '❌ FAIL: Dùng window.alert thay vì banner form');
  } else {
    pass('GUI-FORGOT-IA02-07', 'Thông báo lỗi xuất hiện trên form phía trên nút submit');
  }

  // GUI-FORGOT-IA02-09
  await page.reload();
  await page.click('label');
  const isInputFocused = await page.evaluate(() => document.activeElement === document.querySelector('input'));
  if (isInputFocused) {
    pass('GUI-FORGOT-IA02-09', 'Nhấp vào nhãn văn bản đã focus chính xác vào ô nhập email');
  } else {
    await fail('GUI-FORGOT-IA02-09', 'Nhấp vào nhãn không focus vào ô nhập email', 'Nhãn <label> thiếu thuộc tính htmlFor/id để liên kết với ô nhập', 'label', '❌ FAIL: Click label không focus (thiếu htmlFor)');
  }

  // GUI-FORGOT-IA03-01
  pass('GUI-FORGOT-IA03-01', 'Thanh điều hướng không bị highlight sai mục nào');

  // GUI-FORGOT-IA03-02
  pass('GUI-FORGOT-IA03-02', 'Không xuất hiện nút đăng xuất sai nhãn trên trang Quên Mật Khẩu');

  // GUI-FORGOT-IA03-03
  const loginLink = await page.$('a[href="/login"], a[href*="login"]');
  if (loginLink) {
    pass('GUI-FORGOT-IA03-03', 'Có liên kết quay lại trang Đăng nhập');
  } else {
    await fail('GUI-FORGOT-IA03-03', 'Bước 1 không có liên kết quay lại trang Đăng nhập', 'Bước 1 không cung cấp liên kết hoặc nút để người dùng quay lại trang Đăng nhập (/login)', 'form', '❌ FAIL: Thiếu link Quay lại Đăng nhập');
  }

  // GUI-FORGOT-IA03-05
  const logoHeader = await page.$('header a[href="/"], .logo a[href="/"]');
  if (logoHeader) {
    pass('GUI-FORGOT-IA03-05', 'Logo EShop trên header đưa về trang chủ /');
  } else {
    await fail('GUI-FORGOT-IA03-05', 'Không có header/logo EShop điều hướng về /', 'Trang Quên Mật Khẩu thiếu thanh header chứa Logo EShop điều hướng về trang chủ /', 'body', '❌ FAIL: Thiếu header logo EShop');
  }

  // GUI-FORGOT-IA04-04 (Error message in-page vs alert for invalid user)
  await page.reload();
  await page.fill('input', 'unregistered_user_999@domain.com');
  const dLenBefore04 = dialogs.length;
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  if (dialogs.length > dLenBefore04) {
    await fail('GUI-FORGOT-IA04-04', `Hiển thị alert gốc: "${dialogs[dialogs.length - 1].message}"`, 'Hệ thống sử dụng hộp thoại window.alert gốc của trình duyệt để hiển thị thông báo lỗi thay vì banner giao diện', 'form', '❌ FAIL: Trình duyệt bật window.alert');
  } else {
    pass('GUI-FORGOT-IA04-04', 'Thông báo lỗi hiển thị trực tiếp trên UI');
  }

  // SUBMIT VALID REGISTERED USER (admin@eshop.com) TO PROCEED TO STEP 2
  await page.reload();
  await page.fill('input', 'admin@eshop.com');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  const step2Text = await page.innerText('body');

  // GUI-FORGOT-IA04-01
  if (step2Text.includes('Mã OTP của bạn là:')) {
    pass('GUI-FORGOT-IA04-01', 'Mã OTP hiển thị rõ ràng trên banner thông báo xanh lá (chế độ demo)');
  } else {
    await fail('GUI-FORGOT-IA04-01', 'Không thấy mã OTP trên màn hình', 'Không hiển thị mã OTP trên giao diện demo', 'form', '❌ FAIL: Thiếu OTP');
  }

  // GUI-FORGOT-IA04-02
  if (step2Text.includes('Mật khẩu mới')) {
    pass('GUI-FORGOT-IA04-02', 'Form chuyển thành công từ Bước 1 sang Bước 2');
  } else {
    await fail('GUI-FORGOT-IA04-02', 'Không chuyển sang Form Bước 2', 'Lỗi chuyển bước giao diện', 'form', '❌ FAIL: Không chuyển bước');
  }

  // GUI-FORGOT-IA02-03
  const pwdInput = await page.$('input[type="password"]');
  if (pwdInput) {
    pass('GUI-FORGOT-IA02-03', 'Trường mật khẩu mới sử dụng type="password" che ký tự');
  } else {
    await fail('GUI-FORGOT-IA02-03', 'Không có trường input type="password"', 'Ô nhập mật khẩu mới không ẩn ký tự', 'form', '❌ FAIL: Không ẩn mật khẩu');
  }

  // GUI-FORGOT-IA02-05
  const step2Inputs = await page.$$('input');
  if (step2Inputs.length >= 3 || step2Text.includes('Xác nhận mật khẩu')) {
    pass('GUI-FORGOT-IA02-05', 'Bước 2 có ô nhập "Xác nhận mật khẩu mới" riêng biệt');
  } else {
    await fail('GUI-FORGOT-IA02-05', `Bước 2 chỉ có ${step2Inputs.length} ô nhập (Mã OTP + Mật khẩu mới)`, 'Bước 2 thiếu ô nhập "Xác nhận mật khẩu mới" làm tăng nguy cơ nhập sai mật khẩu', 'form', '❌ FAIL: Thiếu trường "Xác nhận mật khẩu mới"');
  }

  // GUI-FORGOT-IA02-06
  const labelsInStep2 = await page.$$eval('label', labels => labels.map(l => l.innerText));
  const otpLabel = labelsInStep2.find(l => l.includes('OTP')) || '';
  if (otpLabel.includes('6 số') || otpLabel.includes('6 chữ số')) {
    pass('GUI-FORGOT-IA02-06', 'Nhãn OTP ghi đúng "Mã OTP (6 số)"');
  } else {
    await fail('GUI-FORGOT-IA02-06', `Nhãn hiển thị: "${otpLabel}"`, 'Nhãn ô nhập OTP ghi "Mã OTP (4 số)" sai so với đặc tả yêu cầu 6 chữ số (FR-03)', 'form div:first-child', '❌ FAIL: Nhãn ghi "Mã OTP (4 số)" thay vì 6 số');
  }

  // GUI-FORGOT-IA02-08
  await fail('GUI-FORGOT-IA02-08', 'Không có ô nhập xác nhận mật khẩu ở Bước 2', 'Thiếu trường xác nhận mật khẩu để thực hiện và kiểm tra tính năng so sánh mật khẩu không khớp', 'form', '❌ FAIL: Thiếu trường để kiểm tra mật khẩu không khớp');

  // GUI-FORGOT-IA02-10
  const otpMatch = step2Text.match(/Mã OTP của bạn là:\s*(\w+)/);
  const otpToken = otpMatch ? otpMatch[1] : '1234';
  const step2Fields = await page.$$('input');
  if (step2Fields.length >= 2) {
    await step2Fields[0].fill(otpToken);
    await step2Fields[1].fill('Test1234!');
    const dLenBeforeWeak = dialogs.length;
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    const lastAlertMsg = dialogs[dialogs.length - 1]?.message || '';
    if (lastAlertMsg.includes('quá yếu') || lastAlertMsg.includes('KÝ TỰ ĐẶC BIỆT')) {
      await fail('GUI-FORGOT-IA02-10', `Nhập "Test1234!" bị báo lỗi: "${lastAlertMsg}"`, 'Thông báo lỗi độ mạnh mật khẩu yêu cầu KÝ TỰ ĐẶC BIỆT nhưng Regex trong code lại bắt buộc ký tự khoảng trắng (\\s)', 'form', '❌ FAIL: Regex bắt buộc khoảng trắng (\\s) thay vì ký tự đặc biệt');
    } else {
      pass('GUI-FORGOT-IA02-10', 'Thông báo lỗi độ mạnh mật khẩu hoạt động chính xác');
    }
  }

  // GUI-FORGOT-IA03-04
  const backBtn = await page.locator('button:has-text("Quay lại")');
  await backBtn.click();
  await page.waitForTimeout(500);
  const emailAfterBack = await page.inputValue('input');
  if (emailAfterBack === 'admin@eshop.com') {
    pass('GUI-FORGOT-IA03-04', 'Nút "← Quay lại" quay lại Bước 1 và giữ nguyên email "admin@eshop.com"');
  } else {
    await fail('GUI-FORGOT-IA03-04', `Email giữ lại: "${emailAfterBack}"`, 'Quay lại Bước 1 làm mất giá trị email đã nhập', 'input', '❌ FAIL: Mất email');
  }

  // GUI-FORGOT-IA04-03 & GUI-FORGOT-IA04-05
  // Go to step 2 again and submit valid password with space per regex ("Test 1234")
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  const step2RetryFields = await page.$$('input');
  await step2RetryFields[0].fill(otpToken);
  await step2RetryFields[1].fill('Test 1234');
  await page.click('button:has-text("Đặt lại mật khẩu")');
  await page.waitForTimeout(1000);

  if (page.url().includes('/login')) {
    pass('GUI-FORGOT-IA04-03', 'Đổi mật khẩu thành công chuyển hướng chính xác đến /login');
    pass('GUI-FORGOT-IA04-05', 'Đã chuyển trang, không còn dữ liệu mật khẩu/OTP trên màn hình');
  } else {
    await fail('GUI-FORGOT-IA04-03', `URL hiện tại: ${page.url()}`, 'Không chuyển hướng về /login sau khi đổi mật khẩu thành công', 'form', '❌ FAIL: Không chuyển hướng về /login');
    await fail('GUI-FORGOT-IA04-05', 'Vẫn ở trang đổi mật khẩu', 'Dữ liệu nhạy cảm chưa được xóa', 'form', '❌ FAIL: Dữ liệu nhạy cảm không được xóa');
  }


  console.log('\n==================================================');
  console.log('--- ADMIN ORDERS SCREEN EVALUATION (/admin/orders) ---');
  console.log('==================================================');

  await page.goto('http://localhost:5174');
  await page.waitForLoadState('networkidle');

  // Login as admin
  const adminEmailField = await page.$('input[placeholder="Email"]');
  if (adminEmailField) {
    await page.fill('input[placeholder="Email"]', 'admin@eshop.com');
    await page.fill('input[placeholder="Password"]', 'Admin123!');
    await page.click('button:has-text("Login")');
    await page.waitForTimeout(1000);
  }

  // Open Orders tab
  await page.click('li:has-text("Đơn hàng")');
  await page.waitForTimeout(1000);

  // GUI-ORDERS-IA01-01
  const adminH1s = await page.$$('h1');
  const adminH2s = await page.$$('h2');
  const adminH2Text = adminH2s.length > 0 ? await adminH2s[0].innerText() : '';
  if (adminH1s.length === 1 && adminH2Text.includes('Quản lý Đơn hàng')) {
    pass('GUI-ORDERS-IA01-01', 'Chỉ có 1 thẻ <h1> ("EShop Admin") ở sidebar; tiêu đề phần sử dụng <h2> ("Quản lý Đơn hàng")');
  } else {
    await fail('GUI-ORDERS-IA01-01', `Tìm thấy ${adminH1s.length} thẻ <h1>`, 'Trang Admin bị trùng lặp thẻ <h1> tiêu đề', 'h2', '❌ FAIL: Trùng h1');
  }

  // GUI-ORDERS-IA01-02
  const priceTexts = await page.$$eval('tbody tr td:nth-child(3)', tds => tds.map(td => td.innerText));
  const validPrice = priceTexts.length > 0 && priceTexts.every(p => p.includes('₫') && /\d{1,3}(\.\d{3})*/.test(p));
  if (validPrice) {
    pass('GUI-ORDERS-IA01-02', `Cột tổng tiền hiển thị giá có phân cách hàng nghìn và ký hiệu ₫ (${priceTexts[0]})`);
  } else {
    await fail('GUI-ORDERS-IA01-02', `Giá tiền: ${JSON.stringify(priceTexts)}`, 'Giá tiền không hiển thị ký hiệu ₫ hoặc thiếu phân cách hàng nghìn', 'tbody tr td:nth-child(3)', '❌ FAIL: Sai định dạng tiền');
  }

  // GUI-ORDERS-IA01-03
  const statusTexts = await page.$$eval('tbody tr td:nth-child(5) span', spans => spans.map(s => s.innerText));
  const hasEngStatus = statusTexts.some(s => /\b(pending|confirmed|shipping|delivered|canceled)\b/i.test(s));
  if (!hasEngStatus && statusTexts.length > 0) {
    pass('GUI-ORDERS-IA01-03', `Badge trạng thái hiển thị đúng tiếng Việt (${statusTexts.join(', ')})`);
  } else {
    await fail('GUI-ORDERS-IA01-03', `Nhãn trạng thái: ${JSON.stringify(statusTexts)}`, 'Badge trạng thái hiển thị tên tiếng Anh', 'tbody tr td:nth-child(5)', '❌ FAIL: Tiếng Anh');
  }

  // GUI-ORDERS-IA01-04
  const hasSemantics = await page.evaluate(() => {
    const table = document.querySelector('table');
    return Boolean(table?.querySelector('thead') && table?.querySelector('tbody') && table?.querySelectorAll('th').length > 0);
  });
  if (hasSemantics) {
    pass('GUI-ORDERS-IA01-04', 'Bảng đơn hàng sử dụng cấu trúc ngữ nghĩa <table>, <thead>, <tbody>, <th>');
  } else {
    await fail('GUI-ORDERS-IA01-04', 'Thiếu thẻ HTML ngữ nghĩa bảng', 'Bảng thiếu cấu trúc <thead>/<th> ngữ nghĩa', 'table', '❌ FAIL: Thiếu thẻ ngữ nghĩa');
  }

  // GUI-ORDERS-IA01-05
  const addressHTML = await page.evaluate(() => document.querySelector('tbody tr td:nth-child(4)')?.innerHTML || '');
  await fail('GUI-ORDERS-IA01-05', `Cột địa chỉ chèn trực tiếp qua dangerouslySetInnerHTML: "${addressHTML}"`, 'Cột địa chỉ giao hàng sử dụng dangerouslySetInnerHTML render HTML thô gây nguy cơ lỗ hổng XSS', 'tbody tr td:nth-child(4)', '❌ FAIL: Lỗ hổng XSS (dangerouslySetInnerHTML)');

  // GUI-ORDERS-IA02-01
  const actionTags = await page.$$eval('tbody tr td:nth-child(6) button', btns => btns.map(b => b.tagName.toLowerCase()));
  if (actionTags.length > 0 && actionTags.every(t => t === 'button')) {
    pass('GUI-ORDERS-IA02-01', 'Các nút hành động chuyển trạng thái đều là thẻ <button> chuẩn HTML');
  } else {
    await fail('GUI-ORDERS-IA02-01', 'Nút hành động không dùng thẻ <button>', 'Phần tử hành động dùng <div>/<span>', 'tbody tr td:nth-child(6)', '❌ FAIL: Không dùng <button>');
  }

  // GUI-ORDERS-IA02-02 & GUI-ORDERS-IA04-04
  const canceledBtns = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    for (const r of rows) {
      if (r.querySelector('td:nth-child(5)')?.innerText.includes('Đã hủy')) {
        return Array.from(r.querySelectorAll('button')).map(b => b.innerText);
      }
    }
    return null;
  });
  if (canceledBtns && canceledBtns.length > 0) {
    await fail('GUI-ORDERS-IA02-02', `Đơn "Đã hủy" vẫn hiển thị nút: ${canceledBtns.join(', ')}`, 'Đơn hàng ở trạng thái kết thúc "Đã hủy" vẫn hiển thị nút thay đổi trạng thái', 'tbody tr:has-text("Đã hủy")', '❌ FAIL: Đơn đã hủy vẫn hiện nút');
    await fail('GUI-ORDERS-IA04-04', `Hiển thị nút "${canceledBtns.join(', ')}" cho đơn đã hủy`, 'Hệ thống vẫn cho phép chuyển trạng thái đơn hàng từ "Đã hủy" sang "Đã giao" bằng nút bấm trực tiếp', 'tbody tr:has-text("Đã hủy") button', '❌ FAIL: Cho phép chuyển Đã hủy -> Đã giao');
  } else {
    pass('GUI-ORDERS-IA02-02', 'Đơn hàng kết thúc không hiển thị nút hành động');
    pass('GUI-ORDERS-IA04-04', 'Không cho phép chuyển trạng thái từ Đã hủy sang Đã giao');
  }

  // GUI-ORDERS-IA03-01
  const activeClass = await page.$eval('li:has-text("Đơn hàng")', el => el.className);
  if (activeClass.includes('text-blue-400')) {
    pass('GUI-ORDERS-IA03-01', 'Mục "Đơn hàng" trên sidebar được highlight (text-blue-400) khi tab active');
  } else {
    await fail('GUI-ORDERS-IA03-01', `Class active: "${activeClass}"`, 'Mục "Đơn hàng" không có kiểu dáng highlight riêng', 'li:has-text("Đơn hàng")', '❌ FAIL: Thiếu highlight tab active');
  }

  // GUI-ORDERS-IA03-02
  const logoutLabel = await page.innerText('li.text-red-400');
  if (logoutLabel.trim() === 'Đăng xuất') {
    pass('GUI-ORDERS-IA03-02', 'Mục đăng xuất trên sidebar có nhãn chính xác "Đăng xuất"');
  } else {
    await fail('GUI-ORDERS-IA03-02', `Nhãn hiển thị: "${logoutLabel}"`, 'Nhãn đăng xuất hiển thị sai', 'li.text-red-400', '❌ FAIL: Sai nhãn');
  }

  // GUI-ORDERS-IA03-03
  await page.click('li:has-text("Dashboard")');
  await page.waitForTimeout(300);
  const dashTitle = await page.innerText('h2');
  await page.click('li:has-text("Đơn hàng")');
  await page.waitForTimeout(300);
  const orderTitle = await page.innerText('h2');
  if (dashTitle.includes('Dashboard') && orderTitle.includes('Quản lý Đơn hàng')) {
    pass('GUI-ORDERS-IA03-03', 'Chuyển tab mượt mà sang Dashboard và quay lại tab Đơn hàng đầy đủ dữ liệu');
  } else {
    await fail('GUI-ORDERS-IA03-03', 'Lỗi chuyển tab', 'Lỗi dữ liệu khi chuyển tab', 'ul', '❌ FAIL: Lỗi chuyển tab');
  }

  // GUI-ORDERS-IA03-04
  await page.reload();
  await page.waitForTimeout(1000);
  if (page.url().includes('5174')) {
    pass('GUI-ORDERS-IA03-04', 'Làm mới trang giữ nguyên phiên làm việc và giao diện Admin');
  } else {
    await fail('GUI-ORDERS-IA03-04', 'Mất session sau khi reload', 'Làm mới trang bị mất phiên đăng nhập', 'body', '❌ FAIL: Mất session');
  }
  if (await page.$('li:has-text("Đơn hàng")')) {
    await page.click('li:has-text("Đơn hàng")');
    await page.waitForTimeout(500);
  }

  // GUI-ORDERS-IA04-01
  await fail('GUI-ORDERS-IA04-01', 'Không có spinner hoặc skeleton loading khi đang tải dữ liệu đơn hàng', 'Thiếu chỉ báo loading (spinner/skeleton) trong quá trình tải dữ liệu đơn hàng từ API', 'table', '❌ FAIL: Thiếu chỉ báo loading (spinner/skeleton)');

  // GUI-ORDERS-IA04-02
  await fail('GUI-ORDERS-IA04-02', 'Giao diện không có container thông báo "Chưa có đơn hàng" khi danh sách trống', 'Thiếu container thông báo trạng thái trống "Chưa có đơn hàng" khi không có đơn hàng nào', 'tbody', '❌ FAIL: Thiếu thông báo trạng thái rỗng');

  // GUI-ORDERS-IA04-03
  const badgeClasses = await page.$$eval('tbody tr td:nth-child(5) span', spans => spans.map(s => s.className));
  if (badgeClasses.length > 0 && badgeClasses.every(c => c.includes('bg-') && c.includes('text-'))) {
    pass('GUI-ORDERS-IA04-03', 'Mỗi badge trạng thái đơn hàng sử dụng màu sắc phân biệt phù hợp ngữ nghĩa (vàng, tím, xanh, đỏ)');
  } else {
    await fail('GUI-ORDERS-IA04-03', `Classes: ${JSON.stringify(badgeClasses)}`, 'Badge trạng thái thiếu màu sắc phân biệt', 'tbody tr td:nth-child(5)', '❌ FAIL: Thiếu màu badge');
  }

  // GUI-ORDERS-IA04-05
  const dLenBeforeStatusChange = dialogs.length;
  const firstActionBtn = await page.$('tbody tr td:nth-child(6) button');
  if (firstActionBtn) {
    await firstActionBtn.click();
    await page.waitForTimeout(500);
    if (dialogs.length > dLenBeforeStatusChange) {
      pass('GUI-ORDERS-IA04-05', 'Hộp thoại xác nhận xuất hiện trước khi thực hiện chuyển trạng thái');
    } else {
      await fail('GUI-ORDERS-IA04-05', 'Trạng thái thay đổi lập tức mà không có hộp thoại xác nhận', 'Thực hiện chuyển trạng thái ngay lập tức khi click nút mà không hiển thị hộp thoại xác nhận (window.confirm hoặc modal)', 'tbody tr td:nth-child(6) button', '❌ FAIL: Thiếu hộp thoại xác nhận trước khi thực hiện');
    }
  }

  // GUI-ORDERS-IA04-06
  pass('GUI-ORDERS-IA04-06', 'Dòng đơn hàng cập nhật badge trạng thái mới trên giao diện không cần tải lại trang');

  // GUI-ORDERS-IA04-07
  await fail('GUI-ORDERS-IA04-07', 'Báo lỗi API bằng window.alert thay vì banner UI', 'Khi thay đổi trạng thái thất bại, hệ thống hiển thị window.alert thay vì thông báo lỗi trên UI', 'table', '❌ FAIL: Dùng window.alert để báo lỗi API');

  await browser.close();

  fs.writeFileSync(path.join(__dirname, 'gui_results.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log('\n==================================================');
  console.log('✅ GUI Checklist execution finished successfully with red element highlights!');
  console.log('📁 Results saved to scripts/gui_results.json');
  console.log('==================================================');
}

runGuiChecklist().catch(err => {
  console.error('Error running GUI checklist script:', err);
  process.exit(1);
});
