# API Documentation

Complete API reference for the School Management System.

## Base URL

\`\`\`
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
\`\`\`

## Authentication

All protected endpoints require authentication via Supabase JWT token. The token is automatically managed by the client.

### Headers

\`\`\`
Content-Type: application/json
Authorization: Bearer <jwt_token>
\`\`\`

## Response Format

### Success Response

\`\`\`json
{
  "data": { /* response data */ },
  "message": "Success message"
}
\`\`\`

### Error Response

\`\`\`json
{
  "error": "Error message",
  "status": 400
}
\`\`\`

## Endpoints

### Authentication

#### Register User
\`\`\`
POST /auth/register
\`\`\`

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Registration successful",
  "user": { /* user data */ }
}
\`\`\`

#### Login User
\`\`\`
POST /auth/login
\`\`\`

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Login successful",
  "user": { /* user data */ },
  "role": "student"
}
\`\`\`

#### Logout User
\`\`\`
POST /auth/logout
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Logout successful"
}
\`\`\`

### Dashboard

#### Get Student Dashboard
\`\`\`
GET /dashboard/student
\`\`\`

**Response:**
\`\`\`json
{
  "student": { /* student data */ },
  "assignments": [ /* assignments */ ],
  "grades": [ /* grades */ ],
  "attendance": [ /* attendance */ ]
}
\`\`\`

#### Get Teacher Dashboard
\`\`\`
GET /dashboard/teacher
\`\`\`

**Response:**
\`\`\`json
{
  "teacher": { /* teacher data */ },
  "classes": [ /* classes */ ],
  "assignments": [ /* assignments */ ]
}
\`\`\`

#### Get Admin Dashboard
\`\`\`
GET /dashboard/admin
\`\`\`

**Response:**
\`\`\`json
{
  "stats": {
    "students": 150,
    "teachers": 25,
    "classes": 10
  },
  "recentStudents": [ /* students */ ],
  "recentTeachers": [ /* teachers */ ]
}
\`\`\`

### Students

#### List Students
\`\`\`
GET /students
\`\`\`

**Query Parameters:**
- `limit` (optional): Number of records to return
- `offset` (optional): Number of records to skip

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "enrollment_number": "STU001",
    "class_id": "uuid",
    "parent_id": "uuid",
    "date_of_birth": "2010-01-15",
    "gender": "M"
  }
]
\`\`\`

#### Create Student
\`\`\`
POST /students
\`\`\`

**Request Body:**
\`\`\`json
{
  "user_id": "uuid",
  "enrollment_number": "STU002",
  "class_id": "uuid",
  "parent_id": "uuid",
  "date_of_birth": "2010-01-15",
  "gender": "M"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "uuid",
  "user_id": "uuid",
  "enrollment_number": "STU002",
  "class_id": "uuid",
  "parent_id": "uuid",
  "date_of_birth": "2010-01-15",
  "gender": "M"
}
\`\`\`

### Teachers

#### List Teachers
\`\`\`
GET /teachers
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "employee_id": "TCH001",
    "specialization": "Mathematics",
    "qualification": "B.Sc",
    "hire_date": "2020-01-15"
  }
]
\`\`\`

#### Create Teacher
\`\`\`
POST /teachers
\`\`\`

**Request Body:**
\`\`\`json
{
  "user_id": "uuid",
  "employee_id": "TCH002",
  "specialization": "English",
  "qualification": "M.A",
  "hire_date": "2021-01-15"
}
\`\`\`

### Classes

#### List Classes
\`\`\`
GET /classes
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "name": "Class 10A",
    "grade_level": 10,
    "teacher_id": "uuid",
    "capacity": 40
  }
]
\`\`\`

#### Create Class
\`\`\`
POST /classes
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Class 11B",
  "grade_level": 11,
  "teacher_id": "uuid",
  "capacity": 45
}
\`\`\`

### Assignments

#### List Assignments
\`\`\`
GET /assignments
\`\`\`

**Query Parameters:**
- `class_id` (optional): Filter by class
- `teacher_id` (optional): Filter by teacher

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Math Assignment 1",
    "description": "Chapter 1-3",
    "subject_id": "uuid",
    "class_id": "uuid",
    "teacher_id": "uuid",
    "due_date": "2024-01-20T23:59:59Z",
    "file_url": "https://..."
  }
]
\`\`\`

#### Create Assignment
\`\`\`
POST /assignments
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "Math Assignment 2",
  "description": "Chapter 4-6",
  "subject_id": "uuid",
  "class_id": "uuid",
  "teacher_id": "uuid",
  "due_date": "2024-01-25T23:59:59Z",
  "file_url": "https://..."
}
\`\`\`

### Grades

#### List Grades
\`\`\`
GET /grades
\`\`\`

**Query Parameters:**
- `student_id` (optional): Filter by student
- `subject_id` (optional): Filter by subject

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "student_id": "uuid",
    "subject_id": "uuid",
    "score": 85.5,
    "term": "Term 1",
    "academic_year": "2023-2024"
  }
]
\`\`\`

#### Create Grade
\`\`\`
POST /grades
\`\`\`

**Request Body:**
\`\`\`json
{
  "student_id": "uuid",
  "subject_id": "uuid",
  "score": 90.0,
  "term": "Term 2",
  "academic_year": "2023-2024"
}
\`\`\`

### Attendance

#### List Attendance
\`\`\`
GET /attendance
\`\`\`

**Query Parameters:**
- `student_id` (optional): Filter by student
- `class_id` (optional): Filter by class
- `date` (optional): Filter by date

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "student_id": "uuid",
    "class_id": "uuid",
    "date": "2024-01-15",
    "status": "present",
    "remarks": ""
  }
]
\`\`\`

#### Mark Attendance
\`\`\`
POST /attendance
\`\`\`

**Request Body:**
\`\`\`json
{
  "student_id": "uuid",
  "class_id": "uuid",
  "date": "2024-01-16",
  "status": "present",
  "remarks": ""
}
\`\`\`

### Payments

#### List Payments
\`\`\`
GET /payments
\`\`\`

**Query Parameters:**
- `student_id` (optional): Filter by student
- `status` (optional): Filter by status (pending, completed, failed)

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "student_id": "uuid",
    "parent_id": "uuid",
    "amount": 5000.00,
    "description": "Tuition Fee",
    "status": "pending",
    "payment_method": "card",
    "reference_id": "PAY001",
    "due_date": "2024-01-31",
    "paid_date": null
  }
]
\`\`\`

#### Create Payment
\`\`\`
POST /payments
\`\`\`

**Request Body:**
\`\`\`json
{
  "student_id": "uuid",
  "parent_id": "uuid",
  "amount": 5000.00,
  "description": "Tuition Fee",
  "status": "pending",
  "payment_method": "card",
  "due_date": "2024-02-28"
}
\`\`\`

### Blog Posts

#### List Blog Posts
\`\`\`
GET /blog
\`\`\`

**Query Parameters:**
- `published` (optional): Filter by published status

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Welcome to EduHub",
    "content": "...",
    "author_id": "uuid",
    "featured_image": "https://...",
    "published": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
\`\`\`

#### Create Blog Post
\`\`\`
POST /blog
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "New Blog Post",
  "content": "...",
  "author_id": "uuid",
  "featured_image": "https://...",
  "published": false
}
\`\`\`

### Events

#### List Events
\`\`\`
GET /events
\`\`\`

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Annual Sports Day",
    "description": "...",
    "event_date": "2024-02-15T09:00:00Z",
    "location": "School Ground",
    "image_url": "https://...",
    "created_by": "uuid"
  }
]
\`\`\`

#### Create Event
\`\`\`
POST /events
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "Science Fair",
  "description": "...",
  "event_date": "2024-03-01T10:00:00Z",
  "location": "School Auditorium",
  "image_url": "https://...",
  "created_by": "uuid"
}
\`\`\`

### Contact

#### Submit Contact Form
\`\`\`
POST /contact
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Message sent successfully",
  "id": "uuid"
}
\`\`\`

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

Use `limit` and `offset` parameters:

\`\`\`
GET /students?limit=10&offset=0
\`\`\`

## Filtering

Use query parameters to filter:

\`\`\`
GET /assignments?class_id=uuid&teacher_id=uuid
\`\`\`

## Sorting

Use `sort` parameter:

\`\`\`
GET /students?sort=created_at&order=desc
\`\`\`

## Examples

### Register and Login

\`\`\`bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
\`\`\`

### Get Student Dashboard

\`\`\`bash
curl -X GET http://localhost:3000/api/dashboard/student \
  -H "Authorization: Bearer <jwt_token>"
\`\`\`

### Create Assignment

\`\`\`bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "title": "Math Assignment",
    "description": "Chapter 1-3",
    "subject_id": "uuid",
    "class_id": "uuid",
    "teacher_id": "uuid",
    "due_date": "2024-01-20T23:59:59Z"
  }'
\`\`\`

## Webhooks (Future)

Webhooks for:
- User registration
- Assignment submission
- Grade updates
- Payment completion
- Event creation

## Rate Limit Headers

\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
\`\`\`

## Support

For API issues:
1. Check error messages
2. Review documentation
3. Check browser console
4. Contact support

---

**API Documentation Complete**
