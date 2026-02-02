import api from "@/lib/axios";

export const fetchNavbar = () => api.get("/navbar");
