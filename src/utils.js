const getBookingStatus = (statusCode) => {
  return BookingStatus[statusCode];
};

const BookingStatus = {
  0: "Requested",
  1: "Accepted",
  2: "CompletedNotPaid",
  3: "Rejected",
  4: "CompletedAndPaid ",
  5: "Cancelled",
  6: "Bidded",
  7: "BiddedTooLate",
  8: "WithdrewBid",
  9: "PendingInterviews",
  10: "LongTermBookingsCreated",
};

export { getBookingStatus };
