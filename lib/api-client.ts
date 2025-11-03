const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || "An error occurred" }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Network error" }
  }
}

export const apiClient = {
  // Auth endpoints
  login: (email: string, password: string) =>
    apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: any) =>
    apiCall("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiCall("/api/auth/logout", {
      method: "POST",
    }),

  // Dashboard endpoints
  getStudentDashboard: () => apiCall("/api/dashboard/student"),
  getTeacherDashboard: () => apiCall("/api/dashboard/teacher"),
  getAdminDashboard: () => apiCall("/api/dashboard/admin"),

  // Student endpoints
  getStudents: () => apiCall("/api/students"),
  createStudent: (data: any) =>
    apiCall("/api/students", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Teacher endpoints
  getTeachers: () => apiCall("/api/teachers"),
  createTeacher: (data: any) =>
    apiCall("/api/teachers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Class endpoints
  getClasses: () => apiCall("/api/classes"),
  createClass: (data: any) =>
    apiCall("/api/classes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Assignment endpoints
  getAssignments: () => apiCall("/api/assignments"),
  createAssignment: (data: any) =>
    apiCall("/api/assignments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Grade endpoints
  getGrades: () => apiCall("/api/grades"),
  createGrade: (data: any) =>
    apiCall("/api/grades", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Attendance endpoints
  getAttendance: () => apiCall("/api/attendance"),
  recordAttendance: (data: any) =>
    apiCall("/api/attendance", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Payment endpoints
  getPayments: () => apiCall("/api/payments"),
  createPayment: (data: any) =>
    apiCall("/api/payments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Blog endpoints
  getBlogPosts: () => apiCall("/api/blog"),
  createBlogPost: (data: any) =>
    apiCall("/api/blog", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Events endpoints
  getEvents: () => apiCall("/api/events"),
  createEvent: (data: any) =>
    apiCall("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Contact endpoints
  sendContactMessage: (data: any) =>
    apiCall("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
