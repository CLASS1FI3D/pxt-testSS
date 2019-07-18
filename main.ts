// Here are the different types of blocks
// supported by MakeCode

//% color="#FF9C18"
namespace pxt_testSS {

    //% block="Slim Circuit 1 || Input %potPin, Output %ledPin"
    //% expandableArgumentMode="toggle"    
    export function Slim_Circuit(potPin: AnalogPin, ledPin: AnalogPin) {
        let Potentiometer = 0
        let mode = 0


        input.onButtonPressed(Button.A, function () {
            mode += 1
            if (mode == 2) {
                mode = 0
            }
            basic.showNumber(mode)
        })

        if (mode == 0) {
            Potentiometer = pins.analogReadPin(potPin)
            pins.analogWritePin(ledPin, Potentiometer)
        } else {
            Potentiometer = pins.analogReadPin(AnalogPin.P1)
            pins.analogWritePin(AnalogPin.P0, Potentiometer)
        }
    }

    
}
