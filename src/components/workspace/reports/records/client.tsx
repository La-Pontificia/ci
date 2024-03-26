'use client'

import React from 'react'

import { Card } from './card'
import { type Record } from 'types/record'
import {
  getMostUsedTablesByDay,
  getPerTurn,
  getRecodsByTypeUse,
  getRecodsByTypeUser,
  getRecordsByDay,
  getRecordsByDuration,
  getUsePerHeadquarder
} from './calculations'
import ReactApexChart from 'react-apexcharts'
import { useRecords } from 'stores'
export function RecordReportClient({ records }: { records: Record[] }) {
  const { countAlameda, countjazmines } = getUsePerHeadquarder(records)
  const { countTurn8to12, countTurn12to20 } = getPerTurn(records)
  const {
    countLessThan1Hour,
    countLessThan2Hours,
    countLessThan3Hours,
    countLessThan4Hours,
    countMoreThan4Hours
  } = getRecordsByDuration(records)

  useRecords.setState({
    records: records.map((e) => ({ ...e, _id: e._id.toString() }))
  })

  const { countExecutive, countStudent } = getRecodsByTypeUser(records)
  const { countPc, countTable } = getRecodsByTypeUse(records)

  // const weeklyRecords = getRecordsByWeek(records)
  const { alameda, jazmines } = getRecordsByDay(records)

  const MostUsedTables = getMostUsedTablesByDay(records)
  return (
    <div className="p-1">
      <div className="grid max-700:grid-cols-1 grid-cols-2 gap-3">
        <Card title="Atenciones">
          <ReactApexChart
            width={'100%'}
            height={250}
            series={[
              {
                name: 'Alameda',
                data: alameda.map((e) => e.count)
              },
              {
                name: 'Jazmines',
                data: jazmines.map((e) => e.count)
              }
            ]}
            options={{
              chart: {
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'category',
                categories: alameda.map((e) => e.date)
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                }
              }
            }}
            type="area"
          />
        </Card>
        <Card title="Top 4 mesas más usadas">
          <ReactApexChart
            width={'100%'}
            height={250}
            series={[
              {
                name: MostUsedTables[0]?.[0]?.name ?? undefined,
                data: MostUsedTables[0]?.map((e) => e.count) ?? [0]
              },
              {
                name: MostUsedTables[1]?.[0].name ?? undefined,
                data: MostUsedTables[1]?.map((e) => e.count) ?? [0]
              },
              {
                name: MostUsedTables[2]?.[0]?.name ?? undefined,
                data: MostUsedTables[2]?.map((e) => e.count) ?? [0]
              },
              {
                name: MostUsedTables[3]?.[0]?.name ?? undefined,
                data: MostUsedTables[3]?.map((e) => e.count) ?? [0]
              }
            ]}
            options={{
              chart: {
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'category',
                categories: MostUsedTables[0]?.map((e) => e.date)
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                }
              }
            }}
            type="area"
          />
        </Card>
      </div>
      <div className="grid-cols-4 max-1500:grid-cols-2 max-900:grid-cols-1 grid pt-4 gap-3">
        <Card title="Sedes">
          <ReactApexChart
            width={'100%'}
            options={{
              chart: {
                width: 900,
                height: 900,
                type: 'pie'
              },
              labels: ['Alameda', 'Jazmines'],
              colors: ['#FF335E', '#FFCE33']
            }}
            series={[countAlameda, countjazmines]}
            type="pie"
          />
        </Card>
        <Card title="Turnos">
          <ReactApexChart
            width={'100%'}
            options={{
              chart: {
                type: 'donut'
              },
              labels: ['TM (8:00-12:00)', 'TT (12:00-20.000)'],
              colors: ['#FFCE33', '#33C4FF']
            }}
            series={[countTurn8to12, countTurn12to20]}
            type="donut"
          />
        </Card>
        <Card title="Horas">
          <ReactApexChart
            width={'100%'}
            series={[
              countLessThan1Hour,
              countLessThan2Hours,
              countLessThan3Hours,
              countLessThan4Hours,
              countMoreThan4Hours
            ]}
            options={{
              chart: {
                type: 'polarArea'
              },
              labels: ['1 hora', '2 horas', '3 horas', '4 horas', '+4 horas'],
              stroke: {
                colors: ['#fff']
              },
              fill: {
                opacity: 0.8
              }
            }}
            type="polarArea"
          />
        </Card>
        <Card title="Tipo de usuario">
          <ReactApexChart
            width={'100%'}
            series={[countExecutive, countStudent]}
            options={{
              chart: {
                type: 'donut'
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 10
                }
              },
              grid: {
                padding: {
                  bottom: -80
                }
              },
              labels: ['Ejecutivos', 'Estudiantes'],
              fill: {
                opacity: 0.8
              }
            }}
            type="donut"
          />
        </Card>
        <Card title="Tipo de servicio">
          <ReactApexChart
            width={'100%'}
            series={[countPc, countTable]}
            options={{
              chart: {
                width: '100%',
                type: 'pie'
              },
              labels: ['Computadoras', 'Mesas'],
              plotOptions: {
                pie: {
                  dataLabels: {
                    offset: -5
                  }
                }
              },
              fill: {
                opacity: 0.8
              }
            }}
            type="pie"
          />
        </Card>
      </div>
    </div>
  )
}
