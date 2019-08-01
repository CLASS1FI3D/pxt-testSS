// Makerverse

/** Special Notes:
 * Code bases forked
 * Sonar - https://github.com/microsoft/pxt-sonar
 */

// Enum for the Sonar Units
enum sonarUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}


//% color="#FF9C18"
namespace pxt_testSS {
    // Circuit 1
    let potInput: number = 0;
    let ldrInput: number = 0;
    let mode: number = 1;

    // Circuit 2
    let tripDistance: number = 0;

    // Global
    basic.showNumber(mode)

    /**
     * Slim Circuit One. Play with LED's, adjust brightness etc.
     */ 
    //% block="Slim Circuit 1 || - Pot %potPin, LED %ledPin, LDR %ldrPin"
    //% expandableArgumentMode="toggle"    
    export function Circuit_1(potPin: AnalogPin, ledPin: AnalogPin, ldrPin: AnalogPin) {

        checkMode(3);

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
    //% block="Slim Circuit 2 || - Sonar Trigger %sonarTrigPin, Sonar Echo %sonarEchoPin, Buzzer %buzzPin"
    //% expandableArgumentMode="toggle"    
    export function Circuit_2(sonarTrigPin: DigitalPin, sonarEchoPin: DigitalPin, buzzPin: DigitalPin) {
        // This circuit takes the distance from a point as base line
        // If distance is reduced, then something has tripped the 'beam'
        // Sound alarm

        checkMode(2);

        // Which mode are we in?
        switch (mode) {
            // Set the trip distance
            case 1:
                // Lets get some averages
                for (let i = 0; i < 5; i++) {
                    tripDistance += ping(sonarTrigPin, sonarEchoPin, sonarUnit.Centimeters);
                }
                // Sort the average out
                tripDistance = tripDistance / 5;
                // Just for safety we only want 95% of what was measured
                tripDistance = 95 / 100 * tripDistance;
                break;
            // Ready to detect
            case 2:
                let distance = ping(sonarTrigPin, sonarEchoPin, sonarUnit.Centimeters);
                if (distance < tripDistance) {
                    // Something has broken the beam
                    pins.digitalWritePin(buzzPin, 1);
                } else {
                    pins.digitalWritePin(buzzPin, 0);
                }
                break;
        }

    }

    function ping(trig: DigitalPin, echo: DigitalPin, unit: sonarUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case sonarUnit.Centimeters: return Math.idiv(d, 58);
            case sonarUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }

    function checkMode(modes: number) {
        input.onButtonPressed(Button.A, function () {
            mode -= 1
            if (mode < 1) {
                mode = modes
            }
            basic.showNumber(mode)
        })
        input.onButtonPressed(Button.B, function () {
            mode += 1
            if (mode > modes) {
                mode = 1
            }
            basic.showNumber(mode)
        })
    }
}
