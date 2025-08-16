// src/contexts/PlanContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { demoItinerary } from "../data/DemoItinerary";
import { supabase } from "../lib/supabase/Client";

const PlanContext = createContext(null);
const STORAGE_KEY = 'draftPlan';

export function PlanProvider({ children }) {
    const [draftPlan, setDraftPlan] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error loading saved plan:', error);
            return null;
        }
    });

    useEffect(() => {
        if (draftPlan !== undefined) {
            try {
                if (draftPlan === null) {
                    localStorage.removeItem(STORAGE_KEY);
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(draftPlan));
                }
            } catch (error) {
                console.error('Error saving plan:', error);
            }
        }
    }, [draftPlan]);
    useEffect(() => {

    }, [draftPlan])

    const updatePlan = (updater) => {
        setDraftPlan((prev) => {
            const base = prev ?? { data: {} };
            return typeof updater === "function" ? updater(base) : { ...base, ...updater };
        });
    };

    const removeActivity = (dayKey, index) => {
        setDraftPlan((prev) => {
            if (!prev?.data?.[dayKey]) return prev;
            const copy = JSON.parse(JSON.stringify(prev));
            if (index < 0 || index >= copy.data[dayKey].Activities.length) return prev;
            copy.data[dayKey].Activities.splice(index, 1);
            return copy;
        });
    };

    const updateActivity = (dayKey, index, patch) => {
        setDraftPlan((prev) => {
            if (!prev?.data?.[dayKey]) return prev;
            const copy = JSON.parse(JSON.stringify(prev));
            const list = copy.data[dayKey].Activities;
            if (index < 0 || index >= list.length) return prev;
            const current = list[index];
            // Keep existing time unless explicitly changed
            list[index] = { ...current, ...patch, time: patch?.time ?? current.time };
            return copy;
        });
    };

    const savePlan = async () => {
        // const { data, error } = await supabase.
    }

    const clearPlan = () => {
        setDraftPlan(null);
        localStorage.removeItem(STORAGE_KEY);
    };


    return (
        <PlanContext.Provider value={{
            draftPlan,
            // setPlan,
            updatePlan,
            removeActivity,
            updateActivity,
            clearPlan,
            setDraftPlan
        }}>
            {children}
        </PlanContext.Provider>
    );
}

export const usePlan = () => {
    const ctx = useContext(PlanContext);
    if (!ctx) throw new Error("usePlan must be used within <PlanProvider>");
    return ctx;
};
