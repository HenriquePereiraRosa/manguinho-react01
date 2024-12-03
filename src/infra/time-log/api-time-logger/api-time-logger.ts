export class TimeLog {
  logTime (param: Date): void {
    const delay: number = new Date().getTime() - param.getTime()
    console.log(`-- Time Spent: ${delay}`)
  }

  getTimeDelay (param: Date): number {
    return new Date().getTime() - param.getTime()
  }
}
