import { enqueueSnackbar, OptionsObject } from "notistack";

const config: OptionsObject = {
  autoHideDuration: 2000,
};

export const showSuccessToast = (title: string) => {
  enqueueSnackbar(title, { variant: "success", ...config });
};

export const showErrorToast = (title: string) => {
  enqueueSnackbar(title, { variant: "error", ...config });
};

export const showInfoToast = (title: string) => {
  enqueueSnackbar(title, { variant: "info", ...config });
};
