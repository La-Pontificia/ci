import axios from 'axios'
import { usePending } from 'hooks/usePending'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { type User } from 'types'

function splitValidAndInvalid(array: any[]): [any[], any[]] {
  const validObjects: any[] = []
  const invalidObjects: any[] = []

  for (const obj of array) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (Object.keys(obj).length === 6) {
      validObjects.push(obj)
    } else {
      invalidObjects.push(obj)
    }
  }

  return [validObjects, invalidObjects]
}

type UserSend = {
  email: string
  names: string
  dni: string
  career: string
  type: User['type_user']
  sex: string
}

export const useUpload = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [invalidObjets, setInvalidObjets] = React.useState<any[]>([])
  const [validObjets, setValidObjets] = React.useState<UserSend[]>([])
  const router = useRouter()
  const { end, isPending, start } = usePending()
  const verify = async (f: File) => {
    const data = await f.text()
    const jsonData = JSON.parse(data)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [validObjects, NoValidObjects] = splitValidAndInvalid(jsonData)
    const newData: UserSend[] = []
    for (const obj of validObjects) {
      newData.push({
        email: obj['CORREO INSTITUCIONAL'].toString(),
        names: obj['APELLIDOS Y NOMBRES'].toString(),
        dni: obj.DNI.toString(),
        career: obj.CARRERA.toString(),
        type:
          obj.TIPO.toString() === 'D'
            ? 'teacher'
            : obj.TIPO.toString() === 'A'
            ? 'student'
            : 'executive',

        sex: obj.SEXO.toString()
      })
    }
    setFile(f)
    setInvalidObjets(NoValidObjects)
    setValidObjets(newData)
  }

  const onSubmit = async (t: 'upload' | 'update') => {
    start()
    try {
      if (t === 'update') {
        await axios.patch('/api/import/users', {
          users: validObjets
        })
      } else {
        await axios.post('/api/import/users', {
          users: validObjets
        })
      }
      toast.success('Importado o actualizado correctamente', {
        description:
          'Los usuarios han sido importados o actualizados correctamente'
      })
      setFile(null)
      setInvalidObjets([])
      setValidObjets([])
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      end()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      void verify(e.target.files[0])
    }
  }

  const onDownloadTemplate = async () => {
    // create new template
    const template = [
      {
        'CORREO INSTITUCIONAL':
          '70577979@ilp.edu.pe <- Cambiar por el correo institucional',
        'APELLIDOS Y NOMBRES':
          'FERNANDEZ HUAMAN, FLOR MARLENY <- Cambiar por el nombre completo',
        DNI: '70577979 <- Cambiar por el DNI',
        CARRERA: 'IAE <- Cambiar por el codigo de la carrera',
        SEXO: 'F <- Cambiar por el sexo',
        TIPO: 'A <- Cambiar por el tipo de usuario: A: Alumno, D: Docente, E: Ejecutivo'
      }
    ]
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template.json'
    a.click()
  }

  return {
    onSubmit,
    handleChange,
    onDownloadTemplate,
    file,
    validObjets,
    invalidObjets,
    isPending
  }
}
