import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "svyaz-inform-briefing-open";

const steps = [
  {
    n: "01",
    title: "Вход",
    body: "Кнопка на странице входа заблокирована. Откройте инспектор кода (F12 или правая кнопка → «Просмотреть код»), найдите кнопку и удалите атрибут disabled, затем нажмите её.",
  },
  {
    n: "02",
    title: "Карточка сотрудника",
    body: "Откроется карточка Анны Волковой с id=105 — там только выгрузка баз абонентов. Замените в адресе id=105 на id=1 и нажмите Enter: это та же Анна, но уже с кнопками критической информационной инфраструктуры и удаления базы.",
  },
  {
    n: "03",
    title: "Платформа данных",
    body: "Пароль неизвестен. В поле логина введите классическую подстановку, чтобы условие стало истинным: ' OR 1=1 --",
  },
  {
    n: "04",
    title: "Консоль сервера",
    body: "Посмотрите список файлов командой ls и прочитайте служебный файл: cat SECRET_FLAG.txt",
  },
];

export function Briefing() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    setOpen(stored === null ? true : stored === "1");
    setReady(true);
  }, []);

  function toggle(next: boolean) {
    setOpen(next);
    window.localStorage.setItem(KEY, next ? "1" : "0");
  }

  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-40 flex justify-start md:inset-x-auto md:bottom-6 md:left-6">
      {open ? (
        <aside
          className="pointer-events-auto w-full max-w-md max-h-[min(70vh,36rem)] overflow-y-auto rounded-xl bg-sheet p-5 shadow-paper rise md:p-6"
          aria-label="Практическое занятие"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
                Практическое занятие · 1 курс
              </p>
              <h2 className="font-display mt-1 text-xl tracking-tight text-ink">
                Проверка корпоративного портала
              </h2>
            </div>
            <button
              type="button"
              className="relative -mr-1 -mt-1 size-10 text-mist after:absolute after:left-1/2 after:top-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 hover:text-ink"
              onClick={() => toggle(false)}
              aria-label="Свернуть задание"
            >
              <X className="mx-auto size-4" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Сайт выглядит как обычный рабочий контур компании. Найдите четыре
            слабых места и дойдите до служебного файла.
          </p>
          <ol className="mt-4 space-y-3">
            {steps.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-mono text-[11px] text-subtle pt-0.5">
                  {step.n}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-mist">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => toggle(true)}
          className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-md bg-sheet px-4 text-sm font-medium text-ink shadow-paper"
        >
          <BookOpen className="size-4" />
          Задание
        </button>
      )}
    </div>
  );
}

export function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded-md bg-ok-soft px-3.5 py-3 text-sm leading-relaxed text-ok",
        className,
      )}
    >
      {children}
    </p>
  );
}
