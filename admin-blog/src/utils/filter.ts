import dayjs from "dayjs"
export const parseTime = (time: string | number, type?: string) => {
  let formatType = type || "YYYY-MM-DD HH:mm:ss"
  return dayjs(new Date(Number(time))).format(formatType)
}


