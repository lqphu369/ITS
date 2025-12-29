import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Upload,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  Shield,
  Edit2,
  Save,
  X,
} from "lucide-react";

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+84 901 234 567",
    address: user?.address || "123 Nguyen Hue, Q.1, HCMC",
    dateOfBirth: user?.dateOfBirth || "1990-01-01",
  });

  const [documents, setDocuments] = useState({
    idCard: {
      uploaded: false,
      fileName: null,
      fileUrl: null,
      verified: false,
    },
    driverLicense: {
      uploaded: false,
      fileName: null,
      fileUrl: null,
      verified: false,
    },
    avatar: {
      uploaded: false,
      fileName: null,
      fileUrl: null,
    },
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    // In real app, this would call an API
    setIsEditing(false);
    alert("Thông tin đã được cập nhật!");
  };

  const handleFileUpload = (docType, event) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, this would upload to server
      const fileUrl = URL.createObjectURL(file);
      setDocuments({
        ...documents,
        [docType]: {
          uploaded: true,
          fileName: file.name,
          fileUrl: fileUrl,
          verified: docType !== "avatar" ? false : undefined,
        },
      });
      alert(`${file.name} đã được upload thành công!`);
    }
  };

  const handleRemoveFile = (docType) => {
    setDocuments({
      ...documents,
      [docType]: {
        uploaded: false,
        fileName: null,
        fileUrl: null,
        verified: false,
      },
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vui lòng đăng nhập
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Đăng nhập ngay →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin và giấy tờ xác minh của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Documents */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {documents.avatar.uploaded ? (
                      <img
                        src={documents.avatar.fileUrl}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("avatar", e)}
                    />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      documents.idCard.verified &&
                      documents.driverLicense.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {documents.idCard.verified &&
                    documents.driverLicense.verified ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Đã xác minh
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Chưa xác minh
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Trạng thái xác minh
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CCCD/CMND</span>
                  {documents.idCard.uploaded ? (
                    documents.idCard.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bằng lái xe</span>
                  {documents.driverLicense.uploaded ? (
                    documents.driverLicense.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Information & Documents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-900">
                  Thông tin cá nhân
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <X className="w-4 h-4" />
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Lưu
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Documents Upload */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                Giấy tờ xác minh
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Upload CCCD/CMND và Bằng lái xe để xác minh tài khoản và được
                thuê xe
              </p>

              <div className="space-y-6">
                {/* ID Card */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        CCCD/CMND
                      </h4>
                      {documents.idCard.uploaded ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {documents.idCard.fileName}
                              </p>
                              <span
                                className={`text-xs ${
                                  documents.idCard.verified
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {documents.idCard.verified
                                  ? "✓ Đã xác minh"
                                  : "⏳ Đang chờ xác minh"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFile("idCard")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          {documents.idCard.fileUrl && (
                            <img
                              src={documents.idCard.fileUrl}
                              alt="ID Card"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 mb-3">
                            Upload ảnh 2 mặt CCCD/CMND
                          </p>
                          <label
                            htmlFor="id-card-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            Chọn file
                            <input
                              id="id-card-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload("idCard", e)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Driver License */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Bằng lái xe
                      </h4>
                      {documents.driverLicense.uploaded ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {documents.driverLicense.fileName}
                              </p>
                              <span
                                className={`text-xs ${
                                  documents.driverLicense.verified
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {documents.driverLicense.verified
                                  ? "✓ Đã xác minh"
                                  : "⏳ Đang chờ xác minh"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFile("driverLicense")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          {documents.driverLicense.fileUrl && (
                            <img
                              src={documents.driverLicense.fileUrl}
                              alt="Driver License"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 mb-3">
                            Upload ảnh 2 mặt Bằng lái xe (A1/A2)
                          </p>
                          <label
                            htmlFor="driver-license-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            Chọn file
                            <input
                              id="driver-license-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload("driverLicense", e)
                              }
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Lưu ý:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Ảnh rõ ràng, không bị mờ hoặc che khuất</li>
                      <li>Định dạng: JPG, PNG, PDF (tối đa 5MB)</li>
                      <li>Thời gian xác minh: 24-48 giờ làm việc</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
