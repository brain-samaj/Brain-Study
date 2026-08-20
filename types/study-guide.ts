export interface StudyGuideContent {


  introduction?: string;


  lessons?: Array<{

    title?: string;

    content?: string;

  }>;


  examples?: Array<{

    title?: string;

    content?: string;

  }>;


  practice_questions?: string[];


  exam_tips?: string[];


  common_mistakes?: string[];


  conclusion?: string;


  [key:string]: unknown;

}



export interface StudyGuideResponse {


  study_guide: StudyGuideContent;


}
