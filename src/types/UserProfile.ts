export interface UserProfileRequestDto {
  csLevel: string;
  goals: string;
  preferences: string;
  topicsToAvoid?: string;
}

export interface UserProfileResponseDto extends UserProfileRequestDto {
  userId: string;
  pastTopics?: unknown[];
  answeredQuizzes?: unknown[];
}

export type UserProfileOutputDto = UserProfileRequestDto;
export type UserProfileInputDto = UserProfileResponseDto;
