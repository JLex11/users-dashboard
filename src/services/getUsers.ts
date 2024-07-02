import { UsersApiResponse } from '../types.d'

export interface GetUsersOptions {
  limit?: number
  page?: number
}

export const getUsers = async ({ limit = 10, page = 1 }: GetUsersOptions = {}) => {
  return fetch(`https://randomuser.me/api/?seed=react-users-dashboard&results=${limit}&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error getting users, status code: ' + response.status)
      return response.json()
    })
    .then((response: UsersApiResponse) => {
      return {
        users: response.results,
        nextPage: Number(response.info.page) + 1
      }
    })
}
