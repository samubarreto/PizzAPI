import { API_URL } from "./utils";

export async function listarPedidos(skip = 0, pageSize = 10, search = '') {
  return fetch(`${API_URL}/api/pedido?search=${search}&skip=${skip}&pageSize=${pageSize}`);
}

// export function getClienteById(id_cliente) {
//   var response = fetch(URL_API + "/api/clientes/" + id_cliente);
//   return response;
// }

// export function deletarCliente(id_cliente) {
//   var request = {
//     method: "DELETE"
//   }
//   var response = fetch(URL_API + "/api/clientes/" + id_cliente, request)
//   return response;
// }

// export function postPutCliente(cliente) {

//   var request = {
//     method: cliente.id ? "PUT" : "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(cliente)
//   }

//   var response = fetch(URL_API + "/api/clientes", request)
//   return response;
// }

// export function uparImagemPerfil(form, id_cliente) {
//   var formData = new FormData(form);

//   var request = { method: "POST", body: formData }

//   try {
//     var response = fetch(URL_API + "/api/clientes/UploadProfilePic/" + id_cliente, request)
//     return response;
//   } catch (error) {
//     return null
//   }
// }