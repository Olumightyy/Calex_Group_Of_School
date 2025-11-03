export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
} as const

export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  EXCUSED: "excused",
} as const

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export const STUDENT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  GRADUATED: "graduated",
} as const

export const TEACHER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ON_LEAVE: "on_leave",
} as const

export const TERMS = ["Term 1", "Term 2", "Term 3", "Term 4"] as const

export const GRADE_SCALE = {
  A: { min: 90, max: 100, label: "Excellent" },
  B: { min: 80, max: 89, label: "Very Good" },
  C: { min: 70, max: 79, label: "Good" },
  D: { min: 60, max: 69, label: "Fair" },
  E: { min: 50, max: 59, label: "Pass" },
  F: { min: 0, max: 49, label: "Fail" },
} as const

export const DASHBOARD_ROUTES = {
  STUDENT: "/dashboard/student",
  TEACHER: "/dashboard/teacher",
  PARENT: "/dashboard/parent",
  ADMIN: "/dashboard/admin",
} as const

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/gallery",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
]

export const PROTECTED_ROUTES = ["/dashboard"]
