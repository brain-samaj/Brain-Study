import api from "@/lib/api";

import type {
  SmartStudyResponse,
  SmartStudyDashboard,
} from "@/types/smart-study";



export async function startSmartStudy(
  studyMaterialId:string,
):Promise<SmartStudyResponse>{


  const response =
    await api.post<SmartStudyResponse>(
      `/smart-study/${studyMaterialId}/start`,
    );


  return response.data;

}





export async function submitSmartStudyAnswer(
  data:{
    session_id:string;
    question_id:string;
    answer:string;
  },
){


  const response =
    await api.post(
      "/smart-study/submit",
      data,
    );


  return response.data;

}





export async function getSmartStudyDashboard(
  studyMaterialId:string,
):Promise<SmartStudyDashboard>{


  const response =
    await api.get<SmartStudyDashboard>(
      `/smart-study/dashboard/${studyMaterialId}`,
    );


  return response.data;

}
