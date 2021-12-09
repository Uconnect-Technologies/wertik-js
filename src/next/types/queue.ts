export interface useQueueProps {
  queueName?: string
  url?: string
  options?: QueueOptions
}

export interface QueueOptions {
  limiter?: RateLimiter
  redis?: RedisOpts
  prefix?: string | "bull"
  defaultJobOptions?: JobOpts
  createClient?(type: "client" | "subscriber" | "bclient", config?: RedisOpts)
  settings?: AdvancedSettings
}

interface AdvancedSettings {
  lockDuration: number | 30000
  lockRenewTime: number | 15000
  stalledInterval: number | 30000
  maxStalledCount: number | 1
  guardInterval: number | 5000
  retryProcessDelay: number | 5000
  backoffStrategies: {}
  drainDelay: number | 5
}

interface RateLimiter {
  max: number
  duration: number
  bounceBack: boolean | false
}

export interface RedisOpts {
  port?: number | 6379
  host?: string | object
  db?: number | 0
  password?: string
}

interface JobOpts {
  priority: number
  delay: number
  attempts: number
  repeat: RepeatOpts
  backoff: number | BackoffOpts
  lifo: boolean
  timeout: number
  jobId: number | string
  removeOnComplete: boolean | number
  removeOnFail: boolean | number
  keep

  stackTraceLimit: number
}

interface RepeatOpts {
  cron?: string
  tz?: string
  startDate?: Date | string | number
  endDate?: Date | string | number
  limit?: number
  every?: number
  count?: number
}

interface BackoffOpts {
  type: string
  delay: number
}
