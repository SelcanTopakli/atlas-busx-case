import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import SummaryPage from "../pages/SummaryPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";


const router = createBrowserRouter([
  { path: "/", element: <SearchPage /> },
  { path: "/seats/:tripId", element: <SeatSelectionPage /> },
  { path: "/summary", element: <SummaryPage /> },
  { path: "/payment-success", element: <PaymentSuccessPage /> }
]);

export default router;
