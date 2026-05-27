const ROLL_LIMIT_KEY =
  "velunix_guest_rolls";

const MAX_GUEST_ROLLS = 5;

export function getGuestRolls(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const value =
    localStorage.getItem(
      ROLL_LIMIT_KEY
    );

  return Number(value || 0);
}

export function canGuestRoll(): boolean {
  return (
    getGuestRolls() <
    MAX_GUEST_ROLLS
  );
}

export function incrementGuestRolls() {
  if (typeof window === "undefined") {
    return;
  }

  const currentRolls =
    getGuestRolls();

  localStorage.setItem(
    ROLL_LIMIT_KEY,
    String(currentRolls + 1)
  );
}

export function getRemainingGuestRolls(): number {
  return Math.max(
    MAX_GUEST_ROLLS -
      getGuestRolls(),
    0
  );
}

export function resetGuestRolls() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    ROLL_LIMIT_KEY
  );
}