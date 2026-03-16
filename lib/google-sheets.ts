// lib/google-sheets.ts
/**
 * Google Sheets API utilities for storing lead data
 */

import { google } from 'googleapis';

export type LeadData = {
  timestamp: string;
  name: string;
  email: string;
  message: string;
  locale: string;
  source: string;
};

/**
 * Append a new lead to Google Sheets
 */
export async function appendLeadToSheet(data: LeadData): Promise<boolean> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !serviceAccountEmail || !privateKey) {
    console.error('Google Sheets credentials not configured');
    return false;
  }

  try {
    // Create JWT auth client
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data
    const values = [
      [data.timestamp, data.name, data.email, data.message, data.locale, data.source],
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:F', // Adjust sheet name if needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to append to Google Sheets:', error);
    return false;
  }
}

/**
 * Initialize sheet with headers (run once manually if needed)
 */
export async function initializeSheet(): Promise<boolean> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !serviceAccountEmail || !privateKey) {
    console.error('Google Sheets credentials not configured');
    return false;
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Check if headers already exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:F1',
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log('Headers already exist');
      return true;
    }

    // Add headers
    const headers = [['Timestamp', 'Name', 'Email', 'Message', 'Locale', 'Source']];

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:F1',
      valueInputOption: 'RAW',
      requestBody: {
        values: headers,
      },
    });

    console.log('Headers initialized');
    return true;
  } catch (error) {
    console.error('Failed to initialize sheet:', error);
    return false;
  }
}
