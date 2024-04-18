import React from 'react'
import { Button } from 'commons/button'
import { useForm } from 'react-hook-form'
import { Input } from 'commons/input'
import { Select } from 'commons/select'
import { validateEmail } from 'utils'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { usePending } from 'hooks/usePending'
import { useModalTable } from './state'
import { User } from 'types'

type FormControl = {
  first_name: string
  last_name: string
  email: string
  dni: string
  career: string
  sex: string
  type: string
}

export function AddNewUser() {
  const setUserSelected = useModalTable((store) => store.setUserSelected)
  const { end, isPending, start } = usePending()
  const { control, handleSubmit } = useForm<FormControl>({
    defaultValues: {
      type: 'student',
      sex: 'M',
      career: 'ESI'
    }
  })

  const careers = [
    {
      code: 'ESI',
      name: 'Escuela: Ingeniería de Sistemas'
    },
    {
      code: 'EAE',
      name: 'Escuela: Administración de Empresas'
    },
    {
      code: 'ECF',
      name: 'Escuela: Contabilidad y Finanzas'
    },
    {
      code: 'IAE',
      name: 'Instituto: Administración de Empresas'
    },
    {
      code: 'IET',
      name: 'Insituto: Enfermeria Técnica'
    },
    {
      code: 'ICT',
      name: 'Instituto: Contabilidad Técnica'
    },
    {
      code: 'DOC',
      name: 'Docente'
    }
  ]

  const onSubmit = async (form: FormControl) => {
    start()
    toast.promise(axios.post('/api/users', form), {
      loading: 'Guardando usuario',
      error: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.data.code === 11000) {
            return 'Ya hay un registro con el mismo correo'
          }
          return error.message
        }
        return 'Error desconocido'
      },
      finally: () => {
        end()
      },
      success: ({ data }) => {
        setUserSelected(data.user as User)
        useModalTable.getState().setPage('configure')
        return 'Usuario guardado'
      }
    })
  }

  return (
    <div className="w-[500px]">
      <div className="py-2 grid gap-3">
        <div className="grid grid-cols-2 max-700:grid-cols-1 gap-3">
          <Input
            rules={{
              required: 'Nombres es requerido'
            }}
            autoFocus
            label="Nombres"
            control={control}
            name="first_name"
          />
          <Input
            rules={{
              required: 'Apellidos es requerido'
            }}
            label="Apellidos"
            control={control}
            name="last_name"
          />
        </div>
        <div>
          <Input
            rules={{
              required: 'Correo es requerido',
              validate: (v) => validateEmail(v as string) || 'Correo no válido'
            }}
            label="Correo electrónico"
            control={control}
            name="email"
          />
        </div>
        <div className="grid grid-cols-2 max-700:grid-cols-1 gap-3">
          <Input
            rules={{
              required: 'DNI es requerido',
              validate: (v) => /^\d{8}$/.test(v as string) || 'DNI no válido'
            }}
            label="DNI"
            control={control}
            name="dni"
          />
          <Select
            rules={{
              required: 'La carrera es requerido',
              validate: (v) =>
                careers.map((c) => c.code).includes(v as string) ||
                'Carrera no válida'
            }}
            className="border-0 w-full max-md:w-full rounded-xl bg-neutral-200 font-semibold dark:bg-neutral-700"
            label="Carrera profesional"
            control={control}
            name="career"
          >
            {careers.map((career) => (
              <option key={career.code} value={career.code}>
                {career.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 max-700:grid-cols-1 gap-3">
          <Select
            rules={{
              required: 'DNI es requerido',
              validate: (v) =>
                ['M', 'F'].includes(v as string) || 'Sexo no válido'
            }}
            className="border-0 w-full max-md:w-full rounded-xl bg-neutral-200 font-semibold dark:bg-neutral-700"
            label="Sexo"
            control={control}
            name="sex"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </Select>
          <Select
            rules={{
              required: 'El tipo es requerido',
              validate: (v) =>
                ['student', 'executive', 'teacher'].includes(v as string) ||
                'Tipo no válido'
            }}
            label="Tipo de usuario"
            control={control}
            className="border-0 w-full max-md:w-full rounded-xl bg-neutral-200 font-semibold dark:bg-neutral-700"
            name="type"
          >
            <option value="student">Alumno</option>
            <option value="teacher">Docente</option>
            <option value="executive">Ejecutivo</option>
          </Select>
        </div>
      </div>
      <footer className="flex border-t dark:border-neutral-700 gap-2">
        <Button
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
          className="w-full mt-3 dark:bg-white bg-black hover:bg-black dark:text-black text-white rounded-xl p-3"
          isFilled
        >
          Guardar
        </Button>
      </footer>
    </div>
  )
}
