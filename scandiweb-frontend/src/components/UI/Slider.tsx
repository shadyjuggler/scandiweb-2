import React, {
    useRef,
    useState,
    ReactNode,
    Children,
    cloneElement,
    useEffect,
} from "react";

interface SliderProps {
    id: string;
    children: ReactNode;
    autoScroll?: boolean;
    interval?: number;
    paginationClassName?: string;
}

export const Slider: React.FC<SliderProps> = ({
    id,
    children,
    autoScroll = false,
    interval = 3000,
    paginationClassName = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesCount = Children.count(children);

    const scrollToSlide = (index: number) => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth;
            containerRef.current.scrollTo({
                left: width * index,
                behavior: "smooth",
            });
        }
    };

    const nextSlide = () => {
        const next = (currentIndex + 1) % slidesCount;
        setCurrentIndex(next);
        scrollToSlide(next);
    };

    const prevSlide = () => {
        const prev = (currentIndex - 1 + slidesCount) % slidesCount;
        setCurrentIndex(prev);
        scrollToSlide(prev);
    };

    // Auto-scroll
    useEffect(() => {
        if (!autoScroll) return;
        const intervalId = setInterval(() => {
            nextSlide();
        }, interval);
        return () => clearInterval(intervalId);
    }, [autoScroll, interval, currentIndex]);

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollLeft = containerRef.current.scrollLeft;
            const width = containerRef.current.clientWidth;
            const newIndex = Math.round(scrollLeft / width);
            setCurrentIndex(newIndex);
        }
    };

    return (
        <>
            <div id={id} className="relative w-full overflow-hidden">
                {/* SliderWrapper */}
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hidden"
                >
                    {Children.map(children, (child, index) =>
                        cloneElement(child as React.ReactElement, {
                            key: index,
                        })
                    )}
                </div>

                {/* Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                >
                    ◀
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                >
                    ▶
                </button>
            </div>

            {/* Pagination */}
            {paginationClassName && (
                <div
                    className={`flex gap-2 ${paginationClassName}`}
                >
                    {Array.from({ length: slidesCount }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentIndex(i);
                                scrollToSlide(i);
                            }}
                            className={`pagination-bullet w-3 h-3 rounded-full transition-colors duration-300 z-40 ${
                                i === currentIndex
                                    ? "bg-red-500"
                                    : "bg-red-500/50 hover:bg-red-500/80"
                            }`}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
