import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyColletion = await MongoHelper.getCollection('surveys')
    await surveyColletion.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyColletion = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyColletion.find().toArray()
    return surveys && MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyColletion = await MongoHelper.getCollection('surveys')
    const survey = await surveyColletion.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
