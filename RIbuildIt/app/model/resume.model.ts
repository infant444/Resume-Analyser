export class Resume{
    id!:string;
    companyName!:string;
    jobTitle!:string;
    imagePath!:string;
    resumePath!:string;
    feedback!:Feedback;
}
export class Feedback{
    overallScore!:number;
      ATS!: FeedbackScore;
      toneAndStyle!: FeedbackScore;
      content!: FeedbackScore;
      structure!: FeedbackScore;
      skills!: FeedbackScore;
    
};
interface FeedbackScore{
    score:number,
        tips:feedbackTips[] ,
}
export interface feedbackTips{
    type:'good'|'improve';
    tip:string;
    explanation:string;
}