import api from "@/lib/api";

import type {
  UploadResponse,
} from "@/types/upload";



export async function uploadStudyMaterial(
  data: {
    title: string;
    description?: string;
    file: File;
  },
): Promise<UploadResponse> {


  const formData =
    new FormData();



  formData.append(
    "title",
    data.title,
  );



  if(data.description){

    formData.append(
      "description",
      data.description,
    );

  }



  formData.append(
    "file",
    data.file,
  );



  const response =
    await api.post<UploadResponse>(
      "/study-materials/upload",
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
