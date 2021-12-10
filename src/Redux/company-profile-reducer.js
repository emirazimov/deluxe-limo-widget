import { authApi } from "../api/api"

const SET_COMPANY_PROFILE = "/redux/companyProfileReducer/SET_COMPANY_PROFILE"
const RESERVATION_SUCCESS = "/redux/companyProfileReducer/RESERVATION_SUCCESS"
const APP_INITIALIZING = "/redux/companyProfileReducer/APP_INITIALIZING"
const FAIL_MESSAGE = "/redux/companyProfileReducer/FAIL_MESSAGE"
const GOT_ADDRESS_ERROR = "/redux/companyProfileReducer/GOT_ADDRESS_ERROR"
const IS_BOOSTER_SEAT_EXIST =
  "/redux/companyProfileReducer/IS_BOOSTER_SEAT_EXIST"
const IS_SAFETY_SEAT_EXIST = "/redux/companyProfileReducer/IS_SAFETY_SEAT_EXIST"

let initialState = {
  profile: {
    companyName: "",
    companyLogoPath: "",
    carTypes: [
      {
        id: 0,
        name: "",
        description: "",
        capacity: 0,
      },
    ],
    phoneNumber: "",
    email: "",
    countryName: "",
    stateName: "",
    cityName: "",
    fleetCount: "",
    certificateImages: [],
  },
  isSuccess: false,
  failMessage: "",
  initializing: false,
  gotAddressError: false,
  isBoosterSeatExistOnBackend: false,
  isSafetySeatExistOnBackend: false,
}

const companyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case RESERVATION_SUCCESS:
      return {
        ...state,
        isSuccess: action.isSuccess,
      }
    case APP_INITIALIZING:
      return {
        ...state,
        initializing: action.initializing,
      }

    case FAIL_MESSAGE:
      return {
        ...state,
        failMessage: action.failMessage,
      }

    case GOT_ADDRESS_ERROR:
      return {
        ...state,
        gotAddressError: action.payload,
      }
    case IS_BOOSTER_SEAT_EXIST:
      return {
        ...state,
        isBoosterSeatExistOnBackend: action.payload,
      }
    case IS_SAFETY_SEAT_EXIST:
      return {
        ...state,
        isSafetySeatExistOnBackend: action.payload,
      }

    default:
      return state
  }
}

export const setCompanyProfile = (profile) => ({
  type: SET_COMPANY_PROFILE,
  profile,
})

export const isSuccess = (isSuccess) => ({
  type: RESERVATION_SUCCESS,
  isSuccess,
})
export const failMessage = (failMessage) => ({
  type: FAIL_MESSAGE,
  failMessage,
})

export const initializing = (initializing) => ({
  type: APP_INITIALIZING,
  initializing,
})

export const setGotAddressError = (flag) => ({
  type: GOT_ADDRESS_ERROR,
  payload: flag,
})
export const setIsBoosterSeatExistOnBackend = (flag) => ({
  type: IS_BOOSTER_SEAT_EXIST,
  payload: flag,
})
export const setIsSafetySeatExistOnBackend = (flag) => ({
  type: IS_SAFETY_SEAT_EXIST,
  payload: flag,
})

export const getCompanyProfile = () => {
  return async (dispatch) => {
    let response = await authApi.getCompanyProfile()
    console.log(response)
    if (response === 401) {
      window.localStorage.clear()
    } else {
      dispatch(setCompanyProfile(response.data))
      dispatch(initializing(true))
      dispatch(setIsBoosterSeatExistOnBackend(response.data.isBoosterSeatExist))
      dispatch(setIsSafetySeatExistOnBackend(response.data.isSafetySeatExist))
    }
  }
}

export default companyProfileReducer
