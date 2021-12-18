import { SurveyAnswerModel } from '@/domain/models/survey'

export type AddSurveyParams = {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface AddSurvey {
  add: (date: AddSurveyParams) => Promise<void>
}
