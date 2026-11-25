import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESULTS_INTERVAL_MS } from "@/lib/results";

const slides = [
  { src: "/img/resultado-4.jpg", alt: "Resultado — estética do sorriso em ângulo com lentes em resina" },
  { src: "/img/resultado-1.jpg", alt: "Resultado — estética e transformação do sorriso com lentes em resina" },
  { src: "/img/resultado-2.jpg", alt: "Resultado — sorriso realista com lentes em resina" },
  { src: "/img/resultado-3.jpg", alt: "Resultado — detalhe de perfil das lentes em resina" },
  { src: "/img/resultado-5.jpg", alt: "Resultado — transformação do sorriso com lentes em resina" },
  { src: "/img/resultado-6.jpg", alt: "Resultado — sorriso feminino harmônico com lentes em resina" },
];

export function ResultsCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) setPlaying(false);

    slides.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, RESULTS_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, visible, active]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  const touch = useRef<number | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    touch.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const end = event.changedTouches[0]?.clientX;
    if (touch.current === null || end === undefined) return;
    const delta = end - touch.current;
    touch.current = null;
    if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
  };

  return (
    <section aria-label="Resultados antes e depois" aria-roledescription="carrossel" className="mt-6">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1000}
            height={1000}
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={index !== active}
            data-active={index === active}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Button variant="ghost" size="icon" aria-label="Fotografia anterior" title="Fotografia anterior" onClick={() => move(-1)}>
          <ChevronLeft />
        </Button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {active + 1} / {slides.length}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={playing ? "Pausar fotografias" : "Reproduzir fotografias"}
            title={playing ? "Pausar fotografias" : "Reproduzir fotografias"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Próxima fotografia" title="Próxima fotografia" onClick={() => move(1)}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}