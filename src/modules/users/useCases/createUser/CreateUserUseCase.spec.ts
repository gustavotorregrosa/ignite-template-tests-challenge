import { CreateUserUseCase } from './CreateUserUseCase';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from './ICreateUserDTO';
import { hash } from 'bcryptjs';

jest.mock('bcryptjs', () => {
    const originalModule = jest.requireActual('bcryptjs')

    return {
        __esModule: true,
        ...originalModule,
        hash: () => '1234'
    }
})

describe('Create user use case', () => {

    let createUserUseCase: CreateUserUseCase
    let usersRepository: IUsersRepository

    let requestObj: ICreateUserDTO = {
        email: 'gustavo.torregrosa@gmail.com',
        password: 'gustavo01',
        name: 'Gustavo Torregrosa'

    }

    beforeEach(() => {
        usersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        }

        createUserUseCase = new CreateUserUseCase(usersRepository)
    })

    it('find user by email is called', async () => {
        try {
            await createUserUseCase.execute(requestObj)
        } catch (error) {
            console.log({error})
        }
    
        expect(usersRepository.findByEmail).toBeCalledWith("gustavo.torregrosa@gmail.com")
    })


    it('create user by email is called', async () => {
        try {
            await createUserUseCase.execute(requestObj)
        } catch (error) {
            console.log({error})
        }

        let password = await hash(requestObj.password, 8)
    
        expect(usersRepository.create).toBeCalledWith({
            ...requestObj,
            password
        })
    })


})