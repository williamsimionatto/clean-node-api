export interface SurverAnswer {
  image?: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: SurverAnswer[]
}

export interface AddSurvey {
  add: (date: AddSurveyModel) => Promise<void>
}
