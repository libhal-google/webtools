# Electric Driver Motor Sizer

## Required Inputs

- Total mass
- Number of drive wheels
- Radius of wheel

### Velocity Requirement

- Desired Linear Velocity

### Torque Requirement

- Desired acceleration: use 0 to indicate stall torque
- Maximum incline: How steep of an incline do you expect

### Operating time

- Desired operating time
- Efficiency (?) & percentage of time at various inclines

## Outputs

### Velocity

- Motor RPM

### Torque

- Motor torque
  - This does NOT mean rated torque of the motor. This is just the amount of
    torque required to move the robot. Many motor ratings are placed in a spot
    where they can be used continuously until the lifetime of the motor has
    elapsed. In robotics we rarely have a robot at its rating at all times.

### Operating time

- Watt-hour of battery
