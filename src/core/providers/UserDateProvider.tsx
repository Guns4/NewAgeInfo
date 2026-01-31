"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Helper context so deep components don't need 'birthDate' prop drilling if they just need dynamic stats
interface UserDateContextType {
    birthDate: Date | null;
    setBirthDate: (d: Date | null) => void;
}

const UserDateContext = createContext<UserDateContextType>({ birthDate: null, setBirthDate: () => { } });

export const useUserDate = () => useContext(UserDateContext);

export function UserDateProvider({ children }: { children: ReactNode }) {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    return (
        <UserDateContext.Provider value={{ birthDate, setBirthDate }}>
            {children}
        </UserDateContext.Provider>
    );
}
