export type LabProgress = {
  sso: boolean;
  admin: boolean;
  sqli: boolean;
  shell: boolean;
};

const KEY = "svyaz-inform-lab-progress";

const empty: LabProgress = {
  sso: false,
  admin: false,
  sqli: false,
  shell: false,
};

export function getProgress(): LabProgress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function markProgress(patch: Partial<LabProgress>) {
  const next = { ...getProgress(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("svyaz-inform-progress"));
}

export function resetProgress() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("svyaz-inform-progress"));
}
