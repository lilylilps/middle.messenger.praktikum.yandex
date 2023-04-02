export function debounce(callback: () => void, wait: number | undefined) {
    let timer = 0;

    return function(...args: any) {
        clearTimeout(timer);
        timer = setTimeout(callback.bind(this, ...args), wait || 0) as unknown as number;
    };
}
