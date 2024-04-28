export type Remedy = {
  id: string;
  name: string;
  daysToComplete: number;
  description: string;
  benefits: string[];
  ingredients: string[];
  usageMethod: string[];
  image: string;
  averageRating: number;
  timesRated: number;
};

export type UserRemedyData = {
  rating: number;
  dateStarted: Date;
  remedyId: string;
};

export interface RemedyData {
  remedy: Remedy;
  userRemedy: UserRemedyData;
}
