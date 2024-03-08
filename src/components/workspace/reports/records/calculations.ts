/* eslint-disable no-unmodified-loop-condition */
import { type Record as RecordType } from 'types/record'

export const getUsePerHeadquarder = (records: RecordType[]) => {
  const countAlameda: number = records.filter(
    (record) => record.table.floor.headquarder === 'alameda'
  ).length
  const countjazmines: number = records.filter(
    (record) => record.table.floor.headquarder === 'jazmines'
  ).length

  return {
    countAlameda,
    countjazmines
  }
}

export const getPerTurn = (records: RecordType[]) => {
  let countTurn8to12: number = 0
  let countTurn12to20: number = 0

  records.forEach((record) => {
    const from = new Date(record.current.from)
    const fromTime = from.getHours()

    if (fromTime >= 8 && fromTime < 12) {
      countTurn8to12++
    } else if (fromTime >= 12 && fromTime < 20) {
      countTurn12to20++
    }
  })

  return {
    countTurn8to12,
    countTurn12to20
  }
}

export const getRecordsByDuration = (records: RecordType[]) => {
  let countLessThan1Hour: number = 0
  let countLessThan2Hours: number = 0
  let countLessThan3Hours: number = 0
  let countLessThan4Hours: number = 0
  let countMoreThan4Hours: number = 0

  records.forEach((record) => {
    const from = new Date(record.current.from)
    const to = new Date(record.current.to)
    const durationInHours = (to.getTime() - from.getTime()) / (1000 * 60 * 60) // Convertir a horas

    if (durationInHours < 1) {
      countLessThan1Hour++
    } else if (durationInHours < 2) {
      countLessThan2Hours++
    } else if (durationInHours < 3) {
      countLessThan3Hours++
    } else if (durationInHours < 4) {
      countLessThan4Hours++
    } else if (durationInHours > 4) {
      countMoreThan4Hours++
    }
  })

  return {
    countLessThan1Hour,
    countLessThan2Hours,
    countLessThan3Hours,
    countLessThan4Hours,
    countMoreThan4Hours
  }
}

export const getRecodsByTypeUser = (records: RecordType[]) => {
  let countStudent: number = 0
  let countExecutive: number = 0

  records.forEach((record) => {
    if (record.current.user.type_user === 'student') {
      countStudent++
    } else if (record.current.user.type_user === 'executive') {
      countExecutive++
    }
  })

  return {
    countStudent,
    countExecutive
  }
}

export const getRecodsByTypeUse = (records: RecordType[]) => {
  let countPc: number = 0
  let countTable: number = 0

  records.forEach((record) => {
    if (record.table.type === 'pc') {
      countPc++
    } else if (record.table.type === 'table') {
      countTable++
    }
  })

  return {
    countPc,
    countTable
  }
}

interface WeeklyDailyRecord {
  date: string
  count: number
}

interface WeeklyDailyRecordBySede {
  alameda: WeeklyDailyRecord[]
  jazmines: WeeklyDailyRecord[]
}

export const getRecordsByWeek = (
  records: RecordType[]
): WeeklyDailyRecordBySede => {
  const weeklyRecords: WeeklyDailyRecordBySede = {
    alameda: [],
    jazmines: []
  }

  if (records.length === 0) return weeklyRecords

  const startDate = new Date(records[0].current.from)
  const endDate = new Date(records[records.length - 1].current.from)
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const weekStartDate = new Date(currentDate)
    const weekEndDate = new Date(currentDate)
    weekEndDate.setDate(currentDate.getDate() + 6) // Ir al final de la semana

    const alamedaCount = records.filter((record) => {
      const recordDate = new Date(record.current.from)
      return (
        recordDate >= weekStartDate &&
        recordDate <= weekEndDate &&
        record.table.floor.headquarder === 'alameda'
      )
    }).length

    const jasminezCount = records.filter((record) => {
      const recordDate = new Date(record.current.from)
      return (
        recordDate >= weekStartDate &&
        recordDate <= weekEndDate &&
        record.table.floor.headquarder === 'jazmines'
      )
    }).length

    weeklyRecords.alameda.push({
      date: `${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()}`,
      count: alamedaCount
    })

    weeklyRecords.jazmines.push({
      date: `${weekStartDate.toLocaleDateString()} - ${weekEndDate.toLocaleDateString()}`,
      count: jasminezCount
    })

    currentDate.setDate(currentDate.getDate() + 7)
  }

  return weeklyRecords
}

export const getRecordsByDay = (
  records: RecordType[]
): WeeklyDailyRecordBySede => {
  const dailyRecords: WeeklyDailyRecordBySede = {
    alameda: [],
    jazmines: []
  }
  if (records.length === 0) return dailyRecords

  const startDate = new Date(records[0].current.from)
  const endDate = new Date(records[records.length - 1].current.from)
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const alamedaCount = records.filter((record) => {
      const recordDate = new Date(record.current.from)
      return (
        recordDate.toDateString() === currentDate.toDateString() &&
        record.table.floor.headquarder === 'alameda'
      )
    }).length

    const jazminesCount = records.filter((record) => {
      const recordDate = new Date(record.current.from)
      return (
        recordDate.toDateString() === currentDate.toDateString() &&
        record.table.floor.headquarder === 'jazmines'
      )
    }).length

    dailyRecords.alameda.push({
      date: currentDate.toDateString(),
      count: alamedaCount
    })

    dailyRecords.jazmines.push({
      date: currentDate.toDateString(),
      count: jazminesCount
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dailyRecords
}

interface DailyRecord {
  name: string
  count: number
  date: string
}
export const getMostUsedTablesByDay = (
  records: RecordType[]
): DailyRecord[][] => {
  const tablesCount: Record<string, Record<string, number>> = {}
  const tableNames: Record<string, string> = {} // Mapear _id a nombre de la mesa

  // Mapear _id a nombre de la mesa
  records.forEach((record) => {
    tableNames[record.table._id.toString()] = record.table.name
  })

  // Contar el uso de cada mesa por día
  records.forEach((record) => {
    const tableName = record.table._id
    const recordDate = new Date(record.current.from).toDateString()

    if (!tablesCount[tableName.toString()]) {
      tablesCount[tableName.toString()] = {}
    }

    if (!tablesCount[tableName.toString()][recordDate]) {
      tablesCount[tableName.toString()][recordDate] = 0
    }

    tablesCount[tableName.toString()][recordDate]++
  })

  // Convertir las mesas en un array de objetos DailyRecord
  const dailyRecords: DailyRecord[][] = Object.entries(tablesCount).map(
    ([tableId, usage]) => {
      const tableName = tableNames[tableId]
      return Object.entries(usage).map(([date, count]) => ({
        name: tableName,
        count,
        date
      }))
    }
  )

  // Ordenar los arrays de DailyRecord de mayor a menor según la cantidad de días
  dailyRecords.sort((a, b) => b.length - a.length)

  return dailyRecords
}
