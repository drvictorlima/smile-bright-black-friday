import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESULTS_INTERVAL_MS } from "@/lib/results";
import initial from "@/assets/resultado_inicial.webp.asset.json";
import face from "@/assets/resultado_paciente_rosto.webp.asset.json";
import smile from "@/assets/resultado_paciente_intraoral.webp.asset.json";
import third from "@/assets/resultado_paciente_tres.webp.asset.json";
import womanAngle from "@/assets/resultado_mulher_angulo.webp.asset.json";
import womanFront from "@/assets/sorriso_mulher_frontal.webp.asset.json";
import manComparison from "@/assets/antes_depois_homem.webp.asset.json";
import womanComparison from "@/assets/antes_depois_mulher.webp.asset.json";
import newWomanAngle from "@/assets/sorriso_mulher_angulo.webp.asset.json";
import manAngle from "@/assets/sorriso_homem_marca_existente.webp.asset.json";
import profile from "@/assets/sorriso_perfil_marca_existente.webp.asset.json";
import womanSmile from "@/assets/sorriso_mulher_marca_existente.webp.asset.json";
import markedAngle from "@/assets/sorriso_angulo_marca_existente.webp.asset.json";

const slides = [
  { src: initial.url, alt: "Antes e depois — resultado inicial" },
  { src: face.url, alt: "Antes e depois — paciente 1, fotografias de rosto" },
  { src: smile.url, alt: "Antes e depois — paciente 1, fotografias intraorais" },
  { src: womanAngle.url, alt: "Resultado — paciente 2, sorriso em outro ângulo" },
  { src: third.url, alt: "Antes e depois — paciente 3, fotografias de rosto" },
  { src: manComparison.url, alt: "Antes e depois — paciente com aparelho antes do procedimento" },
  { src: womanComparison.url, alt: "Antes e depois — transformação do sorriso da paciente" },
  { src: womanFront.url, alt: "Resultado — sorriso frontal da paciente" },
  { src: newWomanAngle.url, alt: "Resultado — sorriso da paciente em ângulo" },
  { src: manAngle.url, alt: "Resultado — detalhe do sorriso do paciente" },
  { src: profile.url, alt: "Resultado — sorriso do paciente de perfil" },
  { src: womanSmile.url, alt: "Resultado — detalhe frontal do sorriso da paciente" },
  { src: markedAngle.url, alt: "Resultado — sorriso em ângulo com marca d’água original" },
];

export function ResultsCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) setPlaying(false);
    const images = slides.slice(1).map(({ src }) => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(() => undefined);
    });
    let mounted = true;
    void Promise.all(images).then(() => { if (mounted) setReady(true); });
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { mounted = false; document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing || !ready || !visible) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), RESULTS_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, ready, visible]);
  const move = (direction: number) => {
    setPlaying(false);
    setActive((current) => (current + direction + slides.length) % slides.length);
  };
  const touch = useRef<number | null>(null);
  const onTouchStart = (event: React.TouchEvent) => { touch.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: React.TouchEvent) => {
    const end = event.changedTouches[0]?.clientX;
    if (touch.current === null || end === undefined) return;
    const delta = end - touch.current;
    touch.current = null;
    if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
  };
  return (
    <section aria-label="Resultados antes e depois" aria-roledescription="carrossel" className="mt-6">
      <div className="relative aspect-square overflow-hidden rounded-lg" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {slides.map((slide, index) => (
          <img key={slide.src} src={slide.src} alt={slide.alt} width={1000} height={1000}
            fetchPriority={index === 0 ? "high" : "low"} loading={index === 0 ? "eager" : "lazy"} decoding="async"
            aria-hidden={index !== active} data-active={index === active}
            className={`absolute inset-0 h-full w-full object-cover ${index === active ? "visible" : "invisible"}`} />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Button variant="ghost" size="icon" aria-label="Fotografia anterior" title="Fotografia anterior" onClick={() => move(-1)}><ChevronLeft /></Button>
        <span className="text-xs tabular-nums text-muted-foreground">{active + 1} / {slides.length}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" aria-label={playing ? "Pausar fotografias" : "Reproduzir fotografias"} title={playing ? "Pausar fotografias" : "Reproduzir fotografias"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause /> : <Play />}</Button>
          <Button variant="ghost" size="icon" aria-label="Próxima fotografia" title="Próxima fotografia" onClick={() => move(1)}><ChevronRight /></Button>
        </div>
      </div>
    </section>
  );
}