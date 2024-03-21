import React from 'react'
import * as Drawer from 'commons/vaul'
import { type User } from 'types'
import { Button } from 'commons/button'
import { useForm } from 'react-hook-form'
import { Input } from 'commons/input'
import { Select } from 'commons/select'
import { validateEmail } from 'utils'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { usePending } from 'hooks/usePending'
import { useDialog } from 'commons/vaul/use-dialog'

type Props = {
  onEnd: (v: User | null) => void
  children: React.ReactNode
}

type FormControl = {
  first_name: string
  last_name: string
  email: string
  dni: string
  career: string
  sex: string
  type: string
}

export function AddNewUser({ onEnd, children }: Props) {
  const { end, isPending, start } = usePending()
  const { open, setOpen, onClose } = useDialog()
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
    try {
      const { data } = await axios.post('/api/users', form)
      onClose()
      onEnd(data.user as User)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === 11000) {
          toast.error('Ya hay un registro con el mismo correo')
        } else {
          toast.error(error.message)
        }
      }
      console.log(error)
    } finally {
      end()
    }
  }

  return (
    <div>
      <Drawer.root open={open} onOpenChange={setOpen}>
        <Drawer.trigger asChild>{children}</Drawer.trigger>
        <Drawer.content>
          <div className="max-w-xl mx-auto p-2 w-full">
            <h2 className="text-center pb-4 pt-0 font-bold text-xl text-neutral-800">
              Registrar nuevo usuario
            </h2>
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
                    validate: (v) =>
                      validateEmail(v as string) || 'Correo no válido'
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
                    validate: (v) =>
                      /^\d{8}$/.test(v as string) || 'DNI no válido'
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
                      ['student', 'executive', 'teacher'].includes(
                        v as string
                      ) || 'Tipo no válido'
                  }}
                  label="Tipo de usuario"
                  control={control}
                  name="type"
                >
                  <option value="student">Alumno</option>
                  <option value="teacher">Docente</option>
                  <option value="executive">Ejecutivo</option>
                </Select>
              </div>
            </div>
            <footer className="flex border-t pt-2 mt-2 gap-2">
              <Button
                onClick={onClose}
                className="w-full p-2 text-base rounded-xl text-center"
                variant="grey"
                isFilled
              >
                Cancelar
              </Button>
              <Button
                loading={isPending}
                onClick={handleSubmit(onSubmit)}
                className="w-full p-2 text-base rounded-xl text-center"
                variant="black"
                isFilled
              >
                Guardar
              </Button>
            </footer>
          </div>
        </Drawer.content>
      </Drawer.root>
    </div>
  )
}
