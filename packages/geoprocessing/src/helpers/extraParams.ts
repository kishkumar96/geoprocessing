import { DefaultExtraParams } from "../types/index.js";

/**
 * Returns first element from param object at paramName key.  Parameter can be string or array of strings
 * @param paramName name of array parameter to extract from extraParams
 * @param params the object containing parameters
 * @returns the first element ih the parameter or undefined if not found
 * @throws if required = true and param is missing or its array is empty
 */
export const getFirstFromParam = <P extends DefaultExtraParams>(
  paramName: string,
  params: P,
  options: { required?: boolean } = {},
): string | undefined => {
  const { required = false } = options;
  const paramValue = params[paramName];
  let firstValue: string | undefined = undefined;

  if (Array.isArray(paramValue)) {
    const arrayVal = getParamStringArray(paramName, params);
    if (arrayVal) firstValue = arrayVal[0];
  } else {
    firstValue = paramValue;
  }
  if (!firstValue)
    if (required) {
      throw new Error(
        `String or string array at parameter ${paramName} expected, found ${JSON.stringify(
          paramValue,
        )}`,
      );
    } else {
      return undefined;
    }
  return firstValue;
};

/**
 * Validates and returns string[] parameter from extraParams.  If param missing it returns an empty array
 * @param paramName name of array parameter to extract from extraParams
 * @param params parameter object
 * @returns string[]
 * @throws Error if parameter contains non-string values
 */
export const getParamStringArray = <P extends DefaultExtraParams>(
  paramName: string,
  params: P,
): string[] | undefined => {
  const paramValue = params[paramName];
  if (Array.isArray(paramValue)) {
    if (paramValue.length === 0) {
      console.log(`Parameter ${paramName} is an empty array`);
      return undefined;
    }
    for (const arrayVal of paramValue) {
      if (typeof arrayVal !== "string") {
        throw new TypeError(
          `${paramName} must contain all strings, received ${JSON.stringify(
            arrayVal,
          )}`,
        );
      }
    }
    return paramValue;
  }
  return undefined;
};
