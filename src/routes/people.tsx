import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Database, Download, MapPin, Shield, Trash2 } from "lucide-react";
import { HtmlComment } from "@/components/html-comment";
import { IntranetShell } from "@/components/intranet-shell";
import { Note } from "@/components/briefing";
import { Button } from "@/components/ui/button";
import { employees, getEmployee } from "@/lib/employees";
import { markProgress } from "@/lib/progress";

type PeopleSearch = { id: string };

export const Route = createFileRoute("/people")({
  validateSearch: (search: Record<string, unknown>): PeopleSearch => {
    const raw = search.id;
    const id = raw == null ? "105" : String(raw).replace(/^"|"$/g, "");
    return { id: id || "105" };
  },
  component: PeoplePage,
});

function PeoplePage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/people" });
  const employee = id === "1" ? employees["105"] : employees[id];
  const viewer =
    id === "1" && employee ? { ...employee, id: "1" } : (employee ?? getEmployee(id));

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).get("id")) {
      void navigate({ search: { id: "105" }, replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (id === "1") markProgress({ admin: true });
  }, [id]);

  return (
    <IntranetShell employee={viewer} current="people">
      <HtmlComment text="Каталог: /people?id=105 Анна и выгрузка абонентов, /people?id=1 та же Анна, но с КИИ и удалением базы. Сервер не сверяет сессию с id." />
      <div className="relative isolate overflow-hidden border-b border-line">
        <img
          src="/images/office.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-paper/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
            Кадровый каталог
          </p>
          <h1 className="font-display mt-2 text-4xl tracking-tight">Люди</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
            Карточки сотрудников открываются по табельному номеру в адресе
            страницы.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[minmax(0,1fr)_18rem] md:px-6 md:py-12">
        {employee ? (
          <ProfileCard id={id} elevated={id === "1"} />
        ) : (
          <section className="rounded-lg bg-sheet p-6 shadow-soft">
            <h2 className="font-display text-2xl">Сотрудник не найден</h2>
            <p className="mt-2 text-sm text-mist">
              В каталоге нет карточки с табельным номером {id}.
            </p>
          </section>
        )}

        <aside className="space-y-4">
          <div className="rounded-lg bg-sheet p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.14em] text-mist">
              Прямая ссылка
            </p>
            <ShareField id={id} />
            <p className="mt-3 text-xs leading-relaxed text-subtle">
              Ссылку можно править и открыть заново — так передают карточку
              коллеге.
            </p>
          </div>
          <div className="rounded-lg bg-sheet p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.14em] text-mist">
              Сегодня
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <p className="font-medium">09:30 · Планерка смены</p>
                <p className="text-mist">Переговорная 3.12</p>
              </li>
              <li>
                <p className="font-medium">14:00 · Инструктаж по доступу</p>
                <p className="text-mist">Только для администраторов</p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </IntranetShell>
  );
}

function ShareField({ id }: { id: string }) {
  const navigate = useNavigate({ from: "/people" });
  const [value, setValue] = useState(`https://portal.svyaz-inform.ru/people?id=${id}`);

  useEffect(() => {
    setValue(`https://portal.svyaz-inform.ru/people?id=${id}`);
  }, [id]);

  return (
    <form
      className="mt-3"
      onSubmit={(event) => {
        event.preventDefault();
        const match = value.match(/[?&]id=([^&]+)/);
        const next = match?.[1] ?? value.replace(/\D/g, "");
        if (next) void navigate({ search: { id: next } });
      }}
    >
      <input
        aria-label="Прямая ссылка на карточку"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-11 w-full rounded-md bg-paper px-3 font-mono text-xs text-ink shadow-soft outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    </form>
  );
}

function ProfileCard({ id, elevated }: { id: string; elevated: boolean }) {
  const source = elevated ? employees["105"] : employees[id];
  if (!source) return null;
  const person = elevated ? { ...source, id } : source;
  const isAdmin = person.role === "admin";

  return (
    <article className="rounded-lg bg-sheet p-5 shadow-paper md:p-7">
      <div className="flex flex-col gap-6 sm:flex-row">
        <img
          src={person.photo}
          alt={person.name}
          className="h-56 w-44 rounded-md object-cover outline outline-1 -outline-offset-1 outline-ink/10 sm:h-60"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-paper px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-mist">
              Таб. № {person.id}
            </span>
            <span
              className={
                isAdmin
                  ? "rounded-sm bg-ok-soft px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-ok"
                  : "rounded-sm bg-paper px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-mist"
              }
            >
              {isAdmin ? "Полный доступ" : person.role === "intern" ? "Техподдержка" : "Сотрудник"}
            </span>
          </div>
          <h2 className="font-display mt-3 text-3xl tracking-tight">{person.name}</h2>
          <p className="mt-1 text-sm text-mist">{person.title}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed">{person.bio}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <Info label="Подразделение" value={person.dept} />
            <Info label="Почта" value={person.email} />
            <Info label="Телефон" value={person.phone} />
            <Info
              label="Рабочее место"
              value={person.location}
              icon={<MapPin className="size-3.5" />}
            />
            <Info label="В компании с" value={person.started} />
          </dl>
        </div>
      </div>

      {isAdmin ? (
        <div className="mt-8 border-t border-line pt-6">
          <Note>
            Карточка администратора открыта без проверки сессии — сервер отдал
            профиль по номеру в адресе.
          </Note>
          <div className="mt-5 flex flex-col gap-3 rounded-md bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-4 text-ink" />
              <div>
                <p className="text-sm font-medium">Платформа данных</p>
                <p className="text-sm text-mist">
                  Абонентский контур SI-MSK-3
                </p>
              </div>
            </div>
            <Button asChild>
              <Link to="/data">
                Открыть
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : elevated ? (
        <SupportActions />
      ) : person.role === "intern" ? (
        <DownloadSubscribers />
      ) : null}
    </article>
  );
}

function DownloadSubscribers() {
  const [exported, setExported] = useState(false);

  function exportSubscribers() {
    const csv = [
      "id,contract,abonent,msisdn,city,tariff,balance,status,note",
      "10041,МР-24018,ООО «Северная верфь»,+78127001420,Санкт-Петербург,Корп. 500,18420.50,active,рамочный договор",
      "10042,МР-24019,АО «БалтСтрой»,+78127001477,Санкт-Петербург,Корп. 200,910.00,active,",
      "10088,МР-25102,ИП Соколова Н. В.,+79215550114,Выборг,Связь+,−340.20,blocked,задолженность 14 дней",
      "10110,МР-25140,ГБУ «Городская больница №3»,+74951204510,Москва,Корп. 1000,0.00,active,не отключать",
      "10111,МР-25141,Школа № 148,+74951204518,Москва,Корп. 100,2200.00,active,",
      "10204,МР-26003,Петров Алексей Игоревич,+79031220045,Москва,Безлимит М,150.00,active,",
      "10205,МР-26004,Кузнецова Мария Олеговна,+79037661209,Москва,Безлимит S,0.00,active,перенос номера",
      "10277,МР-26110,Сидоров Павел,+79501238801,Казань,Безлимит S,−89.00,limited,лимит интернета",
      "10302,МР-26155,ООО «Логистик Про»,+78432701020,Самара,Корп. 200,6400.00,active,12 SIM",
      "10390,МР-27001,Орлова Дарья,+79161220077,Москва,Безлимит М,430.10,active,",
      "10412,МР-27028,АО «Нева-Транс»,+78123330090,Санкт-Петербург,Корп. 500,12050.00,active,",
      "10480,МР-27102,Белов Игорь,+79261220945,Москва,Архив,0.00,closed,расторгнут 02.03.2026",
      "10501,МР-27140,Вокзал Казанский,+74951209001,Москва,Корп. 1000,500.00,active,аварийный канал",
      "10502,МР-27141,Депо «Москва-3»,+74951209014,Москва,Корп. 200,80.00,active,",
      "18,МР-INT-18,Павел Еремин,+74951203319,Москва,Служебный,0.00,active,сотрудник",
      "42,МР-INT-42,Марина Козлова,+74951202208,Москва,Служебный,0.00,active,сотрудник",
      "105,МР-INT-105,Анна Волкова,+74951208815,Москва,Служебный,0.00,active,оператор смены",
      "1,МР-INT-1,Анна Волкова,+74951208815,Москва,Служебный привилегированный,0.00,active,дубль карточки id=1",
      "9001,SVC-BILL,svc_billing,+74951200001,Москва,Системный,0.00,active,учётка биллинга не для людей",
      "9002,SVC-HLR,svc_hlr,+74951200002,Москва,Системный,0.00,active,пароль в тикете IT-4412",
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subscribers.csv";
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <div className="mt-8 border-t border-line pt-6">
      <Button type="button" variant="secondary" onClick={exportSubscribers}>
        <Download className="size-4" />
        Выгрузить базы абонентов
      </Button>
      {exported ? (
        <p className="mt-4 text-sm text-mist">
          Файл subscribers.csv сохранён: 20 абонентов, договоры, тарифы и служебные номера.
        </p>
      ) : null}
    </div>
  );
}

function SupportActions() {
  const [gone, setGone] = useState(false);

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="text-xs uppercase tracking-[0.14em] text-mist">
        Действия смены
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <Button asChild>
          <Link to="/data" onClick={() => markProgress({ admin: true })}>
            <Shield className="size-4" />
            Критическая информационная инфраструктура
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        <Button
          type="button"
          variant="danger"
          disabled={gone}
          onClick={() => {
            setGone(true);
            markProgress({ admin: true });
          }}
        >
          <Trash2 className="size-4" />
          Удалить базу
        </Button>
      </div>
      {gone ? (
        <div className="mt-4 flex items-start gap-3 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          <Database className="mt-0.5 size-4 shrink-0" />
          <p>
            Каталог пользователей очищен. Восстановление — из резервной копии
            SI-MSK-3, заявка в смену инфраструктуры.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-1 flex items-center gap-1.5">
        {icon}
        {value}
      </dd>
    </div>
  );
}
