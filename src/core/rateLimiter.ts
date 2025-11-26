class RateLimiter {
  private queue: Array<() => void> = [];
  private isProcessing = false;
  private readonly delayMs: number;
  private readonly maxPerSecond: number;
  private requestsThisSecond = 0;
  private lastResetTime = Date.now();
  
  private totalRequests = 0;
  private totalWaitTime = 0;

  constructor(maxPerSecond: number, delayMs?: number) {
    this.maxPerSecond = maxPerSecond;
    this.delayMs = delayMs || Math.ceil(1000 / maxPerSecond);
  }

  public async waitForSlot(): Promise<void> {
    const now = Date.now();
    if (now - this.lastResetTime >= 1000) {
      this.requestsThisSecond = 0;
      this.lastResetTime = now;
    }

    if (this.requestsThisSecond >= this.maxPerSecond) {
      const waitTime = 1000 - (now - this.lastResetTime);
      this.totalWaitTime += waitTime;
      await this.delay(waitTime);
      this.requestsThisSecond = 0;
      this.lastResetTime = Date.now();
    }

    this.requestsThisSecond++;
    this.totalRequests++;
    
    if (this.requestsThisSecond > 1) {
      await this.delay(this.delayMs);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public getStats(): {
    totalRequests: number;
    averageWaitTime: number;
    requestsThisSecond: number;
    maxPerSecond: number;
  } {
    return {
      totalRequests: this.totalRequests,
      averageWaitTime: this.totalRequests > 0 
        ? Math.round(this.totalWaitTime / this.totalRequests) 
        : 0,
      requestsThisSecond: this.requestsThisSecond,
      maxPerSecond: this.maxPerSecond
    };
  }

  public resetStats(): void {
    this.totalRequests = 0;
    this.totalWaitTime = 0;
  }
}

export const apiRateLimiter = new RateLimiter(8);
export const telegramRateLimiter = new RateLimiter(20);

