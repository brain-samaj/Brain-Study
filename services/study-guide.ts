import api from "@/lib/api";



export async function generateStudyGuide(
  knowledge_source_id:string,
){


  const response =
    await api.post(
      "/study-guide/generate",
      {
        knowledge_source_id,
      },
    );



  return response.data;


}
