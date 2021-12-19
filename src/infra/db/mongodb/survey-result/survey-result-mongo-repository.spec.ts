import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import env from '@/main/config/env'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
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
      answer: 'any_answer_1'
    }, {
      answer: 'any_answer_2'
    }, {
      answer: 'any_answer_3'
    }],
    date: new Date()
  })
  return MongoHelper.map(survey.ops[0])
}

const makeAccount = async (): Promise<AccountModel> => {
  const accountColletion = await MongoHelper.getCollection('accounts')
  await accountColletion.deleteMany({})
  const account = await accountColletion.insertOne({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
  })
  return MongoHelper.map(account.ops[0])
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
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultColletion.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      })

      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await surveyResultColletion.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      })

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultColletion.find({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      }).toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await surveyResultColletion.inserMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])

      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })
  })
})
