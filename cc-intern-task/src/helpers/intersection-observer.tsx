interface IInfiniteScroll {
    configurationOptions: { root: string; margin: string; threshold: number | Array<number> };
    callbackFn: IntersectionObserverCallback;
}

export const infiniteScroll = ({ configurationOptions, callbackFn }: IInfiniteScroll) => {
    let options = {
        root: document.querySelector(configurationOptions.root)!,
        rootMargin: configurationOptions.margin,
        threshold: configurationOptions.threshold,
    };

    let observer = new IntersectionObserver(callbackFn, options);
    Array.from(options.root.children).forEach((el) => {
        observer.observe(el);
    });
};
