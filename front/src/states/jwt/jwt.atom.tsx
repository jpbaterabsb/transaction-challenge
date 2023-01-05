import { atom } from 'recoil'

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({ key: 'auth' })

export const jwtState = atom({
  key: 'jwtState',
  default: '',
  effects_UNSTABLE: [persistAtom]

})
