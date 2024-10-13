import interceptor from "./interceptor";

export const getAllTests = async () => {
  try {
    const res = await interceptor.get("/api/tests");
    console.log(res);
    return res.data.tests;
  } catch (error) {
    console.log(error);
  }
};

export const createTest = async (data: any) => {
  try {
    const res = await interceptor.post("/api/tests", data);
    return res.data.tests;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTest = async (id: string) => {
  try {
    const res = await interceptor.delete(`/api/tests/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTest = async (slug: string) => {
  try {
    const res = await interceptor.get(`/api/test/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitTest = async (slug: string, data: any) => {
  try {
    const res = await interceptor.post(`/api/test/${slug}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
