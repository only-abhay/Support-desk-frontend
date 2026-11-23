import axiosCat from "./helper";

const getUserByEmail = async ({ email }) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const response = await axiosCat.get(
      `/auth/get/${encodeURIComponent(email)}`,
      {
        withCredentials: true,
      },
    );

    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching user by email:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

const CurrentUser = async () => {
  try {
    const response = await axiosCat.get("/auth/me", {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const TicketAll = async () => {
  try {
    const response = await axiosCat.get("/query/all", {
      withCredentials: true,
    });
    return {
      tickets: response.data.tickets,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

const AgentAll = async () => {
  const response = await axiosCat.get("/query/agents", {
    withCredentials: true,
  });
  if (!Array.isArray(response.data.agents)) {
    throw new Error("The agents response is invalid.");
  }
  return response.data.agents;
};

const AdminUsers = async () => {
  const response = await axiosCat.get("/agent/users", {
    withCredentials: true,
  });
  if (!Array.isArray(response.data.users)) {
    throw new Error("The users response is invalid.");
  }
  return response.data.users;
};

const ConvertUserToAgent = async (userId) => {
  const response = await axiosCat.post(
    `/agent/${encodeURIComponent(userId)}/convert`,
    {},
    { withCredentials: true },
  );
  return response.data;
};

const UpdateAgentStatus = async ({ agentId, status }) => {
  const response = await axiosCat.patch(
    `/agent/${encodeURIComponent(agentId)}/status`,
    { status },
    { withCredentials: true },
  );
  return response.data;
};

const AssignedTickets = async () => {
  const response = await axiosCat.get("/query/assigned", {
    withCredentials: true,
  });
  if (!Array.isArray(response.data.tickets)) {
    throw new Error("The assigned tickets response is invalid.");
  }
  return response.data.tickets;
};

const UpdateAssignedTicketStatus = async ({ ticketId, status }) => {
  const response = await axiosCat.patch(
    `/query/assigned/${encodeURIComponent(ticketId)}/status`,
    { status },
    { withCredentials: true },
  );
  return response.data;
};

const DeleteTicket = async (ticketId) => {
  const response = await axiosCat.delete(
    `/query/delete/${encodeURIComponent(ticketId)}`,
    { withCredentials: true },
  );
  return response.data;
};

const GetTicketMessages = async (ticketId) => {
  const response = await axiosCat.get(
    `/query/message/${encodeURIComponent(ticketId)}`,
    { withCredentials: true },
  );
  if (!Array.isArray(response.data.messages)) {
    throw new Error("The ticket messages response is invalid.");
  }
  return response.data.messages;
};

const SendTicketMessage = async ({ ticketId, message }) => {
  const response = await axiosCat.post(
    `/query/message/${encodeURIComponent(ticketId)}`,
    { message },
    { withCredentials: true },
  );
  return response.data;
};

const AssignTicket = async ({ ticketId, agentId }) => {
  const response = await axiosCat.patch(
    "/query/assign",
    { ticketId, agentId },
    { withCredentials: true },
  );
  return response.data;
};

const GetTicketByAgent = async({agentID}) =>{
try {
   const response = await axiosCat.get(
    `/query/agent/${encodeURIComponent(agentID)}`,
    { withCredentials: true },
  );
  return response
} catch (error) {
  console.log(error)
}
}
const GetArticle = async ()=>{
  try{
    const response = await axiosCat.get("/article/get")
  if(response.data.success){
    return response
  }
  }catch(error){
       return error
  }
}

 export const DeleteById = async (id)=>{
try {
   if(id){
     const response = await axiosCat.delete(`/article/delete/${encodeURIComponent(id)}`)
     return response
   }
} catch (error) {
  
}
}

export {
  CurrentUser,
  getUserByEmail,
  TicketAll,
  AgentAll,
  AdminUsers,
  ConvertUserToAgent,
  UpdateAgentStatus,
  AssignedTickets,
  UpdateAssignedTicketStatus,
  DeleteTicket,
  GetTicketMessages,
  SendTicketMessage,
  AssignTicket,
  GetTicketByAgent,
  GetArticle
};
