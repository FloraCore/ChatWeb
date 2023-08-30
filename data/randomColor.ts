function srand(seed: number){
    return abs(Math.sin((seed * b) + a));
}

function min(a: number, b: number) {
    return a > b ? b : a;
}

function prefix(str: string) {
    return str.length == 1 ? `0${str}` : str
}

function abs(a: number) {
    return a > 0 ? a : -a;
}

function stringToSeed(str: string) {
    let seedNumber = 0;
    for (let i = 0; i < min(20, str.length); i++) {
        seedNumber += str.charCodeAt(i);
    }
    return seedNumber
}

function hslToRgb(H: number, S: number, L: number): number[] {
    let R, G, B;
    if (+S === 0) {
        R = G = B = L;
    } else {
        const hue2Rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        const P = 2 * L - Q;
        R = hue2Rgb(P, Q, H + 1 / 3);
        G = hue2Rgb(P, Q, H);
        B = hue2Rgb(P, Q, H - 1 / 3);
    }
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}

const a = 6732;
const b = 3;
const c = 234;
const d = 4;

export default function randomColor(seed: string) {
    let rawSeed = stringToSeed(seed);

    let H = srand(rawSeed);
    let S = 0.7 + (srand(rawSeed + c) * 0.2);
    let L = 0.3 + (srand(rawSeed * d) * 0.3);

    let [R, G, B] = hslToRgb(H, S, L);

    let r = prefix(R.toString(16));
    let g = prefix(G.toString(16));
    let b = prefix(B.toString(16));


    return `#${r}${g}${b}`;
}