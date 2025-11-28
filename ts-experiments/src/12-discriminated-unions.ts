/* 
REST API response
    Success
        data {
            userId
            name
        }
    Error
        message
        code
*/

type SuccessResponse = {
    // discriminant
    type : "success";
    data : {
        userId : number;
        name : string;
    }
}

type ErrorResponse = {
    // discriminant
    type : "error";
    message : string;
    code : number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response : ApiResponse) {
    if (response.type === "success"){
        console.log(response.data.userId, response.data.name)

        // should throw compilation error
        //console.log(response.message)

    } else if (response.type === "error") {
        console.error("Error :", response.message, "Code ", response.code)

        // should throw compilation error
        // console.log(response.data.userId)
    }
}

// Nested Disciminated Unions

// discriminant = "kind"
type Payment = 
    | { kind : "payment-success"; trasactionId : string}
    | { kind : "payment-failure"; reason : string}

type Fulfillment = 
    | { kind : "fulfillment-success"; trackingId : string}
    | { kind : "fulfillment-failure"; error : string}

// discriminant = "step"
type Order = 
    | { step : "created" }
    | { step : "paid";  payment : Payment }
    | { step : "fulfilled"; fulfilment : Fulfillment}

function processOrder(order: Order) {
    switch (order.step) {
        case "paid":
            if (order.payment.kind === "payment-success"){
                console.log("Paid, tx :", order.payment.trasactionId)
            } else {
                console.log("Payment failed :", order.payment.reason)
            }
            break;
        case "fulfilled":
            if (order.fulfilment.kind === "fulfillment-success"){
                console.log("Shippled :", order.fulfilment.trackingId)
            }
        default:
            break;
    }
}

// Using type utilities with discriminated unions
/* UI Event Type System */
namespace UIEvent {

    type Event = 
        | { type : "click" ; x : number; y : number}
        | { type : "keypress" ; key : string}
        | { type : "resize" ; width : number, height : number}
    
    // Filtering
    type ClickEvent = Extract<Event, {type : "click"}>

    // Filtering
    type NonKeyEvents = Exclude<Event, {type : "keypress"}>

    // Union of all discriminants
    type EventType = Event["type"]

    // create event handler types
    type EventHandler<E extends Event> = (e : Event) => void

    type Handlers = {
        [T in Event["type"]] : EventHandler<Extract<Event, {type : T}>>
    }

}

