import { FormData } from "../_components/CardAdmin/CardContentAdmin";


export async function findUserAndServiceByBooking(barbershopId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin?barbershopId=${barbershopId}`
    ).then((response) => response.json());
    if (!response.ok) throw new Error("Houve um erro ao fazer o fetch");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteService(serviceId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/services?serviceId=${serviceId}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json());
    if (!response.ok) throw new Error("Houve um erro ao fazer o fetch");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateService(formData: FormData, serviceId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/services`, {
      method: "PUT",
      body: JSON.stringify({ serviceId, formData }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
    if (!response.ok) return new Error("Houve um erro ao fazer o fetch");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createService(formData: FormData, barbershopId: string) {
  try {
    const response = await fetch("http://localhost:3000/api/admin/services", {
      method: "POST",
      body: JSON.stringify({ barbershopId, formData }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
    if (!response.ok) return new Error("Houve um erro ao fazer o fetch");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/bookings?bookingId=${bookingId}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePropertyBarbershop(
  property: string,
  value: string,
  barbershopId: string
) {
  try {
    const response = await fetch("http://localhost:3000/api/admin/barbershop", {
      method: "PUT",
      body: JSON.stringify({ property, barbershopId, value }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    if (!response.ok) throw new Error("Houve um erro ao fazer o fetch");
    return response;
  } catch (error) {
    console.log(error);
  }
}
