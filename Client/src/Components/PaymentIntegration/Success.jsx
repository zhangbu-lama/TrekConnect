import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateBooking } from "../Hooks/useBooking";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: addBooking } = useCreateBooking();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pid = query.get("oid"); // eSewa returns 'oid' as pid

    const savedData = localStorage.getItem("pendingBooking");
    if (!savedData) {
      toast.error("No booking data found.");
      return;
    }

    const bookingData = JSON.parse(savedData);

    if (bookingData.pid === pid) {
      addBooking(bookingData, {
        onSuccess: () => {
          toast.success("Booking confirmed!");
          localStorage.removeItem("pendingBooking");
          navigate("/"); // redirect home
        },
        onError: () => toast.error("Booking failed, but payment succeeded."),
      });
    } else {
      toast.error("Invalid booking ID.");
    }
  }, [addBooking, location, navigate]);

  return <div className="text-center mt-20 text-lg text-green-600">Verifying payment and creating your booking...</div>;
};

export default PaymentSuccess;
