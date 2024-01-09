import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'libs/firebase-client'
import { type TableCurrentUser, type Table } from 'types/table'

export async function createTable(table: Table) {
  try {
    const newTable: Table = {
      ...table,
      _id: crypto.randomUUID(),
      created_at: new Date(),
      current_users: [],
      id_occupied: false
    }
    const ref = doc(db, 'tables', newTable._id)
    await setDoc(ref, newTable)
  } catch (error) {
    throw new Error('error firebase create table')
  }
}

export async function addUserAtTable(table: Table, item: TableCurrentUser) {
  try {
    const prevList = table.current_users.filter((e) => e.chair !== item.chair)
    const docRef = doc(db, 'tables', table._id)

    await updateDoc(docRef, {
      current_users: [...prevList, item]
    })
  } catch (error) {
    throw new Error('error firebase update current users table')
  }
}

export async function removeUserByTable(table: Table, chair: number) {
  try {
    const newList = table.current_users.filter((e) => e.chair !== chair)
    const docRef = doc(db, 'tables', table._id)

    await updateDoc(docRef, {
      current_users: newList
    })
  } catch (error) {
    throw new Error('error firebase current users by table')
  }
}

export async function updateUserByTable(table: Table, item: TableCurrentUser) {
  try {
    const prevList = table.current_users.filter((e) => e.chair !== item.chair)
    const docRef = doc(db, 'tables', table._id)
    await updateDoc(docRef, {
      current_users: [...prevList, item]
    })
  } catch (error) {
    throw new Error('error firebase current users by table')
  }
}

export async function updateFreeTable(_id: string, obj: object) {
  try {
    const docRef = doc(db, 'tables', _id)
    await updateDoc(docRef, obj)
  } catch (error) {
    throw new Error('error firebase current users by table')
  }
}
