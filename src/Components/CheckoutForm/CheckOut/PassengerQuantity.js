import { useMediaQuery } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useFormContext } from "react-hook-form"
import { connect } from "react-redux"
import {
  MinusIcon,
  // NumberOfPassengers,
  NumberOfPassengersIcon,
  PlusIcon,
} from "../../../assets/icons"
import "./index.css"

function PassengerQuantity({
  passengersqState,
  setPassengers,
  passengers,
  passengersQuantityForBackStep,
  setPassengersQuantityForBackStep,
  formData,
}) {
  const { register } = useFormContext()

  const onDecrease = () => {
    if (!isNaN(passengersQuantityForBackStep)) {
      if (passengersQuantityForBackStep === 0) {
        return
      }
      let progress = passengersQuantityForBackStep - 1
      setPassengers((passengers) => passengers - 1)
      setPassengersQuantityForBackStep(progress)
    }
  }
  const onIncrease = (e) => {
    if (!isNaN(passengersQuantityForBackStep)) {
      if (passengersQuantityForBackStep === 14) {
        return
      }
      let progress = passengersQuantityForBackStep + 1
      setPassengers((passengers) => passengers + 1)
      setPassengersQuantityForBackStep(progress)
    }
  }
  console.log(passengersQuantityForBackStep)
  // console.log(passengersQuantityForBackStep)
  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Grid container direction="row">
          <NumberOfPassengersIcon
            style={{ paddingLeft: "30px" }}
          ></NumberOfPassengersIcon>
          <Typography
            style={{
              color: "white",
              fontSize: "14px",
              wordWrap: "break-word",

              width: isMobile ? "130px" : "none",
            }}
          >
            Number of passengers
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          // style={{
          //   background: "#282828",
          //   height: "35px",
          //   borderRadius: "5px",
          //   // paddingTop: "-4px",
          // }}
        >
          <Grid item>
            <span
              onClick={onDecrease}
              style={{
                marginRight: "5px",
              }}
            >
              <MinusIcon />
            </span>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <input
              ref={register}
              name="passengersQuantity"
              onChange={(e) => {
                setPassengers(e.target.value)
                setPassengersQuantityForBackStep(e.target.value)
              }}
              className="passenger"
              value={
                !passengersQuantityForBackStep
                  ? formData.passengersQuantityForBackStep
                  : passengersQuantityForBackStep
              }
              size="1"
              style={{
                // pointerEvents: "none",
                minWidth: "30px",
                maxWidth: "30px",
                marginRight: "3px",
                marginBottom: "4px",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                textAlign: "center",
                fontFamily: "Roboto",
                textTransform: "none",
                fontWeight: "400",
                fontSize: "14px",
              }}
              type="number"
            />
          </Grid>
          <Grid item>
            <span onClick={onIncrease} style={{ marginLeft: "4px" }}>
              <PlusIcon />
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const PassengerQuantityWithMemo = React.memo(PassengerQuantity)

const mapStateToProps = (state) => {
  return {
    formData: state.formData,
  }
}

export default connect(mapStateToProps)(PassengerQuantityWithMemo)
