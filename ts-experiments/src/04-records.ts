
// type RecordOfNumbers = { [key : string] : number }
/* 
type RecordOfNumbers = Record<string, number>
let rn : RecordOfNumbers = { "k1" : 10, "k2" : 20, "k3" : 30} 
*/


type MyRecord<K extends keyof any ,V> = {[key in K] : V}
type RecordOfNumbers = MyRecord<string, number>
let rn: RecordOfNumbers = { "k1": 10, "k2": 20, "k3": 30 }

// Record with specific keys
// type TrafficStates = Record<"go" | "stop" | "wait", boolean>

type TrafficStates = { [key in "go" | "stop" | "wait"] : boolean }

let trafficStates : TrafficStates = { go : false, stop : false, wait : true}

// extracting keys from a record
type TrafficStatesKeys = keyof TrafficStates

// extracting the type of value from a record
type TrafficStatesKeyValue = TrafficStates[keyof TrafficStates]