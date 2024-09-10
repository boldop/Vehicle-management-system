export const SAVE_COD_DETAILS = 'SAVE_COD_DETAILS';

export const saveCodDetails = (codDetails) => ({
  type: SAVE_COD_DETAILS,
  payload: codDetails,
});
