export interface UserProfileOutputDto {
  userId: string;
  csLevel: string;
  goals: string;
  preferences: string;
  topicsToAvoid?: string;
}

export interface UserProfileInputDto {
  userId: string;
  csLevel: string;
  goals: string;
  preferences: string;
  topicsToAvoid?: string;
}
