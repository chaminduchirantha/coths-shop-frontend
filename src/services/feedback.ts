import api from "./api"

type FeedbackData={
    customername :string
    email : string 
    ratings : number
    feedback : string
}

export const feedbackSave = async (data: FeedbackData) => {
  const res = await api.post("/feedback/createFeedback", data)
  return res.data
}


export const getAllFeedback = async (page: number, limit: number) => {
  const res = await api.get(`/feedback/allFeedback?page=${page}&limit=${limit}`);
  return res.data;
};