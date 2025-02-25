import Swal from "sweetalert2";
const createAlert = (icon,text)=>{
//code
return Swal.fire({
icon: icon || "info",
text: text || "Something went wrong",
timer: 3000,
})


}