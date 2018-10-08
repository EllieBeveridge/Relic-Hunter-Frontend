import axios from 'axios'

const API_URL = 'http://ec2-35-177-132-73.eu-west-2.compute.amazonaws.com/api'

const venue_id = 1

export const fetchAllQuests = () => {
  return axios.get(`${API_URL}/quests/${venue_id}`)
    .then(({ data: { quests } }) => {
      return quests
    })
    .catch(err => { throw err })
}

export const fetchQuestById = (quest_id) => {
  return axios.get(`${API_URL}/quests/${quest_id}/questions`)
    .then(({ data: questions }) => {
      return questions
    })
    .catch(err => { throw err })
}

export const checkPicture = (question_id, finalB64) => {
  return axios.post(`${API_URL}/answers/${question_id}`, finalB64)
    .then(({ data: { answer } }) => {
      return answer.answer_id.isCorrect
    })
    .catch(err => { throw err })
}

