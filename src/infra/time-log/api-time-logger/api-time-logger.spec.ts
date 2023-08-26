import { TimeLog } from './api-time-logger'

describe('TimeLog', () => {
  let timeLog: TimeLog

  beforeEach(() => {
    timeLog = new TimeLog()
  })

  it('should log the correct time delay', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'log').mockImplementation(() => {})
    const mockDate = new Date('2022-01-01T00:00:00.000Z')
    timeLog.logTime(mockDate)
    expect(console.log).toBeCalledTimes(1)
  })

  it('should return the correct time delay', () => {
    const mockDate = new Date('2022-01-01T00:00:00.000Z')
    const currentTime = new Date().getTime()
    const expectedDelay = Math.round((currentTime - mockDate.getTime()) / 100)
    const delay = Math.round(timeLog.getTimeDelay(mockDate) / 100)

    expect(delay).toEqual(expectedDelay)
  })
})
