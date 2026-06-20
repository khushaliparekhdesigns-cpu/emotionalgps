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
  type: "Passport" | "Driving licence" | "Agreement" | "Insurance" | "Deposit";
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
  "Mayfair",
  "Knightsbridge",
  "Heathrow T5",
  "Chelsea Harbour",
  "Canary Wharf",
  "Marble Arch",
  "Park Lane",
  "Kensington",
  "London City Airport",
  "Marylebone",
];

const vehicleModels = [
  "Mercedes-AMG G63",
  "Rolls-Royce Cullinan",
  "Lamborghini Urus",
  "Range Rover SV",
  "Bentley Bentayga Azure",
  "Porsche 911 Turbo S",
  "Ferrari Roma",
  "Aston Martin DBX707",
  "Mercedes-Maybach S680",
  "Bentley Continental GT",
  "McLaren GT",
  "Porsche Taycan Turbo S",
  "Ferrari Portofino M",
  "Rolls-Royce Ghost",
  "BMW XM Label",
  "Mercedes SL63 AMG",
  "Audi RS Q8",
  "Maserati MC20",
  "Lexus LM Executive",
  "Cadillac Escalade V",
  "Range Rover Autobiography",
  "Mercedes V-Class First",
  "Bentley Flying Spur",
  "Porsche Cayenne Turbo GT",
  "Lamborghini Huracan Evo",
  "Ferrari 296 GTB",
  "Aston Martin Vantage",
  "BMW M8 Competition",
  "Mercedes EQS SUV",
  "Rolls-Royce Wraith",
  "Bentley GTC Speed",
  "Porsche Panamera GTS",
  "Lamborghini Revuelto",
  "Ferrari SF90 Stradale",
  "Mercedes S63 E Performance",
  "Range Rover Sport SV",
  "Aston Martin DB12",
  "McLaren Artura",
  "Rolls-Royce Spectre",
  "Bentley Mulsanne",
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

export const vehicles: Vehicle[] = vehicleModels.map((model, index) => ({
  id: `veh-${index + 1}`,
  model,
  plate: `AD${(70 + index).toString()} ${["LUX", "VIP", "GTS", "SVR", "ROM"][index % 5]}`,
  status: statuses[index % statuses.length],
  location: locations[index % locations.length],
  nextBooking: `${["Today", "Tomorrow", "21 Jun", "22 Jun", "24 Jun"][index % 5]} · ${
    customerNames[(index * 3) % customerNames.length]
  }`,
  revenue: 18000 + index * 4300 + (index % 4) * 2400,
  utilisation: 48 + ((index * 7) % 47),
  image: vehicleImages[index % vehicleImages.length],
  class: ["SUV", "Supercar", "Chauffeur", "Convertible", "Electric"][index % 5],
  seats: [2, 4, 5, 7][index % 4],
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
    phone: `+44 7${(400000000 + index * 78291).toString().slice(0, 9)}`,
    email: `${name.toLowerCase().replaceAll(" ", ".").replaceAll("-", "")}@example.com`,
    location: locations[index % locations.length],
    since: `20${18 + (index % 7)}`,
    lifetimeSpend: 6200 + index * 2900 + (tier === "VIP" ? 18000 : 0),
    preferredVehicles,
    currentBookingId: index < 18 ? `book-${index + 1}` : undefined,
    notes: [
      tier === "VIP" ? "Prefers direct WhatsApp updates and no deposit reminders after confirmation." : "Responds fastest before 10:00.",
      `Usually requests ${preferredVehicles[0]} for ${index % 2 === 0 ? "airport transfers" : "weekend rentals"}.`,
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
        detail: index % 4 === 0 ? "Deposit is pending finance review." : "Security deposit was pre-authorised.",
      },
      {
        time: "Last rental",
        title: "Vehicle returned",
        detail: "Returned clean with no damage notes.",
      },
    ],
    uploadedDocuments: [
      { name: "Passport", status: index % 9 === 0 ? "Expiring" : "Verified" },
      { name: "Driving licence", status: index % 8 === 0 ? "Missing" : "Verified" },
      { name: "Rental agreement", status: index % 5 === 0 ? "Expiring" : "Verified" },
    ],
    paymentHistory: [
      { label: "June rental", amount: 2800 + index * 45, status: index % 6 === 0 ? "Pending" : "Paid" },
      { label: "Security deposit", amount: 5000, status: "Deposit held" },
      { label: "May rental", amount: 1900 + index * 35, status: "Paid" },
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
  value: 950 + (index % 9) * 380 + index * 42,
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
        author: "Aurum concierge",
        time: "08:48",
        text: `Yes, we can reserve it with delivery to ${customer.location}. I can send a quote and document checklist now.`,
      },
      {
        from: "customer",
        author: customer.name,
        time: "09:06",
        text: index % 3 === 0 ? "Great. Please hold it for me and send payment details." : "Could you also include airport return pickup?",
      },
    ],
  };
});

export const documents: DocumentRecord[] = Array.from({ length: 42 }, (_, index) => ({
  id: `doc-${index + 1}`,
  customerId: customers[(index * 2) % customers.length].id,
  title: `${customers[(index * 2) % customers.length].name} · ${
    ["Passport", "Driving licence", "Rental agreement", "Insurance certificate", "Deposit receipt"][index % 5]
  }`,
  type: ["Passport", "Driving licence", "Agreement", "Insurance", "Deposit"][index % 5] as DocumentRecord["type"],
  status: ["Verified", "Needs review", "Expiring", "Missing"][index % 4] as DocumentRecord["status"],
  updatedAt: `${["Today", "Yesterday", "18 Jun", "16 Jun", "12 Jun"][index % 5]} · ${
    ["09:20", "11:45", "13:10", "15:30"][index % 4]
  }`,
}));

export const revenueByMonth = [
  { month: "Jan", revenue: 188000, bookings: 78 },
  { month: "Feb", revenue: 204000, bookings: 83 },
  { month: "Mar", revenue: 232000, bookings: 91 },
  { month: "Apr", revenue: 248000, bookings: 96 },
  { month: "May", revenue: 286000, bookings: 108 },
  { month: "Jun", revenue: 312000, bookings: 119 },
];

export const operationsTimeline = [
  { time: "09:00", title: "Deliver G63", detail: "Mayfair · Rafael Kingsley", tone: "Delivery" },
  { time: "11:00", title: "Receive Cullinan", detail: "Knightsbridge · post-rental inspection", tone: "Return" },
  { time: "12:00", title: "Vehicle cleaning", detail: "Urus and Bentayga for afternoon pickups", tone: "Prep" },
  { time: "14:00", title: "Airport pickup", detail: "Heathrow T5 · Ghost with chauffeur", tone: "Transfer" },
  { time: "17:00", title: "Return Urus", detail: "Chelsea Harbour · inspect wheels", tone: "Return" },
];

export const aiDemoCards = [
  {
    title: "Summarize this conversation",
    body: "Customer wants a Urus tonight, needs airport return pickup, deposit link pending.",
  },
  {
    title: "Daily operational summary",
    body: "4 returns, 7 pickups, 3 cars in cleaning, and 6 conversations over 30 minutes waiting.",
  },
  {
    title: "Suggested follow-up",
    body: "Ask Noura to upload licence front/back before holding the Cullinan past 13:00.",
  },
  {
    title: "Natural language search",
    body: "Show available SUVs in Mayfair today with revenue above GBP 40k this month.",
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    currency: "GBP",
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
