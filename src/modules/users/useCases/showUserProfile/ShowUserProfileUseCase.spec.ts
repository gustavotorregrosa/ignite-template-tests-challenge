import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ShowUserProfileError } from './ShowUserProfileError';

describe('Show user profile use case', () => {
  let showUserProfileUseCase: ShowUserProfileUseCase
  let usersRepository: IUsersRepository

  beforeEach(() => {
    usersRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn()
    }

    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository)
  })

  it('find user by email is called', async () => {
    try {
      await showUserProfileUseCase.execute('123')
    } catch (error) {
      console.log({error})
    }

    expect(usersRepository.findById).toBeCalledWith('123')
  })

  it('receive error for non register user', async () => {
    await expect(async () => {
      await showUserProfileUseCase.execute('123')
    }).rejects.toBeInstanceOf(ShowUserProfileError)
  })




})
