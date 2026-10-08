import React, { useState, useEffect } from "react";
import {
  GraduationCap, Trophy, Landmark, ArrowRight, Search, Bell, Users,
  Calendar, Sparkles, Wallet, BarChart3, CheckCircle2, XCircle,
  Clock, AlertCircle, LogOut, LayoutGrid, Award, Heart, Settings,
  ShieldCheck, FileText, TrendingUp, TrendingDown, ChevronRight, Plus, Filter,
  ArrowLeft, Zap, Flame, User, Pencil, X, Camera, Check, Eye, EyeOff, Mail,
  Share2, MessageSquare, AlertTriangle, UserCheck, CheckSquare, Layers, Tag,
  ExternalLink, Send, Bookmark, ThumbsUp, RefreshCw, Phone, MapPin, Info
} from "lucide-react";

// ============================================================================
// CONSTANTS & INITIAL DATA
// ============================================================================

export const departments = [
  "Computer Engineering",
  "Information Technology",
  "AI & Data Science",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Management",
  "Design",
  "Other"
];

export const academicYears = ["First Year", "Second Year", "Third Year", "Final Year"];

export const interestOptions = [
  "Technical", "Cultural", "Arts", "Entrepreneurship", "Sports", "Social", "Academic"
];

export const skillSuggestions = [
  "Python", "C++", "Web Development", "Data Structures", "Communication", "Public Speaking",
  "Team Leadership", "Problem Solving", "Design", "Photography", "Video Editing", "Machine Learning", "Financial Modeling"
];

export const eventCategories = ["All", "Technical", "Cultural", "Arts", "Entrepreneurship", "Sports", "Social", "Academic"];
export const clubCategories = ["All", "Technical", "Arts", "Entrepreneurship", "Sports", "Social", "Academic"];
export const eventTypes = ["All", "Workshop", "Hackathon", "Competition", "Seminar", "Cultural", "Tournament", "Drive"];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initials = (n = "") => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export const initialClubs = [
  {
    id: 1,
    name: "Robotics Guild",
    category: "Technical",
    followers: 1240,
    rating: 4.6,
    desc: "Builds autonomous bots, rovers, and competes at national robotics championships.",
    status: "verified",
    activeMembers: 186,
    engagement: 82,
    dept: "Computer Engineering",
    trend: [410, 520, 610, 780, 980, 1240],
    facultyCoordinator: { name: "Dr. Arvind Rao", email: "arvind.rao@dyp.edu", dept: "Mechanical Engineering", verified: true },
    studentCoordinator: { name: "Kabir Mehta", email: "kabir.m@dyp.com", phone: "+91 98201 12345" },
    members: [
      { id: "m1", name: "Kabir Mehta", dept: "Mechanical Engineering", year: "Final Year", role: "Student Coordinator", status: "Active", joined: "Aug 2024" },
      { id: "m2", name: "Devika Nair", dept: "Computer Engineering", year: "Second Year", role: "Core Member", status: "Active", joined: "Sep 2025" },
      { id: "m3", name: "Rohan Varma", dept: "Electronics & Telecommunication", year: "Third Year", role: "Event Coordinator", status: "Active", joined: "Jan 2025" },
      { id: "m4", name: "Priya Sharma", dept: "AI & Data Science", year: "Second Year", role: "Volunteer", status: "Active", joined: "Aug 2025" }
    ],
    announcements: [
      { id: "a1", title: "Registrations for RoboSprint 2026 are live!", date: "Yesterday, 4:00 PM", priority: "Urgent", content: "All teams must submit bot specs by 20 Sep. Hardware testing kits available in Lab 4." },
      { id: "a2", title: "Weekly bot design scrimmage every Friday", date: "4 days ago", priority: "Normal", content: "Join us in the Mechatronics lab for live motor tuning and ROS workshop." }
    ]
  },
  {
    id: 2,
    name: "Kavya — Literary Circle",
    category: "Arts",
    followers: 612,
    rating: 4.8,
    desc: "Poetry slams, open mics, bi-monthly writing workshops and a termly print zine.",
    status: "verified",
    activeMembers: 94,
    engagement: 71,
    dept: "Design",
    trend: [340, 390, 430, 470, 540, 612],
    facultyCoordinator: { name: "Prof. Suniti Sen", email: "suniti.sen@dyp.edu", dept: "Humanities & Design", verified: true },
    studentCoordinator: { name: "Isha Sen", email: "isha.s@dyp.com", phone: "+91 98202 23456" },
    members: [
      { id: "m5", name: "Isha Sen", dept: "Design", year: "Third Year", role: "Student Coordinator", status: "Active", joined: "Jul 2024" },
      { id: "m6", name: "Arjun Das", dept: "Computer Engineering", year: "Second Year", role: "Core Member", status: "Active", joined: "Aug 2025" }
    ],
    announcements: [
      { id: "a3", title: "Theme announced for Monsoon Verses Open Mic", date: "2 days ago", priority: "Normal", content: "Bring your original Hindi, Marathi, and English verses on rain and campus memories." }
    ]
  },
  {
    id: 3,
    name: "Founders' Table",
    category: "Entrepreneurship",
    followers: 894,
    rating: 4.4,
    desc: "Pitch nights, founder AMAs, startup incubators and a small seed grant for student ventures.",
    status: "verified",
    activeMembers: 58,
    engagement: 39,
    dept: "Management",
    trend: [720, 760, 810, 860, 880, 894],
    facultyCoordinator: { name: "Dr. K. G. Joshi", email: "kg.joshi@dyp.edu", dept: "Management", verified: true },
    studentCoordinator: { name: "Tanmay Bapat", email: "tanmay.b@dyp.com", phone: "+91 98203 34567" },
    members: [
      { id: "m7", name: "Tanmay Bapat", dept: "Management", year: "Final Year", role: "Student Coordinator", status: "Active", joined: "Jan 2024" },
      { id: "m8", name: "Siddharth Rao", dept: "Information Technology", year: "Third Year", role: "Event Coordinator", status: "Active", joined: "Jul 2024" }
    ],
    announcements: [
      { id: "a4", title: "Angel Investor Panel confirmed for Pitch Night", date: "3 days ago", priority: "Urgent", content: "Top 3 student startup pitches will receive mentoring and ₹50,000 prototype funding." }
    ]
  },
  {
    id: 4,
    name: "DYP Sports Club",
    category: "Sports",
    followers: 1560,
    rating: 4.7,
    desc: "Inter-college tournaments across cricket, football, badminton, basketball and athletics.",
    status: "verified",
    activeMembers: 240,
    engagement: 88,
    dept: "Other",
    trend: [900, 1020, 1150, 1310, 1460, 1560],
    facultyCoordinator: { name: "Coach M. Deshmukh", email: "m.deshmukh@dyp.edu", dept: "Physical Education", verified: true },
    studentCoordinator: { name: "Sameer Khan", email: "sameer.k@dyp.com", phone: "+91 98204 45678" },
    members: [
      { id: "m9", name: "Sameer Khan", dept: "Civil Engineering", year: "Final Year", role: "Student Coordinator", status: "Active", joined: "Aug 2023" }
    ],
    announcements: [
      { id: "a5", title: "Football trials scheduled for freshers", date: "Yesterday", priority: "Normal", content: "Come to Main Ground at 6:30 AM with college ID card and cleats." }
    ]
  },
  {
    id: 5,
    name: "PixelCraft Design Society",
    category: "Arts",
    followers: 480,
    rating: 4.5,
    desc: "UI/UX, 3D modeling, branding, motion graphics and design sprints run by senior designers.",
    status: "verified",
    activeMembers: 66,
    engagement: 64,
    dept: "Design",
    trend: [220, 280, 330, 390, 440, 480],
    facultyCoordinator: { name: "Prof. Meera Kadam", email: "meera.k@dyp.edu", dept: "Design", verified: true },
    studentCoordinator: { name: "Rhea Chawla", email: "rhea.c@dyp.com", phone: "+91 98205 56789" },
    members: [
      { id: "m10", name: "Rhea Chawla", dept: "Design", year: "Third Year", role: "Student Coordinator", status: "Active", joined: "Sep 2024" }
    ],
    announcements: [
      { id: "a6", title: "Figma Masterclass replay published", date: "5 days ago", priority: "Normal", content: "Component libraries and auto-layout notes uploaded to student resource drive." }
    ]
  },
  {
    id: 6,
    name: "GreenPulse Eco Club",
    category: "Social",
    followers: 356,
    rating: 4.3,
    desc: "Campus sustainability drives, solar auditing, tree plantations and zero-waste initiatives.",
    status: "verified",
    activeMembers: 41,
    engagement: 45,
    dept: "Civil Engineering",
    trend: [210, 240, 270, 300, 330, 356],
    facultyCoordinator: { name: "Dr. S. Patil", email: "s.patil@dyp.edu", dept: "Civil Engineering", verified: true },
    studentCoordinator: { name: "Anil More", email: "anil.m@dyp.com", phone: "+91 98206 67890" },
    members: [
      { id: "m11", name: "Anil More", dept: "Civil Engineering", year: "Second Year", role: "Student Coordinator", status: "Active", joined: "Oct 2024" }
    ],
    announcements: [
      { id: "a7", title: "Campus clean-up drive this Saturday", date: "1 day ago", priority: "Normal", content: "Gloves and eco-bags will be distributed at Main Gate lawn at 7:45 AM." }
    ]
  }
];

export const initialEvents = [
  {
    id: 1,
    name: "Hackathon Night 2.0",
    club: "Robotics Guild",
    category: "Technical",
    eventType: "Hackathon",
    dept: "Computer Engineering",
    date: "14 Sep, 6:00 PM",
    endDate: "15 Sep, 8:00 AM",
    venue: "Main Auditorium & Labs",
    seats: 40,
    filled: 31,
    deadlineDays: 2,
    desc: "14-hour overnight hardware and software sprint. Build assistive robotics, smart IoT solutions, or AI-driven bots with live hardware support.",
    rules: "Teams of 2-4. Laptops mandatory. Components kit provided. Food & drinks on campus.",
    status: "approved",
    isJoint: false,
    attendees: [
      { studentId: "DYP2024CS017", name: "Devika Nair", dept: "Computer Engineering", year: "Second Year", registeredAt: "10 Sep", status: "Registered" },
      { studentId: "DYP2024IT021", name: "Rohan Shah", dept: "Information Technology", year: "Third Year", registeredAt: "11 Sep", status: "Present" }
    ]
  },
  {
    id: 2,
    name: "Open Mic: Monsoon Verses",
    club: "Kavya — Literary Circle",
    category: "Arts",
    eventType: "Cultural",
    dept: "Open to All",
    date: "18 Sep, 5:30 PM",
    endDate: "18 Sep, 8:30 PM",
    venue: "Open Amphitheatre",
    seats: 80,
    filled: 52,
    deadlineDays: 5,
    desc: "Recite your poetry, acoustic melodies, and spoken word pieces under the campus evening lights.",
    rules: "Slots are 4 minutes each. Original material encouraged. Acoustic instruments welcome.",
    status: "approved",
    isJoint: false,
    attendees: []
  },
  {
    id: 3,
    name: "Pitch Night Vol. 4",
    club: "Founders' Table",
    category: "Entrepreneurship",
    eventType: "Competition",
    dept: "Management",
    date: "22 Sep, 4:00 PM",
    endDate: "22 Sep, 7:30 PM",
    venue: "Seminar Hall B",
    seats: 60,
    filled: 18,
    deadlineDays: 9,
    desc: "Student startups pitch to angel investors, incubation cell directors, and alumni founders.",
    rules: "3-minute deck pitch followed by 5-minute Q&A. Executive summary deck required upon entry.",
    status: "approved",
    isJoint: false,
    attendees: [
      { studentId: "DYP2024CS017", name: "Devika Nair", dept: "Computer Engineering", year: "Second Year", registeredAt: "08 Sep", status: "Registered" }
    ]
  },
  {
    id: 4,
    name: "Inter-College Football Cup",
    club: "DYP Sports Club",
    category: "Sports",
    eventType: "Tournament",
    dept: "Open to All",
    date: "26 Sep, 7:00 AM",
    endDate: "26 Sep, 5:00 PM",
    venue: "Main Sports Ground",
    seats: 120,
    filled: 97,
    deadlineDays: 4,
    desc: "16 collegiate teams compete in knockout stages for the prestigious Chancellor's Trophy.",
    rules: "FIFA rules, 35 min halves, official college kit mandatory.",
    status: "approved",
    isJoint: false,
    attendees: []
  },
  {
    id: 5,
    name: "UI/UX Design Sprint",
    club: "PixelCraft Design Society",
    category: "Arts",
    eventType: "Workshop",
    dept: "Design",
    date: "30 Sep, 11:00 AM",
    endDate: "30 Sep, 4:00 PM",
    venue: "Design Lab 2",
    seats: 35,
    filled: 12,
    deadlineDays: 12,
    desc: "Hands-on product design sprint: from user problem discovery to high-fidelity Figma interactive prototype.",
    rules: "Figma account required. Prior design background helpful but not mandatory.",
    status: "approved",
    isJoint: false,
    attendees: []
  },
  {
    id: 6,
    name: "Campus Clean-Up Drive",
    club: "GreenPulse Eco Club",
    category: "Social",
    eventType: "Drive",
    dept: "Civil Engineering",
    date: "3 Oct, 8:00 AM",
    endDate: "3 Oct, 11:30 AM",
    venue: "Main Gate Lawn",
    seats: 100,
    filled: 44,
    deadlineDays: 15,
    desc: "Eco-audit, plastic segregation, and mini-nursery plantation around engineering quadrangles.",
    rules: "All tools & safety gloves provided. Earn 100 campus green social credits upon attendance.",
    status: "approved",
    isJoint: false,
    attendees: []
  },
  {
    id: 7,
    name: "Robotics Startup Pitch & Prototype Demo",
    club: "Robotics Guild × Founders' Table",
    coHosts: ["Robotics Guild", "Founders' Table"],
    category: "Technical",
    eventType: "Hackathon",
    dept: "Computer Engineering",
    date: "8 Oct, 3:00 PM",
    endDate: "8 Oct, 7:00 PM",
    venue: "Innovation Hub & Incubation Arena",
    seats: 50,
    filled: 34,
    deadlineDays: 6,
    desc: "Joint flagship initiative: Engineers build functional robotics prototypes while budding founders validate market traction and unit economics.",
    rules: "Interdisciplinary teams of engineers and business students. Top 2 teams qualify for campus incubation.",
    status: "approved",
    isJoint: true,
    attendees: []
  }
];

export const initialApplications = [
  {
    id: 101,
    name: "Astra Astronomy Society",
    category: "Academic",
    dept: "Physics & Astronomy",
    coordinator: "Prof. R. Iyer",
    coordinatorEmail: "r.iyer@dyp.edu",
    student: "Devika Nair",
    studentEmail: "devika.n@dyp.com",
    submitted: "8 Sep 2026",
    status: "pending",
    desc: "Observatory nights, telescope building workshops, and astrophysics guest lectures.",
    reviewNote: ""
  },
  {
    id: 102,
    name: "Shutter Club",
    category: "Arts",
    dept: "Design",
    coordinator: "Dr. A. Mehta",
    coordinatorEmail: "a.mehta@dyp.edu",
    student: "Kabir Shah",
    studentEmail: "kabir.s@dyp.com",
    submitted: "9 Sep 2026",
    status: "pending",
    desc: "Street photography walks, post-production workshops, and event photo coverage across campus.",
    reviewNote: ""
  },
  {
    id: 103,
    name: "FinWise Investment Club",
    category: "Academic",
    dept: "Management",
    coordinator: "Prof. S. Kulkarni",
    coordinatorEmail: "s.kulkarni@dyp.edu",
    student: "Ananya Deshmukh",
    studentEmail: "ananya.d@dyp.com",
    submitted: "10 Sep 2026",
    status: "changes",
    desc: "Stock market mock trading tournaments, personal finance literacy for freshers, and equity valuation.",
    reviewNote: "Please attach the official faculty advisor recommendation letter from the Dean of Commerce."
  }
];

export const initialCollaborations = [
  {
    id: 201,
    initiatorClub: "Robotics Guild",
    partnerClub: "Founders' Table",
    jointEventName: "Robotics Startup Pitch & Prototype Demo",
    category: "Technical",
    description: "Joint initiative bridging engineering hardware with commercial startup execution.",
    purpose: "Help student hardware makers turn prototypes into commercial venture pitches.",
    responsibilities: {
      initiator: "Provide testing labs, sensors, robot demo kits and technical judging.",
      partner: "Curate investor panel, prepare pitch deck templates, coordinate angel judges."
    },
    proposedDate: "8 Oct, 3:00 PM",
    proposedVenue: "Innovation Hub & Incubation Arena",
    expectedSeats: 50,
    status: "accepted",
    createdAt: "5 Sep 2026"
  },
  {
    id: 202,
    initiatorClub: "PixelCraft Design Society",
    partnerClub: "Robotics Guild",
    jointEventName: "Human-Robot Interaction & UI Design Jam",
    category: "Technical",
    description: "Designing touch interfaces and companion mobile apps for autonomous rovers.",
    purpose: "Cross-disciplinary sprint combining hardware engineers and UI/UX designers.",
    responsibilities: {
      initiator: "Lead Figma interface sprint and visual ergonomics workshop.",
      partner: "Provide bot telemetry APIs and hardware simulator."
    },
    proposedDate: "15 Oct, 2:00 PM",
    proposedVenue: "Design Lab 2",
    expectedSeats: 40,
    status: "pending",
    createdAt: "9 Sep 2026"
  }
];

export const demoStudent = {
  name: "Devika Nair",
  studentId: "DYP2024CS017",
  email: "dyp@dyp.com",
  password: "dyp",
  department: "Computer Engineering",
  year: "Second Year",
  photo: null,
  credits: 1240,
  bio: "Passionate full-stack developer and robotics enthusiast. Exploring assistive robotics, ROS, and smart campus IoT solutions.",
  skills: [
    { name: "Python", level: 85 },
    { name: "C++", level: 80 },
    { name: "Web Development", level: 75 },
    { name: "Communication", level: 70 },
    { name: "Team Leadership", level: 60 },
    { name: "Problem Solving", level: 85 }
  ],
  interests: ["Technical", "Entrepreneurship", "Arts"],
  following: { 1: true, 3: true },
  registered: { 1: true, 3: true },
  saved: { 2: true, 7: true }
};

export const adminCredentials = { email: "dyp@dyp.com", adminId: "om.b", password: "dyp" };

export const badges = [
  { icon: Trophy, label: "Event Explorer", desc: "Registered for 3+ campus events" },
  { icon: Zap, label: "Participation Streak", desc: "Attended events 2 months in a row" },
  { icon: Sparkles, label: "Innovation Contributor", desc: "Participated in a hackathon" },
  { icon: Award, label: "Workshop Master", desc: "Earned over 1,000 campus credits" },
  { icon: ShieldCheck, label: "Verified Campus Scholar", desc: "Profile authenticated by DYP" }
];

export const initialStudentNotifications = [
  { id: "sn1", text: "Robotics Guild just published a new event: Hackathon Night 2.0.", time: "2h ago", unread: true, category: "New Event" },
  { id: "sn2", text: "Registration for Hackathon Night 2.0 closes in 2 days. Don't miss out!", time: "4h ago", unread: true, category: "Deadline" },
  { id: "sn3", text: "Your registration for Pitch Night Vol. 4 is confirmed by Founders' Table.", time: "1d ago", unread: false, category: "Registration" },
  { id: "sn4", text: "New Joint Collaboration: Robotics Guild × Founders' Table announced!", time: "2d ago", unread: false, category: "Collaboration" },
  { id: "sn5", text: "You earned 100 Campus Credits for participating in the Tech Induction.", time: "3d ago", unread: false, category: "Credits" }
];

export const initialClubNotifications = [
  { id: "cn1", text: "PixelCraft Design Society sent you a collaboration request for 'Human-Robot Interaction Jam'.", time: "2h ago", unread: true, category: "Collaboration" },
  { id: "cn2", text: "18 new students registered for Hackathon Night 2.0.", time: "5h ago", unread: true, category: "Registration" },
  { id: "cn3", text: "College Admin approved your event 'Hackathon Night 2.0'.", time: "1d ago", unread: false, category: "Approval" }
];

export const initialCollegeNotifications = [
  { id: "adn1", text: "Astra Astronomy Society submitted a new club application.", time: "1h ago", unread: true, category: "Verification" },
  { id: "adn2", text: "Shutter Club submitted a new club application.", time: "4h ago", unread: true, category: "Verification" },
  { id: "adn3", text: "Founders' Table engagement dropped below 40% (consider check-in).", time: "1d ago", unread: false, category: "System Alert" },
  { id: "adn4", text: "Robotics Guild × Founders' Table successfully launched a joint collaboration.", time: "2d ago", unread: false, category: "Collaboration" }
];

// ============================================================================
// AI RECOMMENDATION ENGINE (Transparent, Multi-factor & Explainable)
// ============================================================================

export function getClubRecommendations(clubs, student) {
  const skillCategoryMap = {
    Python: "Technical",
    "C++": "Technical",
    "Web Development": "Technical",
    "Data Structures": "Technical",
    "Problem Solving": "Technical",
    "Machine Learning": "Technical",
    Design: "Arts",
    Photography: "Arts",
    "Video Editing": "Arts",
    Communication: "Cultural",
    "Public Speaking": "Cultural",
    "Team Leadership": "Entrepreneurship",
    "Financial Modeling": "Academic"
  };

  const deptCategoryMap = {
    "Computer Engineering": "Technical",
    "Information Technology": "Technical",
    "AI & Data Science": "Technical",
    "Electronics & Telecommunication": "Technical",
    "Mechanical Engineering": "Technical",
    "Civil Engineering": "Social",
    Management: "Entrepreneurship",
    Design: "Arts"
  };

  const verifiedClubs = clubs.filter((c) => c.status === "verified");

  return verifiedClubs
    .map((c) => {
      let score = 25;
      const reasons = [];

      // 1. Matches student's stated interests
      if (student.interests?.includes(c.category)) {
        score += 25;
        reasons.push(`matches your interest in ${c.category}`);
      }

      // 2. Matches department
      if (deptCategoryMap[student.department] === c.category || c.dept === student.department) {
        score += 20;
        reasons.push(`aligns with your ${student.department} curriculum`);
      }

      // 3. Matches student skills
      const matchedSkill = (student.skills || []).find((s) => skillCategoryMap[s.name] === c.category);
      if (matchedSkill) {
        score += Math.round(matchedSkill.level * 0.25);
        reasons.push(`strengthens your ${matchedSkill.name} skill (${matchedSkill.level}%)`);
      }

      // 4. Activity boost
      if (c.engagement && c.engagement >= 70) {
        score += 10;
        reasons.push(`high campus engagement (${c.engagement}%)`);
      }

      const matchScore = Math.min(98, Math.max(45, Math.round(score)));
      const reasonText = reasons.length > 0
        ? `Recommended because it ${reasons.slice(0, 2).join(" and ")}.`
        : `Trending on campus with ${c.followers} active student followers.`;

      return {
        ...c,
        matchScore,
        reason: reasonText
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

export function getEventRecommendations(events, clubs, student) {
  return events
    .filter((e) => e.status === "approved")
    .map((e) => {
      let score = 30;
      const reasons = [];

      // Followed club boost
      const followedClub = clubs.find((c) => student.following?.[c.id] && (c.name === e.club || e.coHosts?.includes(c.name)));
      if (followedClub) {
        score += 30;
        reasons.push(`hosted by ${followedClub.name} whom you follow`);
      }

      // Stated interest
      if (student.interests?.includes(e.category)) {
        score += 20;
        reasons.push(`matches your ${e.category} interest`);
      }

      // Department or open to all
      if (e.dept === student.department || e.dept === "Open to All") {
        score += 15;
      }

      // Joint collaboration boost
      if (e.isJoint) {
        score += 10;
        reasons.push("featured cross-club collaboration");
      }

      // Skills match
      const skillMatch = (student.skills || []).find((s) =>
        e.name.toLowerCase().includes(s.name.toLowerCase()) ||
        (s.name === "Python" && e.category === "Technical") ||
        (s.name === "C++" && e.category === "Technical")
      );
      if (skillMatch) {
        score += 15;
        reasons.push(`relevant to your ${skillMatch.name} background`);
      }

      const matchScore = Math.min(99, Math.max(50, Math.round(score)));
      const reasonText = reasons.length > 0
        ? `Recommended because it is ${reasons.slice(0, 2).join(" and ")}.`
        : `Popular event in ${e.category} with limited seats left.`;

      return {
        ...e,
        matchScore,
        reason: reasonText
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 2);
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const statusMeta = {
  verified: { label: "Verified", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  approved: { label: "Approved", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "text-amber-700 bg-amber-50 border-amber-200", icon: Clock },
  rejected: { label: "Rejected", color: "text-rose-700 bg-rose-50 border-rose-200", icon: XCircle },
  changes: { label: "Needs Changes", color: "text-blue-700 bg-blue-50 border-blue-200", icon: AlertCircle },
  suspended: { label: "Suspended", color: "text-slate-600 bg-slate-100 border-slate-300", icon: AlertTriangle }
};

export function StatusPill({ status }) {
  const m = statusMeta[status] || statusMeta.pending;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${m.color}`}>
      <Icon size={12} /> {m.label}
    </span>
  );
}

export function ActivenessBadge({ engagement = 50 }) {
  const tier = engagement >= 70
    ? { label: "Highly active", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: Flame }
    : engagement >= 45
    ? { label: "Active", color: "text-amber-700 bg-amber-50 border-amber-200", icon: TrendingUp }
    : { label: "Declining", color: "text-rose-700 bg-rose-50 border-rose-200", icon: TrendingDown };
  const Icon = tier.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${tier.color}`}>
      <Icon size={11} /> {tier.label}
    </span>
  );
}

export function TrendBars({ data = [10, 20, 30, 40, 50, 60], color = "bg-indigo-500" }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t ${color} transition-all`}
          style={{
            height: `${Math.max(12, (v / max) * 100)}%`,
            opacity: 0.35 + (i / (data.length - 1)) * 0.65
          }}
          title={`Month ${i + 1}: ${v}`}
        />
      ))}
    </div>
  );
}

export function StatCard({ label, value, sub, icon: Icon, badge }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {Icon && <Icon size={16} className="text-slate-400" />}
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
      <div className="flex items-center justify-between mt-1">
        {sub && <div className="text-xs text-emerald-600 font-medium">{sub}</div>}
        {badge && <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{badge}</span>}
      </div>
    </div>
  );
}

// ============================================================================
// TOP DEMO BAR & GLOBAL SHELL
// ============================================================================

export function TopDemoBar({ currentPortal, onSwitch, resetData }) {
  return (
    <div className="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-slate-200">CollegeVerse Live Environment</span>
        <span className="text-slate-400 hidden sm:inline">· 3 Synced Portals (State Persisted)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-[11px] mr-1 hidden md:inline">Quick Jump:</span>
        <button
          onClick={() => onSwitch("student")}
          className={`px-2.5 py-1 rounded text-xs transition ${
            currentPortal === "student" ? "bg-indigo-600 text-white font-medium shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          🎓 Student
        </button>
        <button
          onClick={() => onSwitch("club")}
          className={`px-2.5 py-1 rounded text-xs transition ${
            currentPortal === "club" ? "bg-purple-600 text-white font-medium shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          🏆 Club
        </button>
        <button
          onClick={() => onSwitch("college")}
          className={`px-2.5 py-1 rounded text-xs transition ${
            currentPortal === "college" ? "bg-slate-700 text-white font-medium shadow ring-1 ring-slate-500" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          🏛️ College Admin
        </button>
        <button
          onClick={resetData}
          title="Reset to initial default demo data"
          className="ml-2 px-2 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1 text-[11px]"
        >
          <RefreshCw size={11} /> Reset
        </button>
      </div>
    </div>
  );
}

export function Shell({
  portalLabel,
  portalIcon: PIcon,
  accent,
  items,
  active,
  onSelect,
  onExit,
  children,
  name,
  search,
  onSearchChange,
  notifications = [],
  exitLabel = "Logout",
  onBrand
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const unreadCount = localNotifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] flex flex-col font-sans">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col">
          <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
            <button onClick={onBrand} title="Return to Portal Directory" className="flex items-center gap-2 text-left group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base tracking-tight block">College Verse</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Campus Ecosystem</span>
              </div>
            </button>
          </div>

          <div className="px-5 pt-3 pb-2">
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text} ${accent.bg} rounded-lg px-2.5 py-1.5 w-full`}>
              <PIcon size={14} /> {portalLabel}
            </div>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {items.map((it) => {
              const isActive = active === it.key;
              return (
                <button
                  key={it.key}
                  onClick={() => onSelect(it.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <it.icon size={17} className={isActive ? "text-white" : "text-slate-400"} />
                    {it.label}
                  </span>
                  {Boolean(it.badge) && (
                    <span
                      className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${
                        isActive ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {it.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 px-2 py-1 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase">
                {initials(name) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate">{name}</div>
                <div className="text-[11px] text-slate-400 truncate">{portalLabel}</div>
              </div>
            </div>
            <button
              onClick={onExit}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
            >
              <LogOut size={14} /> {exitLabel}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Header Bar */}
          <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6 md:px-8 gap-4">
            {search ? (
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search.value}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={search.placeholder || "Search clubs, events, workshops, categories..."}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/70 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>
            ) : (
              <div className="text-sm font-medium text-slate-500">
                Logged in as <span className="text-slate-900 font-semibold">{name}</span>
              </div>
            )}

            <div className="flex items-center gap-3 relative">
              <div className="relative">
                <button
                  onClick={() => setNotifOpen((o) => !o)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-800">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {localNotifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400">No notifications yet.</div>
                      ) : (
                        localNotifications.map((n) => (
                          <div
                            key={n.id || n.text}
                            className={`p-3.5 flex gap-3 text-left transition ${n.unread ? "bg-indigo-50/40" : "hover:bg-slate-50"}`}
                          >
                            <div className="mt-0.5">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  n.unread ? "bg-indigo-600" : "bg-transparent"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-slate-800 leading-snug font-normal">{n.text}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-400">{n.time}</span>
                                {n.category && (
                                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 rounded">
                                    {n.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Body */}
          <div className="p-6 md:p-8 max-w-6xl w-full mx-auto flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// 1. LANDING WITH HEADER (HOME, ABOUT, FEATURES, CONTACT, LOGIN, GET STARTED)
// ============================================================================

export function Landing({ onEnter }) {
  const [activeSection, setActiveSection] = useState("home");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const scrollToSection = (sec) => {
    setActiveSection(sec);
    const el = document.getElementById(sec);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f4ff] via-white to-white flex flex-col font-sans">
      {/* Complete Professional Header */}
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-lg tracking-tight block">College Verse</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:block">Campus Club & Event Hub</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <button onClick={() => scrollToSection("home")} className="hover:text-indigo-600 transition">Home</button>
          <button onClick={() => scrollToSection("ecosystem")} className="hover:text-indigo-600 transition">Ecosystem</button>
          <button onClick={() => scrollToSection("features")} className="hover:text-indigo-600 transition">Features</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-indigo-600 transition">About</button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-indigo-600 transition">Contact</button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onEnter("student")}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
          >
            Login
          </button>
          <button
            onClick={() => onEnter("roleSelect")}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-sm"
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="max-w-4xl mx-auto text-center px-6 pt-16 pb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-100/70 border border-indigo-200/60 rounded-full px-3.5 py-1 mb-6 mx-auto">
          <Sparkles size={13} /> The Unified Campus Ecosystem
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Everything happening in your college, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">in one place.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover clubs, join events, build skills, collaborate and stay connected with your campus community.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onEnter("student")}
            className="px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 flex items-center gap-2"
          >
            Enter Student Portal <ArrowRight size={16} />
          </button>
          <button
            onClick={() => onEnter("club")}
            className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
          >
            Register Your Club
          </button>
          <button
            onClick={() => onEnter("college")}
            className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
          >
            College Administration
          </button>
        </div>
      </header>

      {/* Visual Ecosystem Section */}
      <section id="ecosystem" className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Trust & Verification Flow</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Students ↔ Verified Clubs ↔ College Administration</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Every club on CollegeVerse undergoes rigorous vetting by the College Administration before appearing publicly. No unauthorized student groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white mb-4 shadow">
              <GraduationCap size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">1. Students</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Explore officially approved clubs, register for hackathons with instant confirmation, save favorite activities, and earn campus credits.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white mb-4 shadow">
              <Trophy size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">2. Verified Clubs</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Register with college verification, submit faculty coordinators, host events, track student attendance, and propose inter-club collaborations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white mb-4 shadow">
              <Landmark size={20} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">3. College Administration</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              The institutional trust layer: verify faculty advisors, approve club registrations, monitor student engagement, and review audit logs.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">Comprehensive Capabilities</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Built Specifically for Modern Campuses</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <Sparkles size={16} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Explainable AI Recommendations</h4>
            <p className="text-slate-500 leading-relaxed">
              Matches events and clubs based on academic department coursework, declared skills, and student activity with clear natural language reasons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Layers size={16} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Inter-Club Collaboration</h4>
            <p className="text-slate-500 leading-relaxed">
              Verified clubs can propose joint initiatives to co-host cross-disciplinary hackathons (e.g., Robotics Guild × Founders' Table).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck size={16} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Institutional Governance</h4>
            <p className="text-slate-500 leading-relaxed">
              Dean and Admin portal gives complete authority over club certifications, faculty coordinator verifications, and audit logs.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-14 border-t border-slate-100 text-left">
        <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/60 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">About CollegeVerse</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Bridging Campus Extracurriculars with Real Accreditation</h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              In most colleges, student clubs operate in silos across fragmented messaging groups with no administrative oversight or centralized event discovery. CollegeVerse solves this by establishing a synchronized platform where students discover authentic events, clubs manage memberships, and administration maintains trust.
            </p>
          </div>
          <div className="w-full md:w-64 bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm text-xs space-y-2 shrink-0">
            <div className="font-bold text-slate-900">Campus Impact:</div>
            <div className="flex justify-between text-slate-600"><span>Verified Clubs:</span><strong>6 Active</strong></div>
            <div className="flex justify-between text-slate-600"><span>Student Participation:</span><strong>86% Avg</strong></div>
            <div className="flex justify-between text-slate-600"><span>Extracurricular Credits:</span><strong>Verified</strong></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-14 border-t border-slate-100 text-left">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Get in Touch</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Extracurricular Affairs Desk</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Have questions regarding club registration, inter-college events, or student credits? Contact the campus administration desk.
            </p>

            <div className="mt-6 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-indigo-600" />
                <span>Student Affairs Center, DYP Engineering Campus, Pune</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-indigo-600" />
                <span>affairs@dyp.edu · support@collegeverse.edu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-indigo-600" />
                <span>+91 (020) 2765-4321 (Ext. 204)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-xs">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Send Campus Inquiry</h4>
            {contactSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 size={16} /> Thank you! Your message has been sent to the Student Affairs Desk.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="College Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Inquiry or feedback..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400 bg-white">
        CollegeVerse Prototype · Production-Ready Multi-Portal Ecosystem
      </footer>
    </div>
  );
}

export function RoleSelect({ onPick, onBack, notice }) {
  const roles = [
    {
      key: "student",
      icon: GraduationCap,
      title: "Student Portal",
      tag: "🎓",
      desc: "Discover opportunities, follow verified clubs, register for events, and get AI recommendations.",
      grad: "from-indigo-600 to-blue-600"
    },
    {
      key: "club",
      icon: Trophy,
      title: "Club Portal",
      tag: "🏆",
      desc: "Register your club, manage verified members, post announcements, and collaborate with other clubs.",
      grad: "from-purple-600 to-fuchsia-600"
    },
    {
      key: "college",
      icon: Landmark,
      title: "College Admin Portal",
      tag: "🏛️",
      desc: "Review pending club applications, verify faculty coordinators, monitor student participation, and maintain campus standards.",
      grad: "from-slate-700 to-slate-900"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f4ff] flex flex-col items-center justify-center px-6 py-12 font-sans relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition"
      >
        <ArrowLeft size={16} /> Back to Landing
      </button>

      <div className="text-center max-w-md mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Select your Portal</h2>
        <p className="text-sm text-slate-500 mt-2">
          Experience the connected campus workflow across all three user personas.
        </p>
      </div>

      {notice && (
        <div className="mb-6 max-w-md text-center text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          {notice}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        {roles.map((r) => (
          <button
            key={r.key}
            onClick={() => onPick(r.key)}
            className="text-left bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.grad} flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-105 transition-transform`}
            >
              <r.icon size={22} />
            </div>
            <div className="font-bold text-slate-900 text-lg">
              {r.tag} {r.title}
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed flex-1">{r.desc}</p>
            <div className="mt-6 text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Enter portal <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 2. STUDENT PORTAL — AUTH
// ============================================================================

export function StudentAuth({ accounts, onLogin, onRegister, onBack }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ identifier: "dyp@dyp.com", password: "dyp" });
  const [r, setR] = useState({
    name: "",
    studentId: "",
    email: "",
    department: departments[0],
    year: academicYears[0],
    password: "",
    confirm: ""
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [info, setInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setFormError("");
    setInfo("");
  };

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    const errs = {};
    if (!f.identifier.trim()) errs.identifier = "Enter your college email or student ID.";
    if (!f.password) errs.password = "Enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const query = f.identifier.trim().toLowerCase();
    const acc = accounts.find((a) => a.email.toLowerCase() === query || a.studentId.toLowerCase() === query);
    if (!acc || acc.password !== f.password) {
      setFormError("Invalid credentials. Try demo credentials: dyp@dyp.com / dyp");
      return;
    }
    onLogin(acc);
  };

  const handleRegisterSubmit = (e) => {
    e?.preventDefault();
    const errs = {};
    if (r.name.trim().length < 2) errs.name = "Enter your full name.";
    if (!/^[A-Za-z0-9-]{4,16}$/.test(r.studentId.trim())) errs.studentId = "Student ID should be 4-16 alphanumeric characters.";
    if (!emailRe.test(r.email.trim())) errs.email = "Enter a valid college email.";
    if (r.password.length < 4) errs.password = "Password must be at least 4 characters.";
    if (r.confirm !== r.password) errs.confirm = "Passwords do not match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const res = onRegister({
      name: r.name.trim(),
      studentId: r.studentId.trim(),
      email: r.email.trim(),
      department: r.department,
      year: r.year,
      password: r.password
    });
    if (res) setFormError(res);
  };

  const handleForgotSubmit = (e) => {
    e?.preventDefault();
    if (!emailRe.test(forgotEmail.trim())) {
      setErrors({ forgot: "Please enter a valid college email address." });
      return;
    }
    setErrors({});
    setInfo(`Reset instructions sent to ${forgotEmail.trim()} (Demo simulated). You may sign in with password "dyp".`);
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center px-6 py-12 font-sans">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-6 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-900">
                {mode === "login" ? "Student Login" : mode === "register" ? "Create Student Account" : "Reset Password"}
              </h3>
              <p className="text-xs text-slate-500">Access your college clubs, events & AI recommendations</p>
            </div>
          </div>

          {mode !== "forgot" && (
            <div className="flex bg-slate-100 p-1 rounded-xl my-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Register
              </button>
            </div>
          )}

          {formError && (
            <div className="mb-4 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {info && (
            <div className="mb-4 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              {info}
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="rounded-xl bg-indigo-50/70 border border-indigo-100 p-3 text-xs text-indigo-800">
                <span className="font-semibold">Demo Account:</span> dyp@dyp.com (or DYP2024CS017) / <span className="font-semibold">dyp</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">College Email or Student ID</label>
                <input
                  type="text"
                  value={f.identifier}
                  onChange={(e) => setF({ ...f, identifier: e.target.value })}
                  placeholder="e.g. dyp@dyp.com or DYP2024CS017"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
                {errors.identifier && <p className="text-[11px] text-rose-600 mt-1">{errors.identifier}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={f.password}
                    onChange={(e) => setF({ ...f, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-sm mt-2"
              >
                Sign In to Campus
              </button>
            </form>
          )}

          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => setR({ ...r, name: e.target.value })}
                  placeholder="e.g. Aarav Patil"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Student ID</label>
                  <input
                    type="text"
                    value={r.studentId}
                    onChange={(e) => setR({ ...r, studentId: e.target.value })}
                    placeholder="DYP2025CS042"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {errors.studentId && <p className="text-[11px] text-rose-600 mt-1">{errors.studentId}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">College Email</label>
                  <input
                    type="email"
                    value={r.email}
                    onChange={(e) => setR({ ...r, email: e.target.value })}
                    placeholder="name@dyp.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                  <select
                    value={r.department}
                    onChange={(e) => setR({ ...r, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Academic Year</label>
                  <select
                    value={r.year}
                    onChange={(e) => setR({ ...r, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    {academicYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                  <input
                    type="password"
                    value={r.password}
                    onChange={(e) => setR({ ...r, password: e.target.value })}
                    placeholder="Min 4 chars"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={r.confirm}
                    onChange={(e) => setR({ ...r, confirm: e.target.value })}
                    placeholder="Re-type password"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {errors.confirm && <p className="text-[11px] text-rose-600 mt-1">{errors.confirm}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-sm mt-3"
              >
                Register & Sign In
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Enter your registered college email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="e.g. devika.n@dyp.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                {errors.forgot && <p className="text-[11px] text-rose-600 mt-1">{errors.forgot}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
              >
                Send Password Reset Link
              </button>

              <button
                type="button"
                onClick={() => switchMode("login")}
                className="w-full text-xs font-medium text-slate-500 hover:text-slate-800 py-1"
              >
                ← Return to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. STUDENT PORTAL — PROFILE PAGE (NAME, EMAIL, PHOTO, DEPT, YEAR, SKILLS, BIO)
// ============================================================================

export function StudentProfileView({ profile, onSave, clubs, following, events, registered, saved, earnedBadges }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [newSkill, setNewSkill] = useState({ name: "", level: 75 });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");

  const followedClubs = clubs.filter((c) => following[c.id]);
  const registeredEvents = events.filter((e) => registered[e.id]);
  const savedEvents = events.filter((e) => saved[e.id]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((err) => ({ ...err, photo: "Please upload an image file." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    const name = newSkill.name.trim();
    if (!name) return;
    if (draft.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setErrors((err) => ({ ...err, skill: "Skill already exists." }));
      return;
    }
    setDraft((prev) => ({
      ...prev,
      skills: [...prev.skills, { name, level: Number(newSkill.level) || 50 }]
    }));
    setNewSkill({ name: "", level: 75 });
    setErrors((err) => ({ ...err, skill: null }));
  };

  const handleRemoveSkill = (skillName) => {
    setDraft((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName)
    }));
  };

  const toggleInterest = (interest) => {
    setDraft((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const handleSave = () => {
    if (!draft.name.trim()) {
      setErrors((err) => ({ ...err, name: "Name cannot be empty." }));
      return;
    }
    onSave(draft);
    setEditing(false);
    setFeedback("Profile updated successfully!");
    setTimeout(() => setFeedback(""), 4000);
  };

  const current = editing ? draft : profile;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Profile</h1>
          <p className="text-xs text-slate-500">Your campus academic identity, bio, and extracurricular track record</p>
        </div>
        {!editing ? (
          <button
            onClick={() => {
              setDraft(profile);
              setEditing(true);
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
          >
            <Pencil size={13} /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
            >
              <Check size={14} /> Save Changes
            </button>
          </div>
        )}
      </div>

      {feedback && (
        <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
          <CheckCircle2 size={14} /> {feedback}
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            {current.photo ? (
              <img src={current.photo} alt="" className="w-24 h-24 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl font-bold flex items-center justify-center shadow">
                {initials(current.name)}
              </div>
            )}
            {editing && (
              <label
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center cursor-pointer text-slate-600 hover:text-slate-900"
                title="Upload Photo"
              >
                <Camera size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block">Full Name</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm w-full max-w-sm font-semibold"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block">Bio & Academic Interests</label>
                  <textarea
                    rows={2}
                    value={draft.bio || ""}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    placeholder="Short bio about yourself..."
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs w-full max-w-lg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">{current.name}</h2>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck size={12} /> Student Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 max-w-xl leading-relaxed">
                  {current.bio || "Student at DYP Engineering Campus exploring extracurricular opportunities."}
                </p>
                <div className="text-xs text-slate-500 mt-2 flex flex-wrap gap-2">
                  <span>ID: <strong className="text-slate-700">{current.studentId}</strong></span>
                  <span>·</span>
                  <span>Email: <strong className="text-slate-700">{current.email}</strong></span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Department</span>
                {editing ? (
                  <select
                    value={draft.department}
                    onChange={(e) => setDraft({ ...draft, department: e.target.value })}
                    className="mt-1 px-2 py-1 rounded border border-slate-200 text-xs w-full bg-white"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                ) : (
                  <strong className="text-slate-800 font-semibold block mt-0.5">{current.department}</strong>
                )}
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Academic Year</span>
                {editing ? (
                  <select
                    value={draft.year}
                    onChange={(e) => setDraft({ ...draft, year: e.target.value })}
                    className="mt-1 px-2 py-1 rounded border border-slate-200 text-xs w-full bg-white"
                  >
                    {academicYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                ) : (
                  <strong className="text-slate-800 font-semibold block mt-0.5">{current.year}</strong>
                )}
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Campus Credits</span>
                <strong className="text-indigo-600 font-bold block mt-0.5 text-sm">
                  {current.credits.toLocaleString()} pts
                </strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Following</span>
                <strong className="text-slate-800 font-semibold block mt-0.5">
                  {followedClubs.length} Clubs
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-600" />
              Skills & Proficiencies
            </h3>
            <span className="text-[11px] text-slate-400">Used by AI recommendation engine</span>
          </div>

          <div className="space-y-3.5">
            {current.skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{s.level}%</span>
                    {editing && (
                      <button
                        onClick={() => handleRemoveSkill(s.name)}
                        className="text-slate-300 hover:text-rose-500 transition"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {editing && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">Add New Skill</span>
              <div className="flex gap-2">
                <input
                  list="skill-suggestions-list"
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g. C++ or Problem Solving"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
                <datalist id="skill-suggestions-list">
                  {skillSuggestions.map((sk) => (
                    <option key={sk} value={sk} />
                  ))}
                </datalist>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 text-xs text-center"
                  title="Skill percentage (0-100)"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  <Plus size={14} />
                </button>
              </div>
              {errors.skill && <p className="text-[11px] text-rose-600 mt-1">{errors.skill}</p>}
            </div>
          )}
        </div>

        {/* Interests Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-purple-600" />
              Interests & Focus Areas
            </h3>
            <span className="text-[11px] text-slate-400">Personalizes event feeds</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => {
              const selected = current.interests.includes(opt);
              return editing ? (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInterest(opt)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                    selected
                      ? "bg-indigo-600 text-white border-indigo-600 font-semibold shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {opt} {selected ? "✓" : "+"}
                </button>
              ) : selected ? (
                <span
                  key={opt}
                  className="text-xs px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100"
                >
                  {opt}
                </span>
              ) : null;
            })}
          </div>

          {/* Badges preview */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" />
              Earned Badges & Credentials
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {earnedBadges.slice(0, 4).map((b) => (
                <div key={b.label} className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 flex items-center gap-2">
                  <b.icon size={16} className="text-amber-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-800 block truncate">{b.label}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. STUDENT PORTAL — DASHBOARD, SEARCH, DISCOVER & EVENTS
// ============================================================================

export function StudentPortal({
  onLogout,
  onBrand,
  clubs,
  events,
  profile,
  onUpdateProfile,
  onToggleFollow,
  onToggleRegister,
  onToggleSave,
  notifications,
  collaborations = []
}) {
  const [tab, setTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [clubCategory, setClubCategory] = useState("All");
  const [eventCategory, setEventCategory] = useState("All");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [eventDeptFilter, setEventDeptFilter] = useState("All");
  const [viewingClub, setViewingClub] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  const following = profile.following || {};
  const registered = profile.registered || {};
  const saved = profile.saved || {};

  const q = searchQuery.trim().toLowerCase();

  // Filter only verified clubs for student view
  const verifiedClubs = clubs.filter((c) => c.status === "verified");

  // Global search filters
  const matchedClubs = verifiedClubs.filter((c) => {
    const matchesCat = clubCategory === "All" || c.category === clubCategory;
    const matchesSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const matchedEvents = events.filter((e) => {
    const matchesCat = eventCategory === "All" || e.category === eventCategory;
    const matchesType = eventTypeFilter === "All" || e.eventType === eventTypeFilter;
    const matchesDept = eventDeptFilter === "All" || e.dept === eventDeptFilter || e.dept === "Open to All";
    const matchesSearch = !q ||
      e.name.toLowerCase().includes(q) ||
      e.club.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      (e.coHosts && e.coHosts.some((h) => h.toLowerCase().includes(q)));
    return matchesCat && matchesType && matchesDept && matchesSearch;
  });

  const registeredCount = Object.values(registered).filter(Boolean).length;
  const savedCount = Object.values(saved).filter(Boolean).length;
  const followedCount = Object.values(following).filter(Boolean).length;

  const clubRecs = getClubRecommendations(clubs, profile);
  const eventRecs = getEventRecommendations(events, clubs, profile);

  const navigationItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "discover", label: "Discover Clubs", icon: Users, badge: verifiedClubs.length },
    { key: "events", label: "Browse Events", icon: Calendar, badge: events.length },
    { key: "registrations", label: "My Registrations", icon: CheckCircle2, badge: registeredCount },
    { key: "saved", label: "Saved Events", icon: Heart, badge: savedCount },
    { key: "collaborations", label: "Joint Initiatives", icon: Layers },
    { key: "skills", label: "My Skills", icon: TrendingUp },
    { key: "achievements", label: "Campus Journey", icon: Award },
    { key: "wallet", label: "Credit Wallet", icon: Wallet },
    { key: "profile", label: "My Profile", icon: User }
  ];

  const EventCard = ({ e }) => {
    const isReg = Boolean(registered[e.id]);
    const isSaved = Boolean(saved[e.id]);
    const seatsLeft = Math.max(0, e.seats - (e.filled || 0));

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                {e.category}
              </span>
              {e.eventType && (
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  {e.eventType}
                </span>
              )}
              {e.isJoint && (
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> Joint Collaboration
                </span>
              )}
            </div>

            <button
              onClick={() => onToggleSave(e.id)}
              className={`p-1.5 rounded-xl border transition ${
                isSaved ? "bg-rose-50 border-rose-200 text-rose-500" : "border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title={isSaved ? "Remove from saved" : "Save event"}
            >
              <Heart size={15} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>

          <h3
            onClick={() => setViewingEvent(e)}
            className="font-bold text-slate-900 text-base mt-2.5 hover:text-indigo-600 transition cursor-pointer"
          >
            {e.name}
          </h3>

          <div className="text-xs text-slate-500 mt-1">
            Organized by: <strong className="text-slate-700">{e.club}</strong>
          </div>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{e.desc}</p>

          <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-slate-400" />
              <span>{e.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark size={13} className="text-slate-400" />
              <span>{e.venue}</span>
            </div>
            {e.deadlineDays && (
              <div className="flex items-center gap-2 text-amber-700 font-medium">
                <Clock size={13} />
                <span>Registration deadline: {e.deadlineDays} days remaining</span>
              </div>
            )}
          </div>

          {/* Seat Capacity Progress */}
          <div className="mt-3.5">
            <div className="flex justify-between text-[11px] text-slate-500 mb-1">
              <span>{e.filled} / {e.seats} registered</span>
              <span className="font-semibold text-slate-700">{seatsLeft} seats left</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  (e.filled / e.seats) >= 0.9 ? "bg-rose-500" : "bg-indigo-600"
                }`}
                style={{ width: `${Math.min(100, (e.filled / e.seats) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setViewingEvent(e)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            Details
          </button>
          <button
            onClick={() => onToggleRegister(e.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
              isReg
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold"
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
            }`}
          >
            {isReg ? "Registered ✓" : "Register Now"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Shell
      portalLabel="Student Portal"
      portalIcon={GraduationCap}
      accent={{ text: "text-indigo-700", bg: "bg-indigo-50" }}
      items={navigationItems}
      active={tab}
      onSelect={setTab}
      onExit={onLogout}
      exitLabel="Logout"
      onBrand={onBrand}
      name={profile.name.split(" ")[0]}
      search={{ value: searchQuery, placeholder: "Search clubs, events, hackathons, robotics..." }}
      onSearchChange={setSearchQuery}
      notifications={notifications}
    >
      {/* Search Header Banner if query typed */}
      {searchQuery.trim() && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
          <div className="text-xs text-indigo-900">
            Showing search results for <strong className="font-bold">"{searchQuery}"</strong>:{" "}
            <span>{matchedClubs.length} Clubs</span> and <span>{matchedEvents.length} Events</span>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-indigo-700 font-semibold hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* MODAL: VIEW CLUB PROFILE */}
      {viewingClub && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setViewingClub(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  {viewingClub.category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{viewingClub.name}</h2>
                <div className="text-xs text-slate-500 mt-0.5">Affiliated with: {viewingClub.dept || "Campus"}</div>
              </div>
              <StatusPill status="verified" />
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">{viewingClub.desc}</p>

            <div className="grid grid-cols-3 gap-3 mt-5 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Followers</span>
                <strong className="text-base font-bold text-slate-800">{viewingClub.followers.toLocaleString()}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Active Members</span>
                <strong className="text-base font-bold text-slate-800">{viewingClub.activeMembers || "—"}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Rating</span>
                <strong className="text-base font-bold text-slate-800">{viewingClub.rating} / 5</strong>
              </div>
            </div>

            {viewingClub.facultyCoordinator && (
              <div className="mt-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-indigo-600" /> Verified Faculty Coordinator
                </h4>
                <div className="text-slate-700">
                  {viewingClub.facultyCoordinator.name} · {viewingClub.facultyCoordinator.dept}
                </div>
                <div className="text-slate-400 mt-0.5">{viewingClub.facultyCoordinator.email}</div>
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onToggleFollow(viewingClub.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                  following[viewingClub.id]
                    ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {following[viewingClub.id] ? "Following ✓" : "Follow Club"}
              </button>
              <button
                onClick={() => setViewingClub(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW EVENT DETAILS */}
      {viewingEvent && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setViewingEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {viewingEvent.category} · {viewingEvent.eventType || "Event"}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{viewingEvent.name}</h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  Organized by <strong className="text-slate-800">{viewingEvent.club}</strong>
                </div>
              </div>
              <button
                onClick={() => onToggleSave(viewingEvent.id)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                <Heart size={16} fill={saved[viewingEvent.id] ? "red" : "none"} className={saved[viewingEvent.id] ? "text-rose-500" : "text-slate-400"} />
              </button>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">{viewingEvent.desc}</p>

            <div className="mt-5 space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time</span>
                <span className="font-semibold text-slate-800">{viewingEvent.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Venue</span>
                <span className="font-semibold text-slate-800">{viewingEvent.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Department</span>
                <span className="font-semibold text-slate-800">{viewingEvent.dept || "Open to All"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Capacity</span>
                <span className="font-semibold text-slate-800">{viewingEvent.filled} / {viewingEvent.seats} Registered</span>
              </div>
            </div>

            {viewingEvent.rules && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs">
                <span className="font-bold text-amber-900 block mb-1">Rules & Prerequisites:</span>
                <p className="text-amber-800 leading-relaxed">{viewingEvent.rules}</p>
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onToggleRegister(viewingEvent.id)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${
                  registered[viewingEvent.id]
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {registered[viewingEvent.id] ? "Registration Confirmed ✓ (Click to Cancel)" : "Register for Event"}
              </button>
              <button
                onClick={() => setViewingEvent(null)}
                className="px-5 py-3 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: DASHBOARD */}
      {tab === "dashboard" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Campus, Today</h1>
            <p className="text-xs text-slate-500 mt-0.5">Welcome back, {profile.name} · {profile.department} ({profile.year})</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Upcoming Events" value={events.length} icon={Calendar} badge="Campus-wide" />
            <StatCard label="My Registrations" value={registeredCount} icon={CheckCircle2} sub="Confirmed" />
            <StatCard label="Followed Clubs" value={followedCount} icon={Heart} sub={`of ${verifiedClubs.length} verified`} />
            <StatCard label="Campus Credits" value={`${profile.credits.toLocaleString()} pts`} icon={Wallet} badge="Top 15%" />
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/30 rounded-3xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles size={15} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">AI Recommendation Engine</h2>
                  <p className="text-[11px] text-slate-500">
                    Matched against your {profile.department} coursework, skills ({profile.skills.map((s) => s.name).join(", ")}), and interests
                  </p>
                </div>
              </div>
              <span className="text-[11px] bg-white border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full font-semibold shadow-sm">
                Personalized
              </span>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 block mb-2.5">Recommended Verified Clubs:</span>
              <div className="grid md:grid-cols-3 gap-4">
                {clubRecs.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setViewingClub(c)}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                          {c.category}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {c.matchScore}% Match
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{c.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{c.desc}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-indigo-800 bg-indigo-50/50 p-2 rounded-xl">
                      💡 {c.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2.5">Recommended Events for You:</span>
              <div className="grid md:grid-cols-2 gap-4">
                {eventRecs.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setViewingEvent(e)}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {e.category} · {e.eventType}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {e.matchScore}% Match
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1.5">{e.name}</h4>
                      <div className="text-[11px] text-slate-500 mt-0.5">by {e.club} · {e.date}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-indigo-800 bg-indigo-50/50 p-2 rounded-xl">
                      🎯 {e.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-base">Happening on Campus Soon</h2>
              <button onClick={() => setTab("events")} className="text-xs font-semibold text-indigo-600 hover:underline">
                View All Events ({events.length}) →
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {events.slice(0, 3).map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: DISCOVER CLUBS */}
      {tab === "discover" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Discover Verified Clubs</h1>
              <p className="text-xs text-slate-500">Only officially verified college clubs appear here</p>
            </div>
            <div className="text-xs text-slate-500">
              Following: <strong className="text-indigo-600 font-bold">{followedCount} Clubs</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
              <Filter size={13} /> Filter:
            </span>
            {clubCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setClubCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition ${
                  clubCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {matchedClubs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              No verified clubs found matching your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {matchedClubs.map((c) => {
                const isFollowed = Boolean(following[c.id]);
                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                          {c.category}
                        </span>
                        <StatusPill status="verified" />
                      </div>

                      <h3 className="font-bold text-slate-900 text-base mt-2.5">{c.name}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{c.desc}</p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                        <span><strong>{c.followers.toLocaleString()}</strong> followers</span>
                        <span>·</span>
                        <span><strong>{c.activeMembers || 0}</strong> active</span>
                      </div>

                      <div className="mt-2.5">
                        <ActivenessBadge engagement={c.engagement || 50} />
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => setViewingClub(c)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                      >
                        View Club
                      </button>
                      <button
                        onClick={() => onToggleFollow(c.id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                          isFollowed
                            ? "bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {isFollowed ? "Following ✓" : "Follow"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: BROWSE EVENTS */}
      {tab === "events" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Browse Campus Events</h1>
              <p className="text-xs text-slate-500">Discover hackathons, workshops, guest lectures and competitions</p>
            </div>
            <div className="text-xs text-slate-500">
              Registered for: <strong className="text-indigo-600 font-bold">{registeredCount} Events</strong>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-slate-400">Category:</span>
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full transition ${
                    eventCategory === cat
                      ? "bg-slate-900 text-white font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Event Type:</span>
                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Department:</span>
                <select
                  value={eventDeptFilter}
                  onChange={(e) => setEventDeptFilter(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                >
                  <option value="All">All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {matchedEvents.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              No events found matching your filter criteria.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {matchedEvents.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: MY REGISTRATIONS */}
      {tab === "registrations" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Registered Events</h1>
            <p className="text-xs text-slate-500">Your confirmed event passes and upcoming schedule</p>
          </div>

          {registeredCount === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              You haven't registered for any events yet. Explore events to grab a seat!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {events.filter((e) => registered[e.id]).map((e) => (
                <div key={e.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} /> Registration Confirmed
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Pass #{e.id}847</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mt-2">{e.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">by {e.club}</div>

                    <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                      <div>📅 <strong>Date:</strong> {e.date}</div>
                      <div>📍 <strong>Venue:</strong> {e.venue}</div>
                      <div>👥 <strong>Student:</strong> {profile.name} ({profile.studentId})</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setViewingEvent(e)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      View Ticket & Rules
                    </button>
                    <button
                      onClick={() => onToggleRegister(e.id)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Cancel Registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: SAVED EVENTS */}
      {tab === "saved" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Saved Events</h1>
            <p className="text-xs text-slate-500">Events you bookmarked for later</p>
          </div>

          {savedCount === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              No saved events yet. Click the heart icon on any event card to save it here.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {events.filter((e) => saved[e.id]).map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: JOINT INITIATIVES & COLLABORATIONS */}
      {tab === "collaborations" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Joint Club Collaborations</h1>
            <p className="text-xs text-slate-500">Interdisciplinary hackathons, jams and events co-hosted by multiple verified clubs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {events.filter((e) => e.isJoint).map((e) => (
              <div key={e.id} className="bg-gradient-to-br from-white via-white to-purple-50/40 rounded-2xl border border-purple-200/80 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={12} /> Co-Hosted Initiative
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mt-3">{e.name}</h3>
                  <div className="text-xs text-slate-600 mt-1 font-semibold flex items-center gap-1">
                    <Users size={13} className="text-purple-600" /> Organized by: {e.club}
                  </div>

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{e.desc}</p>

                  <div className="mt-4 p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-700 space-y-1">
                    <div>📅 {e.date} · 📍 {e.venue}</div>
                    <div>👥 Seats: {e.filled} / {e.seats} filled</div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-purple-100 flex gap-2">
                  <button
                    onClick={() => setViewingEvent(e)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold border border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onToggleRegister(e.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                      registered[e.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {registered[e.id] ? "Registered ✓" : "Register Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: MY SKILLS */}
      {tab === "skills" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Skills & Endorsements</h1>
            <p className="text-xs text-slate-500">Track and update your technical and soft skills</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 max-w-xl">
            <div className="space-y-4">
              {profile.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-slate-800">{s.name}</span>
                    <span className="text-slate-500 font-semibold">{s.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Want to add more skills or change ratings?</span>
              <button
                onClick={() => setTab("profile")}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Edit in Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ACHIEVEMENTS */}
      {tab === "achievements" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Journey & Achievements</h1>
            <p className="text-xs text-slate-500">Badges earned through verified attendance and college participation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {badges.map((b) => (
              <div key={b.label} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                  <b.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{b.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
                  <span className="inline-block mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Unlocked ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: WALLET */}
      {tab === "wallet" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Credit Wallet</h1>
            <p className="text-xs text-slate-500">Digital extracurricular points recognized for academic transcripts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">Official Campus Balance</span>
                <div className="text-4xl font-extrabold mt-2 tracking-tight">
                  {profile.credits.toLocaleString()} <span className="text-lg font-normal text-indigo-200">Credits</span>
                </div>
                <div className="text-xs text-indigo-100 mt-2">
                  Authenticated by DYP College Extracurricular Cell
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex justify-between text-xs text-indigo-100">
                <span>Student ID: {profile.studentId}</span>
                <span>Active Status: Good Standing</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Credit Earning Opportunities</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>Attend Hackathon / Technical Meet</span>
                  <strong className="text-indigo-600 font-bold">+150 pts</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>Join Verified Club as Core Member</span>
                  <strong className="text-indigo-600 font-bold">+200 pts</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>Social & Environmental Drive</span>
                  <strong className="text-indigo-600 font-bold">+100 pts</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span>Win Inter-College Tournament</span>
                  <strong className="text-indigo-600 font-bold">+350 pts</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PROFILE */}
      {tab === "profile" && (
        <StudentProfileView
          profile={profile}
          onSave={onUpdateProfile}
          clubs={clubs}
          following={following}
          events={events}
          registered={registered}
          saved={saved}
          earnedBadges={badges}
        />
      )}
    </Shell>
  );
}

// ============================================================================
// 5. CLUB PORTAL — MANAGEMENT, COLLABORATION & VERIFICATION FLOW
// ============================================================================

export function ClubPortal({
  onExit,
  clubs,
  myApplication,
  onSubmitApplication,
  events,
  onCreateEvent,
  collaborations,
  onProposeCollaboration,
  onDecideCollaboration,
  onPublishAnnouncement,
  onUpdateAttendance
}) {
  const [tab, setTab] = useState("overview");
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 1);
  const [regSearch, setRegSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Technical",
    desc: "",
    dept: departments[0],
    coordinator: "",
    coordinatorEmail: "",
    student: "",
    studentEmail: "",
    phone: ""
  });

  const [eventForm, setEventForm] = useState({
    name: "",
    category: "Technical",
    eventType: "Workshop",
    date: "",
    time: "10:00 AM",
    venue: "",
    seats: 50,
    deadlineDays: 7,
    desc: "",
    rules: "",
    dept: "Open to All"
  });

  const [collabForm, setCollabForm] = useState({
    partnerClub: "",
    jointEventName: "",
    category: "Technical",
    purpose: "",
    proposedDate: "",
    proposedVenue: "",
    expectedSeats: 60,
    responsibilitiesInitiator: "",
    responsibilitiesPartner: ""
  });

  const [announcementText, setAnnouncementText] = useState({ title: "", content: "", priority: "Normal" });
  const [newMember, setNewMember] = useState({ name: "", dept: departments[0], year: academicYears[0], role: "Core Member" });

  const activeClub = myApplication?.status === "verified"
    ? clubs.find((c) => c.name.toLowerCase() === myApplication.name.toLowerCase()) || {
        ...myApplication,
        followers: 120,
        activeMembers: 24,
        rating: 4.8,
        engagement: 75,
        trend: [10, 25, 40, 65, 90, 120],
        members: [
          { id: "cm1", name: myApplication.student || "You", dept: myApplication.dept, year: "Third Year", role: "Student Coordinator", status: "Active" }
        ],
        announcements: []
      }
    : clubs[0];

  const verifiedClubsList = clubs.filter((c) => c.status === "verified");

  if (!myApplication && activeClub.name !== "Robotics Guild") {
    return (
      <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center px-6 py-12 font-sans">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <button onClick={onExit} className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-5">
            <ArrowLeft size={16} /> Back to Portal Switcher
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Trophy size={20} />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-slate-900">Register Your Club</h2>
              <p className="text-xs text-slate-500">Every club must be verified by the College Administration</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitApplication(form);
            }}
            className="space-y-4 mt-6"
          >
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Club Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Artificial Intelligence Collective"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {["Technical", "Cultural", "Sports", "Arts", "Entrepreneurship", "Social", "Academic"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Affiliated Department</label>
                <select
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Club Description & Purpose</label>
              <textarea
                required
                rows={3}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                placeholder="Describe what your club does, frequency of events, and campus mission..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
              <span className="text-xs font-bold text-purple-900 block flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-purple-600" /> Faculty Coordinator Details (Required for Verification)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Prof. Name (e.g. Dr. K. Patil)"
                  value={form.coordinator}
                  onChange={(e) => setForm({ ...form, coordinator: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Email (e.g. k.patil@dyp.edu)"
                  value={form.coordinatorEmail}
                  onChange={(e) => setForm({ ...form, coordinatorEmail: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-purple-200 bg-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Student Lead / Coordinator</label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={form.student}
                  onChange={(e) => setForm({ ...form, student: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition shadow-md mt-4"
            >
              Submit for College Verification →
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (myApplication && myApplication.status === "pending") {
    return (
      <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center px-6 py-12 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Clock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application Pending Review</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Your registration for <strong className="text-slate-800">{myApplication.name}</strong> has been transmitted to the College Administration Verification Center.
          </p>
          <div className="mt-5 inline-block">
            <StatusPill status="pending" />
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-left text-slate-600 space-y-1.5">
            <div><strong>Faculty Advisor:</strong> {myApplication.coordinator} ({myApplication.coordinatorEmail})</div>
            <div><strong>Department:</strong> {myApplication.dept}</div>
            <div><strong>Submitted:</strong> {myApplication.submitted}</div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <span className="text-[11px] text-indigo-700 bg-indigo-50 p-2 rounded-xl font-medium">
              👉 Tip: Switch to the <strong>College Admin Portal</strong> in the top bar to review & approve this application live!
            </span>
            <button onClick={onExit} className="text-xs text-slate-500 hover:text-slate-800 py-1">
              ← Return to Portals
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (myApplication && myApplication.status === "changes") {
    return (
      <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center px-6 py-12 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-200">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center">College Admin Requested Changes</h2>
          <div className="mt-2 text-center">
            <StatusPill status="changes" />
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
            <strong>Admin Note:</strong> {myApplication.reviewNote || "Please review advisor credentials and resubmit."}
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                onSubmitApplication({
                  ...myApplication,
                  status: "pending",
                  submitted: "Resubmitted today"
                });
              }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Update & Resubmit for Verification
            </button>
            <button onClick={onExit} className="w-full text-xs text-slate-500 hover:text-slate-800 py-2 mt-2">
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (myApplication && myApplication.status === "rejected") {
    return (
      <div className="min-h-screen bg-[#f5f4ff] flex items-center justify-center px-6 py-12 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-200">
            <XCircle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Application Declined</h2>
          <div className="mt-2">
            <StatusPill status="rejected" />
          </div>
          <p className="text-xs text-slate-600 mt-3">
            Reason: {myApplication.reviewNote || "Club duplicate or criteria not met."}
          </p>
          <button onClick={onExit} className="mt-6 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            Return to Portals
          </button>
        </div>
      </div>
    );
  }

  // Verified full club management dashboard
  const clubName = myApplication?.status === "verified" ? myApplication.name : "Robotics Guild";
  const clubData = clubs.find((c) => c.name.toLowerCase() === clubName.toLowerCase()) || activeClub;

  const clubEvents = events.filter((e) => e.club.toLowerCase().includes(clubName.toLowerCase()));
  const currentEvent = events.find((e) => e.id === Number(selectedEventId)) || clubEvents[0] || events[0];

  const clubCollaborations = collaborations.filter(
    (c) => c.initiatorClub === clubName || c.partnerClub === clubName
  );

  const pendingIncomingCollabs = collaborations.filter(
    (c) => c.partnerClub === clubName && c.status === "pending"
  );

  const clubNav = [
    { key: "overview", label: "Overview", icon: LayoutGrid },
    { key: "events", label: "Events & Schedule", icon: Calendar, badge: clubEvents.length },
    { key: "create", label: "Create Event", icon: Plus },
    { key: "registrations", label: "Registrations & Attendance", icon: CheckSquare },
    { key: "members", label: "Member Management", icon: Users, badge: clubData.members?.length || 4 },
    { key: "collaborations", label: "Club Collaboration", icon: Layers, badge: pendingIncomingCollabs.length },
    { key: "announcements", label: "Announcements", icon: MessageSquare },
    { key: "analytics", label: "Club Analytics", icon: BarChart3 }
  ];

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.name.trim()) return;
    onCreateEvent({
      id: Date.now(),
      name: eventForm.name.trim(),
      club: clubName,
      category: eventForm.category,
      eventType: eventForm.eventType,
      dept: eventForm.dept,
      date: eventForm.date || "Next Week, 5:00 PM",
      venue: eventForm.venue || "Campus Auditorium",
      seats: Number(eventForm.seats) || 50,
      filled: 0,
      deadlineDays: Number(eventForm.deadlineDays) || 5,
      desc: eventForm.desc || "Interactive event hosted by " + clubName,
      rules: eventForm.rules || "Standard college rules apply.",
      status: "approved",
      isJoint: false,
      attendees: []
    });
    setEventForm({
      name: "",
      category: "Technical",
      eventType: "Workshop",
      date: "",
      time: "10:00 AM",
      venue: "",
      seats: 50,
      deadlineDays: 7,
      desc: "",
      rules: "",
      dept: "Open to All"
    });
    setTab("events");
  };

  const handleProposeCollabSubmit = (e) => {
    e.preventDefault();
    if (!collabForm.partnerClub || !collabForm.jointEventName) return;
    onProposeCollaboration({
      id: Date.now(),
      initiatorClub: clubName,
      partnerClub: collabForm.partnerClub,
      jointEventName: collabForm.jointEventName,
      category: collabForm.category,
      purpose: collabForm.purpose,
      proposedDate: collabForm.proposedDate || "TBD",
      proposedVenue: collabForm.proposedVenue || "Campus Center",
      expectedSeats: Number(collabForm.expectedSeats) || 60,
      responsibilities: {
        initiator: collabForm.responsibilitiesInitiator || "Technical lead",
        partner: collabForm.responsibilitiesPartner || "Co-organizing lead"
      },
      status: "pending",
      createdAt: "Today"
    });
    setCollabForm({
      partnerClub: "",
      jointEventName: "",
      category: "Technical",
      purpose: "",
      proposedDate: "",
      proposedVenue: "",
      expectedSeats: 60,
      responsibilitiesInitiator: "",
      responsibilitiesPartner: ""
    });
  };

  return (
    <Shell
      portalLabel="Club Portal"
      portalIcon={Trophy}
      accent={{ text: "text-purple-700", bg: "bg-purple-50" }}
      items={clubNav}
      active={tab}
      onSelect={setTab}
      onExit={onExit}
      name={clubName}
      notifications={initialClubNotifications}
    >
      {tab === "overview" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{clubName}</h1>
                <StatusPill status="verified" />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Category: <strong>{clubData.category}</strong> · Faculty Coordinator: <strong>{clubData.facultyCoordinator?.name || "Dr. Arvind Rao"}</strong>
              </p>
            </div>
            <button
              onClick={() => setTab("create")}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
            >
              <Plus size={14} /> New Event
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Followers" value={(clubData.followers || 1240).toLocaleString()} icon={Heart} sub="+18% this month" />
            <StatCard label="Active Members" value={clubData.activeMembers || 186} icon={Users} sub="Core roster" />
            <StatCard label="Upcoming Events" value={clubEvents.length} icon={Calendar} badge="Published" />
            <StatCard label="Avg Club Rating" value={`${clubData.rating || 4.6} / 5`} icon={Award} sub="From 380 reviews" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">Club Health & Student Activeness</span>
              <div className="mt-2 flex items-center gap-3">
                <ActivenessBadge engagement={clubData.engagement || 82} />
                <span className="text-xs text-slate-600 font-medium">{clubData.engagement || 82}% engagement score</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 max-w-md">
                Measures student attendance, registration conversion, and participation over the past 30 days.
              </p>
            </div>
            <div className="w-full md:w-56">
              <span className="text-[11px] text-slate-400 block mb-1 text-right">6-Month Follower Growth</span>
              <TrendBars data={clubData.trend || [400, 600, 800, 950, 1100, 1240]} color="bg-purple-600" />
            </div>
          </div>

          <div className="bg-purple-50/60 rounded-2xl border border-purple-100 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">Institutional Anchor</span>
                <div className="text-sm font-bold text-slate-900">{clubData.facultyCoordinator?.name || "Dr. Arvind Rao"}</div>
                <div className="text-xs text-slate-500">{clubData.facultyCoordinator?.dept || "Mechanical Engineering"} · {clubData.facultyCoordinator?.email || "arvind.rao@dyp.edu"}</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Approved by Dean ✓
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Active Club Events</h3>
              <button onClick={() => setTab("events")} className="text-xs font-semibold text-purple-600 hover:underline">
                Manage Events →
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {clubEvents.map((e) => (
                <div key={e.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-semibold text-slate-900 text-sm block">{e.name}</span>
                    <span className="text-xs text-slate-400">{e.date} · {e.venue}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-600">{e.filled} / {e.seats} registered</span>
                    <button
                      onClick={() => {
                        setSelectedEventId(e.id);
                        setTab("registrations");
                      }}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                    >
                      Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Events</h1>
              <p className="text-xs text-slate-500">Events organized or co-hosted by {clubName}</p>
            </div>
            <button
              onClick={() => setTab("create")}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              + Create Event
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {clubEvents.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                      {e.category} · {e.eventType}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Published
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mt-3">{e.name}</h3>
                  <div className="text-xs text-slate-500 mt-1">Host: {e.club}</div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{e.desc}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                    <div>📅 {e.date} · 📍 {e.venue}</div>
                    <div>👥 Registrations: <strong>{e.filled} / {e.seats}</strong></div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEventId(e.id);
                      setTab("registrations");
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
                  >
                    View Registered Students
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "create" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Club Event</h1>
            <p className="text-xs text-slate-500">Publish a new competition, workshop, or hackathon for campus discovery</p>
          </div>

          <form onSubmit={handleCreateEventSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Event Name</label>
              <input
                type="text"
                required
                value={eventForm.name}
                onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                placeholder="e.g. Autonomous Rover Challenge 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {["Technical", "Cultural", "Sports", "Arts", "Entrepreneurship", "Social", "Academic"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Event Type</label>
                <select
                  value={eventForm.eventType}
                  onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {["Workshop", "Hackathon", "Competition", "Seminar", "Cultural", "Tournament", "Drive"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Date & Time</label>
                <input
                  type="text"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  placeholder="e.g. 24 Oct, 5:00 PM"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  placeholder="e.g. Robotics Center / Audi 2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Max Capacity (Seats)</label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={eventForm.seats}
                  onChange={(e) => setEventForm({ ...eventForm, seats: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Department</label>
                <select
                  value={eventForm.dept}
                  onChange={(e) => setEventForm({ ...eventForm, dept: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Open to All">Open to All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={eventForm.desc}
                onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}
                placeholder="Overview of activities, speaker profiles, and learning outcomes..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition mt-2 shadow"
            >
              Publish Event to Student Portal
            </button>
          </form>
        </div>
      )}

      {tab === "registrations" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Event Registrations & Attendance</h1>
              <p className="text-xs text-slate-500">Track student signups and mark physical attendance for campus credits</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Select Event:</span>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-semibold"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name} ({ev.filled} registered)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{currentEvent.name}</h3>
                <span className="text-xs text-slate-400">{currentEvent.date} · {currentEvent.venue}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="bg-slate-100 px-3 py-1 rounded-lg">
                  Registered: <strong>{currentEvent.filled} / {currentEvent.seats}</strong>
                </span>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Student ID</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Academic Year</th>
                    <th className="py-2.5 px-3">Registered Date</th>
                    <th className="py-2.5 px-3 text-right">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { studentId: "DYP2024CS017", name: "Devika Nair", dept: "Computer Engineering", year: "Second Year", date: "10 Sep", status: "Present" },
                    { studentId: "DYP2024IT021", name: "Rohan Shah", dept: "Information Technology", year: "Third Year", date: "11 Sep", status: "Present" },
                    { studentId: "DYP2025ME009", name: "Tanmay Patil", dept: "Mechanical Engineering", year: "First Year", date: "12 Sep", status: "Registered" },
                    { studentId: "DYP2024AI034", name: "Ananya Roy", dept: "AI & Data Science", year: "Second Year", date: "13 Sep", status: "Registered" }
                  ]
                    .filter((s) => !regSearch || s.name.toLowerCase().includes(regSearch.toLowerCase()) || s.studentId.toLowerCase().includes(regSearch.toLowerCase()))
                    .map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-3 font-semibold text-slate-800">{s.name}</td>
                        <td className="py-3 px-3 text-slate-500">{s.studentId}</td>
                        <td className="py-3 px-3 text-slate-600">{s.dept}</td>
                        <td className="py-3 px-3 text-slate-500">{s.year}</td>
                        <td className="py-3 px-3 text-slate-400">{s.date}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onUpdateAttendance && onUpdateAttendance(currentEvent.id, s.studentId)}
                            className={`px-3 py-1 rounded-lg font-semibold transition ${
                              s.status === "Present"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {s.status === "Present" ? "Present ✓" : "Mark Present"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "members" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Member Roster & Roles</h1>
              <p className="text-xs text-slate-500">Assign leadership positions and track active club contributors</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Official Club Members</h3>
              <div className="divide-y divide-slate-100">
                {(clubData.members || []).map((m) => (
                  <div key={m.id || m.name} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{m.name}</span>
                      <span className="text-slate-400">{m.dept} · {m.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold border border-purple-100">
                        {m.role}
                      </span>
                      <span className="text-emerald-600 font-medium">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Add Core Member</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="e.g. Sahil Kulkarni"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Department</label>
                  <select
                    value={newMember.dept}
                    onChange={(e) => setNewMember({ ...newMember, dept: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Assigned Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Core Member">Core Member</option>
                    <option value="Event Coordinator">Event Coordinator</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Student Coordinator">Student Coordinator</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newMember.name.trim()) return;
                    clubData.members = [...(clubData.members || []), { ...newMember, id: "m" + Date.now(), status: "Active" }];
                    setNewMember({ name: "", dept: departments[0], year: academicYears[0], role: "Core Member" });
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition mt-2"
                >
                  Add Member to Roster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CLUB COLLABORATION */}
      {tab === "collaborations" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Collaboration Hub</h1>
            <p className="text-xs text-slate-500">
              Verified clubs can propose interdisciplinary collaborations to co-host events (e.g. Robotics × Founders' Table)
            </p>
          </div>

          {pendingIncomingCollabs.length > 0 && (
            <div className="p-5 rounded-3xl bg-purple-50 border border-purple-200 space-y-3">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Sparkles size={16} /> Incoming Collaboration Requests
              </div>
              {pendingIncomingCollabs.map((req) => (
                <div key={req.id} className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase">Proposed by {req.initiatorClub}</span>
                    <h4 className="font-bold text-slate-900 text-base mt-0.5">{req.jointEventName}</h4>
                    <p className="text-xs text-slate-600 mt-1">{req.purpose || req.description}</p>
                    <div className="text-[11px] text-slate-400 mt-2">Proposed: {req.proposedDate} · {req.proposedVenue}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onDecideCollaboration(req.id, "accepted")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      Accept & Create Joint Event
                    </button>
                    <button
                      onClick={() => onDecideCollaboration(req.id, "rejected")}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-1">Propose New Collaboration</h3>
              <p className="text-xs text-slate-500 mb-4">Send a partnership proposal to another verified club</p>

              <form onSubmit={handleProposeCollabSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Select Partner Verified Club</label>
                  <select
                    required
                    value={collabForm.partnerClub}
                    onChange={(e) => setCollabForm({ ...collabForm, partnerClub: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="">-- Choose verified partner --</option>
                    {verifiedClubsList
                      .filter((c) => c.name !== clubName)
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.category})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Joint Event Title</label>
                  <input
                    type="text"
                    required
                    value={collabForm.jointEventName}
                    onChange={(e) => setCollabForm({ ...collabForm, jointEventName: e.target.value })}
                    placeholder="e.g. AI Product Design & Launch Jam"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Purpose & Vision</label>
                  <textarea
                    rows={2}
                    required
                    value={collabForm.purpose}
                    onChange={(e) => setCollabForm({ ...collabForm, purpose: e.target.value })}
                    placeholder="Why collaborate? What value does this bring to campus students?"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Your Club's Role</label>
                    <input
                      type="text"
                      value={collabForm.responsibilitiesInitiator}
                      onChange={(e) => setCollabForm({ ...collabForm, responsibilitiesInitiator: e.target.value })}
                      placeholder="e.g. Technical mentoring"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Partner Club's Role</label>
                    <input
                      type="text"
                      value={collabForm.responsibilitiesPartner}
                      onChange={(e) => setCollabForm({ ...collabForm, responsibilitiesPartner: e.target.value })}
                      placeholder="e.g. Pitch deck review"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Proposed Date</label>
                    <input
                      type="text"
                      value={collabForm.proposedDate}
                      onChange={(e) => setCollabForm({ ...collabForm, proposedDate: e.target.value })}
                      placeholder="e.g. 15 Nov, 4:00 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Proposed Venue</label>
                    <input
                      type="text"
                      value={collabForm.proposedVenue}
                      onChange={(e) => setCollabForm({ ...collabForm, proposedVenue: e.target.value })}
                      placeholder="e.g. Main Auditorium"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition mt-2 shadow"
                >
                  Send Collaboration Proposal →
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-1">Active Collaborations</h3>
              <p className="text-xs text-slate-500 mb-4">Past and active partnerships involving your club</p>

              <div className="space-y-3">
                {clubCollaborations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4">No active collaborations yet.</p>
                ) : (
                  clubCollaborations.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">{c.jointEventName}</span>
                          <span className="text-purple-700 font-semibold text-[11px]">
                            {c.initiatorClub} × {c.partnerClub}
                          </span>
                        </div>
                        <StatusPill status={c.status === "accepted" ? "verified" : c.status} />
                      </div>
                      <p className="text-slate-500 mt-2">{c.purpose || c.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ANNOUNCEMENTS */}
      {tab === "announcements" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Announcements</h1>
            <p className="text-xs text-slate-500">Broadcast updates directly to all students following {clubName}</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Publish New Announcement</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Title (e.g. Schedule change for Friday's session)"
                value={announcementText.title}
                onChange={(e) => setAnnouncementText({ ...announcementText, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
              <textarea
                rows={3}
                placeholder="Details of the announcement..."
                value={announcementText.content}
                onChange={(e) => setAnnouncementText({ ...announcementText, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (!announcementText.title.trim()) return;
                  onPublishAnnouncement(clubName, {
                    id: "a" + Date.now(),
                    title: announcementText.title,
                    content: announcementText.content,
                    date: "Just now",
                    priority: "Normal"
                  });
                  setAnnouncementText({ title: "", content: "", priority: "Normal" });
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <Send size={13} /> Broadcast to Followers
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Published Announcements</h3>
            {(clubData.announcements || []).map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 text-sm">{a.title}</span>
                  <span className="text-[10px] text-slate-400">{a.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed mt-1">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ANALYTICS */}
      {tab === "analytics" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Analytics & Insights</h1>
            <p className="text-xs text-slate-500">Longitudinal engagement metrics and workshop conversion</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-700 block mb-3">Follower Growth (Last 6 Months)</span>
              <TrendBars data={clubData.trend || [400, 520, 680, 890, 1050, 1240]} color="bg-indigo-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span>Start: 400 followers</span>
                <span className="text-emerald-600 font-bold">+210% Net Growth</span>
                <span>Current: 1,240</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-700 block mb-3">Event Capacity Conversion</span>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hackathon Night 2.0</span>
                    <strong className="text-slate-800">77% filled</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-purple-600" style={{ width: "77%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Robotics Startup Pitch (Joint)</span>
                    <strong className="text-slate-800">68% filled</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: "68%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

// ============================================================================
// 6. COLLEGE ADMIN PORTAL — VERIFICATION, CLUBS & AUDIT
// ============================================================================

export function CollegePortal({
  onExit,
  applications,
  clubs,
  events,
  onDecide,
  onToggleSuspendClub,
  notifications
}) {
  const [tab, setTab] = useState("verify");
  const [decisionModal, setDecisionModal] = useState(null);
  const [decisionReason, setDecisionReason] = useState("");

  const pendingApps = applications.filter((a) => a.status === "pending");
  const verifiedClubs = clubs.filter((c) => c.status === "verified");
  const rejectedApps = applications.filter((a) => a.status === "rejected");

  const adminNav = [
    { key: "verify", label: "Club Verification Center", icon: ShieldCheck, badge: pendingApps.length },
    { key: "clubs", label: "Manage Verified Clubs", icon: Users, badge: verifiedClubs.length },
    { key: "events", label: "Campus Events Monitor", icon: Calendar, badge: events.length },
    { key: "analytics", label: "Institutional Analytics", icon: BarChart3 },
    { key: "audit", label: "Audit & Governance Logs", icon: FileText }
  ];

  const handleDecisionSubmit = () => {
    if (!decisionModal) return;
    onDecide(decisionModal.appId, decisionModal.type, decisionReason);
    setDecisionModal(null);
    setDecisionReason("");
  };

  return (
    <Shell
      portalLabel="College Administration"
      portalIcon={Landmark}
      accent={{ text: "text-slate-800", bg: "bg-slate-100" }}
      items={adminNav}
      active={tab}
      onSelect={setTab}
      onExit={onExit}
      name="Admin (Dean's Office)"
      notifications={notifications}
    >
      {decisionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-slate-900">
              {decisionModal.type === "rejected" ? "Reject Club Application" : "Request Changes from Coordinator"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide official feedback so the student coordinator can view the institutional rationale.
            </p>

            <textarea
              rows={4}
              required
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              placeholder={
                decisionModal.type === "rejected"
                  ? "Enter institutional reason for decline (e.g. duplicate mission, inadequate faculty sponsor)..."
                  : "Specify required adjustments (e.g. Please update faculty email to official @dyp.edu domain)..."
              }
              className="w-full mt-4 p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-500/20"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDecisionSubmit}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition ${
                  decisionModal.type === "rejected" ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Confirm Decision
              </button>
              <button
                onClick={() => setDecisionModal(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "verify" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Verification Center</h1>
            <p className="text-xs text-slate-500">Review pending registrations and establish the college trust layer</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl">
            <StatCard label="Pending Applications" value={pendingApps.length} icon={Clock} />
            <StatCard label="Verified Active Clubs" value={verifiedClubs.length} icon={CheckCircle2} />
            <StatCard label="Declined Applications" value={rejectedApps.length} icon={XCircle} />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Applications Awaiting Review</h3>
            {pendingApps.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
                No pending club applications requiring verification. All reviews up to date!
              </div>
            ) : (
              pendingApps.map((a) => (
                <div key={a.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                          {a.category}
                        </span>
                        <StatusPill status="pending" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mt-1">{a.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">{a.desc}</p>
                    </div>

                    <div className="text-xs text-slate-500 text-left md:text-right shrink-0">
                      <div>Submitted: <strong>{a.submitted}</strong></div>
                      <div>Department: <strong>{a.dept}</strong></div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 block flex items-center gap-1">
                        <ShieldCheck size={14} className="text-indigo-600" /> Faculty Coordinator:
                      </span>
                      <strong className="text-slate-900 block mt-0.5">{a.coordinator}</strong>
                      <span className="text-slate-400">{a.coordinatorEmail}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 block">Student Coordinator:</span>
                      <strong className="text-slate-900 block mt-0.5">{a.student}</strong>
                      <span className="text-slate-400">{a.studentEmail || "campus student"}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    <button
                      onClick={() => onDecide(a.id, "verified")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1 shadow-sm"
                    >
                      <Check size={14} /> Approve & Verify Club
                    </button>
                    <button
                      onClick={() => setDecisionModal({ appId: a.id, type: "changes" })}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={() => setDecisionModal({ appId: a.id, type: "rejected" })}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition"
                    >
                      Decline Application
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "clubs" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Verified Clubs</h1>
            <p className="text-xs text-slate-500">Monitor club activity and invoke administrative suspensions if required</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {clubs.map((c) => {
              const isSuspended = c.status === "suspended";
              return (
                <div key={c.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        {c.category}
                      </span>
                      <StatusPill status={c.status} />
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mt-2.5">{c.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.desc}</p>

                    <div className="mt-3 text-xs text-slate-500 space-y-1">
                      <div>Coordinator: <strong>{c.facultyCoordinator?.name || "Dr. Arvind Rao"}</strong></div>
                      <div>Followers: <strong>{c.followers.toLocaleString()}</strong> · Active: <strong>{c.activeMembers || 0}</strong></div>
                    </div>

                    <div className="mt-3">
                      <ActivenessBadge engagement={c.engagement || 50} />
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => onToggleSuspendClub(c.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                        isSuspended
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "border border-rose-200 text-rose-600 hover:bg-rose-50"
                      }`}
                    >
                      {isSuspended ? "Restore Club" : "Suspend Club"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Events Monitor</h1>
            <p className="text-xs text-slate-500">Campus-wide extracurricular activities scheduled across colleges</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Event Name</th>
                  <th className="py-2.5 px-3">Hosting Club</th>
                  <th className="py-2.5 px-3">Date & Venue</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Registrations</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 font-semibold text-slate-900">{e.name}</td>
                    <td className="py-3 px-3 text-slate-600">{e.club}</td>
                    <td className="py-3 px-3 text-slate-500">{e.date} ({e.venue})</td>
                    <td className="py-3 px-3"><span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">{e.category}</span></td>
                    <td className="py-3 px-3 font-semibold text-slate-700">{e.filled} / {e.seats}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Participation Analytics</h1>
            <p className="text-xs text-slate-500">College-wide engagement telemetry, department breakdowns & AI alerts</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Enrolled Students" value="4,812" icon={GraduationCap} />
            <StatCard label="Event Registrations" value="1,420" icon={Calendar} sub="+22% this semester" />
            <StatCard label="Avg Attendance Rate" value="86%" icon={TrendingUp} sub="Verified on-site" />
            <StatCard label="Verified Active Clubs" value={verifiedClubs.length} icon={Trophy} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Department-wise Participation</h3>
              <div className="space-y-3 text-xs">
                {[
                  { dept: "Computer Engineering", pct: 38 },
                  { dept: "Information Technology", pct: 24 },
                  { dept: "AI & Data Science", pct: 16 },
                  { dept: "Mechanical Engineering", pct: 10 },
                  { dept: "Design", pct: 8 },
                  { dept: "Civil Engineering", pct: 4 }
                ].map((item) => (
                  <div key={item.dept}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">{item.dept}</span>
                      <span className="text-slate-500 font-bold">{item.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-3">
                  <Sparkles size={14} /> AI Extracurricular Assessment
                </div>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                    📈 <strong>Technical Hackathons</strong> drive the highest repeat attendance (82% retention across cohorts).
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100">
                    🤝 <strong>Interdisciplinary Joint Events</strong> (e.g. Robotics × Founders) attracted 45% non-engineering students.
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-rose-800">
                    ⚠️ <strong>Declining Engagement:</strong> Founders' Table engagement is down to 39%. Institutional advisor advisory recommended.
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Generated via telemetry aggregate analysis on DYP campus records.
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "audit" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Audit Logs</h1>
            <p className="text-xs text-slate-500">Immutable record of administrative decisions, approvals and actions</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 text-xs shadow-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center text-slate-700">
              <div>
                Admin approved <strong className="text-slate-900">Robotics Guild</strong> verification application
              </div>
              <span className="text-slate-400">10 Sep 2026, 11:20 AM</span>
            </div>
            <div className="p-4 flex justify-between items-center text-slate-700">
              <div>
                Admin approved joint collaboration <strong className="text-slate-900">Robotics Guild × Founders' Table</strong>
              </div>
              <span className="text-slate-400">9 Sep 2026, 4:15 PM</span>
            </div>
            <div className="p-4 flex justify-between items-center text-slate-700">
              <div>
                Admin requested changes on application <strong className="text-slate-900">FinWise Investment Club</strong>
              </div>
              <span className="text-slate-400">8 Sep 2026, 2:40 PM</span>
            </div>
            <div className="p-4 flex justify-between items-center text-slate-700">
              <div>
                Admin certified faculty advisor <strong className="text-slate-900">Dr. Arvind Rao</strong> (Mechanical Engineering)
              </div>
              <span className="text-slate-400">5 Sep 2026, 10:00 AM</span>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

// ============================================================================
// 7. ROOT COMPONENT WITH STORAGE PERSISTENCE & MULTI-PORTAL SWITCHER
// ============================================================================

export default function CollegeVerse() {
  const STORAGE_KEY = "collegeverse_ecosystem_data_v2";

  const loadState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load CollegeVerse data:", e);
    }
    return null;
  };

  const initialLoaded = loadState();

  const [view, setView] = useState("landing");
  const [clubs, setClubs] = useState(initialLoaded?.clubs || initialClubs);
  const [applications, setApplications] = useState(initialLoaded?.applications || initialApplications);
  const [events, setEvents] = useState(initialLoaded?.events || initialEvents);
  const [collaborations, setCollaborations] = useState(initialLoaded?.collaborations || initialCollaborations);
  const [myApplication, setMyApplication] = useState(initialLoaded?.myApplication || null);
  const [accounts, setAccounts] = useState(initialLoaded?.accounts || [demoStudent]);
  const [studentSession, setStudentSession] = useState(initialLoaded?.studentSession || null);
  const [studentNotifications, setStudentNotifications] = useState(initialLoaded?.studentNotifications || initialStudentNotifications);
  const [collegeNotifications, setCollegeNotifications] = useState(initialLoaded?.collegeNotifications || initialCollegeNotifications);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          clubs,
          applications,
          events,
          collaborations,
          myApplication,
          accounts,
          studentSession,
          studentNotifications,
          collegeNotifications
        })
      );
    } catch (e) {
      console.error("Failed to save CollegeVerse state:", e);
    }
  }, [
    clubs,
    applications,
    events,
    collaborations,
    myApplication,
    accounts,
    studentSession,
    studentNotifications,
    collegeNotifications
  ]);

  const resetAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setClubs(initialClubs);
    setApplications(initialApplications);
    setEvents(initialEvents);
    setCollaborations(initialCollaborations);
    setMyApplication(null);
    setAccounts([demoStudent]);
    setStudentSession(null);
    setStudentNotifications(initialStudentNotifications);
    setCollegeNotifications(initialCollegeNotifications);
    setNotice("Demo data restored to initial state.");
  };

  const currentStudent = studentSession
    ? accounts.find((a) => a.email.toLowerCase() === studentSession.toLowerCase()) || demoStudent
    : demoStudent;

  const handleStudentLogin = (acc) => {
    setStudentSession(acc.email);
    setView("student");
  };

  const handleStudentRegister = (data) => {
    const email = data.email.toLowerCase();
    if (accounts.some((a) => a.email.toLowerCase() === email)) {
      return "An account with this email already exists.";
    }
    if (accounts.some((a) => a.studentId.toLowerCase() === data.studentId.toLowerCase())) {
      return "This student ID is already registered.";
    }
    const newAcc = {
      ...data,
      email,
      photo: null,
      credits: 100,
      bio: "Student exploring campus clubs and events.",
      skills: [
        { name: "Communication", level: 65 },
        { name: "Problem Solving", level: 70 }
      ],
      interests: ["Technical"],
      following: {},
      registered: {},
      saved: {}
    };
    setAccounts((prev) => [...prev, newAcc]);
    setStudentSession(email);
    setView("student");
    return null;
  };

  const handleUpdateStudentProfile = (updatedProfile) => {
    setAccounts((prev) =>
      prev.map((a) => (a.email.toLowerCase() === currentStudent.email.toLowerCase() ? { ...a, ...updatedProfile } : a))
    );
  };

  const handleToggleFollow = (clubId) => {
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.email.toLowerCase() === currentStudent.email.toLowerCase()) {
          const isFollowing = Boolean(a.following?.[clubId]);
          const newFollowing = { ...a.following, [clubId]: !isFollowing };
          return { ...a, following: newFollowing };
        }
        return a;
      })
    );
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const isCurrentlyFollowed = Boolean(currentStudent.following?.[clubId]);
          return {
            ...c,
            followers: isCurrentlyFollowed ? Math.max(0, c.followers - 1) : c.followers + 1
          };
        }
        return c;
      })
    );
  };

  const handleToggleRegister = (eventId) => {
    const isReg = Boolean(currentStudent.registered?.[eventId]);
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.email.toLowerCase() === currentStudent.email.toLowerCase()) {
          const newReg = { ...a.registered, [eventId]: !isReg };
          return {
            ...a,
            registered: newReg,
            credits: !isReg ? a.credits + 50 : Math.max(0, a.credits - 50)
          };
        }
        return a;
      })
    );
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            filled: isReg ? Math.max(0, e.filled - 1) : e.filled + 1
          };
        }
        return e;
      })
    );
    const ev = events.find((e) => e.id === eventId);
    if (!isReg && ev) {
      setStudentNotifications((prev) => [
        {
          id: "sn" + Date.now(),
          text: `You have successfully registered for ${ev.name}!`,
          time: "Just now",
          unread: true,
          category: "Registration"
        },
        ...prev
      ]);
    }
  };

  const handleToggleSave = (eventId) => {
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.email.toLowerCase() === currentStudent.email.toLowerCase()) {
          const isSaved = Boolean(a.saved?.[eventId]);
          return {
            ...a,
            saved: { ...a.saved, [eventId]: !isSaved }
          };
        }
        return a;
      })
    );
  };

  const handleSubmitClubApplication = (formData) => {
    const id = Date.now();
    const newApp = {
      id,
      name: formData.name,
      category: formData.category,
      dept: formData.dept,
      coordinator: formData.coordinator,
      coordinatorEmail: formData.coordinatorEmail,
      student: formData.student,
      studentEmail: formData.studentEmail,
      submitted: "Today",
      status: "pending",
      desc: formData.desc
    };
    setApplications((prev) => [newApp, ...prev]);
    setMyApplication(newApp);
    setCollegeNotifications((prev) => [
      {
        id: "adn" + Date.now(),
        text: `New Club Application submitted: ${formData.name} (${formData.category}).`,
        time: "Just now",
        unread: true,
        category: "Verification"
      },
      ...prev
    ]);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setStudentNotifications((prev) => [
      {
        id: "sn" + Date.now(),
        text: `${newEvent.club} posted a new event: ${newEvent.name}.`,
        time: "Just now",
        unread: true,
        category: "New Event"
      },
      ...prev
    ]);
  };

  const handleProposeCollaboration = (collabData) => {
    setCollaborations((prev) => [collabData, ...prev]);
  };

  const handleDecideCollaboration = (collabId, decision) => {
    setCollaborations((prev) =>
      prev.map((c) => (c.id === collabId ? { ...c, status: decision } : c))
    );
    if (decision === "accepted") {
      const collab = collaborations.find((c) => c.id === collabId);
      if (collab) {
        const jointEvent = {
          id: Date.now(),
          name: collab.jointEventName,
          club: `${collab.initiatorClub} × ${collab.partnerClub}`,
          coHosts: [collab.initiatorClub, collab.partnerClub],
          category: collab.category || "Technical",
          eventType: "Hackathon",
          dept: "Open to All",
          date: collab.proposedDate || "Next Month, 3:00 PM",
          venue: collab.proposedVenue || "Campus Center",
          seats: collab.expectedSeats || 60,
          filled: 12,
          deadlineDays: 14,
          desc: collab.purpose || "Joint collaborative initiative co-organized by both clubs.",
          rules: "Open to all interdisciplinary teams across engineering and management.",
          status: "approved",
          isJoint: true,
          attendees: []
        };
        setEvents((prev) => [jointEvent, ...prev]);
        setStudentNotifications((prev) => [
          {
            id: "sn" + Date.now(),
            text: `New Joint Event announced: ${jointEvent.name} by ${jointEvent.club}!`,
            time: "Just now",
            unread: true,
            category: "Collaboration"
          },
          ...prev
        ]);
      }
    }
  };

  const handlePublishAnnouncement = (clubName, announcement) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === clubName.toLowerCase()) {
          return {
            ...c,
            announcements: [announcement, ...(c.announcements || [])]
          };
        }
        return c;
      })
    );
    setStudentNotifications((prev) => [
      {
        id: "sn" + Date.now(),
        text: `${clubName} posted an announcement: "${announcement.title}"`,
        time: "Just now",
        unread: true,
        category: "Announcement"
      },
      ...prev
    ]);
  };

  const handleDecideClubApplication = (appId, decision, reason = "") => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: decision, reviewNote: reason } : a))
    );
    if (decision === "verified") {
      const app = applications.find((a) => a.id === appId);
      if (app) {
        const newVerifiedClub = {
          id: app.id,
          name: app.name,
          category: app.category,
          followers: 40,
          rating: 4.8,
          desc: app.desc,
          status: "verified",
          activeMembers: 15,
          engagement: 75,
          dept: app.dept,
          trend: [10, 20, 28, 32, 38, 40],
          facultyCoordinator: { name: app.coordinator, email: app.coordinatorEmail, dept: app.dept, verified: true },
          studentCoordinator: { name: app.student, email: app.studentEmail, phone: "" },
          members: [
            { id: "m" + Date.now(), name: app.student, dept: app.dept, year: "Third Year", role: "Student Coordinator", status: "Active" }
          ],
          announcements: []
        };
        setClubs((prev) => [...prev, newVerifiedClub]);
        if (myApplication && myApplication.id === appId) {
          setMyApplication((prev) => ({ ...prev, status: "verified" }));
        }
      }
    }
    if (myApplication && myApplication.id === appId) {
      setMyApplication((prev) => ({ ...prev, status: decision, reviewNote: reason }));
    }
  };

  const handleToggleSuspendClub = (clubId) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const nextStatus = c.status === "suspended" ? "verified" : "suspended";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleUpdateAttendance = (eventId, studentId) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const attendees = ev.attendees || [];
        const exists = attendees.find((a) => a.studentId === studentId);
        if (exists) {
          return {
            ...ev,
            attendees: attendees.map((a) =>
              a.studentId === studentId
                ? { ...a, status: a.status === "Present" ? "Registered" : "Present" }
                : a
            )
          };
        } else {
          return {
            ...ev,
            attendees: [
              ...attendees,
              { studentId, name: "Student Attendee", dept: "Engineering", year: "Second Year", status: "Present" }
            ]
          };
        }
      })
    );
  };

  const handleSwitchPortal = (target) => {
    setNotice("");
    setView(target);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9fc]">
      <TopDemoBar currentPortal={view} onSwitch={handleSwitchPortal} resetData={resetAllData} />

      {view === "landing" && (
        <Landing
          onEnter={(portal) => {
            if (portal) setView(portal);
            else setView("roleSelect");
          }}
        />
      )}

      {view === "roleSelect" && (
        <RoleSelect
          notice={notice}
          onBack={() => setView("landing")}
          onPick={(role) => setView(role)}
        />
      )}

      {view === "student" && (
        !studentSession ? (
          <StudentAuth
            accounts={accounts}
            onBack={() => setView("roleSelect")}
            onLogin={handleStudentLogin}
            onRegister={handleStudentRegister}
          />
        ) : (
          <StudentPortal
            onLogout={() => {
              setStudentSession(null);
              setView("roleSelect");
            }}
            onBrand={() => setView("roleSelect")}
            clubs={clubs}
            events={events}
            profile={currentStudent}
            onUpdateProfile={handleUpdateStudentProfile}
            onToggleFollow={handleToggleFollow}
            onToggleRegister={handleToggleRegister}
            onToggleSave={handleToggleSave}
            notifications={studentNotifications}
            collaborations={collaborations}
          />
        )
      )}

      {view === "club" && (
        <ClubPortal
          onExit={() => setView("roleSelect")}
          clubs={clubs}
          myApplication={myApplication}
          onSubmitApplication={handleSubmitClubApplication}
          events={events}
          onCreateEvent={handleCreateEvent}
          collaborations={collaborations}
          onProposeCollaboration={handleProposeCollaboration}
          onDecideCollaboration={handleDecideCollaboration}
          onPublishAnnouncement={handlePublishAnnouncement}
          onUpdateAttendance={handleUpdateAttendance}
        />
      )}

      {view === "college" && (
        <CollegePortal
          onExit={() => setView("roleSelect")}
          applications={applications}
          clubs={clubs}
          events={events}
          onDecide={handleDecideClubApplication}
          onToggleSuspendClub={handleToggleSuspendClub}
          notifications={collegeNotifications}
        />
      )}
    </div>
  );
}
