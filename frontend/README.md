# Commerce Bank Appointment Scheduling Prototype

A front-end-only React prototype for scheduling and managing appointments at Commerce Bank locations. Built with **React**, **TypeScript**, **TanStack Router**, and **Material UI**.

## Features

- **Multi-step appointment scheduling form** with 5 steps:
  1. Select appointment reason
  2. Select branch location (North, South, East, West)
  3. Select date and time
  4. Enter personal information (name, email, phone)
  5. Review and confirm appointment

- **Appointment management:**
  - View all saved appointments in a table
  - Delete appointments
  - Real-time form state persistence across steps

- **Client-side storage:**
  - In-memory state management with React Context
  - Optional localStorage persistence for appointments (survives page refresh)

- **Navigation:**
  - Top navigation bar with "Commerce Bank" branding
  - Menu dropdown with quick links to schedule and view appointments
  - TanStack Router for seamless page transitions

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── TopBar.tsx          # Top navigation bar
│   ├── Step1SelectReason.tsx
│   ├── Step2SelectLocation.tsx
│   ├── Step3SelectDateTime.tsx
│   ├── Step4PersonalInfo.tsx
│   └── Step5Confirmation.tsx
├── routes/                  # Page components
│   ├── HomePage.tsx
│   ├── SchedulePage.tsx
│   └── AppointmentsPage.tsx
├── context/                 # State management
│   └── AppointmentContext.tsx
├── types/                   # TypeScript type definitions
│   └── index.ts
├── router.tsx              # TanStack Router configuration
├── App.tsx                 # Main app component
├── main.tsx                # React entry point
└── index.css               # Global styles
```

## Installation

1. **Clone or download the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project

### Development Mode

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Production Build

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## How to Use

1. **Home Page:** Click "Schedule an Appointment" or use the menu to start the scheduling flow
2. **Scheduling Form:** Follow the 5-step form to enter your appointment details
   - Navigate back using the "Back" button if needed
   - Each step saves your input automatically
3. **Confirmation:** Review all details and click "Save Appointment" to save
4. **View Appointments:** Click "List All Appointments" to see all scheduled appointments
5. **Delete Appointment:** Click the trash icon on any appointment to remove it

## Assumptions & Limitations

### Current Implementation

- **No backend integration:** All data is stored client-side only
- **No authentication:** Anyone can view and manage appointments
- **No API calls:** This is a front-end prototype
- **In-memory + localStorage:** Appointments persist in browser storage but are lost if localStorage is cleared
- **Single user experience:** No user accounts or multi-user support
- **No email/SMS notifications:** Appointments are saved but no external notifications are sent
- **Limited date validation:** Only prevents past dates from being selected
- **No timezone support:** Uses browser's local timezone

### Browser Storage

- Appointments are stored in the browser's localStorage
- If localStorage is cleared, all appointments will be deleted
- Appointments are only available in the browser where they were created
- No cloud sync or data backup

### Validation

- Email format validation using regex
- Phone number validation (10 digits or XXX-XXX-XXXX format)
- All fields are required
- Date picker prevents selection of past dates

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Declarative routing
- **Material UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling
- **Vite** - Fast build tool and dev server

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Future Enhancements (Not Implemented)

- Backend API integration
- User authentication and authorization
- Email confirmation notifications
- Calendar integration
- Admin dashboard
- Appointment reminders
- Recurring appointments
- Multi-language support
- Dark mode theme
- Mobile app version

## Notes

- This prototype is designed for demonstration purposes only
- No real appointments are scheduled; this is a UI mockup with local storage
- All appointment data is stored in the browser and will be lost if localStorage is cleared
- Refresh the page to verify that appointments persist via localStorage

## License

This project is provided as-is for demonstration purposes.
