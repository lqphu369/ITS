# Hướng dẫn chạy MixiRide trên Android Studio Emulator

## 📱 Các bước thực hiện

### Bước 1: Khởi động Development Server

```powershell
cd d:\ITS
npm run dev
```

Server sẽ chạy trên port 3000, 3001, hoặc 3002 (tùy port nào available)

### Bước 2: Lấy địa chỉ IP của máy tính

Mở PowerShell và chạy lệnh:

```powershell
ipconfig
```

Tìm dòng **IPv4 Address** trong phần **Wireless LAN adapter Wi-Fi** hoặc **Ethernet adapter**

Ví dụ: `192.168.1.100`

### Bước 3: Khởi động Android Studio Emulator

1. Mở **Android Studio**
2. Vào **Tools** → **Device Manager** (hoặc **AVD Manager**)
3. Chọn một emulator và click **▶ Play**
4. Đợi emulator khởi động hoàn toàn

### Bước 4: Truy cập ứng dụng từ Emulator

#### Cách 1: Sử dụng IP của máy host

Mở **Chrome** trong Android emulator và truy cập:

```
http://[YOUR_IP]:3002
```

Ví dụ: `http://192.168.1.100:3002`

#### Cách 2: Sử dụng IP đặc biệt của Android Emulator

Android Emulator có IP đặc biệt để truy cập máy host:

```
http://10.0.2.2:3002
```

### Bước 5: Test các tính năng

#### ✅ Tính năng cần test:

- [x] Đăng nhập/Đăng ký
- [x] Danh sách xe với bộ lọc
- [x] Xem chi tiết xe
- [x] Đặt xe với calendar picker
- [x] **Tính năng ITS: "Xe gần tôi"**
- [x] Xem bản đồ với marker
- [x] Profile và upload giấy tờ
- [x] Theo dõi đơn hàng
- [x] Chat với chủ xe

#### 📍 Lưu ý về GPS/Location:

Android Emulator có thể giả lập vị trí GPS:

1. Click vào **⋮** (More) trên thanh công cụ emulator
2. Chọn **Location**
3. Nhập tọa độ hoặc tìm kiếm địa điểm
4. Click **Save point** và **Set location**

**Tọa độ gợi ý (TP.HCM):**

- Latitude: `10.7769`
- Longitude: `106.7009`

## 🛠️ Troubleshooting

### Lỗi: Không thể kết nối

**Giải pháp 1:** Kiểm tra Firewall

```powershell
# Tạm thời tắt firewall hoặc thêm rule cho port 3002
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 3002 -Protocol TCP -Action Allow
```

**Giải pháp 2:** Sử dụng IP 10.0.2.2

```
http://10.0.2.2:3002
```

**Giải pháp 3:** Kiểm tra cả máy tính và emulator cùng mạng

- Đảm bảo không dùng VPN
- Kiểm tra cấu hình mạng

### Lỗi: GPS không hoạt động

1. Mở **Settings** trong Android
2. Vào **Location** → Bật **Use location**
3. Cho phép quyền location cho Chrome/Browser
4. Giả lập vị trí GPS từ emulator controls

### Lỗi: Trang tải chậm

- Khởi động lại emulator
- Tăng RAM cho emulator (Settings → Memory and Storage)
- Sử dụng emulator với Google APIs (không phải Google Play)

## 📊 Performance Tips

### Tối ưu Emulator:

1. **Cấu hình AVD:**

   - RAM: Tối thiểu 2GB, khuyến nghị 4GB
   - Internal Storage: 2GB
   - Graphics: Hardware - GLES 2.0
   - Boot option: Cold Boot

2. **Enable Hardware Acceleration:**

   - Windows: Intel HAXM hoặc WHPX (Hyper-V)
   - Kiểm tra trong Tools → SDK Manager → SDK Tools

3. **Chọn API Level phù hợp:**
   - Khuyến nghị: API 30 (Android 11) hoặc API 33 (Android 13)

## 🎥 Recording Demo

Để quay video demo:

1. Click **⋮** trên thanh công cụ emulator
2. Chọn **Record and Playback**
3. Click **Start Recording**
4. Test các tính năng
5. Click **Stop Recording**
6. Save video

## 📸 Screenshots

Để chụp màn hình:

- Phím tắt: **Ctrl + S**
- Hoặc click icon 📷 camera trên thanh công cụ emulator

## 🚀 Quick Start Commands

```powershell
# Terminal 1: Start dev server
cd d:\ITS
npm run dev

# Terminal 2: Get IP address
ipconfig | findstr IPv4

# Sau đó mở emulator và truy cập:
# http://[YOUR_IP]:3002
# hoặc
# http://10.0.2.2:3002
```

## 🌐 Testing on Real Android Device

Nếu muốn test trên thiết bị Android thật:

1. **Kết nối thiết bị qua USB:**

   - Enable Developer Options trên điện thoại
   - Enable USB Debugging
   - Kết nối với máy tính

2. **Đảm bảo cùng WiFi:**

   - Điện thoại và máy tính cùng mạng WiFi
   - Truy cập `http://[YOUR_IP]:3002` từ Chrome trên điện thoại

3. **Sử dụng ADB Reverse (nếu cùng USB):**
   ```powershell
   adb reverse tcp:3002 tcp:3002
   ```
   Sau đó truy cập `http://localhost:3002` từ điện thoại

---

**Happy Testing! 🎉**
