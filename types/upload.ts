export interface StudyMaterial {


  id: string;


  user_id: string;


  title: string;


  description?: string | null;


  original_filename: string;


  stored_filename: string;


  mime_type: string;


  file_extension: string;


  file_size: number;


  storage_path: string;


  ai_processed: boolean;


  created_at: string;


  updated_at: string;


}



export interface UploadResponse
extends StudyMaterial {}



export interface StudyMaterialListResponse {

  total: number;


  items: StudyMaterial[];

}
