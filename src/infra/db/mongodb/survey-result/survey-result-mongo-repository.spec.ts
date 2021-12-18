import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import env from '@/main/config/env'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyColletion: Collection
let surveyResultColletion: Collection
let accountColletion: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const surveyColletion = await MongoHelper.getCollection('surveys')
  await surveyColletion.deleteMany({})
  const survey = await surveyColletion.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  })
  return survey.ops[0]
}

const makeAccount = async (): Promise<AccountModel> => {
  const accountColletion = await MongoHelper.getCollection('accounts')
  await accountColletion.deleteMany({})
  const account = await accountColletion.insertOne({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
  })
  return account.ops[0]
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    surveyColletion = await MongoHelper.getCollection('surveys')
    await surveyColletion.deleteMany({})

    surveyResultColletion = await MongoHelper.getCollection('surveyResults')
    await surveyResultColletion.deleteMany({})

    accountColletion = await MongoHelper.getCollection('accounts')
    await accountColletion.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
