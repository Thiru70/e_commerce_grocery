import api from "./api";

const auth = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAssignedOrders = async () => {

    const response = await api.get(

        "/delivery/orders",

        auth()

    );

    return response.data;

};

export const acceptOrder = async(id)=>{

    return api.put(

        `/delivery/orders/${id}/accept`,

        {},

        auth()

    );

};

export const updateDeliveryStatus = async(

    id,

    status

)=>{

    return api.put(

        `/delivery/orders/${id}/status`,

        {

            status

        },

        auth()

    );

};