import interceptor from "./interceptor";

export const getResults = async (slug: string) => {
  try {
    const res = await interceptor.get(`/api/result/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
