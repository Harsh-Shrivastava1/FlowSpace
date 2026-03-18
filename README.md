#  **FlowSpace — Smart Workspace & Resource Booking System**

FlowSpace is an advanced resource scheduling platform that enables real-time workspace reservations with **capacity tracking, approval workflow, and automatic availability restoration**.  
Ideal for **Universities, Organizations, Libraries, Labs, Parking Zones & Shared Workspaces.**

---

##  **Features Overview**

###  **User Functionality**
- **Secure Login & Authentication**
- View *live resource availability*
- Select **resource + date + time + requested capacity**
- System auto-checks **availability before submitting**
- Real-time status updates:
  **Pending → Approved → Declined → Expired (Auto)**
- When approved → User can **Download / View Receipt**

📄 **Receipt Includes:**
- Resource Name
- User Name + Mobile
- Check-In & Check-Out Time
- Requested Capacity
- 🟢 **Verified by Admin Badge**

---

### 🛡 **Admin Powers**
| Admin Permission | Description |
|------------------|-------------|
| Add/Remove Resources | **Name, Type, Capacity, Location** |
| Approve or Decline Bookings | One-click review control |
| Capacity Tracking | Decreases when booked |
| Auto-Restore Logic | Original capacity returns after booking expires |
| Prevent Overbooking | Booking disabled only when **remaining = 0** |

### Capacity Logic Example
Admin sets "Computer Lab" capacity = 9
User books = 4
Remaining = 5 (Booking still open)
At expiry → resets back to 9 if no active bookings


---

## 🏗 **Tech Stack**
| Part            |       Technology |
|------           |    -----------|
| Frontend        | **React + Vite** |
| Styling         | **Tailwind CSS + Framer Motion** |
| Backend & Auth  | **Firebase Firestore + Google Auth** |
| State Management| **Context API** |
| Deployment Ready| Netlify  |

---

Upcoming Enhancements

✔ Email / SMS Notifications
✔ Payment-based Booking System
✔ Multi-Admin Roles
✔ Analytics Dashboard

---

## Firebase Setup (Required For Localhost)

This project reads Firebase config from Vite environment variables.

1. Copy `.env.example` to `.env` in the project root.
2. Fill in your Firebase Web App values from Firebase Console -> Project Settings -> General -> Your apps.
3. Restart `npm run dev` after saving `.env`.

If these values are missing, the app will fail at startup with a clear "Missing Firebase env vars" error.

