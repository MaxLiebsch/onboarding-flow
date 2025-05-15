/**
 * Generic adapter that transforms field errors from array format to message object format
 * @param fieldErrors Object where values are string arrays or undefined
 * @returns Object with the same keys but values transformed to {message?: string}
 */

export function adaptFieldErrors<
  T extends Record<string, string[] | undefined>,
>(
  fieldErrors: T,
): {
  [K in keyof T]?: { message?: string };
} {
  // Start with an empty object
  return Object.entries(fieldErrors).reduce(
    (result, [key, errors]) => {
      // Only add the field if there are errors
      if (errors && errors.length > 0) {
        // Take the first error message
        result[key as keyof T] = { message: errors[0] };
      }

      return result;
    },
    {} as { [K in keyof T]?: { message?: string } },
  );
}
