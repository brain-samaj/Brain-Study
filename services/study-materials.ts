import api from "@/lib/api";

import type {
  StudyMaterialListResponse,
} from "@/types/upload";



export async function getStudyMaterials()
: Promise<StudyMaterialListResponse> {


  const response =
    await api.get<StudyMaterialListResponse>(
      "/study-materials",
    );


  return response.data;

}
