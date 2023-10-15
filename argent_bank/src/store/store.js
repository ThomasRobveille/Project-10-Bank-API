import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import accountReducer from '../features/account/accountSlice'
import transactionReducer from '../features/transaction/transactionSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer
  }
})