export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    name: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
