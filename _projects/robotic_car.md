---
layout: project
title: "Self-Driving Car: Part 1"
tagline: "Arduino, ultrasonic sensor, motors."
date: 2026-04-30
featured: true
thumbnail: /assets/images/projects/car_1.jpg
---

<figure>
    <img src="/assets/images/projects/car_1.jpg" art="Car from the side">
    <figcaption>Robotic car (v1) from side</figcaption>
</figure>

## Design
This is the start of my first real robotics project, and there were a lot of teething problems getting this working. I will elaborate on this shortly, but first, the design of the car is as follows: we have 4 wheels, each with its own motor. These are connected to two L298N motor drivers, which are then connected to the pins of an Arduini Uno R4. The Arduino also supplies power to, and takes readings from, an ultrasonic sensor, for the navigation.

<figure>
    <img src="/assets/images/projects/car_diagram.png" art="Car from the side">
    <figcaption>Robotic car (v1) wiring diagram</figcaption>
</figure>

## Debugging
There were numerous issues that had to be overcome whilst building this first robot, from figuring out how to actually power the car since the 4xAA battery pack that came with the chassis kit was useless, learning how the gearing inside a DC motor works because one of the motors became faulty, and realising half the ultrasonic readings were coming back as just $0$, instead of an actual distance, so handling that made a big difference.

But eventually the car came together and it could successfully navigate it's way around a room without crashing into anything (too much)!

<figure>
    <img src="/assets/images/projects/car_2.jpg" art="Car from the side">
    <figcaption>Robotic car (v1) from front</figcaption>
</figure>

## Next steps

The plan for v2 is to switch from controlling the car using the Arduino, to controlling it via a Raspberry Pi. This change is needed since ultimately I am interested in using (and training) AI models to control the car, and an Arduino will not be capable of this. 

A second goal of this upgrade will be to utilise and upskill on the ROS2 robotics suite. I had hoped to keep the Arduino involved in v2 of the car, where it would be handling the low-level motor control whilst the Pi provided the high-level instructions. However some preliminary research indicates the micro-ROS library that I would need to put on the Arduino in order for it to communicate with ROS on the Pi is not actually compatible with the model of Arduino (Uno R4) that I have. So that'll be a problem to kick down the road for v3.

<figure>
    <img src="/assets/images/projects/car_3.jpg" art="Car from the side">
    <figcaption>Robotic car (v1) from back</figcaption>
</figure>

