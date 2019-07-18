// Here are the different types of blocks
// supported by MakeCode

//% color="#FF9C18"
namespace pxt_testSS {
    let Potentiometer = 0
    let mode = 1
    basic.showNumber(mode)   
    //% block="Slim Circuit 1 || - Pot %potPin, LED %ledPin, LDR %ldrPin"
    //% expandableArgumentMode="toggle"    
    export function Slim_Circuit(potPin: AnalogPin, ledPin: AnalogPin, ldrPin: AnalogPin) {
                
        input.onButtonPressed(Button.A, function () {
            mode += 1
            if (mode >= 3) {
                mode = 1
            }   
            basic.showNumber(mode)         
        })

        switch (mode) {
            case 1: 
                Potentiometer = pins.analogReadPin(potPin)
                pins.analogWritePin(ledPin, Potentiometer)
                break;
            case 2:
                Potentiometer = pins.analogReadPin(ldrPin)
                pins.analogWritePin(ledPin, Potentiometer)
                break;
            default:
                break;
        }
    }
    
}
