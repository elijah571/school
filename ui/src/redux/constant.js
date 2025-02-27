// Define the base URL for the backend server
 export const BASE_URL =  import.meta.env.PROD
 ? "https://school-backend-umg3.onrender.com"  // Production URL
 : "";  // Empty for local proxy

 // Define the API endpoint URLs
 export const ADMIN_URL = "/api/admin";
export const CLASS_ROOM_URL = "/api/class-room";
export const TEACHERS_URL = "/api/teacher";
export const STUDENTS_URL = "/api/student";
export const ATTENDANCE_URL = "/api/attendance";
export const REPORT_URL = "/api/report";
export const UPLOAD_URL = "/api/upload";