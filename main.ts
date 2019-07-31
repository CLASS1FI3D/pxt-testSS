// Here are the different types of blocks
// supported by MakeCode

//% color="#FF9C18"
namespace pxt_testSS {
    let potInput = 0
    let ldrInput = 0
    let mode = 1
    basic.showNumber(mode)
    //% block="Slim Circuit 1 || - Pot %potPin, LED %ledPin, LDR %ldrPin"
    //% expandableArgumentMode="toggle"    
    export function Circuit_1(potPin: AnalogPin, ledPin: AnalogPin, ldrPin: AnalogPin) {

        input.onButtonPressed(Button.A, function () {
            mode += 1
            if (mode >= 4) {
                mode = 1
            }
            basic.showNumber(mode)
        })

        // Which mode are we in??
        switch (mode) {
            case 1:
                potInput = pins.analogReadPin(potPin)
                pins.analogWritePin(ledPin, potInput)
                break;
            case 2:
                ldrInput = pins.analogReadPin(ldrPin)
                pins.analogWritePin(ledPin, ldrInput)
                break;
            case 3:
                potInput = pins.analogReadPin(potPin)
                ldrInput = pins.analogReadPin(ldrPin)
                if (ldrInput > potInput) {
                    pins.analogWritePin(ledPin, 1023)
                } else {
                    pins.analogWritePin(ledPin, 0)
                }
            default:
                break;
        }
    }
    //% block="Slim Circuit 2 || - Pot %potPin, LED %ledPin, LDR %ldrPin"
    //% expandableArgumentMode="toggle"    
    export function Circuit_2(potPin: AnalogPin, ledPin: AnalogPin, ldrPin: AnalogPin) {

    }
}
