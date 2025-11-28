
import { Command, Event, Loan, DomainError } from "./types";
import { canTransition } from "./fsm";

/**
 * Command handler validates current state and returns event(s).
 */
export function handleCommand(current: Loan | undefined, cmd: Command): Event[] {
    const now = new Date().toISOString();

    switch (cmd.type) {
        case "ApplyLoan": {
            if (current) throw new DomainError("Loan already exists");
            return [
                {
                    type: "LoanApplied",
                    payload: {
                        loanId: cmd.payload.loanId,
                        userId: cmd.payload.userId,
                        amount: cmd.payload.amount,
                        submittedAt: now,
                    },
                },
            ];
        }

        case "ApproveLoan": {
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "applied") throw new DomainError("Only applied loans can be approved");
            if (!canTransition(current.state, "approved")) throw new DomainError("Invalid transition");
            return [
                {
                    type: "LoanApproved",
                    payload: {
                        loanId: cmd.payload.loanId,
                        approvedBy: cmd.payload.approver,
                        approvedAt: now,
                    },
                },
            ];
        }

        case "DisburseLoan": {
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "approved") throw new DomainError("Only approved loans can be disbursed");
            if (!canTransition(current.state, "disbursed")) throw new DomainError("Invalid transition");
            return [
                {
                    type: "LoanDisbursed",
                    payload: {
                        loanId: cmd.payload.loanId,
                        transactionId: cmd.payload.transactionId,
                        disbursedAt: now,
                    },
                },
            ];
        }

        case "CloseLoan": {
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "disbursed") throw new DomainError("Only disbursed loans can be closed");
            if (!canTransition(current.state, "closed")) throw new DomainError("Invalid transition");
            return [
                {
                    type: "LoanClosed",
                    payload: {
                        loanId: cmd.payload.loanId,
                        reason: cmd.payload.reason,
                        closedAt: now,
                    },
                },
            ];
        }

        default:
            const _exhaustive: never = cmd;
            throw new DomainError(`Unhandled command ${JSON.stringify(_exhaustive)}`);
    }
}
