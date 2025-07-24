# ✈️ API Gateway - CloudJet System

This API Gateway serves as the entry point to the microservice-based **CloudJet Flight Booking System**, routing requests to the appropriate internal services including authentication, flight search, booking, and reminders.

---

## 🧩 Microservices Linked

| Microservice          | Description                               | Repository Link                                                                 |
|-----------------------|-------------------------------------------|----------------------------------------------------------------------------------|
| **Auth Service**      | Manages user authentication & authorization | [Auth_Service](https://github.com/Amansingh2202/Auth_Service.git)               |
| **Flight Service**    | Handles flight listings and search queries | [FlightAndSearchService](https://github.com/Amansingh2202/FlightAndSearchService.git) |
| **Booking Service**   | Manages bookings, cancellations, etc.      | [AirTicketBookingService](https://github.com/Amansingh2202/AirTicketBookingService.git) |
| **Reminder Service**  | Sends booking reminders and notifications  | [ReminderService](https://github.com/Amansingh2202/ReminderService.git)         |

---

## 🚀 Gateway Features

- ✅ Reverse proxy using `http-proxy-middleware`
- ✅ Token-based authentication check for protected routes
- ✅ Request rate limiting to prevent abuse
- ✅ Logs all requests using `morgan`

---

## 📦 Routes Handled

| Endpoint Prefix         | Routed To (Service)        | Port    |
|-------------------------|----------------------------|---------|
| `/authservice`          | Auth Service               | 3001    |
| `/flightsAndsearch`     | Flight & Search Service    | 3000    |
| `/bookingservice`       | Booking Service (auth protected) | 3002 |
| `/reminderservice`      | Reminder Service           | 3003    |

---

## 🛡️ Middleware Highlights

- **Authentication Middleware**:  
  Validates JWT token via the Auth Service before forwarding `/bookingservice` requests.
  
- **Rate Limiting**:  
  Allows max 5 requests per IP every 2 minutes.

---

## 🐳 Running with Docker

1. Clone the full system:
   ```bash
   git clone <this-repo>
   cd API_Gateway
