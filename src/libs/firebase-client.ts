import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCpPAnPB73g6HA69F2r-UEwe91_Qu36oWI',
  authDomain: 'centro-3df74.firebaseapp.com',
  projectId: 'centro-3df74',
  storageBucket: 'centro-3df74.appspot.com',
  messagingSenderId: '1000046435499',
  appId: '1:1000046435499:web:ec203e4472c50ea76e6bee'
}

export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
