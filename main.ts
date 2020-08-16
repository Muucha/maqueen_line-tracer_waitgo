radio.onReceivedNumber(function (receivedNumber) {
    速さ = receivedNumber
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
})
function 走る (speed: number) {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 8)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 8)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 8)
    }
}
let 平均 = 0
let 合計 = 0
let 速さ = 0
radio.setGroup(1)
let list: number[] = []
for (let index = 0; index < 8; index++) {
    list.push(maqueen.Ultrasonic(PingUnit.Centimeters))
}
basic.forever(function () {
    合計 = 0
    list.push(maqueen.Ultrasonic(PingUnit.Centimeters))
    list.shift()
    for (let index = 0; index <= 7; index++) {
        合計 += list[index]
    }
    平均 = 合計 / 8
    if (平均 < 10) {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        radio.sendNumber(255)
        for (let index = 0; index < 1500; index++) {
            走る(20)
        }
        速さ = 0
    }
})
basic.forever(function () {
    走る(速さ)
})
