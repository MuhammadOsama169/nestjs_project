import {Test} from '@nestjs/testing'
import {INestApplication,ValidationPipe} from '@nestjs/common'
import { AppModule } from '../src/app.module'

describe('App end2end',()=>{
  let app: INestApplication
  //starting logic
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports:[AppModule],
      }).compile()
      const app = moduleRef.createNestApplication();

      app.useGlobalPipes(
        // eslint-disable-next-line @darraghor/nestjs-typed/should-specify-forbid-unknown-values
        new ValidationPipe ({
          whitelist:true,
        })
      )
      await app.init()
  })
  //teardown logic
  afterAll(()=>{
    app.close()
  })
  it.todo('should pass')
})