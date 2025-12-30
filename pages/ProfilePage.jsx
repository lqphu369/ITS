import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
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
  const { t } = useLanguage();
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
    alert(t("profile.updateSuccess"));
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
      alert(`${file.name} ${t("profile.uploadSuccess")}`);
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("profile.loginRequired")}
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {t("profile.loginNow")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("profile.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t("profile.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Documents */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
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
                    className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg"
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      documents.idCard.verified &&
                      documents.driverLicense.verified
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                    }`}
                  >
                    {documents.idCard.verified &&
                    documents.driverLicense.verified ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {t("profile.verified")}
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {t("profile.notVerified")}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {t("profile.verificationStatus")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t("profile.idCard")}
                  </span>
                  {documents.idCard.uploaded ? (
                    documents.idCard.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    )
                  ) : (
                    <X className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t("profile.driverLicense")}
                  </span>
                  {documents.driverLicense.uploaded ? (
                    documents.driverLicense.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    )
                  ) : (
                    <X className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Information & Documents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                  {t("profile.personalInfo")}
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    {t("profile.edit")}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 font-medium"
                    >
                      <X className="w-4 h-4" />
                      {t("profile.cancel")}
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                    >
                      <Save className="w-4 h-4" />
                      {t("profile.save")}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t("profile.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-600 dark:disabled:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-600 dark:disabled:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    {t("profile.phone")}
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
                    {t("profile.dateOfBirth")}
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
                    {t("profile.address")}
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
                {t("profile.documents")}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {t("profile.documentsDesc")}
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
                        {t("profile.idCard")}
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
                                  ? t("profile.verifiedDoc")
                                  : t("profile.pendingVerification")}
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
                            {t("profile.uploadIdCard")}
                          </p>
                          <label
                            htmlFor="id-card-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            {t("profile.chooseFile")}
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
                        {t("profile.driverLicense")}
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
                                  ? t("profile.verifiedDoc")
                                  : t("profile.pendingVerification")}
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
                            {t("profile.uploadDriverLicense")}
                          </p>
                          <label
                            htmlFor="driver-license-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            {t("profile.chooseFile")}
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
                    <p className="font-semibold mb-1">
                      {t("profile.noteTitle")}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>{t("profile.note1")}</li>
                      <li>{t("profile.note2")}</li>
                      <li>{t("profile.note3")}</li>
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
