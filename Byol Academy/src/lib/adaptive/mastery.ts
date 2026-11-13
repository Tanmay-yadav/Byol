export type BktParameters = {
  guess: number;
  slip: number;
  learn: number;
};

export const illustrativeParameters: BktParameters = {
  guess: 0.2,
  slip: 0.1,
  learn: 0.15,
};

export function updateMastery(
  prior: number,
  correct: boolean,
  parameters: BktParameters = illustrativeParameters,
): number {
  const { guess, slip, learn } = parameters;
  if (
    !Number.isFinite(prior) ||
    prior < 0 ||
    prior > 1 ||
    ![guess, slip, learn].every((value) => Number.isFinite(value) && value >= 0 && value < 1)
  ) {
    throw new RangeError("Mastery and model parameters must be probabilities from 0 to 1.");
  }

  const likelihood = correct
    ? prior * (1 - slip)
    : prior * slip;
  const notMasteredLikelihood = correct
    ? (1 - prior) * guess
    : (1 - prior) * (1 - guess);
  const evidence = likelihood + notMasteredLikelihood;
  const posterior = evidence === 0 ? prior : likelihood / evidence;
  return posterior + (1 - posterior) * learn;
}

export function masterySignal(estimate: number): "developing" | "building" | "steady" {
  if (!Number.isFinite(estimate) || estimate < 0 || estimate > 1) {
    throw new RangeError("Mastery estimate must be a probability from 0 to 1.");
  }
  if (estimate < 0.4) return "developing";
  if (estimate < 0.75) return "building";
  return "steady";
}
