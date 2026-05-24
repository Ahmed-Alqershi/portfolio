export type Point = { x: number; y: number };

// 2026-05-22 is Detour #1.
const DETOUR_EPOCH = Date.UTC(2026, 4, 22);

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dailySeed(date: Date): number {
  return (
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate()
  );
}

export function puzzleNumber(date: Date): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((utc - DETOUR_EPOCH) / 86400000) + 1;
}

// Cities in normalized [0,1] space. Best-candidate (Mitchell's) sampling:
// each new city is the farthest-from-existing of several random candidates,
// which spreads them evenly across the canvas instead of letting them clump.
export function dailyCities(seed: number, n: number): Point[] {
  const rng = mulberry32(seed);
  const CANDIDATES = 12;
  const randPoint = (): Point => ({
    x: 0.07 + rng() * 0.86,
    y: 0.07 + rng() * 0.86,
  });

  const cities: Point[] = [randPoint()];
  while (cities.length < n) {
    let best = randPoint();
    let bestDist = -1;
    for (let k = 0; k < CANDIDATES; k++) {
      const cand = randPoint();
      let nearest = Infinity;
      for (const o of cities) {
        const d = Math.hypot(o.x - cand.x, o.y - cand.y);
        if (d < nearest) nearest = d;
      }
      if (nearest > bestDist) {
        bestDist = nearest;
        best = cand;
      }
    }
    cities.push(best);
  }
  return cities;
}

// Per-city prize values, on an independent random stream from the positions.
export function dailyValues(seed: number, n: number): number[] {
  const rng = mulberry32(seed + 101);
  return Array.from({ length: n }, () => 3 + Math.floor(rng() * 13));
}

export function distanceMatrix(cities: Point[]): number[][] {
  const n = cities.length;
  const d: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.hypot(
        cities[i].x - cities[j].x,
        cities[i].y - cities[j].y,
      );
      d[i][j] = dist;
      d[j][i] = dist;
    }
  }
  return d;
}

// Length of a closed tour visiting `order` and returning to the start.
export function tourLength(order: number[], dist: number[][]): number {
  if (order.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < order.length; i++) {
    total += dist[order[i]][order[(i + 1) % order.length]];
  }
  return total;
}

// Exact optimal tour via Held–Karp dynamic programming. O(2^n · n^2).
export function solveTSP(dist: number[][]): {
  order: number[];
  length: number;
} {
  const n = dist.length;
  if (n <= 2) {
    const order = Array.from({ length: n }, (_, i) => i);
    return { order, length: tourLength(order, dist) };
  }

  const FULL = 1 << n;
  const dp: Float64Array[] = Array.from({ length: FULL }, () =>
    new Float64Array(n).fill(Infinity),
  );
  const parent: Int8Array[] = Array.from({ length: FULL }, () =>
    new Int8Array(n).fill(-1),
  );
  dp[1][0] = 0;

  for (let mask = 1; mask < FULL; mask++) {
    if (!(mask & 1)) continue;
    for (let i = 0; i < n; i++) {
      const cost = dp[mask][i];
      if (cost === Infinity || !(mask & (1 << i))) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        const next = mask | (1 << j);
        const nc = cost + dist[i][j];
        if (nc < dp[next][j]) {
          dp[next][j] = nc;
          parent[next][j] = i;
        }
      }
    }
  }

  const full = FULL - 1;
  let best = Infinity;
  let bestEnd = 0;
  for (let i = 1; i < n; i++) {
    const c = dp[full][i] + dist[i][0];
    if (c < best) {
      best = c;
      bestEnd = i;
    }
  }

  const order: number[] = [];
  let mask = full;
  let cur = bestEnd;
  while (cur !== -1) {
    order.push(cur);
    const p: number = parent[mask][cur];
    mask ^= 1 << cur;
    cur = p;
  }
  order.reverse();
  return { order, length: best };
}

// Exact Orienteering Problem optimum: the highest-value subset of cities whose
// shortest closed tour fits within `budget`. Built on the same Held–Karp table.
export function solveOrienteering(
  dist: number[][],
  values: number[],
  budget: number,
): { order: number[]; value: number; length: number } {
  const n = dist.length;
  const FULL = 1 << n;
  const dp: Float64Array[] = Array.from({ length: FULL }, () =>
    new Float64Array(n).fill(Infinity),
  );
  const parent: Int8Array[] = Array.from({ length: FULL }, () =>
    new Int8Array(n).fill(-1),
  );
  dp[1][0] = 0;

  for (let mask = 1; mask < FULL; mask++) {
    if (!(mask & 1)) continue;
    for (let i = 0; i < n; i++) {
      const cost = dp[mask][i];
      if (cost === Infinity || !(mask & (1 << i))) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        const next = mask | (1 << j);
        const nc = cost + dist[i][j];
        if (nc < dp[next][j]) {
          dp[next][j] = nc;
          parent[next][j] = i;
        }
      }
    }
  }

  let bestMask = 1;
  let bestValue = values[0];
  let bestLen = 0;
  let bestEnd = 0;

  for (let mask = 1; mask < FULL; mask++) {
    if (!(mask & 1)) continue;
    let cyc = Infinity;
    let end = 0;
    if (mask === 1) {
      cyc = 0;
    } else {
      for (let i = 1; i < n; i++) {
        if (!(mask & (1 << i))) continue;
        const c = dp[mask][i] + dist[i][0];
        if (c < cyc) {
          cyc = c;
          end = i;
        }
      }
    }
    if (cyc > budget + 1e-9) continue;
    let val = 0;
    for (let i = 0; i < n; i++) if (mask & (1 << i)) val += values[i];
    if (val > bestValue || (val === bestValue && cyc < bestLen)) {
      bestMask = mask;
      bestValue = val;
      bestLen = cyc;
      bestEnd = end;
    }
  }

  const order: number[] = [];
  if (bestMask === 1) {
    order.push(0);
  } else {
    let mask = bestMask;
    let cur = bestEnd;
    while (cur !== -1) {
      order.push(cur);
      const p: number = parent[mask][cur];
      mask ^= 1 << cur;
      cur = p;
    }
    order.reverse();
  }

  return { order, value: bestValue, length: bestLen };
}
