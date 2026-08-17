import asyncio
from playwright.async_api import async_playwright
import os

HTML_CONTENT = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0"></script>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: transparent;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chart-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    border: 1px solid #e2e8f0;
    padding: 24px;
    width: 820px;
    box-sizing: border-box;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
    text-align: center;
  }
  .subtitle {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 20px;
    text-align: center;
  }
</style>
</head>
<body>

<!-- Chart 0: Testing Scope Pie Chart -->
<div id="chart-scope" class="chart-card" style="width: 820px;">
  <div class="title">Phân Bổ Phạm Vi & Khối Lượng Kiểm Thử Nhóm 03 (HW02 → HW05)</div>
  <div class="subtitle">Hợp nhất 5 thành viên: 382 TCs Domain, 357 GUI/Usability, 229 Automation TCs, 22 Performance Scenarios</div>
  <div style="height: 360px; display: flex; justify-content: center;">
    <canvas id="canvas-scope"></canvas>
  </div>
</div>

<!-- Chart 1: Test Execution Grouped Bar Chart -->
<div id="chart-execution" class="chart-card" style="display:none;">
  <div class="title">Báo Cáo Thực Thi & Tỷ Lệ Đạt Test Cases (Planned vs Executed vs Passed vs Failed)</div>
  <div class="subtitle">Hợp nhất toàn bộ 5 thành viên Nhóm 03 qua 4 giai đoạn HW02 → HW05</div>
  <div style="height: 380px;">
    <canvas id="canvas-execution"></canvas>
  </div>
</div>

<!-- Chart 2: Module Defect Breakdown Bar Chart -->
<div id="chart-module" class="chart-card" style="display:none;">
  <div class="title">Phân Bổ Lỗi Theo Phân Hệ Chức Năng (Defects by Module)</div>
  <div class="subtitle">Tổng số 254 lượt ghi nhận lỗi (180+ lỗi duy nhất) trên EShop SUT</div>
  <div style="height: 380px;">
    <canvas id="canvas-module"></canvas>
  </div>
</div>

<!-- Chart 3: Defect Severity & Priority Donut Chart -->
<div id="chart-severity" class="chart-card" style="display:none; width: 780px;">
  <div class="title">Phân Loại Lỗi Theo Mức Độ Nghiêm Trọng (Defect Severity Breakdown)</div>
  <div class="subtitle">Phân bổ theo chuẩn ISTQB / IEEE: Critical (P0) · Major (P1) · Minor (P2) · Trivial (P3)</div>
  <div style="height: 360px; display: flex; justify-content: center;">
    <canvas id="canvas-severity"></canvas>
  </div>
</div>

<script>
Chart.register(ChartDataLabels);

// Chart 0: Testing Scope
new Chart(document.getElementById('canvas-scope'), {
  type: 'pie',
  data: {
    labels: [
      'HW02: Domain & BVA (382 TCs)',
      'HW03: GUI & Usability (322 Items + 35 Sessions)',
      'HW04: Automation DDT (229 TCs / 726 Runs)',
      'HW05: Performance Testing (22 Scenarios / 600k+ Reqs)'
    ],
    datasets: [{
      data: [382, 357, 229, 22],
      backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#3b82f6'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { font: { size: 12, weight: '600' }, boxWidth: 16 } },
      datalabels: {
        color: '#ffffff',
        font: { weight: 'bold', size: 13 },
        formatter: (value, ctx) => {
          let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
          let percentage = (value * 100 / sum).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  }
});

// Chart 1: Execution Status
new Chart(document.getElementById('canvas-execution'), {
  type: 'bar',
  data: {
    labels: ['HW02: Domain & BVA', 'HW03: GUI & Usability', 'HW04: Automation DDT', 'HW05: Performance SLA'],
    datasets: [
      { label: 'Kế hoạch (Planned)', data: [382, 357, 726, 22], backgroundColor: '#3b82f6' },
      { label: 'Đã chạy (Executed)', data: [382, 357, 726, 22], backgroundColor: '#8b5cf6' },
      { label: 'Đạt (Passed)', data: [239, 208, 378, 18], backgroundColor: '#10b981' },
      { label: 'Lỗi biên / Fail', data: [143, 149, 348, 4], backgroundColor: '#ef4444' }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12, weight: '600' } } },
      datalabels: { display: false }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  }
});

// Chart 2: Module Defect
new Chart(document.getElementById('canvas-module'), {
  type: 'bar',
  data: {
    labels: [
      'Thanh toán, Giỏ hàng & Coupon',
      'Xác thực, Đăng ký & Quên MK',
      'Quản lý Đơn hàng & Vòng đời',
      'Danh mục & Sản phẩm CSV',
      'Quản trị Người dùng Admin',
      'Hạ tầng & Hiệu năng CSDL'
    ],
    datasets: [{
      label: 'Số lỗi phát hiện',
      data: [71, 56, 41, 36, 33, 17],
      backgroundColor: [
        '#ef4444',
        '#f97316',
        '#f59e0b',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899'
      ],
      borderRadius: 6
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'right',
        color: '#1e293b',
        font: { weight: 'bold', size: 12 },
        formatter: (val) => val + ' lỗi'
      }
    },
    scales: {
      x: { beginAtZero: true, max: 80, grid: { color: '#f1f5f9' } },
      y: { grid: { display: false } }
    }
  }
});

// Chart 3: Defect Severity
new Chart(document.getElementById('canvas-severity'), {
  type: 'doughnut',
  data: {
    labels: [
      'Critical / Blocker (P0) - 40 lỗi',
      'Major (P1) - 116 lỗi',
      'Minor (P2) - 70 lỗi',
      'Trivial (P3) - 28 lỗi'
    ],
    datasets: [{
      data: [40, 116, 70, 28],
      backgroundColor: ['#dc2626', '#ea580c', '#3b82f6', '#94a3b8'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { font: { size: 13, weight: '600' }, boxWidth: 16 } },
      datalabels: {
        color: '#ffffff',
        font: { weight: 'bold', size: 13 },
        formatter: (value, ctx) => {
          let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
          let percentage = (value * 100 / sum).toFixed(1) + "%";
          return percentage;
        }
      }
    },
    cutout: '55%'
  }
});
</script>
</body>
</html>
"""

async def generate_charts():
    output_dir = "Test_Summary_Report/images"
    os.makedirs(output_dir, exist_ok=True)
    temp_html = "Test_Summary_Report/images/temp_charts.html"
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1200, "height": 900})
        await page.goto(f"file:///{os.path.abspath(temp_html)}")
        await page.wait_for_timeout(1000)

        # Screenshot Chart 0: Scope Breakdown (Pie Chart with % labels)
        card0 = page.locator("#chart-scope")
        await card0.screenshot(path=f"{output_dir}/01_testing_scope_breakdown.png")
        print("Generated 01_testing_scope_breakdown.png with % datalabels")

        # Screenshot Chart 1: Execution Status (Bar Chart)
        await page.evaluate("""() => {
            document.getElementById('chart-scope').style.display = 'none';
            document.getElementById('chart-execution').style.display = 'block';
        }""")
        await page.wait_for_timeout(500)
        card1 = page.locator("#chart-execution")
        await card1.screenshot(path=f"{output_dir}/02_test_execution_status.png")
        print("Generated 02_test_execution_status.png")

        # Screenshot Chart 2: Module Defect
        await page.evaluate("""() => {
            document.getElementById('chart-execution').style.display = 'none';
            document.getElementById('chart-module').style.display = 'block';
        }""")
        await page.wait_for_timeout(500)
        card2 = page.locator("#chart-module")
        await card2.screenshot(path=f"{output_dir}/03_module_defect_distribution.png")
        print("Generated 03_module_defect_distribution.png")

        # Screenshot Chart 3: Severity Donut with % labels
        await page.evaluate("""() => {
            document.getElementById('chart-module').style.display = 'none';
            document.getElementById('chart-severity').style.display = 'block';
        }""")
        await page.wait_for_timeout(500)
        card3 = page.locator("#chart-severity")
        await card3.screenshot(path=f"{output_dir}/04_defect_severity_breakdown.png")
        print("Generated 04_defect_severity_breakdown.png with % datalabels")

        await browser.close()

    if os.path.exists(temp_html):
        os.remove(temp_html)

if __name__ == "__main__":
    asyncio.run(generate_charts())
