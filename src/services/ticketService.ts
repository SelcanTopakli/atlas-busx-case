import { apiPost } from "./apiClient";

export interface SellTicketBody {
  tripId: string;
  seats: number[];
  contact: { email: string; phone: string };
  passengers: {
    seat: number;
    firstName: string;
    lastName: string;
    idNo: string;
    gender: "male" | "female";
  }[];
}

export interface SellTicketResponse {
  ok: boolean;
  pnr: string;
  message: string;
}

export const sellTicket = async (
  body: SellTicketBody
): Promise<SellTicketResponse> => {
  return apiPost<SellTicketResponse>("/tickets/sell", body);
};
