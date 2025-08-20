// src/contexts/PlanContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
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


    const updatePlan = (updater) => {
        setDraftPlan((prev) => {
            const base = prev ?? { data: {} };
            return typeof updater === "function" ? updater(base) : { ...base, ...updater };
        });
    };

    const removeActivity = (dayKey, index) => {
        setDraftPlan((prev) => {
            if (!prev?.plan?.[dayKey]) return prev;
            const copy = JSON.parse(JSON.stringify(prev));
            if (index < 0 || index >= copy.plan[dayKey].Activities.length) return prev;
            copy.plan[dayKey].Activities.splice(index, 1);
            return copy;
        });
    };

    const updateActivity = (dayKey, index, patch) => {
        setDraftPlan((prev) => {
            if (!prev?.plan?.[dayKey]) return prev;
            const copy = JSON.parse(JSON.stringify(prev));

            // Check for both 'activities' and 'Activities'
            const activities = copy.plan[dayKey].activities || copy.plan[dayKey].Activities;
            if (!activities || index < 0 || index >= activities.length) return prev;

            const current = activities[index];
            // Keep existing time unless explicitly changed
            activities[index] = { ...current, ...patch, time: patch?.time ?? current.time };

            // Update the correct property name
            if (copy.plan[dayKey].activities) {
                copy.plan[dayKey].activities = activities;
            } else {
                copy.plan[dayKey].Activities = activities;
            }

            return copy;
        });
    };

    const saveItinerary = async (draftPlan, session) => {
        if (!session?.user) {
            throw new Error('User not authenticated');
        }

        if (!draftPlan?.plan || Object.keys(draftPlan.plan).length === 0) {
            throw new Error('No itinerary data to save');
        }

        const generatedAt = new Date().toISOString();

        const records = [];

        Object.entries(draftPlan.plan).forEach(([dayLabel, dayData]) => {
            const dayNumber = parseInt(dayLabel.replace(/[^0-9]/g, ''));

            const activities = dayData.Activities || dayData.activities || [];

            records.push({
                user_id: session.user.id,
                generated_at: generatedAt,
                updated_at:generatedAt,
                day: dayNumber,
                activities: activities,
                trip_name: draftPlan.title || 'My Trip'
            });
        });

        // Insert all records
        const { data, error } = await supabase
            .from('itineraries')
            .insert(records)
            .select();

        if (error) {
            throw error;
        }

        return { data, generatedAt };
    };

    const clearPlan = () => {
        setDraftPlan(null);
        localStorage.removeItem(STORAGE_KEY);
    };


    return (
        <PlanContext.Provider value={{
            draftPlan,
            // setPlan,
            saveItinerary,
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
