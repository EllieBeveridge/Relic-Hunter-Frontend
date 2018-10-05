import axios from 'axios'

const API_URL = 'http://ec2-35-177-132-73.eu-west-2.compute.amazonaws.com/api'

export const fetchAllQuests = () => {
  return axios.get(`${API_URL}/quests`)
    .then(({ data: { quests } }) => {
      return quests
    })
}

export const fetchQuestById = (quest_id) => {
  return axios.get(`${API_URL}/quests/${quest_id}`)
    .then(({ data: quest }) => {
      return quest
    })
    .catch(err => { throw err })
}

export const fetchQuestion = (quest_id, question_id) => {
  return axios.get(`${API_URL}/quests/${quest_id}/${question_id}`)
    .then(({ data: { question } }) => {
      return question
    })
    .catch(err => { throw err })
}

export const checkPicture = (question_id, finalB64, currQ) => {
  return axios.post(`${API_URL}/${question_id}`, finalB64)
    .then(({ res: { answer } }) => {
      console.log(answer)
      answers[currQ] = answer
      return answers
    })
    .catch(err => { throw err })
}

