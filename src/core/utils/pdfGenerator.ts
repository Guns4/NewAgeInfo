import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { ManifestoDocument } from '@/components/pdf/ManifestoDocument';
import React from 'react';

/**
 * Generates and downloads the Life Manifesto PDF
 */
export const generateManifesto = async (birthDate: Date) => {
    try {
        const now = new Date();
        const diff = now.getTime() - birthDate.getTime();

        // Calculate basic stats for the PDF
        const years = (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toLocaleString();

        // Estimates
        const hours = diff / (1000 * 60 * 60);
        const breaths = Math.floor(hours * 60 * 16).toLocaleString(); // ~16 breaths/min
        const heartbeats = Math.floor(hours * 60 * 80).toLocaleString(); // ~80 bpm

        const doc = React.createElement(ManifestoDocument, {
            birthDate: birthDate,
            stats: {
                years,
                days,
                breaths,
                heartbeats
            }
        });

        const blob = await pdf(doc).toBlob();
        saveAs(blob, `Life_Manifesto_${birthDate.getFullYear()}.pdf`);
        return true;
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        return false;
    }
};
