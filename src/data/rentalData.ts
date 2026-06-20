export type VehicleStatus =
  | "Available"
  | "Booked"
  | "Cleaning"
  | "Maintenance"
  | "Delivered"
  | "Reserved";

export type BookingStatus =
  | "Confirmed"
  | "In progress"
  | "Awaiting payment"
  | "Draft"
  | "Completed";

export type CustomerTier = "VIP" | "Black" | "Corporate" | "Private";

export type Customer = {
  id: string;
  name: string;
  tier: CustomerTier;
  phone: string;
  email: string;
  location: string;
  since: string;
  lifetimeSpend: number;
  preferredVehicles: string[];
  currentBookingId?: string;
  notes: string[];
  timeline: {
    time: string;
    title: string;
    detail: string;
  }[];
  uploadedDocuments: {
    name: string;
    status: "Verified" | "Expiring" | "Missing";
  }[];
  paymentHistory: {
    label: string;
    amount: number;
    status: "Paid" | "Pending" | "Deposit held";
  }[];
  previousBookings: string[];
};

export type Vehicle = {
  id: string;
  model: string;
  plate: string;
  status: VehicleStatus;
  location: string;
  nextBooking: string;
  revenue: number;
  utilisation: number;
  image: string;
  class: string;
  seats: number;
  dailyRate: number;
  monthlyRate: number;
};

export type Booking = {
  id: string;
  customerId: string;
  vehicleId: string;
  pickup: string;
  returnAt: string;
  status: BookingStatus;
  payment: "Paid" | "Pending" | "Deposit only";
  driver: string;
  value: number;
  view: "Day" | "Week" | "Month";
};

export type Conversation = {
  id: string;
  customerId: string;
  source: "WhatsApp" | "Email" | "Website" | "Google Ads" | "Meta Ads";
  status: "Open" | "Awaiting reply" | "Assigned" | "Resolved";
  assignedTo: string;
  waitingMinutes: number;
  stage: "New enquiry" | "Quoted" | "Documents" | "Payment" | "Confirmed";
  tags: string[];
  lastMessage: string;
  messages: {
    from: "customer" | "team";
    author: string;
    time: string;
    text: string;
  }[];
};

export type DocumentRecord = {
  id: string;
  customerId: string;
  title: string;
  type:
    | "Passport"
    | "Emirates ID"
    | "Visit visa"
    | "UAE driving licence"
    | "International driving licence"
    | "Agreement"
    | "Insurance"
    | "Deposit";
  status: "Verified" | "Needs review" | "Expiring" | "Missing";
  updatedAt: string;
};

const customerNames = [
  "Amara Whitmore",
  "Rafael Kingsley",
  "Layla Haddad",
  "Oliver Bancroft",
  "Noura Al-Fayed",
  "Sebastian Vale",
  "Maya Sterling",
  "Hugo Montclair",
  "Elena Rossi",
  "Zayn Kapoor",
  "Priya Shah",
  "Theo Harrington",
  "Sofia Laurent",
  "Idris Morgan",
  "Camille Dubois",
  "Jasper Wren",
  "Aisha Rahman",
  "Marcus Bennett",
  "Isabella Moretti",
  "Kenji Nakamura",
  "Leila Mansour",
  "Arthur Sinclair",
  "Valentina Cruz",
  "Dante Bellini",
  "Freya Beaumont",
  "Noah Ashford",
  "Yara Khalil",
  "Leo Westbrook",
  "Clara Voss",
  "Omar Siddiq",
  "Bianca Romano",
  "Ethan Carlisle",
  "Mina Park",
  "Adrian Cole",
  "Sara Al-Mahri",
  "Maxim Volkov",
  "Hana Sato",
  "Julian Mercer",
  "Lina Farouk",
  "Victor Saint",
  "Anika Mehta",
  "Roman Blackwell",
  "Nadia Petrova",
  "Elias Stone",
  "Chloe Fairmont",
  "Samir Darzi",
  "Iris Beaumont",
  "Khaled Nasser",
  "Mila Hart",
  "Gabriel Knox",
];

const locations = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Business Bay",
  "Jumeirah Beach Residence",
  "Dubai International Airport T3",
  "Dubai Hills",
  "Jumeirah Village Circle",
  "DIFC",
  "Al Barsha",
  "Dubai Mall",
  "Bluewaters Island",
];

const vehicleOffers = [
  { model: "2024 BMW 735i", class: "Luxury sedan", seats: 5, dailyRate: 649, monthlyRate: 13999 },
  { model: "2024 BMW 520i", class: "Luxury sedan", seats: 5, dailyRate: 319, monthlyRate: 6999 },
  { model: "2026 BMW 520i", class: "Luxury sedan", seats: 5, dailyRate: 319, monthlyRate: 6999 },
  { model: "2024 Mercedes CLA 250", class: "Luxury sedan", seats: 5, dailyRate: 269, monthlyRate: 5499 },
  { model: "2024 Mercedes A200", class: "Luxury sedan", seats: 5, dailyRate: 219, monthlyRate: 4299 },
  { model: "2024 Audi A3", class: "Luxury sedan", seats: 5, dailyRate: 189, monthlyRate: 3999 },
  { model: "2024 Mercedes C200", class: "Luxury sedan", seats: 5, dailyRate: 349, monthlyRate: 6999 },
  { model: "2024 Mini Cooper Hatchback", class: "Luxury sedan", seats: 4, dailyRate: 219, monthlyRate: 4299 },
  { model: "2024 Cadillac Escalade", class: "Luxury SUV", seats: 7, dailyRate: 749, monthlyRate: 16999 },
  { model: "2025 Cadillac Escalade", class: "Luxury SUV", seats: 7, dailyRate: 749, monthlyRate: 16999 },
  { model: "2025 GMC Yukon AT4", class: "Luxury SUV", seats: 7, dailyRate: 449, monthlyRate: 8999 },
  { model: "2026 GMC Yukon AT4", class: "Luxury SUV", seats: 7, dailyRate: 449, monthlyRate: 8999 },
  { model: "2025 Range Rover Velar", class: "Luxury SUV", seats: 5, dailyRate: 379, monthlyRate: 7999 },
  { model: "2024 Mercedes GLE 53", class: "Luxury SUV", seats: 5, dailyRate: 599, monthlyRate: 13999 },
  { model: "2025 Nissan Patrol", class: "Luxury SUV", seats: 7, dailyRate: 549, monthlyRate: 10999 },
  { model: "2026 Nissan Patrol", class: "Luxury SUV", seats: 7, dailyRate: 549, monthlyRate: 10999 },
  { model: "2024 Chevrolet Tahoe", class: "Luxury SUV", seats: 7, dailyRate: 399, monthlyRate: 7999 },
  { model: "2025 Chevrolet Tahoe", class: "Luxury SUV", seats: 7, dailyRate: 399, monthlyRate: 7999 },
  { model: "2024 Audi Q5", class: "Luxury SUV", seats: 5, dailyRate: 349, monthlyRate: 6999 },
  { model: "2026 Jetour T2", class: "Luxury SUV", seats: 5, dailyRate: 299, monthlyRate: 5999 },
  { model: "2025 BMW 420i Convertible", class: "Convertible", seats: 4, dailyRate: 399, monthlyRate: 8499 },
  { model: "2024 Kia Carnival", class: "Family vehicle", seats: 8, dailyRate: 249, monthlyRate: 4499 },
  { model: "2025 Kia Carnival", class: "Family vehicle", seats: 8, dailyRate: 249, monthlyRate: 4499 },
  { model: "2024 Hyundai Stargazer", class: "Family vehicle", seats: 7, dailyRate: 129, monthlyRate: 2499 },
  { model: "2022 Hyundai Staria", class: "Family vehicle", seats: 9, dailyRate: 229, monthlyRate: 4999 },
  { model: "2025 Hyundai Staria", class: "Family vehicle", seats: 9, dailyRate: 229, monthlyRate: 4999 },
  { model: "2026 Hyundai Staria", class: "Family vehicle", seats: 9, dailyRate: 229, monthlyRate: 4999 },
  { model: "2024 Citroen Spacetourer", class: "Family vehicle", seats: 9, dailyRate: 299, monthlyRate: 5999 },
  { model: "2024 Chevrolet Captiva", class: "Family vehicle", seats: 7, dailyRate: 109, monthlyRate: 2199 },
  { model: "2025 Chevrolet Captiva", class: "Family vehicle", seats: 7, dailyRate: 109, monthlyRate: 2199 },
  { model: "2026 Chevrolet Captiva", class: "Family vehicle", seats: 7, dailyRate: 109, monthlyRate: 2199 },
  { model: "2024 Kia Sonet", class: "Economy SUV", seats: 5, dailyRate: 89, monthlyRate: 1899 },
  { model: "2025 Suzuki Jimny", class: "Economy SUV", seats: 4, dailyRate: 129, monthlyRate: 2599 },
  { model: "2025 Nissan Sunny", class: "Economy sedan", seats: 5, dailyRate: 79, monthlyRate: 1599 },
  { model: "2023 Mitsubishi Attrage", class: "Economy sedan", seats: 5, dailyRate: 79, monthlyRate: 1499 },
  { model: "2024 Kia Pegas", class: "Economy sedan", seats: 5, dailyRate: 79, monthlyRate: 1599 },
  { model: "2022 Hyundai Sonata", class: "Economy sedan", seats: 5, dailyRate: 89, monthlyRate: 1999 },
  { model: "2024 BMW 520i M Sport", class: "Luxury sedan", seats: 5, dailyRate: 319, monthlyRate: 6999 },
  { model: "2025 Nissan Patrol Platinum", class: "Luxury SUV", seats: 7, dailyRate: 549, monthlyRate: 10999 },
  { model: "2026 GMC Yukon AT4 Black Edition", class: "Luxury SUV", seats: 7, dailyRate: 449, monthlyRate: 8999 },
];

const vehicleImages = [
  "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
];

const statuses: VehicleStatus[] = [
  "Available",
  "Booked",
  "Cleaning",
  "Maintenance",
  "Delivered",
  "Reserved",
];

export const vehicles: Vehicle[] = vehicleOffers.map((offer, index) => ({
  id: `veh-${index + 1}`,
  model: offer.model,
  plate: `${["D", "AA", "BB", "O", "P"][index % 5]} ${10000 + index * 137}`,
  status: statuses[index % statuses.length],
  location: locations[index % locations.length],
  nextBooking: `${["Today", "Tomorrow", "21 Jun", "22 Jun", "24 Jun"][index % 5]} · ${
    customerNames[(index * 3) % customerNames.length]
  }`,
  revenue: offer.monthlyRate * (2 + (index % 4)) + offer.dailyRate * (8 + (index % 6)),
  utilisation: 48 + ((index * 7) % 47),
  image: vehicleImages[index % vehicleImages.length],
  class: offer.class,
  seats: offer.seats,
  dailyRate: offer.dailyRate,
  monthlyRate: offer.monthlyRate,
}));

export const customers: Customer[] = customerNames.map((name, index) => {
  const tier: CustomerTier = index % 7 === 0 ? "VIP" : index % 5 === 0 ? "Corporate" : index % 3 === 0 ? "Black" : "Private";
  const preferredVehicles = [
    vehicles[index % vehicles.length].model,
    vehicles[(index + 8) % vehicles.length].model,
  ];

  return {
    id: `cust-${index + 1}`,
    name,
    tier,
    phone: `+971 5${(20000000 + index * 78291).toString().slice(0, 8)}`,
    email: `${name.toLowerCase().replaceAll(" ", ".").replaceAll("-", "")}@example.com`,
    location: locations[index % locations.length],
    since: `20${18 + (index % 7)}`,
    lifetimeSpend: 6200 + index * 2900 + (tier === "VIP" ? 18000 : 0),
    preferredVehicles,
    currentBookingId: index < 18 ? `book-${index + 1}` : undefined,
    notes: [
      tier === "VIP" ? "Prefers direct WhatsApp updates and hotel delivery confirmation before dispatch." : "Responds fastest before 10:00 UAE time.",
      `Usually requests ${preferredVehicles[0]} for ${index % 2 === 0 ? "DXB airport transfers" : "weekly Dubai rentals"}.`,
    ],
    timeline: [
      {
        time: "Today 08:42",
        title: "Conversation updated",
        detail: `Asked about ${preferredVehicles[0]} availability and delivery timing.`,
      },
      {
        time: "Yesterday 16:10",
        title: "Payment activity",
        detail: index % 4 === 0 ? "No-deposit eligibility is pending finance review." : "Security deposit was pre-authorised in AED.",
      },
      {
        time: "Last rental",
        title: "Vehicle returned",
        detail: "Returned clean with no damage notes.",
      },
    ],
    uploadedDocuments: [
      { name: "Passport", status: index % 9 === 0 ? "Expiring" : "Verified" },
      { name: index % 3 === 0 ? "Emirates ID" : "UAE driving licence", status: index % 8 === 0 ? "Missing" : "Verified" },
      { name: "Rental agreement", status: index % 5 === 0 ? "Expiring" : "Verified" },
    ],
    paymentHistory: [
      { label: "June rental", amount: 1800 + index * 95, status: index % 6 === 0 ? "Pending" : "Paid" },
      { label: "Security deposit", amount: 5000, status: "Deposit held" },
      { label: "May rental", amount: 1400 + index * 75, status: "Paid" },
    ],
    previousBookings: [
      vehicles[(index + 4) % vehicles.length].model,
      vehicles[(index + 12) % vehicles.length].model,
      vehicles[(index + 20) % vehicles.length].model,
    ],
  };
});

export const bookings: Booking[] = Array.from({ length: 64 }, (_, index) => ({
  id: `book-${index + 1}`,
  customerId: customers[index % customers.length].id,
  vehicleId: vehicles[(index * 2) % vehicles.length].id,
  pickup: `${["09:00", "10:30", "12:00", "14:30", "16:00", "18:30"][index % 6]} · ${
    locations[(index + 1) % locations.length]
  }`,
  returnAt: `${["Today", "Tomorrow", "23 Jun", "24 Jun", "26 Jun"][index % 5]} · ${
    ["11:00", "13:00", "15:30", "17:00"][index % 4]
  }`,
  status: ["Confirmed", "In progress", "Awaiting payment", "Draft", "Completed"][index % 5] as BookingStatus,
  payment: ["Paid", "Pending", "Deposit only"][index % 3] as Booking["payment"],
  driver: ["Mason", "Elliot", "Riya", "Theo", "Nadia", "Self-drive"][index % 6],
  value: 420 + (index % 9) * 260 + index * 35,
  view: ["Day", "Week", "Month"][index % 3] as Booking["view"],
}));

const sources: Conversation["source"][] = ["WhatsApp", "Email", "Website", "Google Ads", "Meta Ads"];
const stages: Conversation["stage"][] = ["New enquiry", "Quoted", "Documents", "Payment", "Confirmed"];
const staff = ["Amelia", "Noah", "Sofia", "James", "Unassigned"];

export const conversations: Conversation[] = Array.from({ length: 36 }, (_, index) => {
  const customer = customers[index % customers.length];
  const vehicle = vehicles[(index * 3) % vehicles.length];

  return {
    id: `conv-${index + 1}`,
    customerId: customer.id,
    source: sources[index % sources.length],
    status: index % 4 === 0 ? "Awaiting reply" : index % 5 === 0 ? "Open" : index % 3 === 0 ? "Resolved" : "Assigned",
    assignedTo: staff[index % staff.length],
    waitingMinutes: 8 + index * 11,
    stage: stages[index % stages.length],
    tags: [
      customer.tier,
      vehicle.class,
      index % 4 === 0 ? "Airport" : index % 3 === 0 ? "Deposit" : "High intent",
    ],
    lastMessage:
      index % 2 === 0
        ? `Can you deliver the ${vehicle.model} to ${customer.location} today?`
        : "Please confirm the deposit link and whether insurance is included.",
    messages: [
      {
        from: "customer",
        author: customer.name,
        time: "08:41",
        text: `Hi, I need a ${vehicle.model} ${index % 2 === 0 ? "for tonight" : "for the weekend"}. Is it available?`,
      },
      {
        from: "team",
        author: "Dreamz concierge",
        time: "08:48",
        text: `Yes, we can reserve it with same-day delivery to ${customer.location}. I can send the AED quote and WhatsApp document checklist now.`,
      },
      {
        from: "customer",
        author: customer.name,
        time: "09:06",
        text: index % 3 === 0 ? "Great. Please hold it for me and send the payment link." : "Could you also include DXB airport return pickup?",
      },
    ],
  };
});

export const documents: DocumentRecord[] = Array.from({ length: 42 }, (_, index) => ({
  id: `doc-${index + 1}`,
  customerId: customers[(index * 2) % customers.length].id,
  title: `${customers[(index * 2) % customers.length].name} · ${
    ["Passport", "Emirates ID", "Visit visa", "UAE driving licence", "Deposit receipt", "Rental agreement"][index % 6]
  }`,
  type: [
    "Passport",
    "Emirates ID",
    "Visit visa",
    "UAE driving licence",
    "International driving licence",
    "Deposit",
    "Agreement",
    "Insurance",
  ][index % 8] as DocumentRecord["type"],
  status: ["Verified", "Needs review", "Expiring", "Missing"][index % 4] as DocumentRecord["status"],
  updatedAt: `${["Today", "Yesterday", "18 Jun", "16 Jun", "12 Jun"][index % 5]} · ${
    ["09:20", "11:45", "13:10", "15:30"][index % 4]
  }`,
}));

export const revenueByMonth = [
  { month: "Jan", revenue: 488000, bookings: 138 },
  { month: "Feb", revenue: 524000, bookings: 151 },
  { month: "Mar", revenue: 612000, bookings: 176 },
  { month: "Apr", revenue: 648000, bookings: 188 },
  { month: "May", revenue: 706000, bookings: 214 },
  { month: "Jun", revenue: 782000, bookings: 236 },
];

export const operationsTimeline = [
  { time: "09:00", title: "Deliver Cadillac Escalade", detail: "Downtown Dubai · Rafael Kingsley", tone: "Delivery" },
  { time: "11:00", title: "Receive BMW 735i", detail: "Dubai Marina · post-rental inspection", tone: "Return" },
  { time: "12:00", title: "Vehicle cleaning", detail: "Nissan Patrol and GMC Yukon for afternoon pickups", tone: "Prep" },
  { time: "14:00", title: "DXB airport pickup", detail: "Dubai International Airport T3 · Range Rover Velar", tone: "Transfer" },
  { time: "17:00", title: "Return Mercedes GLE 53", detail: "Palm Jumeirah · inspect wheels and salik", tone: "Return" },
];

export const aiDemoCards = [
  {
    title: "Summarize this conversation",
    body: "Customer wants a Nissan Patrol tonight, needs DXB return pickup, payment link pending.",
  },
  {
    title: "Daily operational summary",
    body: "4 returns, 7 pickups, 3 cars in cleaning, and 6 conversations over 30 minutes waiting.",
  },
  {
    title: "Suggested follow-up",
    body: "Ask Noura to upload Emirates ID or visit visa before holding the Escalade past 13:00.",
  },
  {
    title: "Natural language search",
    body: "Show available SUVs in Dubai Marina today with revenue above AED 40k this month.",
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AE", {
    currency: "AED",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function getCustomer(customerId: string) {
  return customers.find((customer) => customer.id === customerId) ?? customers[0];
}

export function getVehicle(vehicleId: string) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId) ?? vehicles[0];
}
