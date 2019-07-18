// Here are the different types of blocks
// supported by MakeCode

//% color="#FF9C18"
namespace pxt_testSS {

    /**
     * This is a statement block
     */
    //% block
    export function buttonChecker() {
        let mode = 0
        input.onButtonPressed(Button.A, function () {
            if (mode < 1) {
                mode += 1
            } else {
                mode = 0
            }
        })
    }

    //% block
    export function Slim_Circuit_2() {
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
            Potentiometer = pins.analogReadPin(AnalogPin.P0)
            pins.analogWritePin(AnalogPin.P0, Potentiometer)
        } else {
            Potentiometer = pins.analogReadPin(AnalogPin.P1)
            pins.analogWritePin(AnalogPin.P0, Potentiometer)
        }
    }

    /**
     * This is a statement block with a parameter
     */
    //% block
    export function move(steps: number) {

    }

    /**
     * This is a reporter block that returns a number
     */
    //% block
    export function randomNumber(): number {
        return 0;
    }

    /**
     * This is a reporter block that returns a boolean
     */
    //% block
    export function randomBoolean(): boolean {
        return false;
    }

    /**
     * This is an event handler block
     */
    //% block="on event"
    export function onEvent(handler: () => void) {

    }
}
