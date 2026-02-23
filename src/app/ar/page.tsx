"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HomeAr() {
  const [selectedModel, setSelectedModel] = useState("اختر الطراز");
  const [showDropdown, setShowDropdown] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus("error");
      setErrorMessage("يرجى تعبئة جميع الحقول");
      return;
    }

    if (selectedModel === "اختر الطراز") {
      setSubmitStatus("error");
      setErrorMessage("يرجى اختيار الطراز");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل في إرسال النموذج");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "" });
      setSelectedModel("اختر الطراز");

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "فشل في إرسال النموذج. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        (desktopDropdownRef.current && desktopDropdownRef.current.contains(target)) ||
        (mobileDropdownRef.current && mobileDropdownRef.current.contains(target))
      ) {
        return;
      }

      setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div dir="rtl" className="relative w-full min-h-screen bg-white">
      {/* Desktop layout (Arabic) */}
      <div
        className="hidden md:block relative w-full min-h-screen overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          margin: 0,
          padding: 0,
          width: "100vw",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "100vh",
            margin: 0,
            padding: 0,
            width: "100%",
            overflowY: "hidden",
          }}
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <Image
              src="/mhero-hero.svg"
              alt="Mhero SUV"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Radial Gradient Overlay */}
          <div
            className="absolute z-10 w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              left: "0",
              top: "0",
              background:
                "radial-gradient(47.36% 47.36% at 50% 55.18%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.488175) 72.63%, rgba(0, 0, 0, 0.64) 100%)",
            }}
          />

          {/* Language Selector Button (back to English) - same alignment as EN version */}
          <Link
            href="/"
            dir="ltr"
            className="absolute z-20 flex items-center justify-center cursor-pointer"
            style={{
              width: "117px",
              height: "40px",
              right: "10%",
              top: "5%",
              padding: "6px 18px",
              gap: "5px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "0.8px solid #ECECEC",
              borderRadius: "30px",
            }}
          >
            <div className="flex items-center gap-1">
              <Image
                src="/globe.svg"
                alt="Globe"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span
                className="text-sm font-normal text-[#F4F4F4]"
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  letterSpacing: "-0.449219px",
                }}
              >
                English
              </span>
            </div>
          </Link>

          {/* Main Content */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              width: "625px",
              height: "178.46px",
              top: "9%",
              gap: "7px",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: "44px", height: "51.46px" }}
            >
              <Image
                src="/logo.svg"
                alt="Mhero Logo"
                width={44}
                height={52}
                className="h-full w-full"
              />
            </div>

            <div
              className="flex flex-col items-center"
              style={{ width: "625px", height: "120px", gap: "12px" }}
            >
              <h1
                className="font-normal text-white whitespace-nowrap"
                style={{
                  fontFamily: "Inter",
                  fontSize: "46px",
                  lineHeight: "60px",
                  textAlign: "center",
                  letterSpacing: "4.76px",
                }}
              >
                قريباً
              </h1>

              <p
                className="font-normal text-center"
                style={{
                  width: "625px",
                  height: "56px",
                  fontFamily: "Inter",
                  fontSize: "18px",
                  lineHeight: "28px",
                  textAlign: "center",
                  color: "#EBEBEB",
                }}
              >
                نعمل على إطلاق تجربة استثنائية، اترك بياناتك لتكون أول من
                <br />
                يعلم عند الإطلاق.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              width: "941px",
              bottom: "3%",
              gap: "14px",
            }}
            onKeyDown={handleKeyDown}
          >
            <div
              className="relative"
              style={{ width: "941px", height: "50px" }}
            >
              {/* Name */}
              <Input
                type="text"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="absolute text-white placeholder:text-white"
                style={{
                  width: "227.75px",
                  height: "50px",
                  left: "0px",
                  top: "0px",
                  padding: "16px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.3125px",
                  textAlign: "right",
                }}
              />

              {/* Email */}
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="absolute text-white placeholder:text-white"
                style={{
                  width: "227.75px",
                  height: "50px",
                  left: "237.75px",
                  top: "0px",
                  padding: "16px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.3125px",
                  textAlign: "right",
                }}
              />

              {/* Phone */}
              <Input
                type="tel"
                placeholder="رقم الجوال"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="absolute text-white placeholder:text-white"
                style={{
                  width: "227.75px",
                  height: "50px",
                  left: "475.5px",
                  top: "0px",
                  padding: "16px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "19px",
                  letterSpacing: "-0.3125px",
                  textAlign: "right",
                }}
              />

              {/* Model Dropdown */}
              <div
                ref={desktopDropdownRef}
                className="absolute"
                style={{
                  width: "227.75px",
                  height: "50px",
                  left: "713.25px",
                  top: "0px",
                }}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full h-full flex flex-row items-center justify-between outline-none box-border cursor-pointer transition-all duration-200"
                  style={{
                    borderRadius: "28px",
                    borderWidth: "0.8px",
                    padding: "16px 24px",
                    background: showDropdown
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.1)",
                    border: "0.8px solid rgba(170, 170, 170, 1)",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "-0.3125px",
                    color: "rgba(255, 255, 255, 1)",
                  }}
                >
                  <span
                    className="flex-none transition-opacity duration-200"
                    style={{
                      opacity: selectedModel === "اختر الطراز" ? 0.7 : 1,
                      fontWeight: 400,
                    }}
                  >
                    {selectedModel}
                  </span>
                  <ChevronDown
                    className="flex-none transition-transform duration-200 text-white"
                    style={{
                      width: "8px",
                      height: "16px",
                      transform: showDropdown
                        ? "rotate(270deg)"
                        : "rotate(90deg)",
                      opacity: 0.8,
                    }}
                  />
                </button>
                {showDropdown && (
                  <div
                    className="absolute bottom-[54px] left-0 w-full z-20 overflow-hidden"
                    style={{
                      background: "rgba(20, 20, 20, 0.98)",
                      border: "0.8px solid rgba(170, 170, 170, 0.6)",
                      borderRadius: "12px",
                      boxShadow:
                        "0 -8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
                      backdropFilter: "blur(20px)",
                      animation: "dropdownFadeInUp 0.2s ease-out",
                    }}
                  >
                    {["MHERO I", "MHERO II"].map(
                      (model, index) => (
                        <button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left transition-all duration-150 relative"
                          style={{
                            paddingTop: "14px",
                            paddingRight: "24px",
                            paddingBottom: "14px",
                            paddingLeft: "24px",
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "19px",
                            letterSpacing: "-0.31px",
                            color:
                              selectedModel === model
                                ? "rgba(255, 255, 255, 1)"
                                : "rgba(255, 255, 255, 0.9)",
                            background: "transparent",
                            border: "none",
                            borderBottom:
                              index < 2
                                ? "0.8px solid rgba(170, 170, 170, 0.15)"
                                : "none",
                          }}
                        >
                          {model}
                          {selectedModel === model && (
                            <span
                              className="absolute right-[24px] top-1/2 -translate-y-1/2"
                              style={{
                                fontSize: "12px",
                                opacity: 0.6,
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status message */}
            {(submitStatus === "success" || submitStatus === "error") && (
              <div
                className="text-center text-sm"
                style={{
                  color: submitStatus === "success" ? "#4ade80" : "#ef4444",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {submitStatus === "success"
                  ? "✓ شكرًا لك! سنقوم بإخطارك قريبًا."
                  : errorMessage}
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="text-white flex flex-row items-center justify-center outline-none cursor-pointer transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                width: "260px",
                height: "50px",
                padding: "13px 36px",
                gap: "10px",
                background: isSubmitting
                  ? "rgba(13, 14, 15, 0.7)"
                  : "#0D0E0F",
                borderRadius: "80px",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "24px",
                textAlign: "center",
                border: "none",
              }}
            >
              {isSubmitting ? "جارٍ الإرسال..." : "أخبرني عند الإطلاق"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile layout - scrollable */}
      <div
        className="block md:hidden relative w-full overflow-y-auto overflow-x-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          height: "100vh",
          minHeight: "100dvh",
        }}
      >
        <div
          className="relative w-full"
          style={{ minHeight: "932px" }}
        >
          {/* Background hero image */}
          <div className="absolute inset-0 z-0 w-full h-full min-h-[932px]">
            <Image
              src="/mhero-hero-mobile.svg"
              alt="Mhero SUV"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Top Gradient Overlay */}
          <div
            className="absolute left-0 top-0 w-full"
            style={{
              height: "490px",
              background:
                "linear-gradient(180deg, #000000 -6.05%, rgba(0, 0, 0, 0) 100%)",
            }}
          />

          {/* Bottom Gradient Overlay (Rectangle 3) */}
          <div
            className="absolute left-0 w-full"
            style={{
              height: "391px",
              left: "0px",
              bottom: "-28px",
              background:
                "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.659361) 54.27%, rgba(0, 0, 0, 0) 100%)",
              transform: "matrix(1, 0, 0, -1, 0, 0)",
            }}
          />

          {/* Language Selector - Mobile (back to English) - same alignment as EN version */}
          <Link
            href="/"
            dir="ltr"
            className="absolute z-20 flex items-center justify-center cursor-pointer"
            style={{
              width: "99px",
              height: "35px",
              right: "34px",
              top: "58px",
              padding: "6px 18px",
              gap: "5px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "0.8px solid #ECECEC",
              borderRadius: "30px",
            }}
          >
            <div className="flex items-center gap-1">
              <Image
                src="/globe.svg"
                alt="Globe"
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span
                style={{
                  width: "41px",
                  height: "23px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "23px",
                  textAlign: "center",
                  letterSpacing: "-0.449219px",
                  color: "#F4F4F4",
                }}
              >
                English
              </span>
            </div>
          </Link>

          {/* Main Content - Mobile */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              width: "361px",
              height: "161.46px",
              top: "118px",
              gap: "7px",
            }}
          >
            {/* Logo */}
            <div style={{ width: "44px", height: "51.46px" }}>
              <Image
                src="/logo.svg"
                alt="Mhero Logo"
                width={44}
                height={52}
                className="h-full w-full"
              />
            </div>

            {/* Heading + tagline */}
            <div
              className="flex flex-col items-center"
              style={{ width: "361px", height: "103px", gap: "7px" }}
            >
              <h1
                className="font-normal text-white text-center whitespace-nowrap"
                style={{
                  width: "312px",
                  height: "60px",
                  fontFamily: "Inter",
                  fontSize: "36px",
                  lineHeight: "60px",
                  textAlign: "center",
                  letterSpacing: "4.76px",
                  margin: 0,
                }}
              >
                قريباً
              </h1>
              <p
                style={{
                  width: "361px",
                  height: "48px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  textAlign: "center",
                  color: "#EBEBEB",
                }}
              >
                نعمل على إطلاق تجربة استثنائية، اترك بياناتك لتكون أول من
                <br />
                يعلم عند الإطلاق.
              </p>
            </div>
          </div>

          {/* Form - Mobile */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-start"
            style={{
              width: "305px",
              height: "231px",
              top: "665px",
              gap: "12px",
            }}
            onKeyDown={handleKeyDown}
          >
            <div
              className="flex flex-col items-start"
              style={{ width: "305px", gap: "8px" }}
            >
              {/* Name */}
              <Input
                type="text"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="text-white placeholder:text-white"
                style={{
                  boxSizing: "border-box",
                  width: "305px",
                  height: "39px",
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "15px",
                  letterSpacing: "-0.3125px",
                  color: "#FFFFFF",
                  textAlign: "right",
                }}
              />

              {/* Email */}
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="text-white placeholder:text-white"
                style={{
                  boxSizing: "border-box",
                  width: "305px",
                  height: "39px",
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "15px",
                  letterSpacing: "-0.3125px",
                  color: "#FFFFFF",
                  textAlign: "right",
                }}
              />

              {/* Phone */}
              <Input
                type="tel"
                placeholder="رقم الجوال"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="text-white placeholder:text-white"
                style={{
                  boxSizing: "border-box",
                  width: "305px",
                  height: "39px",
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "0.8px solid #AAAAAA",
                  borderRadius: "28px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "15px",
                  letterSpacing: "-0.3125px",
                  color: "#FFFFFF",
                  textAlign: "right",
                }}
              />

              {/* Model Dropdown - Mobile */}
              <div
                ref={mobileDropdownRef}
                style={{ width: "305px", height: "39px", position: "relative" }}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex flex-row items-center justify-between outline-none box-border cursor-pointer transition-all duration-200"
                  style={{
                    boxSizing: "border-box",
                    height: "39px",
                    padding: "12px 24px",
                    gap: "26px",
                    background: showDropdown
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.1)",
                    border: "0.8px solid #AAAAAA",
                    borderRadius: "28px",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "15px",
                    letterSpacing: "-0.3125px",
                    color: "#FFFFFF",
                  }}
                >
                  <span
                    className="flex-1 text-right"
                    style={{
                      opacity: selectedModel === "اختر الطراز" ? 0.7 : 1,
                      fontWeight: 400,
                    }}
                  >
                    {selectedModel}
                  </span>
                  <ChevronDown
                    className="text-white flex-none"
                    style={{
                      width: "8px",
                      height: "16px",
                      transform: "rotate(90deg)",
                      opacity: 0.8,
                    }}
                  />
                </button>
                {showDropdown && (
                  <div
                    className="absolute w-[305px] z-20 overflow-hidden"
                    style={{
                      bottom: "43px",
                      left: 0,
                      background: "rgba(20, 20, 20, 0.98)",
                      border: "0.8px solid rgba(170, 170, 170, 0.6)",
                      borderRadius: "12px",
                      boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
                      backdropFilter: "blur(20px)",
                      animation: "dropdownFadeInUp 0.2s ease-out",
                    }}
                  >
                    {["MHERO I", "MHERO II"].map(
                      (model, index) => (
                        <button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left transition-all duration-150 relative"
                          style={{
                            paddingTop: "10px",
                            paddingRight: "24px",
                            paddingBottom: "10px",
                            paddingLeft: "24px",
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "19px",
                            letterSpacing: "-0.31px",
                            color:
                              selectedModel === model
                                ? "rgba(255, 255, 255, 1)"
                                : "rgba(255, 255, 255, 0.9)",
                            background: "transparent",
                            border: "none",
                            borderBottom:
                              index < 2
                                ? "0.8px solid rgba(170, 170, 170, 0.15)"
                                : "none",
                          }}
                        >
                          {model}
                          {selectedModel === model && (
                            <span
                              className="absolute right-[24px] top-1/2 -translate-y-1/2"
                              style={{
                                fontSize: "12px",
                                opacity: 0.6,
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status Message - Mobile */}
            {(submitStatus === "success" || submitStatus === "error") && (
              <div
                className="text-center text-sm w-full"
                style={{
                  color: submitStatus === "success" ? "#4ade80" : "#ef4444",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              >
                {submitStatus === "success"
                  ? "✓ شكرًا لك! سنقوم بإخطارك قريبًا."
                  : errorMessage}
              </div>
            )}

            {/* NOTIFY ME Button - Mobile */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="text-white flex flex-row items-center justify-center outline-none cursor-pointer transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                width: "305px",
                height: "39px",
                paddingTop: "12px",
                paddingRight: "55px",
                paddingBottom: "12px",
                paddingLeft: "55px",
                gap: "10px",
                background: isSubmitting
                  ? "rgba(13, 14, 15, 0.4)"
                  : "rgba(13, 14, 15, 0.2)",
                borderRadius: "80px",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "15px",
                textAlign: "center",
                letterSpacing: "0.4875px",
                border: "none",
              }}
            >
              {isSubmitting ? "جارٍ الإرسال..." : "أخبرني عند الإطلاق"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

