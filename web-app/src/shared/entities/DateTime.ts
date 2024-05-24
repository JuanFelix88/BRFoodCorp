export class DateTime {
  protected formatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })

  constructor(private value: number) {}

  public static fromDate(date: Date): DateTime {
    return new DateTime(date.valueOf())
  }

  public static fromIso(isoString: string): DateTime {
    return new DateTime(Date.parse(isoString).valueOf())
  }

  public get iso(): string {
    return new Date(this.value).toISOString()
  }

  public toJson(): string {
    return this.iso
  }

  public toString(): string {
    return this.formatter.format(new Date(this.value)).replaceAll(",", "")
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === "number") {
      return this.value
    }
    
    return this.toString()
  }
}