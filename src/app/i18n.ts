import "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    tr: {
      translation: {
        // Navbar
        home: "Ana Sayfa",
        seats: "Koltuk Seçimi",
        passengers: "Yolcu Bilgileri",
        summary: "Özet",
        paymentSuccess: "Ödeme Başarılı",
        returnHome: "Ana Sayfaya Dön",
        total: "Toplam",

        // SeatMap
        selectSeat: "Koltuk Seç",
        selectedSeats: "Seçilen Koltuklar",
        next: "Devam Et",
        male: "Erkek",
        female: "Kadın",

        // Passenger Form
        passengerInfo: "Yolcu Bilgileri",
        fullName: "Ad Soyad",
        gender: "Cinsiyet",
        idNumber: "T.C. Kimlik No",
        email: "E-posta",
        phone: "Telefon",
        requiredFields: "Lütfen yolcu bilgilerini eksiksiz doldurunuz.",
        agreeKVKK:
          "Kişisel verilerimin işlenmesine ilişkin Aydınlatma Metni’ni okudum, kabul ediyorum.",
        goPayment: "Ödemeye Geç (Mock)",

        // Price Summary
        trip: "Sefer",
        unitPrice: "Birim Fiyat",
        subtotal: "Ara Toplam",
        serviceFee: "Hizmet Bedeli",
        totalAmount: "Toplam Tutar",
        loading: "İşlem yapılıyor...",
        pnrNumber: "PNR Numaranız",
        allRightsReserved: "Tüm hakları saklıdır.",

        // Error
        errorTitle: "Bir hata oluştu!",
        errorMessage:
          "Beklenmedik bir hata meydana geldi. Lütfen tekrar deneyin.",
        reload: "Sayfayı Yenile",
        seat: "Koltuk",
        passenger: "Yolcu",
        select: "Seçiniz",
        selectGender: "Lütfen cinsiyet seçiniz",
        fullNamePlaceholder: "Yolcu Adı Soyadı",
        idPlaceholder: "11 haneli kimlik no",
        searchTrips: "Sefer Arama",
        seatSelection: "Koltuk Seçimi",
        goBack: "Geri Dön",
        noSeatSelected: "Henüz koltuk seçilmedi.",
        totalPrice: "Toplam Fiyat",
        confirmAndContinue: "Onayla ve Devam Et",
        maxSeatsWarning: "En fazla 4 koltuk seçebilirsiniz!",
        selectAtLeastOneSeat: "Lütfen en az bir koltuk seçin!",
        passengerAndSummary: "Yolcu Bilgileri & Özet",
        contactInfo: "İletişim Bilgileri",

        emailPlaceholder: "ornek@eposta.com",
        phonePlaceholder: "+90 5xx xxx xx xx",
        invalidEmail: "Geçerli bir e-posta adresi giriniz",
        invalidPhone: "Geçerli bir telefon numarası giriniz",
        kvkkText: "Kişisel verilerimin işlenmesine ilişkin",
        kvkkLink: "Aydınlatma Metni",
        kvkkAccept: "’ni okudum, kabul ediyorum.",
        frontWindow: "Ön Cam",
        from: "Nereden",
        to: "Nereye",
        departureDate: "Gidiş Tarihi",
        searchBus: "Otobüs Ara",
        swapCities: "Şehirleri Değiştir",
        loadingSchedules: "Seferler yükleniyor...",
        errorLoadingSchedules: "Seferler yüklenirken bir hata oluştu",
        availableTrips: "Uygun Seferler",
        departure: "Kalkış",
        arrival: "Varış",
        currency: "TL",
        summaryTitle: "Özet",
        processingPayment: "İşlem yapılıyor...",
        proceedToPayment: "Ödemeye Geç (Mock)",
      },
    },
    en: {
      translation: {
        // Navbar
        home: "Home",
        seats: "Seat Selection",
        passengers: "Passenger Info",
        summary: "Summary",
        paymentSuccess: "Payment Successful",
        returnHome: "Return to Home",
        total: "Total",

        // SeatMap
        selectSeat: "Select Seat",
        selectedSeats: "Selected Seats",
        next: "Continue",
        male: "Male",
        female: "Female",

        // Passenger Form
        passengerInfo: "Passenger Information",
        fullName: "Full Name",
        gender: "Gender",
        idNumber: "ID Number",
        email: "Email",
        phone: "Phone",
        requiredFields: "Please complete all passenger details.",
        agreeKVKK:
          "I have read and accept the Privacy & Data Protection Statement.",
        goPayment: "Proceed to Payment (Mock)",

        // Price Summary
        trip: "Trip",
        unitPrice: "Unit Price",
        subtotal: "Subtotal",
        serviceFee: "Service Fee",
        totalAmount: "Total Amount",
        loading: "Processing...",
        pnrNumber: "Your PNR Number",
        allRightsReserved: "All rights reserved.",

        // Error
        errorTitle: "An error occurred!",
        errorMessage:
          "An unexpected error has occurred. Please try again later.",
        reload: "Reload Page",
        seat: "Seat",
        passenger: "Passenger",
        select: "Select",
        selectGender: "Please select a gender",
        fullNamePlaceholder: "Passenger full name",
        idPlaceholder: "11-digit ID number",
        searchTrips: "Search Trips",
        seatSelection: "Seat Selection",
        goBack: "Go Back",
        noSeatSelected: "No seats selected yet.",
        totalPrice: "Total Price",
        confirmAndContinue: "Confirm and Continue",
        maxSeatsWarning: "You can select up to 4 seats!",
        selectAtLeastOneSeat: "Please select at least one seat!",
        passengerAndSummary: "Passenger Info & Summary",
        contactInfo: "Contact Information",

        emailPlaceholder: "example@email.com",
        phonePlaceholder: "+1 555 123 4567",
        invalidEmail: "Please enter a valid email address",
        invalidPhone: "Please enter a valid phone number",
        kvkkText: "I have read and accept the",
        kvkkLink: "Privacy Policy",
        kvkkAccept: ".",
        frontWindow: "Front Window",
        from: "From",
        to: "To",
        departureDate: "Departure Date",
        searchBus: "Search Bus",
        swapCities: "Swap Cities",
        loadingSchedules: "Loading trips...",
        errorLoadingSchedules: "An error occurred while loading trips",
        availableTrips: "Available Trips",
        departure: "Departure",
        arrival: "Arrival",
        currency: "TRY",
        summaryTitle: "Summary",
        processingPayment: "Processing...",
        proceedToPayment: "Proceed to Payment (Mock)",
      },
    },
  },
  lng: "tr",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
