export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // Add the role field
}
