# clasp — Google Apps Script CLI

## Tổng quan

**clasp** (Command Line Apps Script Projects) là CLI tool chính thức của Google để phát triển **Google Apps Script** (GAS) từ máy local thay vì phải dùng trình editor online trên trình duyệt.

> **Google Apps Script** là nền tảng scripting của Google dùng để tự động hoá và mở rộng các sản phẩm Google như Sheets, Docs, Gmail, Calendar, Drive...

---

## Cài đặt

```bash
npm install -g @google/clasp
```

---

## Các lệnh chính

| Lệnh | Mô tả |
|------|-------|
| `clasp login` | Xác thực Google account |
| `clasp create` | Tạo project Apps Script mới |
| `clasp clone <scriptId>` | Kéo script có sẵn từ Google về local |
| `clasp push` | Đẩy code local lên Apps Script |
| `clasp pull` | Kéo code từ Apps Script về local |
| `clasp deploy` | Deploy script thành web app hoặc add-on |
| `clasp run` | Chạy function từ terminal *(cần setup GCP)* |

---

## Workflow điển hình

```bash
# 1. Đăng nhập
clasp login

# 2. Clone script có sẵn hoặc tạo mới
clasp clone <scriptId>
# hoặc
clasp create --title "My Script" --type sheets

# 3. Code bằng VSCode, hỗ trợ TypeScript...

# 4. Sync lên Google
clasp push

# 5. Deploy nếu cần
clasp deploy --description "v1.0"
```

---

## Điểm mạnh

- ✅ Hỗ trợ **TypeScript** (tự động transpile)
- ✅ Tích hợp **git** — quản lý version bình thường
- ✅ Dùng được với **CI/CD pipeline**
- ✅ Thay thế hoàn toàn trình editor online của Google
- ✅ Làm việc với editor quen thuộc (VSCode, JetBrains...)

---

## Tài nguyên

- [clasp trên GitHub](https://github.com/google/clasp)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
