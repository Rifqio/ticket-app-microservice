/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "../helper/axios";
import Cookies from "js-cookie";
import { currentUserUrl, signInUrl, signUpUrl } from "../helper/urlConstants";

interface User {
    id: string;
    email: string;
}

interface AuthStore {
    user: User;
    loading: boolean;
    success: boolean;
    error: any;
    token: string;
    currentUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    cleanupError: () => void;
    cleanupSuccess: () => void;
}

const currentUser = async (set: (state: Partial<AuthStore>) => void,  getState: () => AuthStore): Promise<void> => {
    try {
        set({ loading: true });
        const token = getState().token || Cookies.get("_token") || null;
        const res = await axios.get(currentUserUrl, {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        set({ user: res.data.data, loading: false, success: true });
    } catch (error) {
        set({ loading: false, success: false });
        set({ user: {} as User, token: "" });
        set({ error: (error as any).response.data.message });
    }
};

const loginUser = async (set: (state: Partial<AuthStore>) => void, email: string, password: string) => {
    try {
        set({ loading: true, error: null, success: false });
        const res = await axios.post(signInUrl, { email, password });
        const token = res.data.data.token;
        Cookies.set("_token", token);
        set({ user: res.data.data, token: token, loading: false, success: true });
    } catch (error) {
        set({ loading: false, success: false });
        set({ error: (error as any).response.data.message });
    }
};

const registerUser = async (set: (state: Partial<AuthStore>) => void, email: string, password: string) => {
    try {
        set({ loading: true, error: null });
        const res = await axios.post(signUpUrl, { email, password });
        const token = res.data.data.token;
        Cookies.set("_token", token);
        set({ loading: false, success: true, error: null });
        set({ user: res.data.data, token: token });
    } catch (error) {
        set({ loading: false, success: false });
        set({ error: (error as any).response.data.message });
    }
};

const logout = (set: (state: Partial<AuthStore>) => void) => {
    set({ user: {} as User, token: "" });
    Cookies.remove("_token");
};

const cleanupError = (set: (state: Partial<AuthStore>) => void) => {
    set({ error: null });
};

const cleanupSuccess = (set: (state: Partial<AuthStore>) => void) => {
    set({ success: false });
};

const useAuthStore = create<AuthStore>()((set, getState) => ({
    user: {} as User,
    loading: false,
    success: false,
    error: null,
    token: "",
    currentUser: async () => currentUser(set, getState),
    login: async (email, password) => loginUser(set, email, password),
    register: async (email, password) => registerUser(set, email, password),
    logout: () => logout(set),
    cleanupError: () => cleanupError(set),
    cleanupSuccess: () => cleanupSuccess(set),
}));

export default useAuthStore;
