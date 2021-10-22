import DateFnsUtils from "@date-io/date-fns"
import { ListItem, TextField, useMediaQuery } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import { makeStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { connect } from "react-redux"
import { placesApi } from "../../../api/api"
import {
  ClockIcon,
  DateIcon,
  ForwardArrowIcon,
  HourlyIcon,
  LeftArrowForAdressForm,
  PlaneIcon,
  RightArrowForAdressForm,
  Ticket,
} from "../../../assets/icons"
import { getCarsByType } from "../../../Redux/car-reducer"
import GoogleMap from "../../GoogleMap/GoogleMap"
import { getCompanyCars } from "./../../../Redux/car-reducer"
import {
  CustomFormInput,
  CustomMaskInput,
  DataInputControl,
  DateInputControl,
  TimeInputControl,
  TimeInputControlNewOne,
} from "./CustomFormInput"
import Hours from "./Hours"
import PassengerQuantity from "./PassengerQuantity"
import { withStyles } from "@material-ui/styles"
// import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import Carousel, { consts } from "react-elastic-carousel"
// import Carousel from "react-material-ui-carousel";
import Tooltip from "@material-ui/core/Tooltip"
import { setFormData } from "./../../../Redux/form-reducer"
// import "@brainhubeu/react-carousel/lib/style.css"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import Blue from "@material-ui/core/colors/blue"
import lime from "@material-ui/core/colors/lime"
import { Popover, TimePicker } from "antd"
import "antd/dist/antd.css"
import "./index.css"
import { setHourlyRedux } from "../../../Redux/hourly-reducer"
import { setGateMeetingRedux } from "../../../Redux/gate-meeting-reducer"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(2),
    paddingTop: "0px",
    paddingBottom: "0px",
    background: "#000000",
  },

  carItem: {
    backgroundColor: "#000000",
    marginTop: theme.spacing(1),
    padding: 0,
    width: "100%",
    height: "80%",
    boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    "&:hover": {
      background: "#54595F",
      color: "white",
      transition: "400ms",
    },
  },
  carFont: {
    textTransform: "uppercase",
    fontSize: "11px",
    // marginLeft: "-5px",
    color: "white",
  },
  carImageContainer: {
    width: "63px",
    textAlign: "center",
  },
  carImage: {
    width: "100%",
    height: "30px",
    objectFit: "cover",
    // padding: "5px",
    // paddingLeft: "4px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carImageStylesForBiggerTypeOfImage: {
    width: "90%",
    height: "30px",
    objectFit: "contain",
    // padding: "2px",

    // paddingBottom: "5px",
    // paddingTop: "10px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carItemContainer: {
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),

    "&:hover": {
      color: "white",
    },
  },
  preferences: {
    color: "black",
    marginLeft: "10px",
    fontSize: "14px",
    marginTop: "-5px",
  },
  submitButton: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  active: {
    // color: '#392BAA',
    background: "#1B1837",
  },
  input: {
    "&::placeholder": {
      color: "white",
      opacity: "1",
      fontSize: "14px",
    },
    "&:-webkit-autofill": {
      height: "0px",
      border: "none",
      borderRadius: "0px",
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: "white",
    },
  },
  listRoot: {
    "&:hover": {
      background: "#54595F",
      "& $carFont": {
        color: "white ",
      },
    },
    "&.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover": {
      background: "#54595F",
      "& $carFont": {
        color: "white ",
      },
    },
  },
  carouselRoot: {
    background: "#282828",
    boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
    minWidth: "30px",
    height: "66px",
    marginTop: "8px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    "&:hover": {
      backgroundColor: "#4F4F4F",
    },
  },
  noBorderDefault: {
    border: "1px solid transparent",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid white",
    },
  },
  noBorderRed: {
    borderRadius: "5px",
    border: "1px solid #db5858",
  },
  redBorderForAirlines: {
    border: "1px solid #db5858",
  },
  redBorderForAirlinesDefault: {
    borderTop: "2px solid transparent",
  },
  inputDateTime: {
    height: "40px",
    fontSize: "14px",
    "&-webkit-autofill": {
      "&-webkit-box-shadow": "0 0 0 1000px red inset",
    },

    "&:hover": {
      transition: "400ms",
    },
    color: "white",
    "&.MuiIconButton-root": {
      color: "white",
    },
    // ":-webkit-autofill": {
    //   WebkitBoxShadow: "0 0 0 1000px white inset",
    //   backgroundColor: "red !important",
    // },
  },
  carTypeWithRed: {
    border: "1px solid #db5858",
  },
  carContainerRed: {
    // paddingTop: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    paddingBottom: "6px",
    border: "1px solid #db5858",
  },
  carContainerDefault: {
    border: "none",
  },
  carTypeDefault: {
    border: "none",
  },
  inputTimehover: {
    border: "1px solid white",
  },
  inputTimehover2: {
    border: "1px solid white",
  },
  redBorderForPassengers: {
    paddingTop: "4px",
    border: "1px solid #db5858",
  },
  redBorderForPassengersNone: {
    border: "none",
  },
  noBorder: {
    border: "none",
  },
  buttonSelf: {
    background: "#282828",
    border: "none",
    "&:hover": {
      background: "#4F4F4F",
      // "& $typographyForButton": {
      //   color: "black",
      // },
    },
  },
  popupIndicator: {
    color: "white",
  },
  typographyForButton: {
    fontSize: "14px",
    color: "white",
  },
  option: {
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#4F4F4F",
    },
  },
  airLinesInput: {
    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid white",
    },
  },
  flightNumberInput: {
    "&:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 100px #000 inset",
      "-webkit-text-fill-color": "#fff",
    },
    border: "1px solid transparent",
    "&:hover": {
      border: "1px solid white",
    },
  },
  selectedOption: {
    backgroundColor: "#4F4F4F",
    "&$selected": {
      backgroundColor: "#4F4F4F",
    },
  },
  rootToggleButton: {
    color: "#F8D9C1",
    borderRadius: "0px",
    "&.MuiToggleButton-root.Mui-selected": {
      background: "#F8D9C1",
      color: "black",
    },
    "&:hover": {
      background: "#F8D9C1",
      color: "black",
    },
  },
}))

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 38,
    height: 21,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    "&:hover": {
      paddingRight: "2.7px",
      paddingBottom: "3px",
      backgroundColor: "#c7c7c7",
    },
    padding: 2,
    paddingTop: "2.2px",
    color: "#4F4F4F",

    "&$checked": {
      transform: "translateX(16px)",
      color: "#0E0E0E",

      "& + $track": {
        opacity: 1,
        backgroundColor: "white",
        borderColor: "black",
      },
    },
  },
  thumb: {
    width: 14,
    height: 14,
    boxShadow: "none",
    marginTop: "1.5px",
    marginLeft: "2px",
  },
  track: {
    border: `1px solid black`,
    borderRadius: 19,
    opacity: 1,
    backgroundColor: "white",
  },
  checked: {},
}))(Switch)

const schema = yup.object().shape({
  destinations: yup.object().shape({
    rideCheckPoint: yup.object().required(),
  }),
  // carsValidation: yup.number().required(),
})
{
  /*компонента перед экспортом обернута в react.memo*/
}

const AdressFormwithoutReactMemo = ({
  next,
  carTypes,
  pageSize,
  getCompanyCars,
  setFormData,
  formData,
  setHourlyRedux,
  setGateMeetingRedux,
  gateMeeting,
  hourlyRedux,
  backgroundScrollStopForTimePicker,
  setBackgroundScrollStopForTimePicker,
  resetInputs,
}) => {
  const classes = useStyles()
  console.log("AdressFrom")
  const [carSelectionID, setCarSelectionID] = useState(0)
  const [bookingType, setBookingType] = useState(1)
  const [passengers, setPassengers] = useState(0)
  const [hoursAddressForm, setHoursAddressForm] = useState(1)
  const [disableHourly, setDisableHourly] = useState(false)
  const [hourly, setHourly] = useState(false)
  // var hourly = false
  const [isGateMeeting, setIsGateMeeting] = useState(false)
  const [isAirline, setIsAirline] = useState(false)
  const [airlineId, setAirlineId] = useState(0)
  const [airlines, setAirlines] = useState([])
  const [timePickerOpened, setTimePickerOpened] = useState(false)

  const [selectedDate, handleDateChange] = useState(null)
  const [selectedTime, handleTimeChange] = useState(null)

  const [redBorderOnSubmit, setRedBorderOnSubmit] = useState(false)
  const [redBorderOnSubmit2, setRedBorderOnSubmit2] = useState(false)
  const [redBorderOnSubmitForDate, setRedBorderOnSubmitForDate] =
    useState(false)
  const [redBorderOnSubmitForTime, setRedBorderOnSubmitForTime] =
    useState(false)
  const [redBorderOnSubmitForCarType, setRedBorderOnSubmitForCarType] =
    useState(false)
  const [redBorderOnSubmitForPassengers, setRedBorderOnSubmitForPassengers] =
    useState(false)
  const [redBorderOnAirlines, setRedBorderOnAirlines] = useState(false)
  const [
    isAirportPickupIncludedLocalState,
    setIsAirportPickupIncludedLocalState,
  ] = useState(false)
  const [destinations, setDestinations] = useState([
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ])

  const handleClick = (id) => {
    setCarSelectionID(id)
  }

  const handleDateChangeFunc = (time) => {
    handleDateChange(time)
  }
  const [flightNumber, setFlightNumber] = useState(null)
  const { errors, register, handleSubmit, setValue, ...methods } = useForm({
    // mode: "onBlur",
    // resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
    // console.log(data.orderStartDate, data.orderStartTime)

    // if (
    //   destinations[0].rideCheckPoint &&
    //   destinations[1].rideCheckPoint &&
    //   data.orderStartDate &&
    //   data.orderStartTime &&
    //   carSelectionID &&
    //   passengers
    // ) {
    if (onSubmit2(data)) {
      getCompanyCars({
        hours: hourly ? hoursAddressForm : 0,
        isGateMeeting: isGateMeeting,
        airlines: { id: airlineId },
        orderAddressDetails: [...destinations],
        flightNumber: data.flightNumber,
        page: pageSize,
        typeId: carSelectionID,
        bookingType: bookingType,
        passengersQuantity: passengers,
        isAirportPickupIncluded: isAirportPickupIncludedLocalState,
      })

      const forRes = data.orderStartDate.toLocaleDateString("en-US")
      const forRes2 = data.orderStartTime._d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })

      // + ` ${AMPM}`
      const resData = {
        orderStartDate: `${forRes}`,
        orderStartTime: `${forRes2}`,
      }
      const resData2 = {
        orderStartDateTime: `${forRes} ` + `${forRes2}`,
      }

      setFormData(resData2)

      console.log(
        destinations[0].rideCheckPoint,
        destinations[1].rideCheckPoint,
        data.orderStartDate,
        data.orderStartTime + ` ${AMPM}`,
        {
          hours: hourly ? hoursAddressForm : 0,
          isGateMeeting: isGateMeeting,
          airlines: { id: airlineId },
          orderAddressDetails: [...destinations],
          flightNumber: data.flightNumber,
          page: pageSize,
          typeId: carSelectionID,
          bookingType: bookingType,
          passengersQuantity: passengers,
        }
      )
      next()
    }
    // } else {
    //   if (!destinations[0].rideCheckPoint) {
    //     setRedBorderOnSubmit(true)
    //   } else {
    //     setRedBorderOnSubmit(false)
    //   }
    //   if (!destinations[1].rideCheckPoint) {
    //     setRedBorderOnSubmit2(true)
    //   } else {
    //     setRedBorderOnSubmit2(false)
    //   }
    //   if (!data.orderStartDate?.toLocaleDateString("en-GB")) {
    //     setRedBorderOnSubmitForDate(true)
    //   } else {
    //     setRedBorderOnSubmitForDate(false)
    //   }
    //   if (!data.orderStartTime) {
    //     setRedBorderOnSubmitForTime(true)
    //   } else {
    //     setRedBorderOnSubmitForTime(false)
    //   }
    //   if (carSelectionID) {
    //     setRedBorderOnSubmitForCarType(false)
    //   } else {
    //     setRedBorderOnSubmitForCarType(true)
    //   }
    //   if (passengers) {
    //     setRedBorderOnSubmitForPassengers(false)
    //   } else {
    //     setRedBorderOnSubmitForPassengers(true)
    //   }
    // }
  }
  const onSubmit2 = (data) => {
    if (
      destinations[0].rideCheckPoint &&
      destinations[1].rideCheckPoint &&
      data.orderStartDate &&
      data.orderStartTime &&
      carSelectionID &&
      passengers
      // &&
      // AMPM
    ) {
      if (isAirline) {
        if (!airlineId) {
          setRedBorderOnAirlines(true)
        } else {
          setRedBorderOnAirlines(false)
          return true
        }
      } else {
        return true
      }
    } else {
      if (!destinations[0].rideCheckPoint) {
        setRedBorderOnSubmit(true)
      } else {
        setRedBorderOnSubmit(false)
      }
      if (!destinations[1].rideCheckPoint) {
        setRedBorderOnSubmit2(true)
      } else {
        setRedBorderOnSubmit2(false)
      }
      if (!data.orderStartDate?.toLocaleDateString("en-GB")) {
        setRedBorderOnSubmitForDate(true)
      } else {
        setRedBorderOnSubmitForDate(false)
      }
      if (!data.orderStartTime) {
        setRedBorderOnSubmitForTime(true)
      } else {
        setRedBorderOnSubmitForTime(false)
      }
      // if (!AMPM) {
      //   setRedBorderOnSubmitForTime(true)
      // } else {
      //   setRedBorderOnSubmitForTime(false)
      // }
      if (carSelectionID) {
        setRedBorderOnSubmitForCarType(false)
      } else {
        setRedBorderOnSubmitForCarType(true)
      }
      if (passengers) {
        setRedBorderOnSubmitForPassengers(false)
      } else {
        setRedBorderOnSubmitForPassengers(true)
      }
    }
  }
  const [openTimePicker, setOpenTimePicker] = useState(false)
  let firstAirline =
    destinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)
  // if (destinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)) {
  //   console.log("true")
  // } else {
  //   console.log("false")
  // }

  const fetchAirlines = async () => {
    const data = await placesApi.getAirlines()
    const res = data.map((airline) => {
      return {
        id: `${airline.id}`,
        name: `${airline.code} ` + `${airline.name}`,
      }
    })
    setAirlines(res)
  }

  React.useEffect(() => {
    if (firstAirline) {
      setIsAirline(true)
      setBookingType(3)
      fetchAirlines()
      // setDisableHourly(true)
    } else {
      setIsAirline(false)
      setDisableHourly(false)
    }
  }, [firstAirline])
  React.useEffect(() => {
    if (hourly) {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(2)
      }

      // setDisableHourly(true)
    } else {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(1)
      }
    }
  })

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <LeftArrowForAdressForm />
      ) : (
        <RightArrowForAdressForm />
      )
    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        className={classes.carouselRoot}
      >
        {pointer}
      </Button>
    )
  }
  const [alignment, setAlignment] = React.useState("web")
  const [AMPM, setAMPM] = React.useState("")

  const handleChangeAMPM = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
    setAMPM(event.target.textContent)
    // console.log(event.target.textContent)
  }
  const [triggerToTimePicker, setTriggerToTimePicker] = useState(false)
  var eventCount = 0
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px #282828 inset",
    height: "0px",
  }
  console.log(hourlyRedux)
  const isMobile = useMediaQuery("(max-width:530px)")

  return (
    <Grid item>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <GoogleMap
              setDestinations={setDestinations}
              destinations={destinations}
              orderAddressDetails={formData.orderAddressDetails}
              setValue={setValue}
              redBorderOnSubmit={redBorderOnSubmit}
              redBorderOnSubmit2={redBorderOnSubmit2}
            />
          </Grid>
          <Grid container justify="center">
            <Grid
              container
              direction="column"
              spacing={2}
              className={classes.contentContainer}
            >
              {isAirline && bookingType === 3 && (
                <Grid
                  className={
                    redBorderOnAirlines
                      ? classes.redBorderForAirlines
                      : classes.redBorderForAirlinesDefault
                  }
                  style={{
                    marginLeft: "8px",
                    marginRight: "8px",
                    marginTop: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <Grid item>
                    <Autocomplete
                      id="combo-box-demo"
                      options={airlines}
                      defaultValue={null}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      classes={{
                        popupIndicator: classes.popupIndicator,
                        option: classes.option,
                        paper: classes.selectedOption,
                      }}
                      renderOption={(option) => (
                        <>
                          <span>{option.code}</span>
                          {option.name} ({option.code})
                        </>
                      )}
                      renderInput={(params) => {
                        params.InputProps.startAdornment = (
                          <InputAdornment position="start">
                            <PlaneIcon />
                          </InputAdornment>
                        )
                        return (
                          <TextField
                            {...params}
                            fullWidth
                            placeholder="Airlines"
                            className={classes.airLinesInput}
                            style={{
                              height: "40px",

                              backgroundColor: "#282828",
                              boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              borderRadius: "5px",
                            }}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: classes.inputDateTime,
                                input: classes.input, // class name, e.g. `classes-nesting-root-x`
                                notchedOutline: classes.noBorder,
                              },
                              disableUnderline: true,
                            }}
                          />
                        )
                      }}
                      onChange={(event, newValue) => {
                        newValue
                          ? setAirlineId(newValue.id)
                          : setAirlineId(null)
                      }}
                      name="airlines"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "12px" }}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item style={{ width: "50%" }}>
                        <CustomFormInput
                          name="flightNumber"
                          variant="outlined"
                          placeholder="Flight number"
                          className={classes.flightNumberInput}
                          style={{
                            height: "40px",
                            // border: "none",
                            backgroundColor: "#282828",
                            boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
                            width: "94%",
                            marginBottom: "0px",
                            marginTop: "0px",
                            borderRadius: "5px",
                          }}
                          defaultValue={null}
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                          inputProps={{ style: inputStyle }}
                          InputProps={{
                            classes: {
                              root: classes.inputDateTime,
                              input: classes.input, // class name, e.g. `classes-nesting-root-x`
                              notchedOutline: classes.noBorder,
                            },
                            startAdornment: (
                              <InputAdornment position="start">
                                <Ticket />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item style={{ width: "43%" }}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography
                              style={{ color: "white", fontSize: "15px" }}
                            >
                              {"Meet & Greet"}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <AntSwitch
                              onClick={() => {
                                if (gateMeeting == false) {
                                  // setIsGateMeeting(true)
                                  setGateMeetingRedux(true)
                                  setIsGateMeeting(true)
                                  setIsAirportPickupIncludedLocalState(true)
                                  console.log("true")
                                } else {
                                  // setIsGateMeeting(false)
                                  setGateMeetingRedux(false)
                                  setIsGateMeeting(false)
                                  setIsAirportPickupIncludedLocalState(false)
                                  console.log("false")
                                }
                                // setIsGateMeeting(!isGateMeeting)
                                // setTimeout(() => {
                                //   console.log(isGateMeeting)
                                //   if (isGateMeeting == true) {
                                //     setGateMeetingRedux(true)
                                //   } else {
                                //     setGateMeetingRedux(false)
                                //   }
                                // }, 1500)
                              }}
                              color="primary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item style={{ width: "100%" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    direction="row"
                    flexWrap="no-wrap"
                    justify="space-between"
                  >
                    <Grid
                      item
                      style={{ width: "47%" }}
                      className={
                        redBorderOnSubmitForDate
                          ? classes.noBorderRed
                          : classes.noBorderDefault
                      }
                    >
                      {/* <ThemeProvider theme={materialTheme}> */}
                      <DateInputControl
                        name="orderStartDate"
                        // inputVariant="primary"
                        // label="Pick up Date"
                        // inputVariant="outlined"
                        style={{
                          backgroundColor: "#282828",
                          paddingLeft: "15px",
                          boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
                          borderRadius: "5px",
                          "&.MuiDialog-paper .MuiPickersModal-dialogRoot .MuiDialog-paperScrollPaper .MuiDialog-paperWidthSm .MuiPaper-elevation24 .MuiPaper-rounded":
                            {
                              zIndex: "1000000000000000000",
                            },
                        }}
                        placeholder="Pick up Date"
                        defaultValue={null}
                        disablePast
                        fullWidth
                        // onChange={(event, x) => {
                        //   handleDateChange(event)
                        //   console.log(x)
                        // }}
                        // classes={{
                        //   root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        //   label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        // }}
                        autoOk={true}
                        InputProps={{
                          classes: {
                            root: classes.inputDateTime,
                            input: classes.input, // class name, e.g. `classes-nesting-root-x`
                            notchedOutline: redBorderOnSubmitForDate
                              ? classes.noBorderRed
                              : classes.noBorderDefault,
                          },
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              style={{
                                marginRight: "10px",
                                marginLeft: "-3px",
                              }}
                            >
                              <DateIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* </ThemeProvider> */}
                    </Grid>
                    <Grid
                      item
                      style={{ width: "47%" }}
                      InputProps={{
                        classes: {
                          root: classes.inputTimehover,
                          input: classes.inputTimehover2, // class name, e.g. `classes-nesting-root-x`
                        },
                      }}
                    >
                      {/* <CustomMaskInput
                        name="orderStartTime"
                        mask="99:99"
                        autoComplete="off"
                      >
                        {(inputProps) => (
                          <TextField
                            {...inputProps}
                            variant="outlined"
                            placeholder="hh:mm"
                            autoComplete="off"
                            fullWidth
                            style={{ borderRadius: "0px" }}
                            InputProps={{
                              classes: {
                                root: classes.inputDateTime,
                                input: classes.input, // class name, e.g. `classes-nesting-root-x`
                                notchedOutline: redBorderOnSubmitForTime
                                  ? classes.noBorderRed
                                  : classes.noBorderDefault,
                              },
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  style={{
                                    marginRight: "10px",
                                    marginLeft: "-3px",
                                  }}
                                >
                                  <ClockIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <>
                                  <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleChangeAMPM}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginRight: "-8px",
                                    }}
                                  >
                                    <ToggleButton
                                      value="AM"
                                      className={classes.rootToggleButton}
                                      style={{
                                        width: "26px",
                                        height: "20px",
                                        fontSize: "13px",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                      }}
                                      onClick={(e) => {}}
                                    >
                                      AM
                                    </ToggleButton>
                                    <ToggleButton
                                      value="PM"
                                      className={classes.rootToggleButton}
                                      style={{
                                        width: "26px",
                                        height: "20px",
                                        marginLeft: "2px",
                                        fontSize: "13px",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                      }}
                                    >
                                      PM
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                                </>
                              ),
                            }}
                          />
                        )}
                      </CustomMaskInput> */}

                      <div
                        style={{
                          position: "absolute",
                          marginTop: "10px",
                          marginLeft: "10px",
                          marginRight: "10px",
                          zIndex: "11",
                        }}
                      >
                        <ClockIcon />
                      </div>
                      <div className="scrolling">
                        <TimeInputControl
                          getPopupContainer={(trigger) => trigger.parentNode}
                          name="orderStartTime"
                          use12Hours={true}
                          placeholder="Pick up Time"
                          format="h:mm A"
                          allowClear={false}
                          inputReadOnly={isMobile ? true : false}
                          // open={timePickerOpened ? true : false}
                          needsConfirmation={false}
                          showNow={false}
                          showAction={["click", "focus"]}
                          dropdownStyle={{ position: "fixed" }}
                          onOpenChange={(isOpen) => {
                            setOpenTimePicker(true)
                            if (isOpen) {
                              setTimeout(() => {
                                const startInput = document.querySelector(
                                  ".ant-picker-content"
                                )
                                startInput.focus()
                              }, 100)
                            } else {
                              return null
                            }
                          }}
                          style={{
                            zIndex: "10",
                            paddingLeft: "36px",
                            border:
                              redBorderOnSubmitForTime && "1px solid #db5858",
                            borderRadius: "5px",
                          }}
                        ></TimeInputControl>
                      </div>
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <div
                  className={
                    redBorderOnSubmitForPassengers
                      ? classes.redBorderForPassengers
                      : classes.redBorderForPassengersNone
                  }
                >
                  <PassengerQuantity
                    passengersqState={formData.passengersQuantity}
                    setPassengers={setPassengers}
                    passengers={passengers}
                  />
                </div>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ paddingLeft: "-12px" }}
                    >
                      <HourlyIcon></HourlyIcon>
                      <Typography style={{ color: "white", fontSize: "14px" }}>
                        Hourly
                      </Typography>
                    </Grid>
                  </Grid>
                  <AntSwitch
                    color="primary"
                    // disabled={disableHourly}
                    checked={hourly}
                    onClick={() => {
                      // if (hourly == false) {
                      //   // // setIsGateMeeting(true)
                      //   // setGateMeetingRedux(true)
                      //   setHourly(true)
                      //   // hourly = true
                      //   console.log("true")
                      //   console.log(hourly)
                      // } else {
                      //   // setIsGateMeeting(false)
                      //   // setGateMeetingRedux(false)
                      //   setHourly(true)
                      //   // hourly = false
                      //   console.log("false")
                      //   console.log(hourly)
                      // }
                      if (!hourlyRedux) {
                        // setIsGateMeeting(true)
                        setHourlyRedux(true)
                        // console.log("true")
                      } else {
                        // setIsGateMeeting(false)
                        setHourlyRedux(false)
                        // console.log("false")
                      }
                      setHourly(!hourly)

                      // setHourlyRedux()
                      // hourly ? setBookingType(2) : setBookingType(1)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                {hourly === true && (
                  <Grid item>
                    <Hours
                      hoursState={formData.hours}
                      hourly={hourly}
                      hoursAddressForm={hoursAddressForm}
                      setHoursAddressForm={setHoursAddressForm}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography
                    className={classes.preferences}
                    style={{ color: "white" }}
                  >
                    Preferences
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ width: "100%" }}
                    className={
                      redBorderOnSubmitForCarType
                        ? classes.carContainerRed
                        : classes.carContainerDefault
                    }
                  >
                    <Carousel
                      // onClick={() => {}}
                      //   plugins={[
                      //     'clickToChange',
                      //     'infinite',
                      //     'arrows',
                      //     {
                      //       resolve: slidesToShowPlugin,
                      //       options: {
                      //        numberOfSlides: 3
                      //       }
                      //     },
                      //   ]}
                      // NextIcon={'asdf'}
                      // PrevIcon={'asdf'}
                      // navButtonsProps={{
                      //   // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                      //   style: {
                      //     backgroundColor: "cornflowerblue",
                      //     borderRadius: 0,
                      //   },
                      // }}
                      // navButtonsWrapperProps={{
                      //   // Move the buttons to the bottom. Unsetting top here to override default style.
                      //   style: {
                      //     bottom: "0",
                      //     top: "unset",
                      //   },
                      // }}
                      // NextIcon="next" // Change the "inside" of the next button to "next"
                      // PrevIcon="prev"
                      // IndicatorIcon={"dsafa"} // Previous Example
                      // indicatorIconButtonProps={{
                      //   style: {
                      //     padding: "10px", // 1
                      //     color: "blue", // 3
                      //   },
                      // }}
                      // activeIndicatorIconButtonProps={{
                      //   style: {
                      //     backgroundColor: "red", // 2
                      //   },
                      // }}
                      // indicatorContainerProps={{
                      //   style: {
                      //     marginTop: "50px", // 5
                      //     textAlign: "right", // 4
                      //   },
                      // }}
                      renderArrow={myArrow}
                      itemsToShow={3}
                      pagination={false}
                      transitionMs={300}
                    >
                      {carTypes.map((car, indexOfEachCar) => (
                        <>
                          <Grid item key={`${car.id}${car.name}`}>
                            <ListItem
                              className={classes.carItem}
                              onClick={() => handleClick(car.id)}
                              selected={car.id === carSelectionID}
                              classes={{
                                selected: classes.active,
                                root: classes.listRoot,
                              }}
                              name="carsValidation"
                            >
                              <Grid
                                container
                                direction="column"
                                // justify="center"
                                alignItems="center"
                                className={classes.carItemContainer}
                              >
                                <Grid item>
                                  <Typography
                                    className={classes.carFont}
                                    noWrap
                                    variant="body2"
                                  >
                                    {car.name}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  className={classes.carImageContainer}
                                >
                                  <img
                                    alt="carImage"
                                    src={car.imageUrl}
                                    className={
                                      indexOfEachCar !== 2
                                        ? classes.carImage
                                        : classes.carImageStylesForBiggerTypeOfImage
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Grid>
                        </>
                      ))}
                    </Carousel>
                  </Grid>
                </Grid>
                <Grid item className={classes.submitButton}>
                  <Grid container justify="center">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      className={classes.buttonSelf}
                      style={{
                        height: "40px",
                        borderRadius: "5px",
                      }}
                      // endIcon={<ForwardArrowIcon />}
                      // disabled={
                      //   destinations[0].rideCheckPoint &&
                      //   destinations[1].rideCheckPoint &&
                      //   carSelectionID &&
                      //   bookingType
                      //     ? false
                      //     : true
                      // }
                    >
                      <Typography
                        variant="body2"
                        className={classes.typographyForButton}
                      >
                        Next step
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  )
}

const AdressForm = React.memo(AdressFormwithoutReactMemo)

const mapStateToProps = (state) => {
  return {
    carTypes: state.companyProfile.profile.carTypes,
    pageSize: state.cars.pageSize,
    formData: state.formData,
    resetInputs: state.resetWidgetInputs.resetInputs,
    gateMeeting: state.gateMeeting.isGateMeeting,
    hourlyRedux: state.hourlyRedux.hourlyRedux,
  }
}

export default connect(mapStateToProps, {
  getCarsByType,
  getCompanyCars,
  setFormData,
  setHourlyRedux,
  setGateMeetingRedux,
})(AdressForm)