import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';
// jest.mock('./AuthenticateUserUseCase')

interface IRequest {
    email: string;
    password: string;
  }

describe('AuthenticateUser use case', () => {
    let authenticateUserUseCase: AuthenticateUserUseCase
    let usersRepository: any
    let requestObj:IRequest = {
        email: 'gustavo.torregrosa@gmail.com',
        password: 'gustavo01'
    }

    beforeEach(() => {
        usersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        }
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository as IUsersRepository)
    })

    it('find user by email is called', async () => {
        try {
            await authenticateUserUseCase.execute(requestObj)
        } catch (error) {
            console.log({error})
        }
    
        expect(usersRepository.findByEmail).toBeCalledWith("gustavo.torregrosa@gmail.com")
        
    })

    it('recieve error for non registered user', async  () => {
      await expect(async () => {
        await authenticateUserUseCase.execute(requestObj)
      }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
      
    })
})