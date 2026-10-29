import { createFileRoute, Link } from "@tanstack/react-router";
import { IntranetShell } from "@/components/intranet-shell";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/employees";
import { resetProgress } from "@/lib/progress";

export const Route = createFileRoute("/archive")({ component: ArchivePage });

const findings = [
  {
    title: "Клиентское ограничение",
    detail:
      "Кнопка входа была отключена только атрибутом disabled. Сервер не проверял, можно ли открывать сессию.",
  },
  {
    title: "Прямая ссылка на карточку",
    detail:
      "Профили отдаются по табельному номеру в адресе. id=105 — выгрузка абонентов, id=1 — та же Анна, но с доступом к КИИ и удалению базы.",
  },
  {
    title: "Сборка SQL-запроса",
    detail:
      "Логин подставлялся в запрос без экранирования. Подстановка ' OR 1=1 -- вернула первую запись.",
  },
  {
    title: "Командная оболочка",
    detail:
      "После входа в контур открылась сессия root. Служебный файл читается обычными командами ls и cat.",
  },
];

function ArchivePage() {
  return (
    <IntranetShell employee={employees["105"]} current="archive">
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
          Архив · служебные документы · гриф ДСП
        </p>
        <h1 className="font-display mt-2 text-4xl tracking-tight">
          Акт по итогам проверки
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          17 сентября 2026 · учебный контур АО «Связь-Информ» · для преподавателя
        </p>

        <article className="mt-10 rounded-xl bg-sheet px-6 py-8 shadow-paper md:px-10 md:py-12">
          <div className="flex items-start justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="font-display text-2xl tracking-tight">Связь-Информ</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mist">
                Управление информационной безопасности
              </p>
            </div>
            <p className="text-right text-xs text-subtle">
              № 44-ИБ
              <br />
              17.09.2026
            </p>
          </div>

          <p className="mt-6 text-sm leading-relaxed">
            В ходе занятия на учебном портале воспроизведены четыре типичных
            ошибки веб-приложений. Контрольный идентификатор фиксации:
          </p>

          <p className="mt-6 rounded-md bg-paper px-4 py-5 text-center font-mono text-lg tracking-wide text-ink md:text-xl">
            FLAG{"{"}WHITE_HAT_PENTEST_2026{"}"}
          </p>
          <p className="mt-3 text-center text-xs text-subtle">
            Перенесите идентификатор в карточку отчёта для преподавателя.
          </p>

          <ol className="mt-8 space-y-5">
            {findings.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-mono text-xs text-subtle pt-1">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link
              to="/"
              onClick={() => {
                resetProgress();
              }}
            >
              Пройти заново
            </Link>
          </Button>
        </div>
      </div>
    </IntranetShell>
  );
}
