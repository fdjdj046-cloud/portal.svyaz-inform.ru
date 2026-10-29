import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Database, Server } from "lucide-react";
import { HtmlComment } from "@/components/html-comment";
import { IntranetShell } from "@/components/intranet-shell";
import { Note } from "@/components/briefing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { employees } from "@/lib/employees";
import { markProgress } from "@/lib/progress";

export const Route = createFileRoute("/data")({ component: DataPage });

function isSqlPayload(login: string) {
  const val = login.toLowerCase().replace(/\s+/g, "");
  return (
    val.includes("'or1=1") ||
    val.includes("'or'1'='1") ||
    val.includes("'or''='") ||
    val.includes("admin'--")
  );
}

function DataPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  function tryLogin() {
    if (isSqlPayload(login)) {
      setError(false);
      setOpen(true);
      markProgress({ sqli: true });
      return;
    }
    setError(true);
  }

  return (
    <IntranetShell employee={employees["105"]} current="data">
      <HtmlComment text="Аутентификация: SELECT * FROM users WHERE login = '" />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mist">
          Абонентский контур · SI-MSK-3
        </p>
        <h1 className="font-display mt-2 text-4xl tracking-tight">
          Платформа данных
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
          Каталог абонентских витрин. Вход только для учёток с ролью
          администратора баз.
        </p>

        {!open ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <form
              className="rounded-lg bg-sheet p-6 shadow-paper"
              onSubmit={(event) => {
                event.preventDefault();
                tryLogin();
              }}
            >
              <p className="font-display text-2xl tracking-tight">Вход в контур</p>
              <p className="mt-2 text-sm text-mist">
                Учётная запись службы сопровождения баз.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="db-user" className="mb-1.5 block text-sm text-mist">
                    Логин
                  </label>
                  <Input
                    id="db-user"
                    name="username"
                    autoComplete="off"
                    placeholder="svc_dba"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="db-pass" className="mb-1.5 block text-sm text-mist">
                    Пароль
                  </label>
                  <Input
                    id="db-pass"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {error ? (
                  <p className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">
                    Отказ в аутентификации. Проверьте учётную запись.
                  </p>
                ) : null}
                <Button type="submit" className="w-full">
                  Подключиться
                </Button>
              </div>
            </form>

            <div className="rounded-lg bg-sheet p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.14em] text-mist">
                Состояние контура
              </p>
              <ul className="mt-4 space-y-4 text-sm">
                <Row label="Витрина HR" value="доступна" />
                <Row label="Журнал аудита" value="доступна" />
                <Row label="Реплика users" value="только чтение" />
                <Row label="Сессия" value="не установлена" />
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-subtle">
                Запросы к каталогу логируются. Не передавайте пароль в открытых
                каналах.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-6 rise">
            <Note>
              Запрос собрался без экранирования и вернул первую запись таблицы
              пользователей. Пароль не понадобился.
            </Note>
            <div className="overflow-hidden rounded-lg bg-sheet shadow-paper">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <Database className="size-4" />
                <p className="text-sm font-medium">users · 4 записи</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.08em] text-subtle">
                    <tr className="border-b border-line">
                      <th className="px-5 py-3 font-medium">id</th>
                      <th className="px-5 py-3 font-medium">login</th>
                      <th className="px-5 py-3 font-medium">role</th>
                      <th className="px-5 py-3 font-medium">host</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line">
                      <td className="px-5 py-3 font-mono text-xs">1</td>
                      <td className="px-5 py-3">root_admin</td>
                      <td className="px-5 py-3">superuser</td>
                      <td className="px-5 py-3">app-prod-01</td>
                    </tr>
                    <tr className="border-b border-line">
                      <td className="px-5 py-3 font-mono text-xs">18</td>
                      <td className="px-5 py-3">p.eremin</td>
                      <td className="px-5 py-3">ops</td>
                      <td className="px-5 py-3">bastion</td>
                    </tr>
                    <tr className="border-b border-line">
                      <td className="px-5 py-3 font-mono text-xs">42</td>
                      <td className="px-5 py-3">m.kozlova</td>
                      <td className="px-5 py-3">hr</td>
                      <td className="px-5 py-3">intranet</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-mono text-xs">105</td>
                      <td className="px-5 py-3">a.volkova</td>
                      <td className="px-5 py-3">support</td>
                      <td className="px-5 py-3">intranet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-lg bg-sheet p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Server className="mt-0.5 size-4" />
                <div>
                  <p className="text-sm font-medium">Узел app-prod-01</p>
                  <p className="text-sm text-mist">
                    Сессия bastion, учётная запись root
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link to="/ops">
                  Открыть консоль
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </IntranetShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-mist">{label}</span>
      <span>{value}</span>
    </li>
  );
}
