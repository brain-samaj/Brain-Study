export interface SmartStudyResponse {

  question?: string;

  correct_answer?: string;

  detailed_explanation?: string;

  why_wrong?: string;

  study_tip?: string;

  difficulty?: string;

  topic?: string;

  learning_objective?: string;


  [key:string]: unknown;

}



export interface SmartStudyDashboard {

  total_questions?: number;

  correct_answers?: number;

  wrong_answers?: number;

  mastery_score?: number;

  confidence_score?: number;


  [key:string]: unknown;

}
