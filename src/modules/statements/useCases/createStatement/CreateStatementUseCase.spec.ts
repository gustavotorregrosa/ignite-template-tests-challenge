import { ICreateStatementDTO } from './ICreateStatementDTO';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { User } from '../../../users/entities/User';
import { statementRouter } from '../../../../routes/statements.routes';
import { IGetBalanceDTO } from '../getBalance/IGetBalanceDTO';

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

describe('create statement useCase', () => {
    let statement: ICreateStatementDTO = {
        amount: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur dignissim egestas. ',
        type: OperationType.WITHDRAW,
        user_id: '123'
    }

    let createStatementUseCase: CreateStatementUseCase
    let usersRepository: any
    let statementsRepository: IStatementsRepository

    beforeEach(() => {
        usersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        }

        statementsRepository = {
            create: jest.fn(),
            findStatementOperation: jest.fn(),
            getUserBalance: jest.fn()
        }

        createStatementUseCase = new CreateStatementUseCase(usersRepository as IUsersRepository, statementsRepository)
    })

    it('findById is called', async () => {
        try {
            await createStatementUseCase.execute(statement)
        } catch (error) {
            console.log({error})
        }

        expect(usersRepository.findById).toBeCalledWith('123')
    })

    it('getUserBalance is called', async () => {
        usersRepository = {
            ...usersRepository,
            findById: async () => new User(),
        }

        statementsRepository = {
            ...statementsRepository,
            getUserBalance: jest.fn()
        }

        createStatementUseCase = new CreateStatementUseCase(usersRepository as IUsersRepository, statementsRepository)

        try {
            await createStatementUseCase.execute(statement)
        } catch (error) {
            console.log({error})
        }

        expect(statementsRepository.getUserBalance).toBeCalled()
        // expect(statementsRepository.create).toBeCalled()
    })
})