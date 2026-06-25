export const matelikEasing = [0.16, 1, 0.3, 1];

export const matelikTransition = {
    duration: 0.4,
    ease: matelikEasing,
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: matelikTransition,
    },
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: matelikTransition,
    },
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: matelikTransition,
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { ...matelikTransition, duration: 0.3 },
    },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: matelikTransition,
    },
};

export const modalMotion = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: matelikTransition,
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 10,
        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
    },
};
