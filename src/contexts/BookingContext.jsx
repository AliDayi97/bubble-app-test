import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUiContext } from "./UiContext";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState();
  const [booking, setBooking] = useState();

  const { setLoading, setError } = useUiContext();

  const getBookings = async () => {
    if (bookings) return bookings;

    setLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://api-staging.joinbubble.co.uk/api/booking/activesummary", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log("Fetched bookings successfully ", data);
          setBookings(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.data) {
            setError(err.response.data);
          }
        });
    } else {
      setError({ message: "User is not authenticated, no token found." });
    }
  };

  const getBooking = async (id) => {
    if (booking && booking.id === id) return booking;

    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`http://api-staging.joinbubble.co.uk/api/booking/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(`Fetched booking ${id} successfully `, data);
          setBooking(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response && err.response.data) {
            setError(err.response.data);
          }
        });
    } else {
      setError({ message: "User is not authenticated, no token found." });
    }
  };

  const contextValue = {
    booking,
    bookings,
    getBookings,
    getBooking,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (ctx === undefined) {
    console.log("Context undefined");
    return;
  }
  return ctx;
};

export { BookingProvider, useBookingContext };
