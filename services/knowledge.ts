import api from "@/lib/api";



export async function uploadKnowledgeDocument(
  file: File,
){


  const formData =
    new FormData();



  formData.append(
    "file",
    file,
  );



  const response =
    await api.post(
      "/knowledge/upload",
      formData,
      {
        headers:{
          "Content-Type":
          "multipart/form-data",
        },
      },
    );



  return response.data;


}



export async function createKnowledgeTopic(
  data:{
    title:string;
    subject:string;
    topic_description:string;
  },
){


  const response =
    await api.post(
      "/knowledge/topic",
      data,
    );



  return response.data;


}
