import { injectable, inject, container } from "tsyringe";
import cron from "node-cron";
import { IStockOpnameService } from "../services/StockOpnameService/IStockOpnameService";

@injectable()
export class StockOpnameScheduler {
  private job: cron.ScheduledTask | null = null;

  constructor(
    @inject("IStockOpnameService")
    private stockOpnameService: IStockOpnameService // Valid pada parameter constructor
  ) {
    this.scheduleJob();
  }

  private scheduleJob() {
    // Jadwalkan cron job untuk berjalan setiap menit (atur sesuai kebutuhan)
    this.job = cron.schedule("* * * * *", this.runJob.bind(this));
  }

  private async runJob() {
    try {
      console.log("Cron job is running...");
      await this.stockOpnameService.processScheduleStatusOpname();
    } catch (error) {
      console.error("Error running the cron job:", error);
    }
  }

  public start() {
    if (this.job) {
      this.job.start();
    }
  }

  public stop() {
    if (this.job) {
      this.job.stop();
    }
  }
}

// const StockOpnameSchedulerImpl = container.resolve(StockOpnameScheduler);
// StockOpnameSchedulerImpl.start.bind(StockOpnameSchedulerImpl);
