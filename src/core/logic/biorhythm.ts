/**
 * Biorhythm Logic (Phase 61)
 * Standard Cycles:
 * - Physical (23 days): Vitality, Strength
 * - Emotional (28 days): Mood, Sensitivity 
 * - Intellectual (33 days): Focus, Logic
 */

import { differenceInCalendarDays } from "date-fns";

export interface BiorhythmData {
    physical: number; // -100 to 100
    emotional: number;
    intellectual: number;
    date: Date;
}

export interface BiorhythmCycle {
    name: string;
    value: number;
    advice: string;
    color: string;
    id: 'physical' | 'emotional' | 'intellectual';
}

export function calculateBiorhythm(birthDate: Date, targetDate: Date = new Date()): BiorhythmData {
    // Phase 66: High-precision day difference using calendar days 
    // to ensure Leap Year days are treated as full units.
    const daysLived = differenceInCalendarDays(targetDate, birthDate);

    return {
        physical: Math.round(Math.sin((2 * Math.PI * daysLived) / 23) * 100),
        emotional: Math.round(Math.sin((2 * Math.PI * daysLived) / 28) * 100),
        intellectual: Math.round(Math.sin((2 * Math.PI * daysLived) / 33) * 100),
        date: targetDate
    };
}

export function getIndonesianAdvice(type: 'physical' | 'emotional' | 'intellectual', value: number): string {
    if (value > 60) {
        if (type === 'physical') return "Vitalitas fisik Anda sedang di puncak. Waktunya aktivitas berat!";
        if (type === 'emotional') return "Kreativitas dan stabilitas emosi sangat baik hari ini.";
        if (type === 'intellectual') return "Energi intelektual Anda sedang memuncak, waktu yang tepat untuk belajar hal baru.";
    }

    if (value < -60) {
        if (type === 'physical') return "Kapasitas fisik menurun, utamakan istirahat dan pemulihan.";
        if (type === 'emotional') return "Anda mungkin merasa lebih sensitif, hindari konflik besar hari ini.";
        if (type === 'intellectual') return "Fokus sedang berkurang, kerjakan pekerjaan rutin yang ringan saja.";
    }

    return "Kondisi stabil, tetap jaga keseimbangan energi Anda.";
}

export function getBiorhythmCycles(birthDate: Date, targetDate: Date = new Date()): BiorhythmCycle[] {
    const data = calculateBiorhythm(birthDate, targetDate);

    return [
        {
            id: 'physical',
            name: "Physical",
            value: data.physical,
            advice: getIndonesianAdvice('physical', data.physical),
            color: "#84cc16" // Lime-500
        },
        {
            id: 'emotional',
            name: "Emotional",
            value: data.emotional,
            advice: getIndonesianAdvice('emotional', data.emotional),
            color: "#d946ef" // Magenta/Fuchsia-500
        },
        {
            id: 'intellectual',
            name: "Intellectual",
            value: data.intellectual,
            advice: getIndonesianAdvice('intellectual', data.intellectual),
            color: "#06b6d4" // Cyan-500
        }
    ];
}
