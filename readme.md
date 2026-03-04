# Study Hub - Productivity Web Application
*Vietnamese: Ứng Dụng Web Hỗ Trợ Học Tập*

## 1. Project Overview / Tổng quan dự án

**[EN]**
Study Hub is a comprehensive, frontend-only web application designed to enhance personal productivity and focus. Built entirely with Vanilla JavaScript, HTML5, and CSS3, the project avoids heavy frameworks while still maintaining a modern, scalable, and maintainable codebase through ES6 Modules and a Feature-Based architecture. It provides users with essential study tools in a single, unified interface.

**[VN]**
Study Hub là một ứng dụng web thuần giao diện (frontend) toàn diện được thiết kế để nâng cao năng suất và sự tập trung cá nhân. Được xây dựng hoàn toàn bằng Vanilla JavaScript, HTML5 và CSS3, dự án không sử dụng các framework nặng nề nhưng vẫn duy trì một mã nguồn hiện đại, dễ mở rộng và bảo trì thông qua ES6 Modules và kiến trúc Feature-Based (chia theo tính năng). Ứng dụng cung cấp cho người dùng các công cụ học tập thiết yếu trong một giao diện duy nhất.

---

## 2. Key Features / Các tính năng chính

**[EN]**
* **Authentication:** Mock user registration and login system utilizing the browser's LocalStorage for session persistence.
* **Pomodoro Timer:** Customizable work, short break, and long break intervals with automatic session tracking.
* **Task Management (To-do List):** Add, complete, and delete tasks. Data is preserved across sessions using LocalStorage.
* **Time Management Tools:** Includes a real-time digital clock, a stopwatch, and a custom countdown timer.
* **Embedded Music Player:** Ability to save favorite YouTube or Spotify links and play them directly within the application via embedded iframes.
* **Single Page Application (SPA) Routing:** Smooth navigation between different tools without page reloads.

**[VN]**
* **Xác thực người dùng:** Hệ thống mô phỏng đăng nhập và đăng ký sử dụng LocalStorage của trình duyệt để duy trì phiên hoạt động.
* **Đồng hồ Pomodoro:** Cho phép tùy chỉnh thời gian làm việc, nghỉ ngắn, nghỉ dài và tự động theo dõi chu kỳ.
* **Quản lý công việc (To-do List):** Thêm, hoàn thành và xóa công việc. Dữ liệu được lưu trữ thông qua LocalStorage.
* **Công cụ quản lý thời gian:** Bao gồm đồng hồ kỹ thuật số thời gian thực, đồng hồ bấm giờ và đồng hồ đếm ngược tùy chỉnh.
* **Trình phát nhạc nhúng:** Khả năng lưu các liên kết YouTube hoặc Spotify yêu thích và phát trực tiếp ngay trong ứng dụng qua iframe.
* **Điều hướng trang đơn (SPA):** Chuyển đổi mượt mà giữa các công cụ khác nhau mà không cần tải lại trang.

---

## 3. Technology Stack / Công nghệ sử dụng

**[EN]**
* **HTML5:** Semantic markup.
* **CSS3:** CSS Variables (Design Tokens), Flexbox/Grid layouts, and modular stylesheets (Base, Components, Responsive).
* **JavaScript (ES6+):** Vanilla JS leveraging ES6 Modules (`import`/`export`) for code splitting and Separation of Concerns.
* **Icons & Typography:** Phosphor Icons and Google Fonts (Inter).

**[VN]**
* **HTML5:** Đánh dấu ngữ nghĩa.
* **CSS3:** Biến CSS (Design Tokens), bố cục Flexbox/Grid và các tệp định dạng theo module (Cơ sở, Thành phần, Đáp ứng di động).
* **JavaScript (ES6+):** Vanilla JS tận dụng ES6 Modules (`import`/`export`) để chia nhỏ mã nguồn và phân tách ranh giới logic (Separation of Concerns).
* **Biểu tượng & Kiểu chữ:** Thư viện Phosphor Icons và Google Fonts (Inter).

---

## 4. Project Structure / Cấu trúc thư mục

**[EN]** The project follows a modular, feature-based structure for Clean Code maintenance:
**[VN]** Dự án tuân theo cấu trúc module theo tính năng để bảo trì chuẩn Clean Code:

```text
/study-hub
│
├── index.html                 // Entry point / Điểm truy cập HTML
├── README.md                  // Project documentation / Tài liệu dự án
│
├── /css                       // Modular stylesheets / Tệp định dạng CSS
│   ├── style.css              // Global variables and layout / Biến toàn cục và bố cục
│   ├── components.css         // Reusable UI components / Thành phần giao diện tái sử dụng
│   └── responsive.css         // Media queries / Truy vấn đáp ứng thiết bị
│
└── /js                        // ES6 JavaScript Modules / Logic JavaScript
    ├── main.js                // Main JS entry point / Tệp khởi tạo chính
    ├── /utils                 // Helper functions / Các hàm tiện ích
    │   ├── formatters.js      // Time formatting / Định dạng thời gian
    │   └── storage.js         // LocalStorage wrapper / Trình xử lý LocalStorage
    └── /modules               // Feature logic / Logic theo từng tính năng
        ├── auth.js            // Authentication logic / Logic xác thực
        ├── music.js           // Music player logic / Logic phát nhạc
        ├── pomodoro.js        // Pomodoro logic / Logic Pomodoro
        ├── stopwatch.js       // Stopwatch logic / Logic bấm giờ
        ├── timer.js           // Timer logic / Logic đếm ngược
        └── todo.js            // Task management logic / Logic quản lý công việc
