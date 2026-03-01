import confetti from "canvas-confetti";

export default function Confetti() {

    const launchConfetti = () => {
        const config = {
            particleCount: 120,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ff6f61', '#4a90e2', '#50c878']
        };

        confetti({
            ...config,
            angle: 60
        });

        confetti({
            ...config,
            angle: 120
        });
    };

    return { launchConfetti };
}