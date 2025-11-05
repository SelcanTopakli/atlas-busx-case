import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./i18n"; // sadece import — Provider yok!

export default function Providers() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
