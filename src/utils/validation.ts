import { z } from "zod";

export const TCKN_REGEX = /^[1-9]\d{10}$/;
export const GSM_REGEX = /^(\+90|0)?5\d{9}$/;

// 🎯 Yolcu validasyonu
export const passengerSchema = z.object({
  seatNo: z.number(),
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Ad soyad en az 3 karakter olmalı" }),

  // ✅ ENUM yerine string + refine kullanıyoruz
  gender: z
    .string()
    .refine((val) => val === "Erkek" || val === "Kadın", {
      message: "Lütfen cinsiyet seçiniz",
    }),

  idNumber: z
    .string()
    .regex(TCKN_REGEX, { message: "T.C. Kimlik No 11 haneli olmalıdır" }),
});

// 🎯 Yolcu listesi
export const passengersSchema = z
  .array(passengerSchema)
  .min(1, { message: "En az 1 yolcu bilgisi gerekli" });

// 🎯 İletişim bilgileri
export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z
    .string()
    .regex(GSM_REGEX, { message: "Geçerli bir telefon numarası giriniz" }),
});

// ✅ Type çıkarımları
export type PassengerInput = z.infer<typeof passengerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
