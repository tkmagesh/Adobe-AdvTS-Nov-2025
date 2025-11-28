
import { InMemoryEventStore } from "./store";
import { handleCommand } from "./commands";
import { applyEvent } from "./events";
import { Command } from "./types";

async function demoFlow() {
    const es = new InMemoryEventStore();
    const loanId = "LN-1000";

    // helper to rebuild aggregate by replaying events
    const replay = (id: string) => es.readEvents(id).reduce((acc, e) => applyEvent(acc, e), undefined as any);

    // 1) Apply
    const cmdApply: Command = { type: "ApplyLoan", payload: { loanId, userId: "U1", amount: 100000 } };
    const events1 = handleCommand(replay(loanId), cmdApply);
    es.appendEvents(loanId, events1);

    // 2) Approve
    const cmdApprove: Command = { type: "ApproveLoan", payload: { loanId, approver: "Manager42" } };
    const events2 = handleCommand(replay(loanId), cmdApprove);
    es.appendEvents(loanId, events2);

    // 3) Disburse
    const cmdDisburse: Command = { type: "DisburseLoan", payload: { loanId, transactionId: "TX-42" } };
    const events3 = handleCommand(replay(loanId), cmdDisburse);
    es.appendEvents(loanId, events3);

    // 4) Close
    const cmdClose: Command = { type: "CloseLoan", payload: { loanId, reason: "paid" } };
    const events4 = handleCommand(replay(loanId), cmdClose);
    es.appendEvents(loanId, events4);

    const final = replay(loanId);
    console.log("Final loan aggregate:", final);
}

if (require.main === module) {
    demoFlow().catch(err => {
        console.error("Demo error:", err);
        process.exit(1);
    });
}
