import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyColletion = await MongoHelper.getCollection('surveys')
    await surveyColletion.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyColletion = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyColletion.find().toArray()
    return surveys
  }
}
