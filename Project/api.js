import axios from 'axios'

const API_URL = 'http://ec2-35-177-132-73.eu-west-2.compute.amazonaws.com/api'

export const fetchAllVenues = () => {
  return axios.get(`${API_URL}/venues`)
    .then(({ data: { venues } }) => {
      return venues
    })
    .catch(err => { throw err })
}

export const fetchAllQuests = (venue) => {
  return axios.get(`${API_URL}/quests/${venue}`)
    .then(({ data: { quests } }) => {
      return quests
    })
    .catch(err => { throw err })
}

// quest id but is this really venue id?
// export const fetchQuestById = (quest_id) => {
//   return axios.get(`${API_URL}/quests/${quest_id}/questions`)
export const fetchQuestById = (venue) => {
  return axios.get(`${API_URL}/quests/${venue}/questions`)
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

export const postNewQuest = (venue_id, quest) => {
  // console.log(state);
  // const { title, intro_text, full_text, icon_url, background_url, suitability, venue_area } = state
  return axios.post(`${API_URL}/quests/${venue_id}`, quest)
    .then(({ data }) => {
      return data.quest
    })
    .catch(err => { throw err })
}

export const postNewQuestion = (quest_id, question) => {
  // console.log(state);
  // const { title, intro_text, full_text, icon_url, background_url, suitability, venue_area } = state
  return axios.post(`${API_URL}/quests/${quest_id}/questions`, question)
    .then(({ data }) => {
      return data
    })
    .catch(err => { throw err })
}
