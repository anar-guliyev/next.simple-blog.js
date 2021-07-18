import Swal from "sweetalert2";

export const useToast = (props?: any) =>
  Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    ...props,
  });
