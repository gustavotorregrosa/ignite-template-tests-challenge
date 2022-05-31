import { GetBalanceUseCase } from './GetBalanceUseCase';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { Statement } from '../../entities/Statement';
import { GetBalanceError } from './GetBalanceError';
import { User } from '../../../users/entities/User';


interface IRequest {
    user_id: string;
}
  
interface IResponse {
    statement: Statement[];
    balance: number;
}

describe('get balance use case', () => {
    let getBalanceUseCase: GetBalanceUseCase
    let statementsRepository: IStatementsRepository
    let userRepository: IUsersRepository
    let request: IRequest = {
        user_id: '123'
    }

    beforeEach(() => {
        statementsRepository = {
            create: jest.fn(),
            findStatementOperation: jest.fn(),
            getUserBalance: jest.fn()
        }

        userRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        }

        getBalanceUseCase = new GetBalanceUseCase(statementsRepository, userRepository)
    })

    it('findById called', async () => {

        try {
            await getBalanceUseCase.execute(request)
        } catch (error) {
            console.log({error})
            expect(error).toBeInstanceOf(GetBalanceError)
        }

        expect(userRepository.findById).toBeCalled()

    })

    it('get user balance is called', async () => {
        userRepository = {
            ...userRepository,
            findById: async () => new User()
        }

        getBalanceUseCase = new GetBalanceUseCase(statementsRepository, userRepository)

        try {
            await getBalanceUseCase.execute(request)
        } catch (error) {
            console.log({error})
        }

        expect(statementsRepository.getUserBalance).toBeCalled()



    })

})