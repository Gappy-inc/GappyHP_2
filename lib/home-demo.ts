// Synthetic presentation only. No network, persistence, customer data, or live sends.
export const booking = {
  name: "Kyoto Private Tour",
  id: "KYO-181026",
  time: "09:00",
} as const;
export const homeStates = {
  received: { readiness: 42, unresolved: 4, evidence: 12, status: "resolving" },
  execution57: { readiness: 57, status: "resolving" },
  execution71: { readiness: 71, status: "resolving" },
  advanced: { readiness: 86, unresolved: 1, evidence: 12, status: "resolving" },
  response: { readiness: 86, status: "received" },
  ready: { readiness: 100, unresolved: 0, evidence: 18, status: "ready" },
  invalidated: { readiness: 76, unresolved: 1, status: "risk" },
  candidate: { readiness: 76, status: "waiting" },
  recovered: {
    readiness: 100,
    unresolved: 0,
    evidence: 18,
    status: "recovered",
  },
} as const;
export type HomeState = keyof typeof homeStates;
export type VerificationState = "response" | "checking" | "ready";
export function verificationTransition(
  state: VerificationState,
  action: "check" | "complete" | "replay",
): VerificationState {
  if (action === "replay") return "response";
  if (action === "check" && state === "response") return "checking";
  if (action === "complete" && state === "checking") return "ready";
  return state;
}
export type RecoveryState = "ready" | "invalidated" | "candidate" | "recovered";
export function recoveryTransition(
  state: RecoveryState,
  action: "cancel" | "evaluate" | "verify" | "replay",
): RecoveryState {
  if (action === "replay") return "ready";
  if (state === "ready" && action === "cancel") return "invalidated";
  if (state === "invalidated" && action === "evaluate") return "candidate";
  if (state === "candidate" && action === "verify") return "recovered";
  return state;
}
export function recoveryScene(scene: number): RecoveryState {
  let state: RecoveryState = "ready";
  if (scene >= 1)
    state = recoveryTransition(recoveryTransition(state, "cancel"), "evaluate");
  if (scene >= 2) state = recoveryTransition(state, "verify");
  return state;
}
