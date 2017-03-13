export const SIGN_IN_FIREBASE = "SIGN_IN_FIREBASE"
export const signInFirebase = (user)=> {
  return {
    type: SIGN_IN_FIREBASE,
    payload: {
      user
    }
  }
}


export const SIGN_OUT_FIREBASE = "SIGN_OUT_FIREBASE"
export const signOutFirebase = ()=> {
  return {
    type: SIGN_OUT_FIREBASE,
  }
}
