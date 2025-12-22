// Mock users và admins
export const MOCK_USERS = [
  {
    id: "1",
    username: "user1",
    password: "user123",
    name: "Nguyễn Văn A",
    email: "user1@mixiride.com",
    role: "user",
  },
  {
    id: "2",
    username: "user2",
    password: "user123",
    name: "Trần Thị B",
    email: "user2@mixiride.com",
    role: "user",
  },
  {
    id: "3",
    username: "admin",
    password: "admin123",
    name: "Admin MixiRide",
    email: "admin@mixiride.com",
    role: "admin",
  },
  {
    id: "4",
    username: "admin2",
    password: "admin123",
    name: "Quản trị viên",
    email: "admin2@mixiride.com",
    role: "admin",
  },
];

// Hàm xác thực đăng nhập
export const authenticateUser = (username, password) => {
  // Tìm trong MOCK_USERS trước
  const mockUser = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (mockUser) return mockUser;

  // Tìm trong registered users
  const registeredUsers = getRegisteredUsers();
  const registeredUser = registeredUsers.find(
    (u) => u.username === username && u.password === password
  );

  return registeredUser || null;
};

// Hàm tìm user theo username
export const findUserByUsername = (username) => {
  // Tìm trong MOCK_USERS và localStorage
  const mockUser = MOCK_USERS.find((u) => u.username === username);
  if (mockUser) return mockUser;

  // Tìm trong localStorage
  const registeredUsers = getRegisteredUsers();
  return registeredUsers.find((u) => u.username === username);
};

// Hàm lấy danh sách users đã đăng ký từ localStorage
export const getRegisteredUsers = () => {
  const stored = localStorage.getItem("registeredUsers");
  return stored ? JSON.parse(stored) : [];
};

// Hàm lưu user mới vào localStorage
export const saveRegisteredUser = (user) => {
  const registeredUsers = getRegisteredUsers();
  registeredUsers.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
};

// Hàm kiểm tra username đã tồn tại chưa
export const isUsernameTaken = (username) => {
  return !!findUserByUsername(username);
};

// Hàm kiểm tra email đã tồn tại chưa
export const isEmailTaken = (email) => {
  const allUsers = [...MOCK_USERS, ...getRegisteredUsers()];
  return allUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

// Hàm đăng ký user mới
export const registerUser = (userData) => {
  // Validate
  if (isUsernameTaken(userData.username)) {
    return { success: false, error: "Tên đăng nhập đã tồn tại" };
  }

  if (isEmailTaken(userData.email)) {
    return { success: false, error: "Email đã được sử dụng" };
  }

  if (userData.password.length < 6) {
    return { success: false, error: "Mật khẩu phải có ít nhất 6 ký tự" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return { success: false, error: "Email không hợp lệ" };
  }

  // Tạo user mới
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    password: userData.password,
    name: userData.name,
    email: userData.email,
    role: "user", // Chỉ cho phép đăng ký với role user
  };

  // Lưu vào localStorage
  saveRegisteredUser(newUser);

  return { success: true };
};

// Hàm lấy tất cả users (bao gồm cả registered)
export const getAllUsers = () => {
  return [...MOCK_USERS, ...getRegisteredUsers()];
};
