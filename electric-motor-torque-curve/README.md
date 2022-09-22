# Electric Motor Torque Curve Calculator

# Required Inputs

- Voltage (Rated)
- Voltage (Supplied): can be less than, equal to, or greater than the rated
  voltage.
    - A lower voltage will result in a lower motor speed and will also result in
      a lower overall torque.
    - A greater voltage will "over-volt" the motor and this will produce a
      higher than rated speed as well as a higher than rated torque. Caution
      should be taken when over-volt'ing a motor as this can damage the motor
      depending on the
- No load Torque (Nm): defaults to 0, but on occasions there is a none zero no-load
  torque. If this number is not supplied default to zero.
- Rated Torque (Nm): The rated torque of the motor
- No load Speed (RPM)
- Rated Speed (RPM)
- No load Current (Amp): defaults to 0, but in reality there is always a no load
  current, but this tends to be small compared to loaded situations.
- Rated Current (Amp)

## Limited Requirements

- Limited Current Maximum : if the system limits the current, what will be the
  speed and torque of the motor.

# Outputs

- Max torque
- Max current
- Max power
- A motor torque curve graph

## Limited

- Limited torque
- RPM @ Limited Torque
- Power @ Limited Torque
- Limited Electrical Power (W)
