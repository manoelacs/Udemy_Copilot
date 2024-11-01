// utils/dateUtils.ts

/**
 * Formats a given date string into a human-readable format.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date string in 'Month Day, Year' format.
 *
 * @example
 * ```typescript
 * const formattedDate = formatDate('2023-10-05');
 * console.log(formattedDate); // October 5, 2023
 * ```
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Formats the current date to the YYYY-MM-DD format.
 *
 * @returns {string} The formatted date string.
 */
export const formatDateToISO = (): string => {
  return new Date().toISOString().split('T')[0];
};
