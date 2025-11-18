export class Resume{
    id!:string;
    companyName!:string;
    jobTitle!:string;
    imagePath!:string;
    resumePath!:string;
    feedback!:Feedback;
}
class Feedback{
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
interface feedbackTips{
    type:'good'|'improve';
    tip:string;
}